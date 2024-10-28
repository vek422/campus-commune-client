import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useFetchThreadComments } from "@/hooks/api/useFetchThreadComments";
import { LoadingButton } from "../ui/loadingButton";
import { usePostComment } from "@/hooks/api/usePostComment";
import { calculateAge } from "@/lib/calculateAge";
import { usePostCommentReply } from "@/hooks/api/usePostCommentReply";
import { useFetchCommentReplies } from "@/hooks/api/useFetchCommentReplies";
import { Card } from "../ui/card";

export function Thread({ thread }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <Card
      className="w-full  h-auto bg-secondary/5 border border-secondary rounded-xl p-2 
    flex flex-col gap-2 "
    >
      <div className="flex gap-2 ">
        <Avatar className="h-7 w-7">
          <AvatarImage
            src={`${BACKEND_BASE_URL}/static/${thread?.createdBy.profileUri}`}
            className="object-cover"
          />
          <AvatarFallback className="text-xs">
            {thread?.createdBy?.firstName[0] + thread?.createdBy?.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-1 flex-col w-full">
          <div className="flex items-end gap-2">
            <p className="text-sm">{`${thread?.createdBy?.firstName} ${thread?.createdBy?.lastName}`}</p>
            <p className="text-xs">{calculateAge(thread?.createdAt)}</p>
          </div>
          <h1 className="text-xl font-bold">{thread?.title}</h1>
          <p className="text-sm font-semibold">{thread?.content}</p>
          <ThreadMedia images={thread?.imagesUri} />
          <ThreadToolbar
            toggleComment={() => setShowComments((state) => !state)}
          />
          {showComments && <ThreadComments thread={thread} />}
        </div>
      </div>
    </Card>
  );
}

const ThreadMedia = ({ images }: { images?: string[]; videos?: string[] }) => {
  return (
    <div className="flex gap-2">
      {images?.map((imageUri) => (
        <img
          src={`${BACKEND_BASE_URL}/static/${imageUri}`}
          alt="commune"
          className="w-44 h-44 object-cover overflow-hidden rounded-lg border border-muted shadow-sm"
        />
      ))}
    </div>
  );
};
function AddThreadComment({ threadId, addCommentOptmistically }) {
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");

  const { isLoading, error, postComment, success, savedComment } =
    usePostComment(threadId);
  const handlePostComment = () => {
    if (content.length > 0) postComment(content, user?._id as string);
  };

  useEffect(() => {
    if (success) {
      setContent("");
      if (savedComment) addCommentOptmistically(savedComment);
    }
  }, [success, savedComment]);
  return (
    <div className=" flex gap-2 items-center w-full">
      <Avatar className="w-7 h-7">
        <AvatarImage
          src={`${BACKEND_BASE_URL}/static/${user?.profileUrl}`}
          className="object-cover"
        />
        <AvatarFallback>
          {`${user?.firstName[0]}${user?.lastName[0]}`}
        </AvatarFallback>
      </Avatar>
      <Input
        className="border-none"
        placeholder="Add Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <LoadingButton
        isLoading={isLoading}
        variant={"default"}
        size={"icon"}
        onClick={handlePostComment}
      >
        <SendHorizonal />
      </LoadingButton>
    </div>
  );
}

function ThreadComments({ thread }) {
  const {
    comments,
    isLoading,
    error,
    fetchThreadComments,
    hasMore,
    addCommentOptimistically,
  } = useFetchThreadComments(thread._id);
  useEffect(() => {
    fetchThreadComments();
  }, []);
  console.log("1");
  return (
    <div className="flex flex-col gap-2">
      <AddThreadComment
        threadId={thread._id}
        addCommentOptmistically={addCommentOptimistically}
      />
      {comments &&
        comments.map((comment) => (
          <ThreadCommentCard
            key={comment._id}
            comment={comment}
            threadId={thread._id}
          />
        ))}
      {isLoading && <p>Loading...</p>}
      {hasMore && (
        <Button
          onClick={fetchThreadComments}
          variant={"link"}
          className="text-primary-foreground"
        >
          Load More
        </Button>
      )}
    </div>
  );
}

function ThreadCommentCard({ comment, threadId }) {
  const [showComments, setShowComments] = useState(false);
  const {
    comments,
    isLoading,
    error,
    fetchCommentReplies,
    hasMore,
    addReplyOptimistically,
  } = useFetchCommentReplies({ threadId, commentId: comment._id });

  console.log("replies:", comments);
  useEffect(() => {
    if (showComments) fetchCommentReplies();
  }, [showComments]);

  if (!comment) return null;
  return (
    <div className="rounded-lg p-2 bg-muted/20 border-muted border flex flex-col">
      <div className="flex gap-2 items-center">
        <Avatar className="h-7 w-7">
          <AvatarFallback>
            {comment.createdBy.firstName[0]}
            {comment.createdBy.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm">{`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}</p>
        <p className="text-xs">{calculateAge(comment?.createdAt)}</p>
      </div>
      <div className="pl-9 flex flex-col gap-2">
        <p className="text-sm font-semibold">{comment.content}</p>
        <div className="flex gap-2">
          <Button size={"icon"} variant={"ghost"}>
            <Heart size={14} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              setShowComments((state) => !state);
            }}
          >
            <MessageSquare size={14} />
          </Button>
        </div>
        {showComments && (
          <>
            {/*  Add Reply*/}
            <PostCommentReply
              commentId={comment._id}
              threadId={threadId}
              addReplyOptimistically={addReplyOptimistically}
            />
            {/* Comment Replies */}
            <div className="flex flex-col w-full gap-2">
              {comments &&
                comments.map((reply) => (
                  <ThreadCommentCard
                    key={reply._id}
                    comment={reply}
                    threadId={threadId}
                  />
                ))}
            </div>
            {hasMore && (
              <Button
                variant={"link"}
                onClick={fetchCommentReplies}
                className="text-primary-foreground"
              >
                Load More
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PostCommentReply({ commentId, threadId, addReplyOptimistically }) {
  console.log("Thread Id", threadId);
  const { isLoading, error, success, postCommentReply, savedReply } =
    usePostCommentReply(threadId);
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const handlePostReply = () => {
    if (content)
      postCommentReply({
        commentId,
        content,
        createdBy: user._id,
      });
  };
  useEffect(() => {
    if (success) {
      setContent("");
      if (savedReply) addReplyOptimistically(savedReply);
    }
  }, [success, savedReply]);

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={content}
        placeholder="comment"
        onChange={(e) => setContent(e.target.value)}
      />
      <LoadingButton onClick={handlePostReply} isLoading={isLoading}>
        <SendHorizonal size={20} />
      </LoadingButton>
    </div>
  );
}

function ThreadToolbar({ toggleComment }) {
  return (
    <div className="h-10 rounded-lg flex items-center max-w-min ">
      <Button
        variant={"ghost"}
        size={"icon"}
        className=""
        onClick={toggleComment}
      >
        <MessageSquare size={16} />
      </Button>
      <Button variant={"ghost"} className="" size={"icon"}>
        <Heart size={16} />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <Bookmark size={16} />
      </Button>
    </div>
  );
}
