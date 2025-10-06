import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

interface ReviewDialogProps {
  personName: string;
  personType: "mentor" | "learner";
  sessionId: string;
}

export const ReviewDialog = ({ personName, personType, sessionId }: ReviewDialogProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [punctuality, setPunctuality] = useState([90]);
  const [responsiveness, setResponsiveness] = useState([90]);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Review Submitted",
      description: `Thank you for reviewing ${personName}!`,
    });
    setOpen(false);
    setRating(5);
    setComment("");
    setPunctuality([90]);
    setResponsiveness([90]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Leave Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review {personName}</DialogTitle>
          <DialogDescription>
            Share your experience with this {personType}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Overall Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {personType === "learner" && (
            <>
              <div className="space-y-2">
                <Label>Punctuality: {punctuality[0]}%</Label>
                <Slider
                  value={punctuality}
                  onValueChange={setPunctuality}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Responsiveness: {responsiveness[0]}%</Label>
                <Slider
                  value={responsiveness}
                  onValueChange={setResponsiveness}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="comment">Comments</Label>
            <Textarea
              id="comment"
              placeholder={`Share your experience with ${personName}...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="btn-gradient">
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
