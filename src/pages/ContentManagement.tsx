import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, StarHalf, Trash2, Badge } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Review {
  id: number;
  name: string;
  courseName: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
  starred?: boolean;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export default function ContentManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "starred">("all");
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      courseName: "React Masterclass",
      rating: 5,
      comment: "This course helped me land my dream job! The instructor explains complex concepts in a simple way.",
      date: "2023-06-15",
      starred: false
    },
    {
      id: 2,
      name: "Priya Patel",
      courseName: "Advanced JavaScript",
      rating: 4.5,
      comment: "Great course content, but I wish there were more exercises to practice with.",
      date: "2023-06-12",
      starred: false
    }
  ]);

  const [reviewName, setReviewName] = useState("");
  const [reviewCourse, setReviewCourse] = useState("");
  const [reviewRating, setReviewRating] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAvatar, setReviewAvatar] = useState("");

  const resetForm = () => {
    setReviewName("");
    setReviewCourse("");
    setReviewRating("");
    setReviewComment("");
    setReviewAvatar("");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewName || !reviewCourse || !reviewRating || !reviewComment) {
      toast.error("Please fill in all required fields", {
        description: "Name, course, rating, and comment are required"
      });
      return;
    }
    
    const newReview: Review = {
      id: Math.max(0, ...reviews.map(r => r.id)) + 1,
      name: reviewName,
      courseName: reviewCourse,
      rating: parseFloat(reviewRating),
      comment: reviewComment,
      avatar: reviewAvatar || undefined,
      date: new Date().toISOString().split('T')[0],
      starred: false
    };
    
    setReviews([...reviews, newReview]);
    
    toast.success("Review added successfully", {
      description: `Review for ${reviewCourse} has been added`
    });
    
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast.success("Review deleted", {
      description: "The review has been removed"
    });
  };

  const toggleReviewStatus = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, starred: !review.starred } : review
    ));
    
    const review = reviews.find(r => r.id === id);
    if (review) {
      const newStatus = !review.starred;
      toast.success(`Review ${newStatus ? 'starred' : 'unstarred'}`, {
        description: `The review has been ${newStatus ? 'added to' : 'removed from'} the starred reviews`
      });
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      </div>
    );
  };

  const filteredReviews = activeTab === "all" 
    ? reviews 
    : reviews.filter(review => review.starred);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your course content and learning materials
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Reviews Management</CardTitle>
            <CardDescription>
              Manage and organize your course reviews
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>Add New Review</DialogTitle>
                <DialogDescription>
                  Add a new student review to showcase on your website.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4" onSubmit={handleAddReview}>
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input
                    id="name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter student's name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course">Course Name</Label>
                  <Input
                    id="course"
                    value={reviewCourse}
                    onChange={(e) => setReviewCourse(e.target.value)}
                    placeholder="Enter course name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select value={reviewRating} onValueChange={setReviewRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4.5">4.5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3.5">3.5 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2.5">2.5 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1.5">1.5 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="review">Review Content</Label>
                  <Textarea
                    id="review"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Enter the review content"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture URL (Optional)</Label>
                  <Input
                    id="avatar"
                    value={reviewAvatar}
                    onChange={(e) => setReviewAvatar(e.target.value)}
                    placeholder="Enter profile picture URL"
                  />
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                    Add Review
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4" onValueChange={(value) => setActiveTab(value as "all" | "starred")}>
            <TabsList>
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="flex gap-4 p-4 rounded-lg border">
                  <Avatar className="h-12 w-12 bg-[#947dc2]">
                    {review.avatar ? (
                      <AvatarImage src={review.avatar} alt={review.name} />
                    ) : (
                      <AvatarFallback className="text-black dark:text-white">
                        {getInitials(review.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.courseName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={review.starred ? "text-yellow-500" : "text-gray-500"}
                          onClick={() => toggleReviewStatus(review.id)}
                        >
                          {review.starred ? (
                            <Star className="h-4 w-4 fill-yellow-400" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-600"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm">{review.rating}</span>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Posted on: {review.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[450px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">
                {activeTab === "all" ? "No reviews yet. Add a review to get started." : "No starred reviews yet."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
