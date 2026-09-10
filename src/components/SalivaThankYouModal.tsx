import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface SalivaThankYouModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SalivaThankYouModal = ({ open, onOpenChange }: SalivaThankYouModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/30 max-w-md text-center px-10 py-12 gap-0">
        <h2 className="text-2xl font-medium text-foreground tracking-tight mb-5">
          Thank you. Seriously.
        </h2>

        <p className="text-foreground/80 text-sm leading-relaxed mb-4">
          This is exactly why we keep coming back to this group. Your feedback helps us make better product decisions for real dental practices.
        </p>

        <p className="text-foreground/80 text-sm leading-relaxed mb-4">
          Your <span className="text-primary font-medium">$25 CSC credit</span> is ready.
        </p>

        <div className="bg-foreground/[0.06] rounded-xl px-6 py-4 mb-5 border border-foreground/[0.06]">
          <p className="text-foreground font-mono text-lg tracking-widest mb-1">IAMVIP</p>
          <p className="text-foreground/50 text-xs">
            Use this code at checkout.
          </p>
        </div>

        <p className="text-foreground/70 text-sm leading-relaxed mb-8">
          And yes — you're still in the 1%. <br /> We'll be back.
        </p>

        <a
          href="https://clinicalsupplycompany.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-white text-background font-medium px-12 py-3.5 text-sm tracking-widest uppercase border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-transparent hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
        >
          Continue Shopping
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default SalivaThankYouModal;
