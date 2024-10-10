import { auth } from "@clerk/nextjs/server";

const adminIds = [
    "user_2m9RTrJ6awDo4YM9ShMXuvBh00r",
];

export const isAdmin = () => {
    const { userId } = auth();

    if (!userId) {
        return false
    }

    return adminIds.indexOf(userId) !== -1
}