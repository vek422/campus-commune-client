
export const threadActions = {
    PUSH_THREADS: "PUSH_THREADS",
    ADD_FRONT: "ADD_FRONT",
    DELETE_THREAD: "DELETE_THREAD",
}
export function threadReducer(threads, action) {
    switch (action.type) {
        case "PUSH_THREADS": {
            return [...threads, ...action.payload.threads]
        }
        case "ADD_FRONT": {
            return [...action.payload.threads, ...threads]
        }
        case "DELETE_THREAD": {
            return threads.filter(thread => thread._id !== action.payload.threadId)
        }

    }
}