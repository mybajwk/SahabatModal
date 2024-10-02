import { z } from "zod";

export const FormPengajuanMentoring = z.object({
  topik: z.string().min(1, "Topik mentoring wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  dateTime: z.date(),
});
