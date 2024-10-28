import { formatDistanceStrict } from "date-fns";
export const calculateAge = (date: Date) => {
    if (!date) return
    return formatDistanceStrict(date, new Date(), {
        addSuffix: true,
    });
};
