import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, Calendar, MessageSquare } from "lucide-react";

const MentorProfile = () => {
  const { id } = useParams();

  // Mock data - would come from API
  const mentor = {
    name: "Sarah Chen",
    skill: "Web Development",
    avatar: "SC",
    rating: 4.9,
    reviews: 47,
    fee: 15,
    totalSessions: 120,
    bio: "Hi! I'm Sarah, a senior Computer Science major passionate about web development. I've been coding for 5 years and love helping others learn. My teaching style is patient, hands-on, and focused on real-world projects.",
    expertise: ["React", "JavaScript", "TypeScript", "Node.js", "CSS/Tailwind", "Git"],
    availability: "Mon-Fri: 4pm-8pm, Weekends: Flexible",
    languages: ["English", "Mandarin"],
  };

  const reviews = [
    {
      id: 1,
      author: "Mike Thompson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Sarah is an amazing mentor! She explained React concepts clearly and helped me build my first project. Highly recommended!",
    },
    {
      id: 2,
      author: "Lisa Park",
      rating: 5,
      date: "1 month ago",
      comment: "Very patient and knowledgeable. Sarah helped me debug my code and taught me best practices. Worth every penny!",
    },
    {
      id: 3,
      author: "James Wilson",
      rating: 4,
      date: "2 months ago",
      comment: "Great session! Sarah knows her stuff and is really good at explaining complex topics in simple terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in">
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      {mentor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                    <p className="text-xl text-muted-foreground mb-3">{mentor.skill}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>{mentor.totalSessions} sessions completed</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">About</h2>
                    <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Availability</h2>
                    <p className="text-muted-foreground">{mentor.availability}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Languages</h2>
                    <div className="flex gap-2">
                      {mentor.languages.map((lang) => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Reviews Section */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{review.author}</h3>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 animate-slide-in">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bold">{mentor.fee}</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                </div>
                
                <Link to={`/booking/${id}`}>
                  <Button className="w-full btn-gradient" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Session
                  </Button>
                </Link>
                
                <Link to="/chat">
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </Link>
                
                <div className="pt-4 border-t text-sm text-muted-foreground">
                  <p>✓ Instant confirmation</p>
                  <p>✓ Free cancellation (24h notice)</p>
                  <p>✓ Secure payment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
