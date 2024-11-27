import { BACKEND_BASE_URL } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { addRole as addRoleToCommune } from "@/store/reducers/CommuneReducer";
export const useAddRole = ({ communeId }: { communeId: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const addRole = async ({ roleName, roleDescription, handleCloseDialog = () => { } }: { roleName: string, roleDescription: string, handleCloseDialog?(): void; }) => {
        setIsLoading(true)
        try {

            const { data, status } = await axios.post(`${BACKEND_BASE_URL}/commune/${communeId}/add-role`, {
                roleName,
                roleDescription
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (status === 200) {
                try {
                    dispatch(addRoleToCommune({ communeId, role: data.role }));
                    toast({ title: "Role Added", description: "success" });
                    handleCloseDialog();
                } catch (err) {
                    console.log(err)
                }

            } else {
                console.error(data);
                toast({ title: "Error", description: "Failed to add role" })
            }
        } catch (err: any) {
            console.log(err)
            toast({ title: "Error", description: "Failed to add role" })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        addRole,
        isLoading
    }
}