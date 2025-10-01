import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityId, setUniversityId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !universityId) {
      toast.error("Please enter your university ID");
      return;
    }
    
    // Simulate authentication
    toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? "Create your account" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {isSignUp 
              ? "Start your learning journey today" 
              : "Sign in to continue your learning"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="universityId">University ID</Label>
                <Input
                  id="universityId"
                  type="text"
                  placeholder="STU123456"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full btn-gradient">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
