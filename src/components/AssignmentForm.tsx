import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  tasks: string[];
  createdAt: Date;
}

interface AssignmentFormProps {
  onSubmit: (assignment: Assignment) => void;
}

export const AssignmentForm = ({ onSubmit }: AssignmentFormProps) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<string[]>([""]);

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !subject.trim()) {
      toast.error("Please fill in title and subject");
      return;
    }

    const filteredTasks = tasks.filter(task => task.trim() !== "");
    
    if (filteredTasks.length === 0) {
      toast.error("Please add at least one task");
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      title,
      subject,
      description,
      tasks: filteredTasks,
      createdAt: new Date(),
    };

    onSubmit(assignment);
    
    // Reset form
    setTitle("");
    setSubject("");
    setDescription("");
    setTasks([""]);
    
    toast.success("Assignment created!");
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-3xl">Create New Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Assignment Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Math Chapter 5 Review"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics, Science, History"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional instructions or context..."
              className="min-h-24 text-base"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Tasks</Label>
              <Button
                type="button"
                onClick={addTask}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={task}
                    onChange={(e) => updateTask(index, e.target.value)}
                    placeholder={`Task ${index + 1}`}
                    className="text-base"
                  />
                  {tasks.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeTask(index)}
                      variant="ghost"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Create Assignment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
