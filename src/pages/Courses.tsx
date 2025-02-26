
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

interface CourseContent {
  title: string;
  items: string[];
}

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
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
    price: 0,
    imageUrl: "",
    category: "",
    curriculum: []
  });
  const [curriculumTitle, setCurriculumTitle] = useState("");
  const [curriculumItem, setCurriculumItem] = useState("");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
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

  const handleAddCurriculumTopic = () => {
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
      setCurrentTopicIndex(null);
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
    setCurriculumTitle("");
    setCurriculumItem("");
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
                    value={curriculumTitle}
                    onChange={(e) => setCurriculumTitle(e.target.value)}
                    placeholder="Add a topic title"
                  />
                  <Button type="button" onClick={handleAddCurriculumTopic}>
                    Add Topic
                  </Button>
                </div>
                {newCourse.curriculum && newCourse.curriculum.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {newCourse.curriculum.map((topic, topicIndex) => (
                      <div key={topicIndex} className="border p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{topic.title}</h4>
                        <div className="space-y-2">
                          {topic.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2">
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                          {currentTopicIndex === topicIndex ? (
                            <div className="flex gap-2 mt-2">
                              <Input
                                value={curriculumItem}
                                onChange={(e) => setCurriculumItem(e.target.value)}
                                placeholder="Add a subtopic"
                              />
                              <Button type="button" onClick={() => handleAddCurriculumItem(topicIndex)}>
                                Add
                              </Button>
                              <Button type="button" variant="outline" onClick={() => setCurrentTopicIndex(null)}>
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setCurrentTopicIndex(topicIndex)}
                            >
                              Add Subtopic
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>₹{course.price.toLocaleString()}</TableCell>
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
