import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-all duration-200 hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={40}
              className={`transition-all duration-200 ${
                isActive
                  ? "fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  : "fill-transparent text-white/30"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
