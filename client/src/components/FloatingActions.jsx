import { MessageCircle, PhoneCall } from "lucide-react";
import { hospital } from "../lib/data";
import { useSiteSettings } from "../lib/siteData";

export default function FloatingActions() {
  const settings = useSiteSettings();
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${settings.whatsapp || hospital.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="grid h-14 w-14 place-items-center rounded-full bg-clinic-500 text-white shadow-soft transition hover:-translate-y-1 hover:bg-clinic-600"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href={`tel:${settings.phone || hospital.phone}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-red-600 text-white shadow-soft transition hover:-translate-y-1 hover:bg-red-700"
        aria-label="Emergency call"
      >
        <PhoneCall size={24} />
      </a>
    </div>
  );
}
