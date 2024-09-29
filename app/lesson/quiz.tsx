"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
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
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  }

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  }

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
        setStatus("none");
        setSelectedOption(undefined);
        return;
    }

    if (status === "correct") {
        onNext();
        setStatus("none");
        setSelectedOption(undefined);
        return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
        return;
    }

    if (correctOption.id === selectedOption) {
        console.log("Correct option!")
    } else {
        console.error("Incorrect option!")
    }
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
      

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubcription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div
            className="lg:min-h-[350] lg:w-[600px] w-full px-6 lg:px-0
                    flex flex-col gap-y-12"
          >
            <h1
              className="text-lg lg:text-3xl text-center lg:text-start
            font-bold text-neutral-700"
            >
              {title}
            </h1>
            <div>
              {/* change back to type assist */}
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption} //type error, i used or undefined in the challenge component to try and fix
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
      disabled={!selectedOption}
      status={status}
      onCheck={onContinue}
      />
    </>
  );
};

// im not able to selcet my cards with my keys TODO 6:30:19