// Simple in-memory storage for v1 as requested
// (Replit KV or similar could be swapped here if needed for persistence)

interface LogEntry {
  id: number;
  type: "BOOKING" | "ORDER";
  data: any;
  timestamp: string;
}

export interface IStorage {
  logSubmission(type: "BOOKING" | "ORDER", data: any): Promise<void>;
  getLogs(): Promise<LogEntry[]>;
}

export class MemStorage implements IStorage {
  private logs: LogEntry[];
  private currentId: number;

  constructor() {
    this.logs = [];
    this.currentId = 1;
  }

  async logSubmission(type: "BOOKING" | "ORDER", data: any): Promise<void> {
    const entry: LogEntry = {
      id: this.currentId++,
      type,
      data,
      timestamp: new Date().toISOString(),
    };
    
    // Keep last 100 entries
    this.logs.unshift(entry);
    if (this.logs.length > 100) {
      this.logs.pop();
    }
  }

  async getLogs(): Promise<LogEntry[]> {
    return this.logs;
  }
}

export const storage = new MemStorage();
