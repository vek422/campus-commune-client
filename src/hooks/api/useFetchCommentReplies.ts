import { BACKEND_BASE_URL } from "@/config/config";
import axios from "axios";
import { useState } from "react";

export const useFetchCommentReplies = ({ threadId, commentId }: {
    threadId: string | undefined
    , commentId: string
}) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const limit = 5;
    const fetchCommentReplies = async () => {
        if (!hasMore) return;
        setIsLoading(true);
        try {
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/thread/${threadId}/comment/${commentId}/replies?limit=${limit}&page=${page}`);

            if (status === 200) {
                setComments(state => [...state, ...data.comments]);
                setPage(state => state + 1);
                setHasMore(data.hasMore)
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false)
        }
    }

    const addReplyOptimistically = (reply: any) => {
        setComments(state => [reply, ...state]);
    }

    return {
        addReplyOptimistically,
        comments,
        isLoading,
        error,
        fetchCommentReplies,
        hasMore
    }
}