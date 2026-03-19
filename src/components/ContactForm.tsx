import React, { useState, useEffect } from 'react';

const ContactForm: React.FC = () => {
  const [emailData, setEmailData] = useState({ subject: '', body: '' });
  const recipient = "martadegani.md@gmail.com";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');

    let subject = "Richiesta informazioni";
    let body = "Buongiorno,\n\n";

    if (service === 'Prenota colloquio') {
      subject = "Prenotazione colloquio conoscitivo";
      body += "vorrei prenotare un colloquio conoscitivo per... \n(raccontami brevemente il motivo di contatto)\n\n";
    } else if (service) {
      subject = `${service}`;
      body += `vorrei avere maggiori informazioni riguardo al percorso: "${service}".\n\n`;
    }

    setEmailData({ subject, body });
  }, []);

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;

  return (
    <div className="flex flex-col h-full justify-center space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-bold text-brand-charcoal">
          Pronta per iniziare?
        </h3>
        <p className="text-brand-charcoal/70 leading-relaxed">
          Clicca il bottone qui sotto per scrivermi direttamente. Il tuo client di posta si aprirà con un messaggio pre-compilato.
        </p>
      </div>

      <a
        href={mailtoUrl}
        className="inline-flex items-center justify-center w-full bg-brand-charcoal text-white py-5 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-brand-charcoal/10 group"
      >
        <span>Invia Email</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

      <div className="pt-6 border-t border-brand-sage/10 text-sm text-brand-charcoal/50 italic">
        <p>
          * Questo metodo garantisce la massima privacy: i tuoi dati non passano attraverso server di terze parti e arrivano direttamente nella mia casella email.
        </p>
      </div>
    </div>
  );
};


export default ContactForm;
