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
import { Edit, Plus, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner"; // For toast notifications

interface CourseContent {
  title: string;
  items: string[];
}

interface Course {
  id: number;
  name: string;
  description: string;
  price: number | null; // Allow null for empty price
  imageUrl: string;
  category: string;
  curriculum: CourseContent[];
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://192.168.0.100:5000/api/course');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: "",
    description: "",
    price: null, // Default to null instead of 0
    imageUrl: "",
    category: "",
    curriculum: []
  });
  const [curriculumTitle, setCurriculumTitle] = useState("");
  const [curriculumItem, setCurriculumItem] = useState("");
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number | null>(null);

  const generateUniqueId = () => {
    const existingIds = courses.map(course => course.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  };

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description || newCourse.price === null || !newCourse.imageUrl || !newCourse.category) {
      toast.error("Please fill all required fields.");
      return;
    }

    setCourses([
      ...courses,
      {
        ...newCourse as Course,
        id: generateUniqueId(),
        curriculum: newCourse.curriculum || []
      }
    ]);
    setNewCourse({
      name: "",
      description: "",
      price: null,
      imageUrl: "",
      category: "",
      curriculum: []
    });
    setIsAddingCourse(false);
    toast.success("Course added successfully!");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    toast.success("Course deleted successfully!");
  };

  const handleAddCurriculumTopic = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter") return; // Only trigger on Enter key
    if (curriculumTitle.trim()) {
      setNewCourse({
        ...newCourse,
        curriculum: [...(newCourse.curriculum || []), { title: curriculumTitle, items: [] }]
      });
      setCurriculumTitle("");
    }
  };

  const handleAddCurriculumItem = (topicIndex: number) => {
    if (curriculumItem.trim() && newCourse.curriculum) {
      const updatedCurriculum = [...newCourse.curriculum];
      updatedCurriculum[topicIndex].items.push(curriculumItem.trim());
      setNewCourse({
        ...newCourse,
        curriculum: updatedCurriculum
      });
      setCurriculumItem("");
    }
  };

  const handleDeleteCurriculumTopic = (topicIndex: number) => {
    if (newCourse.curriculum) {
      const updatedCurriculum = newCourse.curriculum.filter((_, index) => index !== topicIndex);
      setNewCourse({
        ...newCourse,
        curriculum: updatedCurriculum
      });
    }
  };

  const handleDeleteCurriculumItem = (topicIndex: number, itemIndex: number) => {
    if (newCourse.curriculum) {
      const updatedCurriculum = [...newCourse.curriculum];
      updatedCurriculum[topicIndex].items = updatedCurriculum[topicIndex].items.filter((_, index) => index !== itemIndex);
      setNewCourse({
        ...newCourse,
        curriculum: updatedCurriculum
      });
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
          <DialogTrigger asChild>
            <Button className="bg-[#947dc2] hover:bg-[#947dc2]/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full max-h-[calc(90vh-8rem)]">
              <div className="grid gap-4 py-4 pr-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="Enter course name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    placeholder="Enter course category"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Enter course description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCourse.price === null ? "" : newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value === "" ? null : Number(e.target.value) })}
                    placeholder="Enter course price"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newCourse.imageUrl}
                    onChange={(e) => setNewCourse({ ...newCourse, imageUrl: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Curriculum Topics</Label>
                  <div className="flex gap-2">
                    <Input
                      value={curriculumTitle}
                      onChange={(e) => setCurriculumTitle(e.target.value)}
                      onKeyDown={(e) => handleAddCurriculumTopic(e)}
                      placeholder="Add a topic title"
                    />
                    <Button type="button" onClick={() => handleAddCurriculumTopic()}>
                      Add Topic
                    </Button>
                  </div>
                  {newCourse.curriculum && newCourse.curriculum.length > 0 && (
                    <div className="space-y-4 mt-4">
                      {newCourse.curriculum.map((topic, topicIndex) => (
                        <div key={topicIndex} className="border p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium mb-2">{topic.title}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                              onClick={() => handleDeleteCurriculumTopic(topicIndex)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {topic.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center gap-2">
                                <span className="text-sm">{item}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4"
                                  onClick={() => handleDeleteCurriculumItem(topicIndex, itemIndex)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <div className="flex gap-2 mt-2">
                              <Input
                                value={curriculumItem}
                                onChange={(e) => setCurriculumItem(e.target.value)}
                                placeholder="Add a subtopic"
                              />
                              <Button type="button" onClick={() => handleAddCurriculumItem(topicIndex)}>
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddingCourse(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddCourse}
                className="bg-[#947dc2] hover:bg-[#947dc2]/90"
              >
                Add Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Topics</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>₹{course.price?.toLocaleString()}</TableCell>
                <TableCell>
                  {course.curriculum.map(topic => topic.title).join(", ")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => startEditing(course)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteCourse(course.id)}
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
    </div>
  );
}
