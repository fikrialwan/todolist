import { Dialog, Listbox } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AddButton,
  ArrowSortIcon,
  BackIcon,
  CheckIcon,
  CloseIcon,
  DownIcon,
  PencilIcon,
  TrashIcon,
  UpIcon,
} from "../component/ui";
import { BASE_URL } from "../config";
import { priorityData } from "../data";
import { queryClient } from "../lib";
import { PriorityType, TodoType } from "../types";
import TodoEmptyIllustration from "./../assets/illustrations/todo-empty-state.svg";

export const Detail = () => {
  const { activityId } = useParams();
  const [isEditedText, setIsEditedText] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [titleTodo, setTitleTodo] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>();
  const {
    isLoading,
    error,
    data: activityData,
  } = useQuery(["todoData"], () =>
    fetch(`${BASE_URL}/activity-groups/${activityId}`).then((res) => res.json())
  );

  const { data: todoData } = useQuery(["todo"], () =>
    fetch(`${BASE_URL}/todo-items?activity_group_id=${activityId}`).then(
      (res) => res.json()
    )
  );

  const activityMutate = useMutation(
    async (title: string) => {
      await fetch(`${BASE_URL}/activity-groups/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoData"]);
      },
    }
  );

  const todoMutate = useMutation(
    async () => {
      console.log(
        JSON.stringify({
          activity_group_id: activityId,
          title: titleTodo,
          priority: selectedPriority?.slug,
        })
      );
      await fetch(`${BASE_URL}/todo-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity_group_id: parseInt(activityId ?? "0"),
          title: titleTodo,
          priority: selectedPriority?.slug,
        }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todo"]);
      },
    }
  );

  const handleAddTodo = async () => {
    if (titleTodo && selectedPriority) {
      await todoMutate.mutate();
      setTitleTodo("");
      setSelectedPriority(undefined);
      setIsOpen(false);
    }
  };

  const changeTitle = async (title: string) => {
    setIsEditedText(false);
    await activityMutate.mutate(title);
  };

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
          onClick={() => changeTitle(title ?? "")}
        />
      )}
      <section className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-6">
          <Link to="/" data-cy="todo-back-button">
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
              data-cy="todo-title"
              className="text-custom-black font-bold text-4xl"
              onClick={() => setIsEditedText(true)}
            >
              {title ?? activityData?.title}
            </h1>
          )}
          <button
            onClick={async () => {
              if (isEditedText) {
                await changeTitle(title ?? "");
              } else {
                setIsEditedText(true);
              }
            }}
            className="z-10"
            data-cy="todo-title-edit-button"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="flex justify-end items-center gap-4">
          {todoData?.data?.length > 0 && (
            <button
              className="p-3 rounded-full border-[1px] border-custom-icon-gray"
              data-cy="todo-sort-button"
            >
              <ArrowSortIcon />
            </button>
          )}
          <AddButton
            datacy="todo-add-button"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <Dialog
            data-cy="modal-add"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="absolute w-full h-screen top-0 flex flex-col justify-center items-center"
          >
            <Dialog.Panel className="bg-white rounded-xl max-w-md w-full modal-shadow">
              <div className="px-7 pt-6 pb-4 border-b-[1px] border-b-custom-grey-secondary flex justify-between">
                <h3 className="font-semibold text-lg" data-cy="modal-add-title">
                  Tambah List Item
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  data-cy="modal-add-close-button"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="px-7 pt-9 pb-5 border-b-[1px] border-b-custom-grey-secondary flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="title"
                    className="font-semibold text-xs"
                    data-cy="modal-add-name-title"
                  >
                    NAMA LIST ITEM
                  </label>
                  <input
                    data-cy="modal-add-name-input"
                    value={titleTodo}
                    onChange={(event) => setTitleTodo(event.target.value)}
                    type="text"
                    name="title"
                    placeholder="Tambahkan nama list item"
                    className="py-3 px-4 placeholder:text-custom-icon-grey font-normal text-sm text-custom-black outline-none border-[1px] border-custom-grey-secondary rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="title"
                    className="font-semibold text-xs"
                    data-cy="modal-add-priority-title"
                  >
                    PRIORITY
                  </label>
                  <Listbox
                    value={selectedPriority}
                    onChange={setSelectedPriority}
                    data-cy="modal-add-priority-dropdown"
                  >
                    {({ open }) => {
                      return (
                        <div>
                          <Listbox.Button
                            className={`max-w-[205px] w-full self-start text-left ${
                              open ? "bg-custom-grey-primary" : "bg-white"
                            } py-3 px-4 text-custom-black outline-none border-[1px] border-custom-grey-secondary rounded-md flex justify-between items-center`}
                          >
                            {selectedPriority ? (
                              <div className="flex items-center">
                                <div
                                  className={`${selectedPriority.color} w-[14px] h-[14px] rounded-full mr-4`}
                                />{" "}
                                {selectedPriority.title}
                              </div>
                            ) : (
                              "Pilih priority"
                            )}
                            {open ? <UpIcon /> : <DownIcon />}
                          </Listbox.Button>
                          <Listbox.Options className="absolute top-[67px] bg-white max-w-[205px] w-full text-custom-black outline-none border-[1px] border-custom-grey-secondary">
                            {priorityData.map((priority) => (
                              <Listbox.Option
                                data-cy={`modal-add-priority-${
                                  priority.slug === "normal"
                                    ? "medium"
                                    : priority.slug
                                }`}
                                key={priority.slug}
                                value={priority}
                                className="outline-none border-[1px] py-3 px-4  border-custom-grey-secondary flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`${priority.color} w-[14px] h-[14px] rounded-full mr-4`}
                                  />{" "}
                                  {priority.title}
                                </div>
                                {priority.slug === selectedPriority?.slug && (
                                  <CheckIcon />
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      );
                    }}
                  </Listbox>
                </div>
              </div>
              <div className="px-7 flex justify-end pt-3 pb-4">
                <button
                  data-cy="modal-add-save-button"
                  className={`py-3 px-6 bg-custom-blue rounded-full text-white ${
                    !(titleTodo && selectedPriority) && "opacity-20"
                  }`}
                  onClick={handleAddTodo}
                >
                  Simpan
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </section>
      <section className="w-full flex-1">
        {todoData?.data?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {todoData.data.map((todo: TodoType) => {
              const priority: PriorityType = priorityData.filter(
                ({ slug }: PriorityType) => slug === todo.priority
              )[0];
              return (
                <div className="bg-white rounded-xl modal-shadow flex flex-row justify-between items-center py-7 px-6">
                  <div className="flex flex-row justify-start items-center gap-4">
                    <div data-cy="todo-item-checkbox" />
                    <div
                      data-cy="todo-item-priority-indicator"
                      className={`${priority.color} w-[14px] h-[14px]`}
                    />
                    <h3 data-cy="todo-item-title">{todo.title}</h3>
                    <button data-cy="todo-item-edit-button">
                      <PencilIcon />
                    </button>
                  </div>
                  <button data-cy="todo-item-delete-button">
                    <TrashIcon />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <img
            data-cy="todo-empty-state"
            src={TodoEmptyIllustration}
            alt="Activity Empty Illustration"
            className="object-contain object-top max-w-xl w-full mx-auto"
          />
        )}
      </section>
    </div>
  );
};
