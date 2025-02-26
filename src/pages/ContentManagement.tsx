
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
  courseId?: number;
}

interface Course {
  id: number;
  title: string;
  category: string;
  image: string;
  classes: number;
  price: number;
  discount: number;
  description: string;
  content: {
    title: string;
    items: string[];
  }[];
}

export default function ContentManagement() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "John Doe",
      content: "Great platform for learning!",
      rating: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      courseId: 1,
      content: "The Web Development Bootcamp was excellent!",
      rating: 5
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Web Development Bootcamp",
      category: "Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      classes: 30,
      price: 499,
      discount: 20,
      description: "Learn the fundamentals of web development, including HTML, CSS, JavaScript, and modern frameworks.",
      content: [
        {
          title: "Introduction to Web Development",
          items: ["Course overview", "Setting up your environment"]
        },
        {
          title: "Frontend Development",
          items: ["HTML basics", "CSS for styling", "JavaScript fundamentals"]
        }
      ]
    }
  ]);

  const [newReview, setNewReview] = useState<Partial<Review>>({
    name: "",
    content: "",
    rating: 5
  });

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const handleAddReview = () => {
    if (newReview.name && newReview.content) {
      setReviews([
        ...reviews,
        {
          ...newReview as Review,
          id: reviews.length + 1
        }
      ]);
      setNewReview({
        name: "",
        content: "",
        rating: 5
      });
      setIsAddingReview(false);
    }
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const handleEditReview = () => {
    if (editingReview) {
      setReviews(reviews.map(review => 
        review.id === editingReview.id ? editingReview : review
      ));
      setEditingReview(null);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="courses">Course Content</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddingReview} onOpenChange={setIsAddingReview}>
              <DialogTrigger asChild>
                <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
                  <Plus className="mr-2 h-4 w-4" /> Add New Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Review</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Review Content</Label>
                    <Textarea
                      id="content"
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingReview(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddReview}>Add Review</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.name}</TableCell>
                    <TableCell>{review.content}</TableCell>
                    <TableCell>{review.rating}/5</TableCell>
                    <TableCell>
                      {review.courseId ? courses.find(c => c.id === review.courseId)?.title || 'N/A' : 'General'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setEditingReview(review)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </div>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Price:</span> ${course.price}
                  </div>
                  <div>
                    <span className="font-medium">Classes:</span> {course.classes}
                  </div>
                  <div>
                    <span className="font-medium">Discount:</span> {course.discount}%
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Content Sections:</h4>
                  {course.content.map((section, index) => (
                    <div key={index} className="border-l-2 border-[#947dc2] pl-4 ml-2">
                      <h5 className="font-medium">{section.title}</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {section.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
