import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Star,
  MapPin, 
  Clock, 
  Handshake,
  MessageCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

// Mock user data (in real app, this would come from API)
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "New York, NY",
    avatar: "",
    rating: 4.9,
    skillsOffered: ["React", "TypeScript", "UI/UX Design"],
    skillsWanted: ["Machine Learning", "Data Science"],
    availability: "Weekends",
    completedSwaps: 15,
    bio: "Frontend developer with 5 years of experience. Passionate about creating beautiful and functional user interfaces."
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    location: "San Francisco, CA",
    avatar: "",
    rating: 4.8,
    skillsOffered: ["Python", "Machine Learning", "Data Analysis"],
    skillsWanted: ["Web Development", "React"],
    availability: "Evenings",
    completedSwaps: 12,
    bio: "Data scientist and ML engineer. Love solving complex problems with data and helping others learn."
  }
];

const Request = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [selectedSkillOffered, setSelectedSkillOffered] = useState("");
  const [selectedSkillWanted, setSelectedSkillWanted] = useState("");

  const user = mockUsers.find(u => u.id === parseInt(userId || "0"));

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <Button asChild>
            <Link to="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSendRequest = () => {
    if (!selectedSkillOffered || !selectedSkillWanted) {
      toast({
        title: "Missing Information",
        description: "Please select skills for both offering and requesting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Sent!",
      description: `Your skill swap request has been sent to ${user.name}.`,
    });

    navigate("/requests");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/browse">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Request Skill Swap</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Profile Card */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </CardDescription>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{user.rating}</span>
                      <span className="text-muted-foreground">({user.completedSwaps} swaps)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{user.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
              {user.bio && (
                <p className="text-sm text-muted-foreground mt-4">{user.bio}</p>
              )}
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-primary">Skills They Offer:</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill) => (
                    <Badge key={skill} variant="default" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 text-secondary-foreground">Skills They Want:</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Form */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Handshake className="h-5 w-5 text-primary" />
                <span>Create Swap Request</span>
              </CardTitle>
              <CardDescription>
                Select the skills you want to exchange and add a personal message.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skill-offered">I can teach:</Label>
                <select
                  id="skill-offered"
                  value={selectedSkillOffered}
                  onChange={(e) => setSelectedSkillOffered(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-card text-foreground"
                >
                  <option value="">Select a skill you can offer</option>
                  <option value="React">React</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Node.js">Node.js</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-wanted">I want to learn:</Label>
                <select
                  id="skill-wanted"
                  value={selectedSkillWanted}
                  onChange={(e) => setSelectedSkillWanted(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-card text-foreground"
                >
                  <option value="">Select a skill you want to learn</option>
                  {user.skillsOffered.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Tell them why you'd like to learn from them and what you can offer in return..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] bg-card"
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleSendRequest}
                  className="flex-1"
                  disabled={!selectedSkillOffered || !selectedSkillWanted}
                >
                  <Handshake className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/browse">
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Request;