import { createClient } from "next-sanity";

export const sanity_client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2023-07-14",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
  });