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

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  curriculum: string[]; // Changed to flat array of strings
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
    price: 0,
    imageUrl: "",
    category: "",
    curriculum: []
  });
  const [curriculumInput, setCurriculumInput] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const generateUniqueId = () => {
    const existingIds = courses.map(course => course.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.price && newCourse.imageUrl && newCourse.category) {
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
        price: 0,
        imageUrl: "",
        category: "",
        curriculum: []
      });
      setIsAddingCourse(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleAddCurriculumItem = () => {
    if (curriculumInput.trim()) {
      setNewCourse({
        ...newCourse,
        curriculum: [...(newCourse.curriculum || []), curriculumInput.trim()]
      });
      setCurriculumInput("");
    }
  };

  const handleEditCourse = () => {
    if (editingCourse && editingCourse.name && editingCourse.description && editingCourse.price && editingCourse.imageUrl) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? editingCourse : course
      ));
      setEditingCourse(null);
      setIsEditDialogOpen(false);
    }
  };

  const startEditing = (course: Course) => {
    setEditingCourse(course);
    setIsEditDialogOpen(true);
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
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
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
                      value={curriculumInput}
                      onChange={(e) => setCurriculumInput(e.target.value)}
                      placeholder="Add a topic"
                    />
                    <Button type="button" onClick={handleAddCurriculumItem}>
                      Add Topic
                    </Button>
                  </div>
                  {newCourse.curriculum && newCourse.curriculum.length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                      {newCourse.curriculum.map((topic, index) => (
                        <li key={index} className="text-sm">{topic}</li>
                      ))}
                    </ul>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <ScrollArea className="h-full max-h-[calc(90vh-8rem)]">
              <div className="grid gap-4 py-4 pr-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input
                    id="edit-name"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    placeholder="Enter course name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    placeholder="Enter course category"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingCourse.description}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                    placeholder="Enter course description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                    placeholder="Enter course price"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={editingCourse.imageUrl}
                    onChange={(e) => setEditingCourse({ ...editingCourse, imageUrl: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Curriculum Topics</Label>
                  <div className="flex gap-2">
                    <Input
                      value={curriculumInput}
                      onChange={(e) => setCurriculumInput(e.target.value)}
                      placeholder="Add a topic"
                    />
                    <Button 
                      type="button" 
                      onClick={() => {
                        if (curriculumInput.trim()) {
                          setEditingCourse({
                            ...editingCourse,
                            curriculum: [...editingCourse.curriculum, curriculumInput.trim()]
                          });
                          setCurriculumInput("");
                        }
                      }}
                    >
                      Add Topic
                    </Button>
                  </div>
                  {editingCourse.curriculum.length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                      {editingCourse.curriculum.map((topic, index) => (
                        <li key={index} className="text-sm">
                          {topic}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-2"
                            onClick={() => setEditingCourse({
                              ...editingCourse,
                              curriculum: editingCourse.curriculum.filter((_, i) => i !== index)
                            })}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
          <div className="flex justify-end gap-2 mt-4">
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
                <TableCell>₹{course.price.toLocaleString()}</TableCell>
                <TableCell>{course.curriculum.join(", ")}</TableCell>
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
