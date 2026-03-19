import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Shared validation schemas for API
export const insertBookingSchema = z.object({
  date: z.string().min(1, "Выберите дату"),
  time: z.string().min(1, "Выберите время"),
  guests: z.string().min(1, "Укажите количество гостей"),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  comment: z.string().optional(),
});

export const insertOrderSchema = z.object({
  contact: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    comment: z.string().optional(),
    address: z.string().optional(),
    paymentMethod: z.enum(["card", "cash"]).default("card"),
    utensilsCount: z.number().min(0).max(20).default(0),
  }),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number(),
    variant: z.string().optional(),
    price: z.number().optional(),
    total: z.number()
  })),
  total: z.number()
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
