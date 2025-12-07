import z from "@/node_modules/zod/v4/classic/external.cjs";

export const IssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    description: z.string().min(1, "Description is required").max(1000, "Description cannot exceed 1000 characters"),
});
