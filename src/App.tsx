import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import BrowseSkills from "./pages/BrowseSkills";
import MentorProfile from "./pages/MentorProfile";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import LearnerDashboard from "./pages/LearnerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/browse" element={<BrowseSkills />} />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/chat" element={<Chat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
