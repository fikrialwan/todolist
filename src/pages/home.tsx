import { AddButton } from "../component/ui";
import ActivityEmptyIllustration from "./../assets/illustrations/activity-empty-state.svg";

export const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between items-center">
        <h1 className="text-custom-black font-bold text-4xl">Activity</h1>
        <AddButton onClick={() => {}} />
      </section>
      <section className="w-full flex-1">
        <img
          src={ActivityEmptyIllustration}
          alt="Activity Empty Illustration"
          className="object-contain object-top max-w-xl w-full mx-auto"
        />
      </section>
    </div>
  );
};
