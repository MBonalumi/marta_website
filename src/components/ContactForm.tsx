import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-sage/10 p-12 rounded-3xl text-center border border-brand-sage/20 animate-fade-in">
        <div className="w-16 h-16 bg-brand-sage text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          ✓
        </div>
        <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">Grazie per il messaggio!</h3>
        <p className="text-brand-charcoal/70">Ti risponderò il prima possibile.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-brand-sage font-semibold underline"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-2">Nome</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-brand-beige/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/50 transition-all"
            placeholder="Il tuo nome"
          />
        </div>
        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-brand-charcoal mb-2">Cognome</label>
          <input
            required
            type="text"
            id="surname"
            name="surname"
            className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-brand-beige/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/50 transition-all"
            placeholder="Il tuo cognome"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-2">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-brand-beige/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/50 transition-all"
          placeholder="la-tua@email.it"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal mb-2">Messaggio</label>
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-brand-sage/20 bg-brand-beige/30 focus:outline-none focus:ring-2 focus:ring-brand-sage/50 transition-all resize-none"
          placeholder="Come posso aiutarti?"
        ></textarea>
      </div>
      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full bg-brand-charcoal text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
      >
        {status === 'submitting' ? 'Invio in corso...' : 'Invia messaggio'}
      </button>
    </form>
  );
};

export default ContactForm;
