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
        <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
          You're all set.
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Your <span className="text-primary font-medium">$25 store credit</span> has been added to your account.
        </p>

        <div className="bg-secondary/50 rounded-lg px-6 py-4 mb-6">
          <p className="text-foreground font-mono text-lg tracking-widest mb-1">IAMVIP</p>
          <p className="text-muted-foreground text-xs">
            Use this code at checkout.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Valid on lateral products. No minimum. No expiration.
          </p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-2 italic">
          "While others are raising prices, we're focused on taking care of the people who've supported us."
        </p>

        <p className="text-primary text-sm font-medium mb-8">
          We've got you.
        </p>

        <a
          href="https://clinicalsupplycompany.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium px-8 py-3 text-sm btn-glow"
        >
          Continue Shopping
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouModal;
