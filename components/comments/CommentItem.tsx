import { Badge } from "@/components/ui/badge";
import { Comment } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div
      className={`p-4 rounded-lg ${
        comment.isAiGenerated
          ? "bg-primary/10 border border-primary/20"
          : "bg-secondary"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {comment.isAiGenerated && <Badge variant="default">AI Generated</Badge>}
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(comment.createdAt, {
            addSuffix: true,
          })}
        </span>
      </div>
      <p className="text-sm">{comment.body}</p>
    </div>
  );
}
