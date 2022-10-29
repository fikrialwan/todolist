import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AddButton, TrashIcon } from "../component/ui";
import { BASE_URL, EMAIL } from "../config";
import { formatDate, queryClient } from "../lib";
import type { ActivityType } from "../types";
import ActivityEmptyIllustration from "./../assets/illustrations/activity-empty-state.svg";

interface MutationParameters {
  method: string;
  id?: number;
}

export const Home = () => {
  const { data } = useQuery(["todoData"], () =>
    fetch(`${BASE_URL}/activity-groups?email=${EMAIL}`).then((res) =>
      res.json()
    )
  );

  const mutation = useMutation(
    async (params: MutationParameters) => {
      switch (params.method) {
        case "add":
          await fetch(`${BASE_URL}/activity-groups`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "New Activity",
              email: EMAIL,
            }),
          });
          break;

        case "delete":
          await fetch(`${BASE_URL}/activity-groups/${params.id}`, {
            method: "delete",
          });
          break;

        default:
          break;
      }
    },
    {
      mutationKey: ["todoData"],
      onSuccess: () => {
        queryClient.invalidateQueries(["todoData"]);
      },
    }
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between items-center">
        <h1
          data-cy="activity-title"
          className="text-custom-black font-bold text-4xl"
        >
          Activity
        </h1>
        <AddButton
          datacy="activity-add-button"
          onClick={() => mutation.mutate({ method: "add" })}
        />
      </section>
      <section className="w-full flex-1" data-cy="activity-item">
        {data?.data?.length > 0 ? (
          <div className="card-container">
            {data.data.map(
              ({ id, title, created_at }: ActivityType, index: number) => {
                return (
                  <Link
                    to={`/detail/${id}`}
                    key={id}
                    data-cy={`activity-item-${index}`}
                  >
                    <article className="aspect-square rounded-xl card-shadow bg-white py-6 px-5 flex flex-col">
                      <h2
                        className="flex-1 font-bold text-lg"
                        data-cy="activity-title"
                      >
                        {title}
                      </h2>
                      <div className="flex justify-between">
                        <time data-cy="activity-date">
                          {formatDate(created_at)}
                        </time>
                        <TrashIcon
                          className="cursor-pointer"
                          onClick={() =>
                            mutation.mutate({ method: "delete", id })
                          }
                          data-cy="activity-item-delete-button"
                        />
                      </div>
                    </article>
                  </Link>
                );
              }
            )}
          </div>
        ) : (
          <img
            data-cy="activity-empty-state"
            src={ActivityEmptyIllustration}
            alt="Activity Empty Illustration"
            className="object-contain object-top max-w-xl w-full mx-auto"
            onClick={() => mutation.mutate({ method: "add" })}
          />
        )}
      </section>
    </div>
  );
};
