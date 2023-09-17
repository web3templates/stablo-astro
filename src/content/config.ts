import { z, defineCollection } from "astro:content";

const BlogPosts = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string().trim(),
    author: z.string().trim(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    publishDate: z.date(),
    imagesWithDots: z.array(
      z.object({
        src: z.string(),
        dots: z.array(
          z.object({
            top: z.number(),
            left: z.number(),
            text: z.string(),
            link: z.string(),
          })
        ).optional(),
      })
    ).optional(),
  }),
});

export const collections = {
  blog: BlogPosts,
};
