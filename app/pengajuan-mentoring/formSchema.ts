import { z } from "zod";

export const FormPengajuanMentoring = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  requestDate: z.date(),
});
