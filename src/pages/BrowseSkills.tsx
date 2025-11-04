import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Mentor = {
  id: string;
  full_name: string;
  field_of_expertise: string;
  bio: string;
  average_rating: number;
  profile_photo_url: string | null;
};

const BrowseSkills = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const skillFromUrl = searchParams.get("skill");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(skillFromUrl || "All");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skillFromUrl) {
      setSelectedCategory(skillFromUrl);
    }
    fetchMentors();
  }, [skillFromUrl]);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'mentor');

      if (error) throw error;

      setMentors(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load mentors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Coding", "Design", "Languages", "Music", "Business", "Photography"];
  
  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory = selectedCategory === "All" || mentor.field_of_expertise?.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery === "" || 
      mentor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.field_of_expertise?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          {skillFromUrl && (
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")} 
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Skills
            </Button>
          )}
          <h1 className="text-4xl font-bold mb-2">
            {skillFromUrl ? `${skillFromUrl} Mentors` : "Find Your Mentor"}
          </h1>
          <p className="text-muted-foreground">
            {skillFromUrl 
              ? `Connect with expert ${skillFromUrl.toLowerCase()} mentors` 
              : "Browse skilled student mentors ready to help you learn"}
          </p>
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

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredMentors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No mentors found. Try adjusting your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMentors.map((mentor, index) => (
                  <Card 
                    key={mentor.id} 
                    className="card-hover animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/mentor/${mentor.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={mentor.profile_photo_url || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(mentor.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{mentor.full_name}</h3>
                          <p className="text-muted-foreground">{mentor.field_of_expertise}</p>
                          {mentor.bio && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {mentor.bio}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{mentor.average_rating.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground">rating</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-4 border-t">
                        <Link to={`/mentor/${mentor.id}`} onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="sm">View Profile</Button>
                        </Link>
                        <Link to={`/booking/${mentor.id}`} onClick={(e) => e.stopPropagation()}>
                          <Button size="sm">Book Session</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseSkills;
