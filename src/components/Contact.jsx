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

        // 2. Template ID
        // 3. Public Key
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
            }, (error) => {
                console.log(error.text);
                setStatus('error');
            });
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                        <span className="text-gradient">{t('contact.title')}</span>
                    </h3>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto' }}></div>
                </div>

                <motion.div
                    className="glass-card"
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ flex: '1 1 300px' }}>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder={t('contact.name_placeholder')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none',
                                    }}
                                    className="modern-input"
                                />
                            </div>
                            <div style={{ flex: '1 1 300px' }}>
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder={t('contact.email_placeholder')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none',
                                    }}
                                    className="modern-input"
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <textarea
                                name="message"
                                placeholder={t('contact.message_placeholder')}
                                required
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    padding: '15px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                                className="modern-input"
                            ></textarea>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <motion.button
                                type="submit"
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={status === 'sending'}
                                style={{ opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
                            >
                                {status === 'sending' ? 'Envoi...' : t('contact.send_button')} <span className="glyphicon glyphicon-send" style={{ marginLeft: '10px' }}></span>
                            </motion.button>

                            {status === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ color: '#4ade80', marginTop: '15px', fontWeight: 'bold' }}
                                >
                                    ✅ Message envoyé avec succès !
                                </motion.p>
                            )}

                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ color: '#ef4444', marginTop: '15px', fontWeight: 'bold' }}
                                >
                                    ❌ Une erreur est survenue. Veuillez réessayer.
                                </motion.p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
