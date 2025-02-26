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
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "React Masterclass",
      description: "Complete React course from basics to advanced",
      price: 14999,
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      category: "Development",
      curriculum: [
        {
          title: "Introduction to React",
          items: ["React Basics", "Components", "Props and State"]
        },
        {
          title: "Advanced Concepts",
          items: ["Hooks", "Context API", "Performance Optimization"]
        }
      ]
    }
  ]);

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
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCurriculumTitle, setEditingCurriculumTitle] = useState("");
  const [editingCurriculumItem, setEditingCurriculumItem] = useState("");

  const generateUniqueId = () => {
    const existingIds = courses.map(course => course.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  };

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.description || newCourse.price === null || !newCourse.imageUrl || !newCourse.category || newCourse.curriculum.length === 0) {
      toast.error("Please fill all required fields, including at least one topic.", {
        position: "top-right",
        style: { background: "#ef4444", color: "white" },
        duration: 3000, // 3 seconds
      });
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
    toast.success("Course added successfully!", {
      position: "top-right",
      style: { background: "#10b981", color: "white" },
      duration: 3000, // 3 seconds
    });
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    toast.success("Course deleted successfully!", {
      position: "top-right",
      style: { background: "#10b981", color: "white" },
      duration: 3000, // 3 seconds
    });
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

  const handleAddCurriculumItem = (topicIndex: number, e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter") return; // Only trigger on Enter key
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

  const handleEditCourse = () => {
    if (!editingCourse || !editingCourse.name || !editingCourse.description || editingCourse.price === null || !editingCourse.imageUrl || !editingCourse.category || editingCourse.curriculum.length === 0) {
      toast.error("Please fill all required fields, including at least one topic.", {
        position: "top-right",
        style: { background: "#ef4444", color: "white" },
        duration: 3000, // 3 seconds
      });
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingCourse.id ? editingCourse : course
    ));
    setEditingCourse(null);
    setIsEditDialogOpen(false);
    toast.success("Course updated successfully!", {
      position: "top-right",
      style: { background: "#10b981", color: "white" },
      duration: 3000, // 3 seconds
    });
  };

  const startEditing = (course: Course) => {
    setEditingCourse({ ...course });
    setIsEditDialogOpen(true);
  };

  const handleEditCurriculumTopic = (e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter") return; // Only trigger on Enter key
    if (editingCurriculumTitle.trim() && editingCourse) {
      setEditingCourse({
        ...editingCourse,
        curriculum: [...editingCourse.curriculum, { title: editingCurriculumTitle, items: [] }]
      });
      setEditingCurriculumTitle("");
    }
  };

  const handleEditCurriculumItem = (topicIndex: number, e?: React.KeyboardEvent) => {
    if (e && e.key !== "Enter") return; // Only trigger on Enter key
    if (editingCurriculumItem.trim() && editingCourse) {
      const updatedCurriculum = [...editingCourse.curriculum];
      updatedCurriculum[topicIndex].items.push(editingCurriculumItem.trim());
      setEditingCourse({
        ...editingCourse,
        curriculum: updatedCurriculum
      });
      setEditingCurriculumItem("");
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
                {/* Form fields */}
              </div>
            </ScrollArea>
            <div className="flex justify-end gap-2 mt-4 p-4"> {/* Add padding here */}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <ScrollArea className="h-full max-h-[calc(90vh-8rem)]">
              <div className="grid gap-4 py-4 pr-4">
                {/* Form fields */}
              </div>
            </ScrollArea>
          )}
          <div className="flex justify-end gap-2 mt-4 p-4"> {/* Add padding here */}
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditCourse}
              className="bg-[#947dc2] hover:bg-[#947dc2]/90"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
