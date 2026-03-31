import { useState, useRef, useEffect } from "react";
import StarRating from "@/components/StarRating";
import ThankYouModal from "@/components/ThankYouModal";

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const FadeSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollFadeIn();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  return (
    <div className="vip-bg-pattern min-h-screen relative">
      <div className="relative z-10 flex flex-col items-center px-6 py-20 md:py-32">
        <form onSubmit={handleSubmit} className="w-full max-w-[640px] space-y-24">

          {/* Hero */}
          <FadeSection className="text-center space-y-6">
            <p className="text-primary/70 text-xs tracking-[0.3em] uppercase font-medium">
              Clinical Supply Company
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight text-balance">
              You're part of a very small group.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mx-auto">
              We sent you something because we trust your opinion.
            </p>
            <p className="text-muted-foreground/50 text-sm">
              This invite was shared with a select group of long-time CSC partners.
            </p>
          </FadeSection>

          {/* Product Context */}
          <FadeSection className="text-center space-y-4">
            <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
              You've received our <span className="text-primary font-medium">2×2 Cotton Swabs</span> in your order.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
              Before we expand this further, we'd value your honest feedback.
            </p>
          </FadeSection>

          {/* Rating */}
          <FadeSection className="text-center space-y-8">
            <p className="text-foreground/80 text-sm tracking-wide">
              How would you rate the product?
            </p>
            <div className="flex justify-center">
              <StarRating value={rating} onChange={setRating} />
            </div>
          </FadeSection>

          {/* Feedback */}
          <FadeSection className="space-y-4">
            <p className="text-foreground/80 text-sm tracking-wide text-center">
              What's one thing you love ordering from CSC — and one thing you wish we did better?
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your thoughts..."
              rows={4}
              className="w-full bg-input/50 text-foreground placeholder:text-muted-foreground/40 rounded-lg px-5 py-4 text-sm leading-relaxed resize-none border border-border/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </FadeSection>

          {/* Profile Fields */}
          <FadeSection className="space-y-4">
            <p className="text-muted-foreground/40 text-xs text-center tracking-wide uppercase mb-6">
              Optional
            </p>
            <div className="space-y-3">
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
                  className="w-full bg-input/50 text-foreground placeholder:text-muted-foreground/40 rounded-lg px-5 py-3.5 text-sm border border-border/30 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                />
              ))}
            </div>
          </FadeSection>

          {/* CTA */}
          <FadeSection className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium px-10 py-4 text-sm tracking-wide btn-glow"
            >
              Submit & Unlock Your $25 Credit
            </button>
          </FadeSection>

        </form>
      </div>

      <ThankYouModal open={showThankYou} onOpenChange={setShowThankYou} />
    </div>
  );
};

export default Index;
