import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bookmark, BookmarkCheck, Heart, MessageSquare } from "lucide-react";
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
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import ThreadDropdown from "./ThreadDropdown";
import { Link, useParams } from "react-router-dom";
import { useSaveThread } from "@/hooks/api/useSaveThread";
import { parseContent } from "@/lib/parseThreadContent";

export function Thread({ thread, showContext = true }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <Card
      id={thread?._id}
      className="w-full  h-auto bg-secondary/5 border border-secondary rounded-xl p-2 
    flex flex-col gap-2  relative"
    >
      <div className="absolute right-0 ">
        {showContext && (
          <ThreadDropdown
            threadId={thread?._id}
            createdBy={thread?.createdBy}
            channelId={thread?.channelId}
            communeId={thread?.communeId}
          />
        )}
      </div>
      <div className="flex gap-2 ">
        <Avatar className="h-7 w-7">
          <AvatarImage
            src={thread?.createdBy?.profileUri}
            className="object-cover"
          />
          <AvatarFallback className="text-xs">
            {thread?.createdBy?.firstName.length > 0
              ? thread.createdBy?.firstName[0]
              : ""}{" "}
            {thread?.createdBy?.lastName.length > 0
              ? thread?.createdBy?.lastName[0]
              : ""}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-1 flex-col w-full">
          <div className="flex items-end gap-2">
            <p className="text-sm">{`${thread?.createdBy?.firstName} ${thread?.createdBy?.lastName}`}</p>
            <p className="text-xs">{calculateAge(thread?.createdAt)}</p>
          </div>
          <Link
            to={`/commune/${thread?.communeId}/channel/${thread?.channelId}/thread/${thread._id}`}
          >
            <h1 className="text-xl font-bold hover:text-secondary-foreground hover:underline underline-offset-2">
              {thread?.title}
            </h1>
          </Link>
          <p className="text-sm font-semibold">
            {parseContent(thread?.content)}
          </p>
          <ThreadMedia images={thread?.imagesUri} />

          {showContext && (
            <ThreadToolbar
              threadId={thread._id}
              toggleComment={() => setShowComments((state) => !state)}
            />
          )}
          {showContext && showComments && <ThreadComments thread={thread} />}
        </div>
      </div>
    </Card>
  );
}

export const ThreadMedia = ({
  images,
}: {
  images?: string[];
  videos?: string[];
}) => {
  return (
    <div className="flex gap-2">
      {images?.map((imageUri) => (
        <Dialog>
          <DialogTrigger>
            <img
              key={imageUri}
              src={imageUri}
              alt="commune"
              className="w-44 h-44 object-cover overflow-hidden rounded-lg border border-muted shadow-sm"
            />
          </DialogTrigger>
          <DialogContent className="min-w-[80vw] max-w-[80vw] max-h-[80vh] justify-center bg-transparent items-center">
            <img
              key={imageUri}
              src={imageUri}
              alt="commune"
              className=" object-cover max-h-[70vh] overflow-hidden rounded-lg border border-muted shadow-sm"
            />
          </DialogContent>
        </Dialog>
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
        <AvatarImage src={user?.profileUrl} className="object-cover" />
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

export function ThreadComments({ thread }) {
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
  return (
    <div className="flex flex-col gap-2">
      <AddThreadComment
        threadId={thread._id}
        addCommentOptmistically={addCommentOptimistically}
      />
      {comments && comments.length ? (
        comments.map((comment) => (
          <ThreadCommentCard
            key={comment._id}
            comment={comment}
            threadId={thread._id}
          />
        ))
      ) : (
        <p className="pt-5 w-full text-center">No Comments</p>
      )}
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
          {/* <Button size={"icon"} variant={"ghost"}>
            <Heart size={14} />
          </Button> */}
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

function ThreadToolbar({ toggleComment, threadId }) {
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
      {/* <Button
        variant={isSaved ? "secondary" : "ghost"}
        size={"icon"}
        onClick={() => saveThread(threadId)}
      >
        {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      </Button> */}
    </div>
  );
}
