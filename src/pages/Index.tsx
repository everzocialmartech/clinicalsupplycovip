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
      { threshold: 0.15 }
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  return (
    <div className="vip-bg-gradient">

      {/* ── SECTION 1: Hero ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 md:py-40 min-h-[85vh]">
        <FadeSection className="space-y-8 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-medium text-foreground leading-tight tracking-tight text-balance uppercase">
            You're in the 1%
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Not everyone gets this.
          </p>
          <img
            src={cscLogo}
            alt="Clinical Supply Co."
            width={512}
            height={512}
            className="mx-auto w-36 md:w-44 opacity-80 brightness-200"
          />
        </FadeSection>
      </section>

      {/* ── SECTION 2: Product + Context ── */}
      <section className="flex flex-col items-center px-6 py-20 md:py-28">
        <FadeSection className="max-w-2xl w-full space-y-12">
          <div className="space-y-5 max-w-lg">
            <h2 className="text-xl md:text-2xl font-medium text-foreground leading-snug">
              You've been with us through a lot.<br />
              And we don't take that lightly.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We tucked something into your order today.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              It's a small thank you, and a chance for us to learn from you.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Scan the code below, answer one honest question,<br />
              and we'll add <span className="text-primary font-medium">$25 in store credit</span> to your account.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-4">
              Best, CSC team
            </p>
          </div>

          {/* Product image */}
          <div className="flex justify-center">
            <img
              src={productImage}
              alt="Posi-Shield Non-Woven Sponges"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-72 md:w-96 product-blend"
            />
          </div>

          <p className="text-muted-foreground/40 text-xs text-center">
            No catch. No minimum. Just our way of saying thanks.
          </p>
        </FadeSection>
      </section>

      {/* ── SECTION 3: Feedback Form ── */}
      <section className="flex flex-col items-center px-6 py-20 md:py-28">
        <form onSubmit={handleSubmit} className="w-full max-w-[600px] space-y-16">

          {/* Rating */}
          <FadeSection className="text-center space-y-8">
            <p className="text-foreground/80 text-sm tracking-wide font-medium">
              How would you rate the product?
            </p>
            <div className="flex justify-center">
              <StarRating value={rating} onChange={setRating} />
            </div>
          </FadeSection>

          {/* Feedback */}
          <FadeSection className="space-y-4">
            <p className="text-foreground/80 text-sm tracking-wide text-center font-medium">
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

          {/* Optional Fields */}
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
      </section>

      <ThankYouModal open={showThankYou} onOpenChange={setShowThankYou} />
    </div>
  );
};

export default Index;
