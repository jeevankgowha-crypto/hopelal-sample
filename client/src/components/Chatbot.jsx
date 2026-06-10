import { Bot, Send, X } from "lucide-react";
import { useState } from "react";
import { askAssistant } from "../lib/api";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hello, I can help with departments, appointment guidance, and hospital FAQs." }]);

  async function send() {
    if (!input.trim()) return;
    const question = input.trim();
    setInput("");
    setMessages((items) => [...items, { role: "user", text: question }]);
    try {
      const { data } = await askAssistant({ message: question });
      setMessages((items) => [...items, { role: "assistant", text: data.answer }]);
    } catch {
      setMessages((items) => [...items, { role: "assistant", text: "For urgent symptoms, call emergency care now. For routine visits, cardiology, general medicine, pediatrics, and gynecology appointments can be booked online." }]);
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-3 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between bg-ocean-600 p-4 text-white">
            <div className="flex items-center gap-2 font-semibold"><Bot size={18} /> AI Patient Assistant</div>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot"><X size={18} /></button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "ml-8 bg-ocean-600 text-white" : "mr-8 bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-100"}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-white/10">
            <input className="min-w-0 flex-1 rounded-full border border-slate-200 bg-transparent px-4 py-2 text-sm outline-none dark:border-white/10" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask a health service question" />
            <button className="grid h-10 w-10 place-items-center rounded-full bg-ocean-600 text-white" onClick={send} aria-label="Send"><Send size={17} /></button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} className="grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-white shadow-soft dark:bg-white dark:text-slate-950" aria-label="Open AI assistant">
        <Bot size={24} />
      </button>
    </div>
  );
}
