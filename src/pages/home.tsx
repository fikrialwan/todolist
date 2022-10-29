import { useQuery } from "@tanstack/react-query";
import { AddButton, TrashIcon } from "../component/ui";
import { BASE_URL, EMAIL } from "../config";
import type { ActivityType } from "../types";
import { formatTextShy } from "../utils";
import ActivityEmptyIllustration from "./../assets/illustrations/activity-empty-state.svg";

export const Home = () => {
  const { data } = useQuery(["todoData"], () =>
    fetch(`${BASE_URL}/activity-groups?email=${EMAIL}`).then((res) =>
      res.json()
    )
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between items-center">
        <h1 className="text-custom-black font-bold text-4xl">Activity</h1>
        <AddButton onClick={() => {}} />
      </section>
      <section className="w-full flex-1">
        {data?.data?.length > 0 ? (
          <div className="card-container">
            {data.data.map(({ id, title, created_at }: ActivityType) => {
              return (
                <article
                  key={id}
                  className="aspect-square rounded-xl card-shadow bg-white py-6 px-5 flex flex-col"
                >
                  <h2
                    className="flex-1 text-hyphens"
                    dangerouslySetInnerHTML={{ __html: formatTextShy(title) }}
                  />
                  <div className="flex justify-between">
                    <time>{created_at}</time>
                    <TrashIcon />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <img
            src={ActivityEmptyIllustration}
            alt="Activity Empty Illustration"
            className="object-contain object-top max-w-xl w-full mx-auto"
          />
        )}
      </section>
    </div>
  );
};
