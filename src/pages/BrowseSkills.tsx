import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, DollarSign, Clock } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    skill: "Web Development",
    rating: 4.9,
    reviews: 47,
    fee: 150,
    avatar: "SC",
    availability: "Available",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    skill: "UI/UX Design",
    rating: 4.8,
    reviews: 32,
    fee: 180,
    avatar: "MJ",
    availability: "Available",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    skill: "Spanish Language",
    rating: 5.0,
    reviews: 68,
    fee: 120,
    avatar: "ER",
    availability: "Busy",
    tags: ["Conversational", "Grammar", "DELE Prep"],
  },
  {
    id: 4,
    name: "David Kim",
    skill: "Python Programming",
    rating: 4.7,
    reviews: 55,
    fee: 160,
    avatar: "DK",
    availability: "Available",
    tags: ["Data Science", "ML", "Django"],
  },
  {
    id: 5,
    name: "Olivia Thompson",
    skill: "Guitar Lessons",
    rating: 4.9,
    reviews: 41,
    fee: 200,
    avatar: "OT",
    availability: "Available",
    tags: ["Acoustic", "Theory", "Songs"],
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    skill: "Digital Marketing",
    rating: 4.6,
    reviews: 29,
    fee: 140,
    avatar: "AH",
    availability: "Available",
    tags: ["SEO", "Social Media", "Analytics"],
  },
];

const BrowseSkills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Coding", "Design", "Languages", "Music", "Business"];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Find Your Mentor</h1>
          <p className="text-muted-foreground">Browse skilled student mentors ready to help you learn</p>
        </div>

        {/* Search and Filters */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="justify-start w-full">
                      ₹0 - ₹100
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      ₹100 - ₹150
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      ₹150 - ₹200
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      ₹200+
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Available Now</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">This Week</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by skill, name, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mentors.map((mentor, index) => (
                <Card 
                  key={mentor.id} 
                  className="card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {mentor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-muted-foreground">{mentor.skill}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{mentor.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({mentor.reviews})
                            </span>
                          </div>
                          
                          <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                            {mentor.availability}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-1 text-lg font-semibold">
                        <span className="text-primary">₹</span>
                        {mentor.fee}
                        <span className="text-sm text-muted-foreground font-normal">/hour</span>
                      </div>
                      
                      <Link to={`/mentor/${mentor.id}`}>
                        <Button>View Profile</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseSkills;
