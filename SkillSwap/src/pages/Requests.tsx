import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings,
  LogOut,
  Handshake,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
  Trash2,
  ArrowLeft
} from "lucide-react";

// Mock data for requests
const mockRequests = [
  {
    id: 1,
    type: "received",
    status: "pending",
    fromUser: {
      id: 2,
      name: "Marcus Rodriguez",
      avatar: "",
      rating: 4.8
    },
    skillOffered: "Machine Learning",
    skillWanted: "React",
    message: "Hi! I'd love to learn React from you. I have 3 years of ML experience and can teach you data science concepts.",
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    type: "sent",
    status: "pending",
    toUser: {
      id: 3,
      name: "Emily Johnson",
      avatar: "",
      rating: 5.0
    },
    skillOffered: "React",
    skillWanted: "Photography",
    message: "I'm really interested in learning photography basics. I can help you with modern React patterns.",
    createdAt: "1 day ago"
  },
  {
    id: 3,
    type: "received",
    status: "accepted",
    fromUser: {
      id: 4,
      name: "David Kim",
      avatar: "",
      rating: 4.7
    },
    skillOffered: "Mobile Development",
    skillWanted: "TypeScript",
    message: "I'd like to improve my TypeScript skills. I can teach you React Native development.",
    createdAt: "3 days ago"
  },
  {
    id: 4,
    type: "sent",
    status: "completed",
    toUser: {
      id: 5,
      name: "Lisa Patel",
      avatar: "",
      rating: 4.9
    },
    skillOffered: "UI/UX Design",
    skillWanted: "Digital Marketing",
    message: "Completed last week. Great experience!",
    createdAt: "1 week ago",
    rating: 5
  }
];

const Requests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleAcceptRequest = (requestId: number) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "accepted" } : req
      )
    );
    toast({
      title: "Request Accepted",
      description: "You can now start coordinating your skill swap!",
    });
  };

  const handleRejectRequest = (requestId: number) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "rejected" } : req
      )
    );
    toast({
      title: "Request Rejected",
      description: "The request has been declined.",
    });
  };

  const handleDeleteRequest = (requestId: number) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Deleted",
      description: "The request has been removed.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "accepted":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Star className="h-3 w-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const receivedRequests = requests.filter(req => req.type === "received");
  const sentRequests = requests.filter(req => req.type === "sent");

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
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Handshake className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-foreground/80 hover:text-foreground transition-colors">
              Browse Skills
            </Link>
            <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors">
              My Profile
            </Link>
            <Link to="/requests" className="text-primary font-medium">
              My Requests
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Skill Swap Requests</h1>
          <p className="text-muted-foreground">Manage your incoming and outgoing skill swap requests.</p>
        </div>

        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received" className="flex items-center space-x-2">
              <span>Received Requests</span>
              <Badge variant="secondary" className="ml-2">{receivedRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center space-x-2">
              <span>Sent Requests</span>
              <Badge variant="secondary" className="ml-2">{sentRequests.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {receivedRequests.length === 0 ? (
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📬</div>
                  <h3 className="text-xl font-semibold mb-2">No requests received yet</h3>
                  <p className="text-muted-foreground mb-4">When others want to swap skills with you, their requests will appear here.</p>
                  <Button asChild>
                    <Link to="/browse">Browse Skills</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              receivedRequests.map((request) => (
                <Card key={request.id} className="bg-gradient-card border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.fromUser.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                            {request.fromUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.fromUser.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span>{request.fromUser.rating}</span>
                            <span>•</span>
                            <span>{request.createdAt}</span>
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 text-primary">They offer:</h4>
                        <Badge variant="default">{request.skillOffered}</Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1 text-secondary-foreground">They want:</h4>
                        <Badge variant="secondary">{request.skillWanted}</Badge>
                      </div>
                    </div>
                    
                    {request.message && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Message:</h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                          {request.message}
                        </p>
                      </div>
                    )}
                    
                    {request.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button onClick={() => handleAcceptRequest(request.id)} className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleRejectRequest(request.id)}
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {request.status === "accepted" && (
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline">
                          Mark Complete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {sentRequests.length === 0 ? (
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📤</div>
                  <h3 className="text-xl font-semibold mb-2">No requests sent yet</h3>
                  <p className="text-muted-foreground mb-4">Start browsing skills and send your first swap request!</p>
                  <Button asChild>
                    <Link to="/browse">Browse Skills</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              sentRequests.map((request) => (
                <Card key={request.id} className="bg-gradient-card border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.toUser.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                            {request.toUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.toUser.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span>{request.toUser.rating}</span>
                            <span>•</span>
                            <span>{request.createdAt}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                        {request.status === "pending" && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteRequest(request.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 text-primary">You offered:</h4>
                        <Badge variant="default">{request.skillOffered}</Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1 text-secondary-foreground">You want:</h4>
                        <Badge variant="secondary">{request.skillWanted}</Badge>
                      </div>
                    </div>
                    
                    {request.message && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Your Message:</h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                          {request.message}
                        </p>
                      </div>
                    )}

                    {request.status === "completed" && request.rating && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-1">Your Rating:</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(request.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">Excellent experience!</span>
                        </div>
                      </div>
                    )}
                    
                    {request.status === "accepted" && (
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline">
                          Mark Complete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Requests;