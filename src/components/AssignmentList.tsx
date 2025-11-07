import { Assignment } from "./AssignmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen } from "lucide-react";

interface AssignmentListProps {
  assignments: Assignment[];
  onSelect: (assignment: Assignment) => void;
  selectedId?: string;
}

export const AssignmentList = ({ assignments, onSelect, selectedId }: AssignmentListProps) => {
  if (assignments.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="pt-12 pb-12 text-center">
          <p className="text-muted-foreground text-lg">No assignments yet. Create your first one!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card
          key={assignment.id}
          className={`cursor-pointer transition-smooth hover:shadow-float ${
            selectedId === assignment.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelect(assignment)}
        >
          <CardHeader>
            <CardTitle className="text-2xl flex items-start justify-between gap-4">
              <span className="flex-1">{assignment.title}</span>
              <span className="text-sm font-normal text-accent bg-accent/10 px-3 py-1 rounded-full">
                {assignment.subject}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignment.description && (
              <p className="text-muted-foreground text-base font-handwriting text-xl">
                {assignment.description}
              </p>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{assignment.tasks.length} tasks</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{assignment.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-1.5 pt-2">
              {assignment.tasks.slice(0, 3).map((task, index) => (
                <div
                  key={index}
                  className="text-base font-handwriting text-xl text-foreground/90 pl-4 border-l-2 border-primary/30"
                >
                  {index + 1}. {task}
                </div>
              ))}
              {assignment.tasks.length > 3 && (
                <div className="text-sm text-muted-foreground pl-4">
                  + {assignment.tasks.length - 3} more
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
