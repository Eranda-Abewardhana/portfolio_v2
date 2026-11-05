import {
  CreditCard,
  FileText,
  Gauge,
  MessageSquare,
  Network,
  ShieldCheck,
} from "lucide-react";

const services = [
  { name: "API Gateway", Icon: Network },
  { name: "Auth", Icon: ShieldCheck },
  { name: "AI Chat", Icon: MessageSquare },
  { name: "Document", Icon: FileText },
  { name: "Quota", Icon: Gauge },
  { name: "Payment", Icon: CreditCard },
];

export default function DocCraftVisual() {
  return (
    <div
      className="p-doccraft-visual"
      role="img"
      aria-label="DocCraft service overview: API Gateway, Auth, AI Chat, Document, Quota, and Payment services, with Claude API, Supabase, PayHere, and Paddle integrations. A separate Admin Service plan includes 61 tickets over four sprints."
    >
      <div className="p-doccraft-copy">
        <span className="p-micro">AI-POWERED BUSINESS DOCUMENTS</span>
        <span className="p-display">
          DOC<span>CRAFT.</span>
        </span>
        <p>
          From an idea
          <br />
          to a document.
        </p>
        <span className="p-doccraft-caption p-micro">
          BACKEND LEADERSHIP / PLATFORM ENGINEERING
        </span>
      </div>
      <div className="p-doccraft-system">
        <div className="p-doccraft-system-label p-micro">
          <span>SERVICE OVERVIEW</span>
          <span>FASTAPI MICROSERVICES</span>
        </div>
        <div className="p-doccraft-service-grid">
          {services.map(({ name, Icon }) => (
            <div key={name}>
              <Icon size={25} strokeWidth={1.2} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="p-doccraft-integrations p-micro">
          <span>CLAUDE API</span>
          <span>SUPABASE</span>
          <span>PAYHERE</span>
          <span>PADDLE</span>
        </div>
        <div className="p-doccraft-plan">
          <span className="p-micro">ADMIN SERVICE / DELIVERY PLAN</span>
          <span>
            <strong>61</strong> tickets <i>·</i> <strong>4</strong> sprints
          </span>
        </div>
      </div>
    </div>
  );
}
