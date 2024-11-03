import { BACKEND_BASE_URL } from "@/config/config";
import axios from "axios";
import { useState } from "react";

export const useFetchThreadComments = (threadId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const limit = 5;

    const fetchThreadComments = async () => {
        setIsLoading(true);
        try {
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/thread/${threadId}/comments?limit=${limit}&page=${page}`);

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
    const addCommentOptimistically = (comment) => {
        setComments(state => [comment, ...state]);
    }


    return {
        comments,
        isLoading,
        error,
        fetchThreadComments,
        hasMore,
        addCommentOptimistically
    }
}