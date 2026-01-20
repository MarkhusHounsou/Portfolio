import React, { useRef, useEffect } from 'react';

const Constellation = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let animationFrameId;

        // Configuration
        const particles = [];
        const particleCount = 90;
        const connectionDistance = 120;
        const mouseDistance = 150;

        let mouse = { x: null, y: null };

        // Resize handler
        const handleResize = () => {
            if (containerRef.current) {
                width = containerRef.current.clientWidth;
                height = containerRef.current.clientHeight;
                canvas.width = width;
                canvas.height = height;
                initParticles();
            }
        };

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.2) * 1,
                    vy: (Math.random() - 0.2) * 1,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction
                if (mouse.x != null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        const directionX = forceDirectionX * force * 0.2;
                        const directionY = forceDirectionY * force * 0.2;
                        p.vx -= directionX;
                        p.vy -= directionY;
                    }
                }

                // Draw dots
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
                ctx.fill();

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        // Event listeners
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', handleResize);
        if (containerRef.current) {
            containerRef.current.addEventListener('mousemove', handleMouseMove);
            containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        // Init
        handleResize();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
                containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: 'rgba(139, 92, 246, 0.6)',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: '1.4',
                pointerEvents: 'none',
                maxWidth: '350px'
            }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>// SYSTEM_METAPHOR</div>
                <div>
                    The neural net symbolizes the mind.
                    The cursor represents our choices, studies, and encounters—forces that
                    reshape the connections of who we become.
                </div>
            </div>
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                color: 'rgba(139, 92, 246, 0.8)',
                fontFamily: 'monospace',
                pointerEvents: 'none'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>NEURAL NET</div>
                <div style={{ fontSize: '0.8rem' }}>INTERACTIVE VISUALIZER</div>
            </div>
        </div>
    );
};

export default Constellation;
