import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Loader2 } from 'lucide-react';

const topics = [
  { value: 'strategie', label: 'Strategie & governance' },
  { value: 'landscaping', label: 'Business- & IT-landscaping' },
  { value: 'assessment', label: 'Architectuurassessment' },
  { value: 'eaaas', label: 'Enterprise Architecture as a Service' },
  { value: 'anders', label: 'Iets anders' },
];

export default function ConsultationFormSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    topic: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    await base44.entities.ConsultationRequest.create(form);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="kennismaking" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-brand-green" />

      <div className="max-w-3xl mx-auto px-8 md:px-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-green" />
            <span className="font-inter text-xs font-medium tracking-[0.2em] uppercase text-brand-green">
              Kennismaking
            </span>
            <div className="w-8 h-px bg-brand-green" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
            Plan een gesprek met onze architecten
          </h2>
          <p className="font-inter text-white/60 text-base font-light leading-relaxed max-w-xl mx-auto">
            Vrijblijvend en concreet — binnen één werkdag nemen we contact op om een passend moment te plannen.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Naam *">
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-brand-green focus-visible:border-brand-green h-11"
                    placeholder="Voor- en achternaam"
                  />
                </FormField>
                <FormField label="E-mail *">
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-brand-green focus-visible:border-brand-green h-11"
                    placeholder="naam@bedrijf.nl"
                  />
                </FormField>
                <FormField label="Organisatie">
                  <Input
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-brand-green focus-visible:border-brand-green h-11"
                    placeholder="Bedrijfsnaam"
                  />
                </FormField>
                <FormField label="Onderwerp">
                  <Select
                    value={form.topic}
                    onValueChange={(value) => handleChange('topic', value)}
                  >
                    <SelectTrigger className="bg-transparent border-white/15 text-white focus:ring-brand-green focus:border-brand-green h-11 data-[placeholder]:text-white/30">
                      <SelectValue placeholder="Selecteer een onderwerp" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-charcoal border-white/15 text-white">
                      {topics.map((t) => (
                        <SelectItem
                          key={t.value}
                          value={t.value}
                          className="focus:bg-brand-green/20 focus:text-white"
                        >
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <div className="mt-4">
                <FormField label="Toelichting">
                  <Textarea
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={3}
                    className="bg-transparent border-white/15 text-white placeholder:text-white/30 focus-visible:ring-brand-green focus-visible:border-brand-green resize-none"
                    placeholder="Waar zou je het over willen hebben?"
                  />
                </FormField>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-inter text-xs text-white/40 leading-relaxed">
                  Door te versturen ga je akkoord met onze verwerking van je gegevens om contact op te nemen.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-brand-green text-white font-inter font-medium text-sm px-7 py-3 rounded-sm hover:bg-brand-mid transition-colors duration-300 disabled:opacity-60 whitespace-nowrap"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Versturen...
                    </>
                  ) : (
                    <>
                      Plan kennismaking
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/[0.03] border border-brand-green/40 p-10 rounded-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-green/15 mb-5">
                <CheckCircle2 className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-white mb-3">
                Bedankt voor je aanvraag
              </h3>
              <p className="font-inter text-white/60 text-sm leading-relaxed max-w-md mx-auto">
                We nemen binnen één werkdag contact op om een kennismakingsgesprek in te plannen.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="font-inter text-[11px] font-medium tracking-[0.15em] uppercase text-white/50 mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );
}