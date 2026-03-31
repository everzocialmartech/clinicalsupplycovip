import { useState, useRef, useEffect } from "react";
import StarRating from "@/components/StarRating";
import ThankYouModal from "@/components/ThankYouModal";
import cscLogo from "@/assets/csc-logo-white.png";
import spongesImg from "@/assets/2x2_woven_sponges.png";

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
  const [step, setStep] = useState<"profile" | "feedback">("profile");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [practice, setPractice] = useState("");
  const [hobby, setHobby] = useState("");

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const canProceed = name.trim().length > 0 && position.trim().length > 0 && practice.trim().length > 0 && hobby.trim().length > 0;
  const canSubmit = rating > 0;

  const handleContinue = () => {
    if (!canProceed) return;
    setStep("feedback");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setShowThankYou(true);
  };

  return (
    <div className="vip-bg-gradient">
      <div className="max-w-lg mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-14 pb-4 md:pt-20 md:pb-6 text-center">
          <FadeSection className="space-y-4">
            <img
              src={cscLogo}
              alt="Clinical Supply Co."
              width={512}
              height={512}
              className="mx-auto w-20 md:w-24 mb-6"
            />
            <h1 className="text-3xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight uppercase">
              You're in the 1%
            </h1>
            <p className="text-foreground/50 text-base font-light">
              Not everyone gets this.
            </p>
          </FadeSection>
        </section>

        <div className="w-10 h-px bg-foreground/10 mx-auto my-2" />

        {step === "profile" && (
          <section className="py-8 pb-20">
            <FadeSection className="space-y-6">
              <div className="space-y-2.5">
                {[
                  { value: name, setter: setName, placeholder: "Name" },
                  { value: position, setter: setPosition, placeholder: "Position" },
                  { value: practice, setter: setPractice, placeholder: "Practice Name" },
                  { value: hobby, setter: setHobby, placeholder: "Hobby" },
                ].map(({ value, setter, placeholder }) => (
                  <input
                    key={placeholder}
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-foreground/[0.06] text-foreground placeholder:text-foreground/25 rounded-xl px-5 py-3 text-sm border border-foreground/[0.08] focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                ))}
              </div>
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!canProceed}
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-medium px-10 py-3.5 text-sm tracking-wide btn-glow disabled:opacity-30 disabled:pointer-events-none transition-opacity"
                >
                  Continue
                </button>
              </div>
            </FadeSection>
          </section>
        )}

        {step === "feedback" && (
           <section className="py-4 pb-20">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Product reveal */}
              <FadeSection className="text-center space-y-3">
                <img
                  src={spongesImg}
                  alt="Posi-Shield 2X2 Non-Woven Sponges"
                  className="mx-auto w-48 md:w-56 drop-shadow-2xl animate-fade-in [animation-duration:0.8s]"
                />
                <p className="text-foreground/90 text-sm md:text-base">
                  You've received the <span className="text-primary font-medium">Posi-Shield 2X2 Non-Woven Sponges</span> Gift!
                </p>
                <p className="text-foreground/40 text-xs md:text-sm">
                  Rate the product and share your feedback below to claim your <span className="text-primary font-medium">$25 store credit</span>.
                </p>
              </FadeSection>

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
                  className="w-full bg-foreground/[0.06] text-foreground placeholder:text-foreground/25 rounded-xl px-5 py-4 text-sm leading-relaxed resize-none border border-foreground/[0.08] focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </FadeSection>

              {/* Submit */}
              <FadeSection className="text-center pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-medium px-10 py-3.5 text-sm tracking-wide btn-glow disabled:opacity-30 disabled:pointer-events-none transition-opacity"
                >
                  Submit Feedback
                </button>
              </FadeSection>

            </form>
          </section>
        )}

      </div>

      <ThankYouModal open={showThankYou} onOpenChange={setShowThankYou} />
    </div>
  );
};

export default Index;
