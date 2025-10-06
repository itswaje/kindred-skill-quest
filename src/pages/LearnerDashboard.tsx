import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, CheckCircle, Search, MessageSquare, RefreshCw } from "lucide-react";
import { RatingBadge } from "@/components/RatingBadge";
import { ReviewDialog } from "@/components/ReviewDialog";
import { Link } from "react-router-dom";

const LearnerDashboard = () => {
  // Mock learner stats
  const learnerStats = {
    completionRate: 95,
    punctualityScore: 92,
    responsivenessScore: 88,
  };

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Sarah Chen",
      mentorAvatar: "SC",
      skill: "Web Development",
      date: "Tomorrow",
      time: "3:00 PM",
      duration: "1 hour",
      status: "confirmed",
    },
    {
      id: 2,
      mentor: "Marcus Johnson",
      mentorAvatar: "MJ",
      skill: "UI/UX Design",
      date: "Friday, Jan 20",
      time: "5:00 PM",
      duration: "1 hour",
      status: "confirmed",
    },
  ];

  const pastSessions = [
    {
      id: 1,
      mentor: "Emily Rodriguez",
      mentorAvatar: "ER",
      skill: "Spanish Language",
      date: "Jan 10, 2024",
      amount: 120,
      status: "completed",
    },
    {
      id: 2,
      mentor: "David Kim",
      mentorAvatar: "DK",
      skill: "Python Programming",
      date: "Jan 5, 2024",
      amount: 160,
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
              <p className="text-muted-foreground">Track your sessions and progress</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/browse">
                <Button className="btn-gradient">
                  <Search className="mr-2 h-4 w-4" />
                  Book Session
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Reliability Rating</CardTitle>
              <CardDescription>Based on your session history and mentor feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <RatingBadge 
                completionRate={learnerStats.completionRate}
                punctualityScore={learnerStats.punctualityScore}
                responsivenessScore={learnerStats.responsivenessScore}
                size="lg"
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <Card 
                key={session.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {session.mentorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{session.skill}</h3>
                          <p className="text-muted-foreground">with {session.mentor}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{session.time} ({session.duration})</span>
                          </div>
                        </div>
                        
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button className="btn-gradient">
                        <Video className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reschedule
                      </Button>
                      <Link to="/chat">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastSessions.map((session, index) => (
              <Card 
                key={session.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {session.mentorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{session.skill}</h3>
                          <p className="text-muted-foreground">with {session.mentor}</p>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        
                        <Badge variant="secondary">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-semibold mb-2">
                        <span className="text-primary">₹</span>
                        {session.amount}
                      </div>
                      <ReviewDialog 
                        personName={session.mentor}
                        personType="mentor"
                        sessionId={session.id.toString()}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Session with Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                    </div>
                    <span className="font-semibold">₹150</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Session with Emily Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Jan 10, 2024</p>
                    </div>
                    <span className="font-semibold">₹120</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Session with David Kim</p>
                      <p className="text-sm text-muted-foreground">Jan 5, 2024</p>
                    </div>
                    <span className="font-semibold">₹160</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearnerDashboard;
