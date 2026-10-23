import React, { useState } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VALID_PROJECT_TYPES, estimateProjectBudget } from '../utils/inquiryValidation.ts';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (data: { projectType: string; budgetText: string; messageAddon: string }) => void;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  onApplyEstimate
}) => {
  const [projectType, setProjectType] = useState<string>(VALID_PROJECT_TYPES[0]);
  const [areaSqm, setAreaSqm] = useState<number>(36);
  const [tier, setTier] = useState<'standard' | 'premium' | 'flagship'>('premium');

  if (!isOpen) return null;

  const estimate = estimateProjectBudget({ projectType, areaSqm, tier });

  const handleApply = () => {
    onApplyEstimate({
      projectType,
      budgetText: estimate.formattedRange,
      messageAddon: `Estimated floor area: ${areaSqm} sqm (${tier.toUpperCase()} specification tier). Estimated budget guidance: ${estimate.formattedRange}.`
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-[#050d1c]/80 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="estimator-title"
    >
      <div className="relative w-full max-w-lg bg-white border border-[#dfe4e9] shadow-2xl overflow-hidden rounded-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#101c34] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d91e28] flex items-center justify-center text-white">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 id="estimator-title" className="font-display text-xl font-bold uppercase tracking-wide">
                Quick Project Cost Estimator
              </h2>
              <p className="text-xs text-[#bac7d8]">Philippines Turnkey Build Benchmarks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
            aria-label="Close estimator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#101c34] mb-2">
              Project Offering
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full border border-[#bfc8d4] p-3 text-sm rounded-xs focus:outline-none focus:border-[#d91e28]"
            >
              {VALID_PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#101c34]">
                Approximate Area / Footprint (sqm)
              </label>
              <span className="font-display text-lg font-bold text-[#d91e28]">
                {areaSqm} m²
              </span>
            </div>
            <input
              type="range"
              min="9"
              max="250"
              step="3"
              value={areaSqm}
              onChange={(e) => setAreaSqm(Number(e.target.value))}
              className="w-full accent-[#d91e28] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#536175] mt-1">
              <span>9 m² (Single 3x3)</span>
              <span>36 m² (Double Booth)</span>
              <span>100 m² (Island)</span>
              <span>250 m²+ (Pavilion)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#101c34] mb-2">
              Fabrication & Specification Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Standard', desc: 'Modular & graphics' },
                { id: 'premium', label: 'Premium', desc: 'Custom joinery & LEDs' },
                { id: 'flagship', label: 'Flagship', desc: 'Double-deck & architectural' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTier(item.id as any)}
                  className={`p-3 text-left border text-xs rounded-xs transition-all cursor-pointer ${
                    tier === item.id
                      ? 'border-[#d91e28] bg-[#d91e28]/5 ring-1 ring-[#d91e28]'
                      : 'border-[#dfe4e9] hover:border-slate-400'
                  }`}
                >
                  <p className="font-bold text-[#101c34]">{item.label}</p>
                  <p className="text-[10px] text-[#536175] mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#101c34] text-white p-5 rounded-xs border-l-4 border-[#d91e28]">
            <p className="text-[11px] uppercase tracking-wider text-[#fac7c9] font-bold">
              Estimated Investment Range (PHP)
            </p>
            <p className="font-display text-3xl font-extrabold text-white mt-1">
              {estimate.formattedRange}
            </p>
            <p className="text-[11px] text-[#bac7d8] mt-1 leading-snug">
              Includes 3D concept planning, modular/custom fabrication, electrical distribution, and on-site egress.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#dfe4e9] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase text-[#536175] hover:text-[#101c34] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#d91e28] hover:bg-[#b8141d] text-white font-display text-base font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
          >
            <span>Apply to Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
