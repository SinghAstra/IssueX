import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IssueStatus, IssueType } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, X } from "lucide-react";
import { Badge } from "../ui/badge";

interface Comment {
  id: string;
  body: string;
  isAiGenerated: boolean;
  createdAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  body: string | null;
  issueType: IssueType;
  status: IssueStatus;
  createdAt: Date;
  comments: Comment[];
}

interface IssueDialogProps {
  issue?: Issue;
  onClose: () => void;
  onGenerateAiResponse: (issueId: string) => void;
}

export function IssueDialog({
  issue,
  onClose,
  onGenerateAiResponse,
}: IssueDialogProps) {
  if (!issue) return null;

  return (
    <Dialog open={!!issue} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{issue.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Created {formatDistanceToNow(issue.createdAt, { addSuffix: true })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {issue.body && (
            <div className="prose prose-invert max-w-none">{issue.body}</div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Comments</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateAiResponse(issue.id)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Generate AI Response
              </Button>
            </div>

            <div className="space-y-4">
              {issue.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg ${
                    comment.isAiGenerated
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {comment.isAiGenerated && (
                      <Badge variant="default">AI Generated</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
