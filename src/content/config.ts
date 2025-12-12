import { z, defineCollection } from "astro:content";

const blogSchema = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.string().optional(),
        heroImage: z.string().optional(),
        badge: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const projectSchema = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: z.string().optional(),
        badge: z.string().optional(),
        tags: z.array(z.string()).optional(),
        url: z.string().optional(),
        lang: z.string().optional(),
        related: z.array(z.string()).optional(),
    }),
});

const storeSchema = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        custom_link_label: z.string(),
        custom_link: z.string().optional(),
        updatedDate: z.coerce.date(),
        pricing: z.string().optional(),
        oldPricing: z.string().optional(),
        badge: z.string().optional(),
        checkoutUrl: z.string().optional(),
        heroImage: z.string().optional(),
    }),
});

export const collections = {
    'blog': blogSchema,
    'store': storeSchema,
    'projects': projectSchema,
};