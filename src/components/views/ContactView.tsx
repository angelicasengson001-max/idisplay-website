import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../../data/siteData.ts';
import {
  VALID_PROJECT_TYPES,
  formatInquiryEmail,
  buildMailtoUrl,
  buildGmailWebUrl,
  InquiryEmailData
} from '../../utils/inquiryValidation.ts';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Calculator,
  Copy,
  Check,
  ExternalLink,
  Send,
  Eye,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface ContactViewProps {
  initialProjectType?: string;
  initialBudgetText?: string;
  initialMessageAddon?: string;
  onOpenEstimator: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialProjectType,
  initialBudgetText,
  initialMessageAddon,
  onOpenEstimator
}) => {
  const [formData, setFormData] = useState<InquiryEmailData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: initialProjectType || 'Custom Exhibits',
    budget_range: initialBudgetText || '',
    venue: '',
    target_date: '',
    message: initialMessageAddon ? `${initialMessageAddon}\n\n` : ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [lastLaunchedAction, setLastLaunchedAction] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, project_type: initialProjectType }));
    }
  }, [initialProjectType]);

  useEffect(() => {
    if (initialBudgetText || initialMessageAddon) {
      setFormData((prev) => ({
        ...prev,
        budget_range: initialBudgetText || prev.budget_range,
        message: initialMessageAddon
          ? `${initialMessageAddon}\n\n${prev.message.replace(initialMessageAddon, '').trim()}`
          : prev.message
      }));
    }
  }, [initialBudgetText, initialMessageAddon]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emailDraft = formatInquiryEmail(formData);
  const mailtoUrl = buildMailtoUrl(COMPANY_INFO.email, emailDraft.subject, emailDraft.body);
  const gmailWebUrl = buildGmailWebUrl(COMPANY_INFO.email, emailDraft.subject, emailDraft.body);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = COMPANY_INFO.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyDraft = async () => {
    const fullText = `Subject: ${emailDraft.subject}\nTo: ${COMPANY_INFO.email}\n\n${emailDraft.body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    }
  };

  const handleLaunchMailto = (e: React.MouseEvent) => {
    e.preventDefault();
    setLastLaunchedAction('default_client');
    window.location.href = mailtoUrl;
  };

  const handleLaunchGmail = () => {
    setLastLaunchedAction('gmail');
    window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-[#0b1320] text-white py-20 md:py-24 relative overflow-hidden border-b border-black">
        <div className="w-[min(100%-44px,1200px)] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-[#d91e28]/40 rounded-full text-xs font-bold uppercase tracking-widest text-[#fac7c9] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d91e28] animate-pulse" />
            DIRECT INQUIRY & FABRICATION BRIEF
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-[0.94]">
            Start a Project with iDisplay
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] mt-4 max-w-2xl leading-relaxed">
            Directly connect with our design and fabrication team in{' '}
            <strong className="text-white font-semibold">Taytay, Rizal</strong>.
            Send your project specifications straight to our company email inbox for quick quotations and 3D concept proposals.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 md:py-20 bg-[#f3f5f7]">
        <div className="w-[min(100%-44px,1200px)] mx-auto grid gap-10 lg:grid-cols-[1.5fr_0.9fr] items-start">
          
          {/* Left Column: Black Direct Email Hub Card */}
          <div className="bg-[#0c121e] text-white border-t-[6px] border-[#d91e28] border-x border-b border-black/80 p-6 sm:p-10 shadow-2xl rounded-xs">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d91e28] block mb-1">
                  DIRECT EMAIL DISPATCH
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                  Direct Project Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
                  No account or database registration needed. Direct transmission straight to{' '}
                  <span className="text-[#fac7c9] font-mono font-semibold">{COMPANY_INFO.email}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors border border-white/15"
              >
                <Calculator className="w-3.5 h-3.5 text-[#d91e28]" />
                <span>Estimate Cost Range</span>
              </button>
            </div>

            {/* Quick 1-Click Action Bar */}
            <div className="my-6 p-4 bg-[#141d2d] border border-white/10 rounded-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#fac7c9] mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d91e28]" />
                Quick Direct Actions (idisplay_ph@yahoo.com)
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent('[Inquiry] iDisplay Inc. Project Brief')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d91e28] hover:bg-[#b8141d] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Directly</span>
                </a>

                <button
                  type="button"
                  onClick={handleLaunchGmail}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors border border-white/10 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                  <span>Open in Gmail Web</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors border border-white/10 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Feedback notification when action triggered */}
            {lastLaunchedAction && (
              <div className="mb-6 p-3.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs rounded-xs flex items-center justify-between">
                <span>
                  ✓ Email client launched with your project details addressed to <strong>{COMPANY_INFO.email}</strong>!
                </span>
                <button
                  type="button"
                  onClick={() => setLastLaunchedAction(null)}
                  className="text-emerald-400 hover:text-white text-[11px] underline ml-2 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Direct Email Drafter Fields */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#cbd5e1]">
                  Step 2: Customize Your Project Details (Optional)
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-[#fac7c9] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPreview ? 'Hide Live Draft' : 'Preview Live Draft'}</span>
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Your Name / Contact Person
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maria Santos"
                    className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Your Email (for Reply)
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. maria@company.com.ph"
                    className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Company / Organization
                  </label>
                  <div className="relative">
                    <input
                      id="contact-company"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleChange}
                      placeholder="e.g. San Miguel Corp. / Evolve Tech"
                      className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                    />
                    <Building2 className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Phone / Mobile (optional)
                  </label>
                  <div className="relative">
                    <input
                      id="contact-phone"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="e.g. 0917 123 4567"
                      className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                    />
                    <Phone className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                  >
                    {VALID_PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#101c34] text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-venue"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Target Venue / City
                  </label>
                  <div className="relative">
                    <input
                      id="contact-venue"
                      name="venue"
                      value={formData.venue || ''}
                      onChange={handleChange}
                      placeholder="e.g. SMX Convention, WTC Pasay, Trinoma"
                      className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                    />
                    <MapPin className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-target-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Target Date / Timeline
                  </label>
                  <div className="relative">
                    <input
                      id="contact-target-date"
                      name="target_date"
                      value={formData.target_date || ''}
                      onChange={handleChange}
                      placeholder="e.g. Q4 2026 / Next Month"
                      className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                    />
                    <Calendar className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-budget"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Budget Guidance (optional)
                  </label>
                  <input
                    id="contact-budget"
                    name="budget_range"
                    value={formData.budget_range || ''}
                    onChange={handleChange}
                    placeholder="e.g. PHP 500,000 - PHP 1,000,000"
                    className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5"
                  >
                    Project Brief & Specifications
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe booth dimensions (e.g. 6x6m), requirements (lightboxes, hanging banner, private meeting room), or upload reference links..."
                    className="w-full bg-[#141d2d] border border-white/15 focus:border-[#d91e28] text-white p-3 text-sm rounded-xs focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Live Draft Preview */}
              {showPreview && (
                <div className="p-4 bg-black/60 border border-white/20 rounded-xs font-mono text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-[#fac7c9] font-bold">Email Message Preview:</span>
                    <span className="text-[10px] text-slate-400">To: {COMPANY_INFO.email}</span>
                  </div>
                  <p className="text-[#e2e8f0] font-semibold mb-2">Subject: {emailDraft.subject}</p>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed bg-[#0b1320] p-3 rounded-xs border border-white/10">
                    {emailDraft.body}
                  </pre>
                </div>
              )}

              {/* Primary Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleLaunchMailto}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#d91e28] hover:bg-[#b8141d] text-white font-display text-[18px] font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via Email App ↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchGmail}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#192b49] hover:bg-[#223961] text-white font-display text-[17px] font-bold uppercase tracking-wider rounded-xs cursor-pointer border border-white/15 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[#fac7c9]" />
                  <span>Send via Gmail Web ↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 bg-white/5 hover:bg-white/10 text-[#cbd5e1] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer border border-white/10 transition-colors"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Draft Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94a3b8]">
                <span>✓ Direct message to iDisplay team in Taytay, Rizal</span>
                <span>Response turnaround: within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details & Location Callout */}
          <aside className="space-y-6">
            
            {/* Location & Address Card */}
            <div className="bg-[#192b49] text-white p-7 sm:p-8 shadow-xl rounded-xs border-l-4 border-[#d91e28]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-[#fac7c9]">
                  HEADQUARTERS & WORKSHOP
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-[#d91e28] text-white font-bold rounded-xs">
                  TAYTAY, RIZAL
                </span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mb-4">
                Taytay, Rizal, Philippines
              </h2>

              <div className="space-y-4 text-sm text-[#e2e8f0]">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xs border border-white/10">
                  <MapPin className="w-5 h-5 text-[#d91e28] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-sm">
                      {COMPANY_INFO.location}
                    </p>
                    <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                      Taytay Zone II, Rizal, Philippines 1920
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#bac7d8] leading-relaxed bg-[#101c34] p-3 rounded-xs border border-white/5">
                  <strong className="text-white block mb-1">Fab & Joinery Facilities:</strong>
                  Full-scale metal fabrication, timber carpentry, spray-paint booths, and CNC cutting based in Taytay, Rizal, servicing all Metro Manila convention centers, provincial roadshows, and nationwide retail flagships.
                </div>
              </div>
            </div>

            {/* Direct Channels Card */}
            <div className="bg-white border border-[#dfe4e9] p-7 sm:p-8 shadow-md rounded-xs">
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[#bd1721] block mb-2">
                REACH US DIRECTLY
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#101c34] mb-6">
                Communication Channels
              </h3>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#e2e8f0]">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#d91e28] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#536175]">Company Email</p>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-semibold text-[#101c34] hover:text-[#d91e28] underline underline-offset-2 break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#e2e8f0]">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#d91e28] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#536175]">Mobile / Hotline</p>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="text-sm font-semibold text-[#101c34] hover:text-[#d91e28] underline underline-offset-2"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-[11px] text-[#536175] mt-0.5">{COMPANY_INFO.phoneInternational}</p>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#e2e8f0]">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#d91e28] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#d91e28] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#536175]">Facebook Page</p>
                    <a
                      href={COMPANY_INFO.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#101c34] hover:text-[#d91e28] inline-flex items-center gap-1 underline underline-offset-2"
                    >
                      <span>{COMPANY_INFO.facebookName}</span>
                      <ExternalLink className="w-3 h-3 text-[#536175]" />
                    </a>
                    <p className="text-[11px] text-[#536175]">facebook.com/idisplayinc</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#d91e28] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#536175]">Workshop & Office Hours</p>
                    <p className="text-sm font-medium text-[#101c34]">{COMPANY_INFO.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Info */}
            <div className="bg-[#e8edf2] p-5 rounded-xs border border-[#dfe4e9] text-xs text-[#536175] leading-relaxed">
              <strong className="text-[#101c34] block mb-1">Philippine-wide Logistics:</strong>
              From our Taytay, Rizal facilities, we deploy specialized ingress and fabrication teams to SMX Convention Center (MOA), World Trade Center, PICC, Megatrade Hall, Clark Pampanga, SM/Ayala Malls nationwide, and provincial hubs in Cebu, Iloilo, and Davao.
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
};
