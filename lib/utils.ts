import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

export function hitungSelisihHari(tanggal1: string, tanggal2: string) {
  // Mengubah tanggal menjadi objek Date
  const date1 = new Date(tanggal1).getTime();
  const date2 = new Date(tanggal2).getTime();

  // Menghitung selisih dalam milidetik
  const selisihMilidetik = Math.abs(date2 - date1);

  // Menghitung selisih hari
  const selisihHari = Math.floor(selisihMilidetik / (1000 * 60 * 60 * 24));

  return selisihHari;
}
