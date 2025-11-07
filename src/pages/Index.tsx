import { useState } from "react";
import { AssignmentForm, Assignment } from "@/components/AssignmentForm";
import { Assignment3DCard } from "@/components/Assignment3DCard";
import { AssignmentList } from "@/components/AssignmentList";
import { BookOpen, Sparkles } from "lucide-react";

const Index = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const handleCreateAssignment = (assignment: Assignment) => {
    setAssignments([assignment, ...assignments]);
    setSelectedAssignment(assignment);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">3D Homework Creator</h1>
              <p className="text-muted-foreground font-handwriting text-xl">
                Create beautiful assignments in your handwriting style
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <AssignmentForm onSubmit={handleCreateAssignment} />
            
            {/* Assignments List */}
            {assignments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                  Your Assignments
                </h2>
                <AssignmentList
                  assignments={assignments}
                  onSelect={setSelectedAssignment}
                  selectedId={selectedAssignment?.id}
                />
              </div>
            )}
          </div>

          {/* Right Column - 3D Viewer */}
          <div className="lg:sticky lg:top-8 space-y-4" style={{ height: "fit-content" }}>
            {selectedAssignment ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">3D Preview</h2>
                  <p className="text-sm text-muted-foreground">
                    Drag to rotate • Scroll to zoom
                  </p>
                </div>
                <Assignment3DCard assignment={selectedAssignment} />
              </>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-border bg-card p-12 text-center shadow-card">
                <div className="mx-auto w-fit p-4 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to Create!</h3>
                <p className="text-muted-foreground text-lg font-handwriting">
                  Fill in the form to create your first 3D homework assignment
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
