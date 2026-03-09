import { unstable_cache } from "next/cache";
import { contentfulClient } from "./contentful";
import type { MainLogoSkeleton, MainLogoFields } from "@/types/contentful";
import type { Entry } from "contentful";

export interface LogoData {
  url: string;
  width: number;
  height: number;
  alt: string;
}

async function getLogoByNameUncached(name: string): Promise<LogoData | null> {
  try {
    const res = await contentfulClient.getEntries<MainLogoSkeleton>({
      content_type: "mainLogo",
      include: 10,
    });

    if (!res.items.length) {
      return null;
    }

    // Cast items to work with the fields
    const items = res.items as Entry<MainLogoSkeleton>[];

    // Find the entry by checking the sys.id or asset title
    const logoEntry = items.find((item) => {
      const entryId = item.sys.id;
      const fields = item.fields as MainLogoFields;
      const assetTitle = fields.logo?.fields?.title;
      return (
        assetTitle?.toString().toLowerCase().includes(name.toLowerCase()) ||
        entryId.toLowerCase().includes(name.toLowerCase())
      );
    });

    const entry = logoEntry || items[0];
    const fields = entry.fields as MainLogoFields;
    const logoAsset = fields.logo;

    if (!logoAsset?.fields?.file) {
      return null;
    }

    const file = logoAsset.fields.file;
    const details = file.details as { image?: { width: number; height: number } };

    return {
      url: `https:${file.url}`,
      width: details.image?.width ?? 300,
      height: details.image?.height ?? 80,
      alt: (logoAsset.fields.title as string) ?? "Woodbury Estates HOA Phase 6",
    };
  } catch (error) {
    console.warn(`Failed to fetch ${name} logo:`, error);
    return null;
  }
}

const getLogoByNameCached = unstable_cache(getLogoByNameUncached, ["logo-data"], {
  revalidate: 86400,
  tags: ["logos"],
});

export async function getMainLogo(): Promise<LogoData | null> {
  return getLogoByNameCached("main");
}

export async function getNavLogo(): Promise<LogoData | null> {
  return getLogoByNameCached("nav");
}
