import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertOrderSchema } from "@shared/schema";
import { sendTelegramMessage, formatBookingMessage, formatOrderMessage } from "./telegram";
import { ZodError } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Booking Endpoint
  app.post("/api/booking", async (req, res) => {
    try {
      const data = insertBookingSchema.parse(req.body);
      
      // Log to storage
      await storage.logSubmission("BOOKING", data);
      
      // Send Telegram
      const message = formatBookingMessage(data);
      const sent = await sendTelegramMessage(message);
      
      if (!sent) {
        // We still return success to the user if we logged it, but maybe warn in logs
        // Or if Secrets are missing, this is expected behavior in dev
        console.warn("Telegram message failed to send (check secrets)");
      }

      res.json({ success: true, message: "Booking received" });
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: "Validation failed", details: e.errors });
      } else {
        console.error("Booking error:", e);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Order Endpoint
  app.post("/api/order", async (req, res) => {
    try {
      const data = insertOrderSchema.parse(req.body);
      
      // Log to storage
      await storage.logSubmission("ORDER", data);
      
      // Send Telegram
      const message = formatOrderMessage(data);
      const sent = await sendTelegramMessage(message);

      if (!sent) {
        console.warn("Telegram message failed to send (check secrets)");
      }

      res.json({ success: true, message: "Order received" });
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({ error: "Validation failed", details: e.errors });
      } else {
        console.error("Order error:", e);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  return httpServer;
}
