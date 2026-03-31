import { useState, useRef, useEffect } from "react";
import StarRating from "@/components/StarRating";
import ThankYouModal from "@/components/ThankYouModal";
import cscLogo from "@/assets/csc-logo-white.png";
import productImage from "@/assets/product-sponges.png";

const useScrollFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const FadeSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollFadeIn();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [practice, setPractice] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const canSubmit = rating > 0 && feedback.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setShowThankYou(true);
  };

  return (
    <div className="vip-bg-gradient">
      <div className="max-w-xl mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-16 pb-10 md:pt-24 md:pb-14 text-center">
          <FadeSection className="space-y-4">
            <img
              src={cscLogo}
              alt="Clinical Supply Co."
              width={512}
              height={512}
              className="mx-auto w-24 md:w-28 mb-8"
            />
            <h1 className="text-3xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight uppercase">
              You're in the 1%
            </h1>
            <p className="text-foreground/60 text-base md:text-lg font-light">
              Not everyone gets this.
            </p>
          </FadeSection>
        </section>

        {/* ── Product ── */}
        <section className="py-6 md:py-8">
          <FadeSection className="flex flex-col items-center space-y-4">
            <img
              src={productImage}
              alt="Posi-Shield Non-Woven Sponges"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-48 md:w-64 product-blend"
            />
            <p className="text-foreground/90 text-sm md:text-base text-center">
              You received our <span className="text-primary font-medium">2×2 Non-Woven Sponges</span> in your latest order.
            </p>
            <p className="text-foreground/50 text-sm text-center">
              We'd love your honest feedback before we roll them out further.
            </p>
          </FadeSection>
        </section>

        {/* ── Divider ── */}
        <div className="w-12 h-px bg-foreground/10 mx-auto my-6" />

        {/* ── Feedback Form ── */}
        <section className="py-6 md:py-8 pb-20">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Rating */}
            <FadeSection className="space-y-5">
              <label className="block text-foreground text-sm font-medium text-center">
                How would you rate the product?
              </label>
              <div className="flex justify-center">
                <StarRating value={rating} onChange={setRating} />
              </div>
            </FadeSection>

            {/* Feedback */}
            <FadeSection className="space-y-3">
              <label className="block text-foreground text-sm font-medium text-center">
                What's one thing you love ordering from CSC — and one thing you wish we did better?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your thoughts..."
                rows={3}
                className="w-full bg-foreground/[0.06] text-foreground placeholder:text-foreground/30 rounded-xl px-5 py-4 text-sm leading-relaxed resize-none border border-foreground/[0.08] focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </FadeSection>

            {/* Optional Fields */}
            <FadeSection className="space-y-3">
              <p className="text-foreground/30 text-xs text-center tracking-widest uppercase">
                Optional
              </p>
              <div className="space-y-2.5">
                {[
                  { value: name, setter: setName, placeholder: "Name" },
                  { value: position, setter: setPosition, placeholder: "Position" },
                  { value: practice, setter: setPractice, placeholder: "Practice Name" },
                ].map(({ value, setter, placeholder }) => (
                  <input
                    key={placeholder}
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-foreground/[0.06] text-foreground placeholder:text-foreground/30 rounded-xl px-5 py-3 text-sm border border-foreground/[0.08] focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                ))}
              </div>
            </FadeSection>

            {/* CTA */}
            <FadeSection className="text-center pt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-medium px-10 py-3.5 text-sm tracking-wide btn-glow disabled:opacity-30 disabled:pointer-events-none transition-opacity"
              >
                Submit Feedback
              </button>
              <p className="text-foreground/30 text-xs mt-3">
                Complete the rating and feedback above to continue.
              </p>
            </FadeSection>

          </form>
        </section>

      </div>

      <ThankYouModal open={showThankYou} onOpenChange={setShowThankYou} />
    </div>
  );
};

export default Index;
