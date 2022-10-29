import { Link } from "react-router-dom";
import {
  AddButton,
  ArrowSortIcon,
  BackIcon,
  PencilIcon,
} from "../component/ui";
import TodoEmptyIllustration from "./../assets/illustrations/todo-empty-state.svg";

export const Detail = () => {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-6">
          <Link to="/">
            <BackIcon />
          </Link>
          <h1 className="text-custom-black font-bold text-4xl">New Activity</h1>
          <button>
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
