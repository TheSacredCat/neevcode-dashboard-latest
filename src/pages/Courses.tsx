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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  classes?: number; // Add optional classes field
}

const apiDomain='http://192.168.29.209:5000';

// Predefined categories
const CATEGORIES = [
  "Cybersecurity",
  "AI/ML",
  "Designing",
  "UI/UX",
  "Web Development",
  "Data Science",
  "Other"
];

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(apiDomain+'/api/course');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        console.log(data);
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
    curriculum: [],
    classes: 1 // Default to 1 class
  });
  const [curriculumTitle, setCurriculumTitle] = useState("");
  const [curriculumItem, setCurriculumItem] = useState("");
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCurriculumTitle, setEditingCurriculumTitle] = useState("");
  const [editingCurriculumItem, setEditingCurriculumItem] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [isOtherCategory, setIsOtherCategory] = useState(false);

  const generateUniqueId = () => {
    const existingIds = courses.map(course => course.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  };
  
  const uid=generateUniqueId();
  const handleAddCourse = () => {
    // Handle custom category if "Other" is selected
    let finalCategory = newCourse.category;
    if (isOtherCategory && customCategory) {
      finalCategory = customCategory;
    }

    if (!newCourse.name || !newCourse.description || newCourse.price === null || !newCourse.imageUrl || newCourse.curriculum.length === 0) {
      toast.error("Please fill all required fields, including at least one topic.", {
        position: "top-right",
        style: { background: "#ef4444", color: "white" },
      });
      return;
    }

    const courseToAdd = {
      ...newCourse as Course,
      id: uid,
      category: finalCategory || "",
      curriculum: newCourse.curriculum || []
    };

    setCourses([
      ...courses,
      courseToAdd
    ]);
    const addCourseAPI = async () => {
      try {
        const response = await fetch(apiDomain+'/api/addEditCourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseToAdd)
        });
        if (!response.ok) {
          toast.error("Could not update course in backend", {
            position: "top-right",
            style: { background: "red", color: "white" },
          });
          throw new Error('Failed to update courses to backend');
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not update course in backend", {
          position: "top-right",
          style: { background: "red", color: "white" },
        });
      }
    };
    addCourseAPI();
    setNewCourse({
      name: "",
      description: "",
      price: null,
      imageUrl: "",
      category: "",
      curriculum: [],
      classes: 1
    });
    setIsAddingCourse(false);
    setCustomCategory("");
    setIsOtherCategory(false);
    toast.success("Course added successfully!", {
      position: "top-right",
      style: { background: "#10b981", color: "white" },
    });
  };

  const handleDeleteCourse = (id: number) => {
    const deleteCourseAPI = async () => {
      try {
        const response = await fetch(apiDomain+'/api/addEditCourse', {
          
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            id: id,
          } )
        });
        if (!response.ok) {
          toast.error("Could not delete course in backend", {
            position: "top-right",
            style: { background: "red", color: "white" },
          });
          throw new Error('Failed to delete courses to backend');
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not delete course in backend", {
          position: "top-right",
          style: { background: "red", color: "white" },
        });
      }
    };
    deleteCourseAPI();    
    setCourses(courses.filter(course => course.id !== id));
    toast.success("Course deleted successfully!", {
      position: "top-right",
      style: { background: "#10b981", color: "white" },
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
    if (!editingCourse || !editingCourse.name || !editingCourse.description || editingCourse.price === null || !editingCourse.imageUrl || editingCourse.curriculum.length === 0) {
      toast.error("Please fill all required fields, including at least one topic.", {
        position: "top-right",
        style: { background: "#ef4444", color: "white" },
      });
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingCourse.id ? editingCourse : course
    ));
    setEditingCourse(null);
    setIsEditDialogOpen(false);
    const editCourseAPI = async () => {
      try {
        const response = await fetch(apiDomain+'/api/addEditCourse', {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            id: editingCourse.id,
            name: editingCourse.name,
            category: editingCourse.category,
            description: editingCourse.description,
            price: editingCourse.price,
            imageUrl: editingCourse.imageUrl,
            curriculum: editingCourse.curriculum,
            classes: editingCourse.classes
          } )
        });
        if (!response.ok) {
          toast.error("Could not update course in backend", {
            position: "top-right",
            style: { background: "red", color: "white" },
          });
          throw new Error('Failed to update courses to backend');
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not update course in backend", {
          position: "top-right",
          style: { background: "red", color: "white" },
        });
      }
    };
    editCourseAPI();
    toast.success("Course updated successfully!", {
      position: "top-right",
      style: { background: "#10b981", color: "white" },
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

  const handleCategoryChange = (value: string) => {
    setNewCourse({ ...newCourse, category: value });
    setIsOtherCategory(value === "Other");
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
          <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full max-h-[calc(90vh-8rem)] pr-4">
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
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Select 
                    onValueChange={handleCategoryChange}
                    value={newCourse.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {isOtherCategory && (
                    <div className="mt-2">
                      <Input
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom category"
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="classes">Number of Classes</Label>
                  <Input
                    id="classes"
                    type="number"
                    min="1"
                    value={newCourse.classes}
                    onChange={(e) => setNewCourse({ ...newCourse, classes: Number(e.target.value) })}
                    placeholder="Enter number of classes"
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
                                onKeyDown={(e) => handleAddCurriculumItem(topicIndex, e)}
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
                  <Label htmlFor="edit-classes">Number of Classes</Label>
                  <Input
                    id="edit-classes"
                    type="number"
                    min="1"
                    value={editingCourse.classes || 1}
                    onChange={(e) => setEditingCourse({ ...editingCourse, classes: Number(e.target.value) })}
                    placeholder="Enter number of classes"
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
                    value={editingCourse.price === null ? "" : editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value === "" ? null : Number(e.target.value) })}
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
                      value={editingCurriculumTitle}
                      onChange={(e) => setEditingCurriculumTitle(e.target.value)}
                      onKeyDown={(e) => handleEditCurriculumTopic(e)}
                      placeholder="Add a topic title"
                    />
                    <Button type="button" onClick={() => handleEditCurriculumTopic()}>
                      Add Topic
                    </Button>
                  </div>
                  <div className="space-y-4 mt-4">
                    {editingCourse.curriculum.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium mb-2">{topic.title}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => {
                              const updatedCurriculum = editingCourse.curriculum.filter((_, index) => index !== topicIndex);
                              setEditingCourse({ ...editingCourse, curriculum: updatedCurriculum });
                            }}
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
                                onClick={() => {
                                  const updatedCurriculum = [...editingCourse.curriculum];
                                  updatedCurriculum[topicIndex].items = updatedCurriculum[topicIndex].items.filter((_, index) => index !== itemIndex);
                                  setEditingCourse({ ...editingCourse, curriculum: updatedCurriculum });
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex gap-2 mt-2">
                            <Input
                              value={editingCurriculumItem}
                              onChange={(e) => setEditingCurriculumItem(e.target.value)}
                              onKeyDown={(e) => handleEditCurriculumItem(topicIndex, e)}
                              placeholder="Add a subtopic"
                            />
                            <Button type="button" onClick={() => handleEditCurriculumItem(topicIndex)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
              <TableHead>Classes</TableHead>
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
                <TableCell>{course.classes || "-"}</TableCell>
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