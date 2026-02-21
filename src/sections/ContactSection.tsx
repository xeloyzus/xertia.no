import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 min-h-[60vh] flex items-center"
    >
      <div className="w-full px-6 lg:px-16">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <div className="ps5-activity-card p-8 lg:p-12 text-center">
            {/* Title */}
            <h2 className="font-sora font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Let's build together
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-10">
              Tell us what you're automating. We'll map a deployment plan 
              to your environment and constraints.
            </p>

            {/* Contact Options */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
              {/* Email */}
              <a
                href="mailto:hello@xertai.io"
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Email</p>
                  <p className="text-white font-medium truncate group-hover:text-white/80 transition-colors">
                    hello@xertai.io
                  </p>
                </div>
                <ArrowUpRight 
                  size={18} 
                  className="text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0" 
                />
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 text-left">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-white/70" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Location</p>
                  <p className="text-white font-medium">
                    San Francisco / Remote
                  </p>
                </div>
              </div>
            </div>

            {/* Support Note */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/40">
                For support inquiries:{' '}
                <a 
                  href="mailto:support@xertai.io"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  support@xertai.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 px-6 lg:px-16 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sora font-bold text-white">Xertai</span>
          </div>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Xertai Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
