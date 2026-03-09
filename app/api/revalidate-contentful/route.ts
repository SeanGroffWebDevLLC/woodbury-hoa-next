import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CONTENT_TYPE_TAG_MAP: Record<string, string[]> = {
  blogPost: ["news"],
  event: ["events"],
  document: ["documents"],
  boardMember: ["board"],
  feeSchedule: ["fees"],
  externalLink: ["links"],
  pageContent: ["pages"],
  mainLogo: ["logos"],
  paymentConfiguration: ["payment"],
};

const ALLOWED_TOPICS = new Set([
  "Entry.publish",
  "Entry.unpublish",
  "ContentManagement.Entry.publish",
  "ContentManagement.Entry.unpublish",
]);

export async function POST(request: NextRequest) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const headerSecret =
    request.headers.get("x-revalidate-secret") ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (headerSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topic = request.headers.get("x-contentful-topic") ?? "";
  if (!ALLOWED_TOPICS.has(topic)) {
    return NextResponse.json({ revalidated: false, reason: "Ignored topic" }, { status: 200 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const contentTypeId = (
    body as { sys?: { contentType?: { sys?: { id?: string } } } }
  )?.sys?.contentType?.sys?.id;

  const tags = contentTypeId ? CONTENT_TYPE_TAG_MAP[contentTypeId] : undefined;

  if (tags) {
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }
  } else {
    // Unknown content type — revalidate everything
    for (const tagList of Object.values(CONTENT_TYPE_TAG_MAP)) {
      for (const tag of tagList) {
        revalidateTag(tag, "max");
      }
    }
  }

  // Catch layout-level data (nav logo)
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, tags: tags ?? "all" });
}
