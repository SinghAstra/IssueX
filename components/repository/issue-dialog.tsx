import { getIssueComments } from "@/app/actions/repositories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Comment, IssueStatus, IssueType } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CommentsSkeleton } from "../comments/CommentSkeleton";
import { CommentsList } from "../comments/CommentsList";

export interface Issue {
  id: string;
  title: string;
  body: string | null;
  issueType: IssueType;
  status: IssueStatus;
  createdAt: Date;
}

interface IssueDialogProps {
  issue?: Issue;
  onClose: () => void;
}

export function IssueDialog({ issue, onClose }: IssueDialogProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!issue) return;

    setIsCommentsLoading(true);
    setCommentsError(null);

    try {
      const comments = await getIssueComments(issue.id);
      setComments(comments);
    } catch (error) {
      console.log("error --fetchComments", error);
      setCommentsError("Failed to load comments. Please try again.");
    } finally {
      setIsCommentsLoading(false);
    }
  }, [issue]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!issue) return null;

  console.log("issue.body is ", issue.body);

  return (
    <Dialog open={!!issue} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{issue.title}</DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            Created {formatDistanceToNow(issue.createdAt, { addSuffix: true })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {issue.body && (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold mb-4" {...props} />
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold mb-3" {...props} />
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-semibold mb-2" {...props} />
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4" {...props} />
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4" {...props} />
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                }}
              >
                {issue.body}
              </ReactMarkdown>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Comments</h3>
            </div>

            <div className="space-y-4">
              {isCommentsLoading ? (
                <CommentsSkeleton />
              ) : commentsError ? (
                <div className="text-red-500 text-center py-4">
                  {commentsError}
                  <button
                    onClick={() => fetchComments()}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <CommentsList comments={comments} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
