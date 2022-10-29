import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AddButton,
  ArrowSortIcon,
  BackIcon,
  PencilIcon,
} from "../component/ui";
import { BASE_URL } from "../config";
import TodoEmptyIllustration from "./../assets/illustrations/todo-empty-state.svg";

export const Detail = () => {
  const { activityId } = useParams();
  const [isEditedText, setIsEditedText] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>();
  const {
    isLoading,
    error,
    data: activityData,
  } = useQuery(["todoData"], () =>
    fetch(`${BASE_URL}/activity-groups/${activityId}`).then((res) => res.json())
  );

  useEffect(() => {
    if (activityData) {
      setTitle(activityData.title);
    }
  }, [activityData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {isEditedText && (
        <div
          className="absolute top-0 w-full h-screen bg-transparent"
          onClick={() => setIsEditedText(false)}
        />
      )}
      <section className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-6">
          <Link to="/">
            <BackIcon />
          </Link>
          {isEditedText ? (
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              name="title"
              autoFocus={true}
              className="text-custom-black font-bold z-10 text-4xl bg-transparent outline-none py-1 border-b-[1px] border-b-custom-black"
            />
          ) : (
            <h1
              className="text-custom-black font-bold text-4xl"
              onClick={() => setIsEditedText(true)}
            >
              {title ?? activityData?.title}
            </h1>
          )}
          <button
            onClick={() => setIsEditedText((prev) => !prev)}
            className="z-10"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="flex justify-end items-center gap-4">
          <button className="p-3 rounded-full border-[1px] border-custom-icon-gray">
            <ArrowSortIcon />
          </button>
          <AddButton onClick={() => {}} />
        </div>
      </section>
      <section className="w-full flex-1">
        <img
          src={TodoEmptyIllustration}
          alt="Activity Empty Illustration"
          className="object-contain object-top max-w-xl w-full mx-auto"
        />
      </section>
    </div>
  );
};
