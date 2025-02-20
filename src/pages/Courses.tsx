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
import { useState } from "react";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  curriculum: string[];
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "React Masterclass",
      description: "Complete React course from basics to advanced",
      price: 14999,
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      curriculum: ["React Basics", "Hooks", "State Management", "Advanced Patterns"]
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      description: "Deep dive into JavaScript concepts",
      price: 12499,
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
      curriculum: ["ES6+", "Promises", "Async/Await", "Design Patterns"]
    }
  ]);

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    curriculum: []
  });
  const [curriculumInput, setCurriculumInput] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.price && newCourse.imageUrl) {
      setCourses([
        ...courses,
        {
          ...newCourse as Course,
          id: courses.length + 1,
          curriculum: newCourse.curriculum || []
        }
      ]);
      setNewCourse({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
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
      setIsEditingCourse(false);
    }
  };

  const startEditing = (course: Course) => {
    setEditingCourse(course);
    setIsEditingCourse(true);
    setCurriculumInput("");
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
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
            <div className="flex justify-end gap-2">
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
        <Dialog open={isEditingCourse} onOpenChange={setIsEditingCourse}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            {editingCourse && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input
                    id="edit-name"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingCourse.description}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (₹)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={editingCourse.imageUrl}
                    onChange={(e) => setEditingCourse({ ...editingCourse, imageUrl: e.target.value })}
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
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingCourse(false)}>
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
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Topics</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
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
