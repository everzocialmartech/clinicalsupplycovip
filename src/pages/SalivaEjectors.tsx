import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import StarRating from "@/components/StarRating";
import SalivaThankYouModal from "@/components/SalivaThankYouModal";
import cscLogo from "@/assets/csc-logo-white.png";
import ejectorsImg from "@/assets/saliva-ejectors.png";

// Paste the Apps Script web app URL for the saliva ejectors sheet here.
const SHEET_ENDPOINT = "";

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

const REORDER_OPTIONS = ["Yes", "Maybe", "No"] as const;

const SalivaEjectors = () => {
  const [step, setStep] = useState<"profile" | "feedback">("profile");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [practice, setPractice] = useState("");

  const [rating, setRating] = useState(0);
  const [reorderAgain, setReorderAgain] = useState("");
  const [teamThoughts, setTeamThoughts] = useState("");
  const [reorderTrigger, setReorderTrigger] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const canProceed = name.trim().length > 0 && position.trim().length > 0 && practice.trim().length > 0;
  const canSubmit = rating > 0 && reorderAgain.length > 0 && teamThoughts.trim().length > 0;

  const handleContinue = () => {
    if (!canProceed) return;
    setStep("feedback");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setShowThankYou(true);
    if (!SHEET_ENDPOINT) return;
    try {
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, position, practice, rating, reorderAgain, teamThoughts, reorderTrigger }),
      });
    } catch (err) {
      console.error("Failed to send to Google Sheets:", err);
    }
  };

  return (
    <div className="vip-bg-gradient relative">
      {step === "feedback" && (
        <button
          type="button"
          onClick={() => { setStep("profile"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="fixed top-6 left-6 z-50 flex items-center gap-1.5 text-foreground/50 hover:text-foreground text-sm transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      )}
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
            <p className="text-foreground/40 text-xs tracking-[0.3em] uppercase">
              Welcome back
            </p>
            <h1 className="text-3xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight uppercase">
              You're still in the 1%
            </h1>
            <p className="text-foreground/60 text-sm md:text-base font-light leading-relaxed">
              We came back to you because you're one of the CSC customers whose opinion we trust most.
            </p>
            <p className="text-foreground/40 text-xs md:text-sm">
              No sales pitch. No "right" answer. Just your honest opinion.
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
                  className="inline-flex items-center justify-center rounded-xl bg-white text-background font-medium px-12 py-3.5 text-sm tracking-widest uppercase border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-transparent hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                >
                  Tell us what you think
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
                  src={ejectorsImg}
                  alt="CSC Saliva Ejectors"
                  className="mx-auto w-40 md:w-48 drop-shadow-2xl animate-pop-up-grow [animation-delay:1s] [animation-fill-mode:both] mb-4 origin-bottom"
                />
                <p className="text-foreground/90 text-sm md:text-base">
                  So… how were the <span className="text-primary font-medium">Saliva Ejectors</span>?
                </p>
                <p className="text-foreground/50 text-xs md:text-sm leading-relaxed">
                  We sent them to people who know what makes a dental product worth reordering. Good, bad, or somewhere in between — we want the real answer.
                </p>
              </FadeSection>

              {/* Expert positioning */}
              <FadeSection className="text-center space-y-2 border-y border-foreground/[0.07] py-6">
                <h2 className="text-foreground text-sm font-medium tracking-wide uppercase">
                  You're the expert here
                </h2>
                <p className="text-foreground/50 text-xs md:text-sm leading-relaxed">
                  We could run surveys with strangers. We'd rather ask the people using these every day — you know what works in a real practice and what gets annoying after eight hours.
                </p>
              </FadeSection>

              {/* Rating */}
              <FadeSection className="space-y-4">
                <label className="block text-foreground text-sm font-medium text-center">
                  How would you rate the saliva ejectors?
                </label>
                <div className="flex justify-center">
                  <StarRating value={rating} onChange={setRating} />
                </div>
                <p className="text-foreground/40 text-xs text-center">
                  Be honest. You won't hurt our feelings.
                </p>
              </FadeSection>

              {/* Reorder pills */}
              <FadeSection className="space-y-3">
                <label className="block text-foreground text-sm font-medium text-center">
                  Would you order them again?
                </label>
                <div className="flex justify-center gap-2.5">
                  {REORDER_OPTIONS.map((option) => {
                    const selected = reorderAgain === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setReorderAgain(option)}
                        className={`rounded-full px-7 py-2.5 text-xs tracking-widest uppercase border transition-all duration-300 ${
                          selected
                            ? "bg-white text-background border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            : "bg-foreground/[0.06] text-foreground/70 border-foreground/[0.08] hover:text-foreground hover:border-foreground/25"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </FadeSection>

              {/* Team thoughts */}
              <FadeSection className="space-y-3">
                <label className="block text-foreground text-sm font-medium text-center">
                  What did your team <span className="italic text-primary font-semibold">actually</span> think?
                </label>
                <textarea
                  value={teamThoughts}
                  onChange={(e) => setTeamThoughts(e.target.value)}
                  placeholder="Tell us what you liked, what you didn't, or what you'd change."
                  rows={4}
                  className="w-full bg-foreground/[0.06] text-foreground placeholder:text-foreground/25 rounded-xl px-5 py-4 text-sm leading-relaxed resize-none border border-foreground/[0.08] focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </FadeSection>

              {/* Reorder trigger */}
              <FadeSection className="space-y-3">
                <label className="block text-foreground text-sm font-medium text-center">
                  What would make these a "yes, we're reordering" product for your practice?
                </label>
                <textarea
                  value={reorderTrigger}
                  onChange={(e) => setReorderTrigger(e.target.value)}
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full bg-foreground/[0.06] text-foreground placeholder:text-foreground/25 rounded-xl px-5 py-4 text-sm leading-relaxed resize-none border border-foreground/[0.08] focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </FadeSection>

              {/* Submit */}
              <FadeSection className="text-center space-y-3 pt-2">
                <p className="text-foreground/50 text-xs leading-relaxed">
                  Once you submit, your <span className="text-primary font-medium">$25 CSC credit</span> is yours. It isn't tied to leaving a positive review — positive, negative or mixed all count.
                </p>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center rounded-xl bg-white text-background font-medium px-12 py-3.5 text-sm tracking-widest uppercase border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-transparent hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                >
                  Submit my feedback
                </button>
                <p className="text-foreground/40 text-xs">
                  Honest feedback only. That's the whole point.
                </p>
              </FadeSection>

            </form>
          </section>
        )}

      </div>

      <SalivaThankYouModal open={showThankYou} onOpenChange={setShowThankYou} />
    </div>
  );
};

export default SalivaEjectors;
