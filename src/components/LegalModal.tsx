import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Mail } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-brand-saffron/10 flex flex-col max-h-[90vh]"
          >
            <div className="p-6 md:p-8 border-b border-brand-saffron/10 flex items-center justify-between bg-brand-cream/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-saffron/10 flex items-center justify-center text-brand-saffron">
                  {type === 'terms' ? <FileText size={20} /> : <Shield size={20} />}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl">
                    {type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
                  </h3>
                  <p className="text-xs text-brand-ink/40 uppercase tracking-widest font-bold">Last Updated: March 2026</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-brand-cream rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-hide">
              {type === 'terms' ? (
                <div className="space-y-6 text-brand-ink/80 leading-relaxed">
                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">1. Acceptance of Terms</h4>
                    <p>By using Indian Rasoi, you agree to these Terms & Conditions. If you do not agree, please do not use the application.</p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">2. User Responsibilities</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Provide accurate information for recipe generation and meal planning.</li>
                      <li>Do not misuse the app or attempt to gain unauthorized access.</li>
                      <li>Do not attempt to hack, damage, or disrupt the service.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">3. Intellectual Property</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>All content, logos, and designs are the property of Indian Rasoi.</li>
                      <li>The AI-generated recipes are for personal use only.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">4. Prohibited Activities</h4>
                    <p>Users must not:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Post illegal or offensive content.</li>
                      <li>Violate others' rights or privacy.</li>
                      <li>Spread harmful software or viruses.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">5. Termination</h4>
                    <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">6. Limitation of Liability</h4>
                    <p>We are not responsible for:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Loss of data or saved recipes.</li>
                      <li>Service interruptions due to technical issues.</li>
                      <li>Third-party services linked to the app (e.g., payment gateways).</li>
                    </ul>
                  </section>
                </div>
              ) : (
                <div className="space-y-6 text-brand-ink/80 leading-relaxed">
                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">1. Introduction</h4>
                    <p>Welcome to Indian Rasoi. We value your privacy and are committed to protecting your personal information. This policy explains how we handle your data.</p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">2. Information We Collect</h4>
                    <p>We may collect the following types of information:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Personal Information:</strong> Name, Email Address, and Phone Number (for account and subscription).</li>
                      <li><strong>Device Information:</strong> Device Model, OS Version to improve app compatibility.</li>
                      <li><strong>Usage Data:</strong> App activity, features used, and recipe preferences.</li>
                      <li><strong>Location Data:</strong> Only if permitted by user, to provide regional recipe suggestions.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">3. How We Use Your Information</h4>
                    <p>We use collected data to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Improve app performance and AI recipe accuracy.</li>
                      <li>Provide customer support and handle inquiries.</li>
                      <li>Send updates, notifications, and promotional offers.</li>
                      <li>Enhance user experience through personalization.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">4. Data Sharing</h4>
                    <p>We do not sell your personal data. We may share information with:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Trusted third-party service providers (e.g., payment processors).</li>
                      <li>Legal authorities if required by law or to protect our rights.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">5. Data Security</h4>
                    <p>We use appropriate security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">6. User Rights</h4>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Access your data and request a copy.</li>
                      <li>Request correction of inaccurate data.</li>
                      <li>Request deletion of your data from our systems.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="text-lg font-serif font-bold text-brand-ink">7. Changes to This Policy</h4>
                    <p>We may update this Privacy Policy from time to time. Users will be notified of any significant changes via email or app notification.</p>
                  </section>
                </div>
              )}

              <div className="pt-8 border-t border-brand-saffron/10">
                <div className="bg-brand-cream rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-saffron/10 flex items-center justify-center text-brand-saffron">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">Questions?</p>
                      <p className="text-sm font-medium">kumaravinash34880@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-brand-ink text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-ink/90 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
