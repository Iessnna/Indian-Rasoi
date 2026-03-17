import React, { useState } from 'react';
import { X, Check, Crown, Sparkles, ShieldCheck, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-brand-magenta/10"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 hover:bg-brand-cream rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="festive-gradient p-12 text-center text-white space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md text-white shadow-xl mb-4">
                  <Crown size={40} />
                </div>
                <h3 className="text-4xl font-serif font-bold">Indian Rasoi Pro</h3>
                <p className="text-white/80 serif italic">Unlock authentic customization and premium Indian recipes.</p>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              <div className="space-y-4">
                {[
                  "Unlimited Recipe Customization",
                  "Advanced Indian Budget Planning",
                  "Priority AI Chef Support",
                  "Ad-free Experience",
                  "Save Unlimited Recipes"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-brand-ink/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-cream rounded-3xl p-6 border border-brand-magenta/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Monthly Plan</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif font-bold flex items-center text-brand-magenta"><IndianRupee size={20} />49</span>
                    <span className="text-sm text-brand-ink/40">/ month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-brand-magenta/10 text-brand-magenta rounded-full text-[10px] font-bold uppercase tracking-widest">Best Value</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-5 festive-gradient text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Subscribe Now
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-brand-ink/30 uppercase tracking-widest font-bold">
                Secure payment powered by Razorpay
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
