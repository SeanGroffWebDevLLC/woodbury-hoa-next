import * as contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken:
    process.env.NODE_ENV === "development"
      ? process.env.CONTENTFUL_PREVIEW_TOKEN!
      : process.env.CONTENTFUL_DELIVERY_TOKEN!,
  host: process.env.NODE_ENV === "development" ? "preview.contentful.com" : "cdn.contentful.com",
});
