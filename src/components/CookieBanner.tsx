import { useEffect, useState } from "react";

const STORAGE_KEY = "md_cookie_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function grantAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "granted" });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === "true") {
      grantAnalytics();
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    grantAnalytics();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "false");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Informativa sui cookie"
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-charcoal text-white px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl"
    >
      <p className="text-sm text-white/80 flex-1 leading-relaxed">
        Questo sito utilizza cookie analitici (Google Analytics) per migliorare
        l'esperienza utente. Puoi accettare tutti i cookie o scegliere solo quelli
        essenziali.{" "}
        <a href="/cookie" className="underline hover:text-brand-sage">
          Cookie Policy
        </a>{" "}
        ·{" "}
        <a href="/privacy" className="underline hover:text-brand-sage">
          Privacy Policy
        </a>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="px-4 py-2 text-sm border border-white/30 rounded-xl hover:border-white/60 transition-colors"
        >
          Solo essenziali
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 text-sm bg-brand-sage text-white rounded-xl hover:bg-brand-sage-dark transition-colors"
        >
          Accetto
        </button>
      </div>
    </div>
  );
}
