import { z, defineCollection } from "astro:content";

const BlogPosts = defineCollection({
  schema: {
    title: z.string(),
    excerpt: z.string(),
    category: z.string().trim(),
    author: z.string().trim(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    publishDate: z.string().transform((str) => new Date(str)),
  },
});

export const collections = {
  blog: BlogPosts,
};
