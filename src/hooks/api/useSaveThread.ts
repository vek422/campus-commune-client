import { BACKEND_BASE_URL } from "@/config/config"
import { useAppDispatch, useAppSelector } from "@/store/store"
import axios from "axios"
import { saveThread as saveThreadAction } from "@/store/reducers/authReducer"
export const useSaveThread = () => {
    const { token } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const saveThread = async (threadId: string) => {
        try {
            const { data, status } = await axios.post(`${BACKEND_BASE_URL}/user/save-thread`, {
                threadId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status === 200) {
                dispatch(saveThreadAction({ _id: threadId }))
            } else {
                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return saveThread;
}