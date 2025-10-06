import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Code, Palette, Languages, Music, Camera, TrendingUp, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const categories = [
  {
    icon: Code,
    title: "Coding & Tech",
    description: "Master programming, web dev, and more",
    color: "from-primary/20 to-primary/5",
    skill: "Coding",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Learn UI/UX, graphic design, and creativity",
    color: "from-secondary/20 to-secondary/5",
    skill: "Design",
  },
  {
    icon: Languages,
    title: "Languages",
    description: "Practice with native speakers worldwide",
    color: "from-accent/20 to-accent/5",
    skill: "Languages",
  },
  {
    icon: Music,
    title: "Music",
    description: "Guitar, piano, vocals, and production",
    color: "from-purple-200/50 to-purple-100/20",
    skill: "Music",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capture moments, edit like a pro",
    color: "from-pink-200/50 to-pink-100/20",
    skill: "Photography",
  },
  {
    icon: TrendingUp,
    title: "Business",
    description: "Marketing, finance, and entrepreneurship",
    color: "from-orange-200/50 to-orange-100/20",
    skill: "Business",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Learn from peers,
                <span className="gradient-text"> grow together</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with student mentors across your campus. Share skills, 
                earn while teaching, and build meaningful connections.
              </p>
              <div className="flex gap-4">
                <Link to="/browse">
                  <Button size="lg" className="btn-gradient">
                    Browse Skills
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="lg" variant="outline">
                    Become a Mentor
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              <img 
                src={heroImage} 
                alt="Students learning together"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Explore Skills</h2>
            <p className="text-lg text-muted-foreground">
              Find your next learning adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={category.title} to={`/browse?skill=${category.skill}`}>
                <Card 
                  className="card-hover cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden shadow-glow">
            <div className="bg-gradient-to-br from-primary via-secondary to-accent p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to start learning?</h2>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of students sharing knowledge on campus
              </p>
              <Link to="/auth?mode=signup">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
