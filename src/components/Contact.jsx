import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const { t } = useTranslation();
    const form = useRef();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            form.current,
            'YOUR_PUBLIC_KEY'
        )
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                form.current.reset();
                setTimeout(() => setStatus(null), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                setTimeout(() => setStatus(null), 5000);
            });
    };

    return (
        <section id="contact" className="py-32 relative">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            {t('contact.title')}
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    </motion.div>
                </div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder={t('contact.name_placeholder')}
                                    required
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-purple-500/50"
                                />
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder={t('contact.email_placeholder')}
                                    required
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-purple-500/50"
                                />
                            </div>

                            {/* Message Textarea */}
                            <textarea
                                name="message"
                                placeholder={t('contact.message_placeholder')}
                                required
                                rows="6"
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 outline-none resize-none transition-all duration-300 focus:border-purple-500/50"
                            ></textarea>

                            {/* Submit Button */}
                            <div className="flex flex-col items-center gap-4">
                                <motion.button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                                    whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                                    className={`
                                        px-10 py-4 rounded-full font-bold text-lg transition-all duration-300
                                        ${status === 'sending'
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                                        }
                                        text-white
                                    `}
                                >
                                    {status === 'sending' ? 'Envoi...' : t('contact.send_button')}
                                </motion.button>

                                {/* Success Message */}
                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400 font-semibold"
                                    >
                                        ✅ Message envoyé avec succès !
                                    </motion.p>
                                )}

                                {/* Error Message */}
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 font-semibold"
                                    >
                                        ❌ Une erreur est survenue. Réessayez.
                                    </motion.p>
                                )}
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
