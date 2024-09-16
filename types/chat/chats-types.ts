import { Message } from "@/types/messages/messages-types";

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  model: "gpt-4o" | "gpt-4o-mini";
}
