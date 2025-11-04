import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Home, Search, Calendar, MessageSquare, User, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const isActive = (path: string) => location.pathname === path;
  const [userId, setUserId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id);
      setUserEmail(session?.user.email);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id);
      setUserEmail(session?.user.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const unreadCount = useUnreadMessages(userId);
  return <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="gradient-text">Learnix
          </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/browse" className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/browse') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <Search className="h-4 w-4" />
              Browse Skills
            </Link>
            <Link to="/learner-dashboard" className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/learner-dashboard') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <Calendar className="h-4 w-4" />
              My Learning
            </Link>
            <Link to="/mentor-dashboard" className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/mentor-dashboard') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <User className="h-4 w-4" />
              Teach
            </Link>
            <Link to="/chat" className={`flex items-center gap-2 text-sm font-medium transition-colors relative ${isActive('/chat') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <MessageSquare className="h-4 w-4" />
              Messages
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {userEmail ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{userEmail}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="btn-gradient">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;