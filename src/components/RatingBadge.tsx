import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface RatingBadgeProps {
  completionRate: number;
  punctualityScore: number;
  responsivenessScore: number;
  size?: "sm" | "md" | "lg";
}

export const RatingBadge = ({ 
  completionRate, 
  punctualityScore, 
  responsivenessScore,
  size = "md" 
}: RatingBadgeProps) => {
  const averageScore = ((completionRate + punctualityScore + responsivenessScore) / 3).toFixed(1);
  
  const getBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    return "outline";
  };

  const getBadgeLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant={getBadgeVariant(Number(averageScore))} className="flex items-center gap-1">
        <Star className={`${iconSize} fill-current`} />
        <span className={textSize}>{getBadgeLabel(Number(averageScore))}</span>
      </Badge>
      
      <div className="flex gap-2">
        <div className="flex items-center gap-1 text-muted-foreground">
          <CheckCircle2 className={iconSize} />
          <span className={textSize}>{completionRate}%</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className={iconSize} />
          <span className={textSize}>{punctualityScore}%</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <TrendingUp className={iconSize} />
          <span className={textSize}>{responsivenessScore}%</span>
        </div>
      </div>
    </div>
  );
};
