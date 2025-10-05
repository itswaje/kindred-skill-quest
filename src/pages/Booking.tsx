import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const mentor = {
    name: "Sarah Chen",
    skill: "Web Development",
    avatar: "SC",
    fee: 400,
  };

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  const handleConfirm = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in">Book Your Session</h1>
          <p className="text-muted-foreground mb-8">Choose your preferred date and time</p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  {date && (
                    <div className="animate-fade-in">
                      <h3 className="font-semibold mb-3">Available Time Slots</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className="w-full"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-20 animate-slide-in">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {mentor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.skill}</p>
                    </div>
                  </div>
                  
                  {date && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      {selectedTime && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedTime}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session (1 hour)</span>
                      <span className="font-semibold">₹{mentor.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform fee</span>
                      <span className="font-semibold">₹50</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">₹{mentor.fee + 50}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full btn-gradient" 
                    size="lg"
                    onClick={handleConfirm}
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
