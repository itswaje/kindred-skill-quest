import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, TrendingUp, Users, CheckCircle, Clock, X } from "lucide-react";

const MentorDashboard = () => {
  const stats = [
    { label: "Total Earnings", value: "₹30,000", icon: DollarSign, color: "text-green-600" },
    { label: "Sessions This Month", value: "24", icon: Calendar, color: "text-blue-600" },
    { label: "Active Students", value: "18", icon: Users, color: "text-purple-600" },
    { label: "Rating", value: "4.9", icon: TrendingUp, color: "text-yellow-600" },
  ];

  const sessionRequests = [
    {
      id: 1,
      student: "Mike Thompson",
      studentAvatar: "MT",
      skill: "Web Development",
      date: "Tomorrow",
      time: "3:00 PM",
      status: "pending",
    },
    {
      id: 2,
      student: "Lisa Park",
      studentAvatar: "LP",
      skill: "React Basics",
      date: "Friday, Jan 20",
      time: "5:00 PM",
      status: "pending",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      student: "James Wilson",
      studentAvatar: "JW",
      skill: "JavaScript",
      date: "Today",
      time: "2:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Manage your sessions and track your earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Session Requests</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {sessionRequests.map((request, index) => (
              <Card 
                key={request.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {request.studentAvatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{request.student}</h3>
                          <p className="text-muted-foreground">{request.skill}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{request.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{request.time}</span>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Pending Response
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

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
                          {session.studentAvatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-lg">{session.student}</h3>
                          <p className="text-muted-foreground">{session.skill}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{session.time}</span>
                          </div>
                        </div>
                        
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmed
                        </Badge>
                      </div>
                    </div>
                    
                    <Button>Start Session</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Session with Mike Thompson</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+₹400</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Session with Lisa Park</p>
                      <p className="text-sm text-muted-foreground">Jan 14, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+₹400</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Session with James Wilson</p>
                      <p className="text-sm text-muted-foreground">Jan 13, 2024</p>
                    </div>
                    <span className="font-semibold text-green-600">+₹400</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="w-full">Withdraw Earnings</Button>
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

export default MentorDashboard;
