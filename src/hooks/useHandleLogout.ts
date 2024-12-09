import { logout } from "@/store/reducers/authReducer";
// import { clearCommunes } from "@/store/reducers/CommuneReducer";
import { useDispatch } from "react-redux"

export const useHandleLogout = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        // dispatch(clearCommunes())
    }

    return handleLogout
}

