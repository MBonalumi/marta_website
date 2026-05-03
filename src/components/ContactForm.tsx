import { useState, useEffect } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojreqaa";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [subject, setSubject] = useState("Richiesta informazioni");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service === "Prenota colloquio") {
      setSubject("Prenotazione colloquio conoscitivo");
      setMessaggio("Buongiorno,\n\nvorrei prenotare un colloquio conoscitivo.\n\n");
    } else if (service) {
      setSubject(`Informazioni su: ${service}`);
      setMessaggio(`Buongiorno,\n\nvorrei avere maggiori informazioni riguardo al percorso: "${service}".\n\n`);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nome, email, telefono, _subject: subject, messaggio }),
      });
      if (res.ok) {
        setStatus("success");
        window.gtag?.("event", "contact_form_submit");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-4 animate-fade-in">
        <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif font-bold text-brand-charcoal">Messaggio inviato!</h3>
        <p className="text-brand-charcoal/70">Ti risponderò il prima possibile per fissare un primo colloquio conoscitivo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
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
          <label className="block text-sm font-medium text-brand-charcoal/70 mb-1.5" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="la.tua@email.it"
            className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-white text-brand-charcoal placeholder-brand-charcoal/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/30 focus:border-brand-sage transition"
          />
        </div>
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

      {status === "error" && (
        <p className="text-sm text-red-600">
          Si è verificato un errore. Puoi scrivermi direttamente a{" "}
          <a href="mailto:martadegani.md@gmail.com" className="underline">
            martadegani.md@gmail.com
          </a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-brand-charcoal text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 disabled:opacity-60 transition-all shadow-xl shadow-brand-charcoal/10 flex items-center justify-center gap-3"
      >
        {status === "sending" ? "Invio in corso…" : "Invia messaggio"}
        {status !== "sending" && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
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
