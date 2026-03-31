import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ThankYouModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThankYouModal = ({ open, onOpenChange }: ThankYouModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/30 max-w-md text-center px-10 py-12 gap-0">
        <h2 className="text-2xl font-medium text-foreground tracking-tight mb-5">
          You're all set.
        </h2>

        <p className="text-foreground/80 text-sm leading-relaxed mb-6">
          Your <span className="text-primary font-medium">$25 store credit</span> has been added to your account.
        </p>

        <div className="bg-foreground/[0.06] rounded-xl px-6 py-4 mb-6 border border-foreground/[0.06]">
          <p className="text-foreground font-mono text-lg tracking-widest mb-1">IAMVIP</p>
          <p className="text-foreground/50 text-xs">
            Use this code at checkout.
          </p>
        </div>

        <p className="text-foreground/60 text-sm leading-relaxed mb-2">
          This only applies to lateral products — no minimum, no expiry.
        </p>

        <p className="text-foreground/70 text-sm leading-relaxed mb-2">
          While the rest of the market is raising prices on everything — we're not. We want to make sure you know, we got you covered.
        </p>

        <p className="text-primary text-sm font-medium mb-8">
          We've got you.
        </p>

        <a
          href="https://clinicalsupplycompany.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-medium px-8 py-3 text-sm btn-glow"
        >
          Continue Shopping
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouModal;
