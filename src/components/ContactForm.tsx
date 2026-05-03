import { useState, useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const RECIPIENT = "martadegani.md@gmail.com";

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [subject, setSubject] = useState("Richiesta informazioni");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service === "Prenota colloquio") {
      setSubject("Prenotazione colloquio conoscitivo");
      setMessaggio("Ti contatto per prenotare un colloquio conoscitivo.\n\n");
    } else if (service) {
      setSubject(`Informazioni su: ${service}`);
      setMessaggio(`Ti contatto per avere maggiori informazioni riguardo al percorso: "${service}".\n\n`);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const intro = telefono
      ? `Buongiorno,\nMi chiamo ${nome} e il mio numero è ${telefono}.\n`
      : `Buongiorno,\nMi chiamo ${nome}.\n`;
    const body = `${intro}\n${messaggio}`;

    const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    window.gtag?.("event", "contact_form_submit");
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-4 animate-fade-in">
        <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif font-bold text-brand-charcoal">Client email aperto!</h3>
        <p className="text-brand-charcoal/70">Trovi il messaggio pronto nel tuo programma di posta. Invialo da lì per completare il contatto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-brand-charcoal/70 mb-1.5" htmlFor="nome">
          Nome *
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Il tuo nome"
          className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-white text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-charcoal/70 mb-1.5" htmlFor="telefono">
          Telefono <span className="text-brand-charcoal/40">(opzionale)</span>
        </label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+39 000 000 0000"
          className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-white text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-charcoal/70 mb-1.5" htmlFor="messaggio">
          Messaggio *
        </label>
        <textarea
          id="messaggio"
          required
          rows={5}
          value={messaggio}
          onChange={(e) => setMessaggio(e.target.value)}
          placeholder="Raccontami brevemente il motivo del contatto..."
          className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-white text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-brand-charcoal text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-brand-charcoal/10 flex items-center justify-center gap-3"
      >
        Invia messaggio
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <p className="text-xs text-brand-charcoal/40 text-center">
        Inviando accetti la{" "}
        <a href="/privacy" className="underline hover:text-brand-charcoal/60">
          Privacy Policy
        </a>. I tuoi dati non saranno condivisi con terze parti.
      </p>
    </form>
  );
}
