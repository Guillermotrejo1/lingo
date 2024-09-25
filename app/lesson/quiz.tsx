"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react";
import { Header } from "./header";

type Props = { 
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[];
    userSubcription: any; //TODO replace with subscriptions DB type
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubcription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);

    return (
        <>
            <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubcription?.isActive}
            />
        </>
    )
}

