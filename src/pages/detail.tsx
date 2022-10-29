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
  UpIcon,
} from "../component/ui";
import { BASE_URL } from "../config";
import { priorityData } from "../data";
import { queryClient } from "../lib";
import { PriorityType } from "../types";
import TodoEmptyIllustration from "./../assets/illustrations/todo-empty-state.svg";

export const Detail = () => {
  const { activityId } = useParams();
  const [isEditedText, setIsEditedText] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>();
  const {
    isLoading,
    error,
    data: activityData,
  } = useQuery(["todoData"], () =>
    fetch(`${BASE_URL}/activity-groups/${activityId}`).then((res) => res.json())
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
            onClick={async () => {
              if (isEditedText) {
                await changeTitle(title ?? "");
              } else {
                setIsEditedText(true);
              }
            }}
            className="z-10"
          >
            <PencilIcon />
          </button>
        </div>
        <div className="flex justify-end items-center gap-4">
          <button className="p-3 rounded-full border-[1px] border-custom-icon-gray">
            <ArrowSortIcon />
          </button>
          <AddButton
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="absolute w-full h-screen top-0 flex flex-col justify-center items-center"
          >
            <Dialog.Panel className="bg-white rounded-xl max-w-md w-full modal-shadow">
              <Dialog.Title className="px-7 pt-6 pb-4 border-b-[1px] border-b-custom-grey-secondary flex justify-between">
                <h3 className="font-semibold text-lg">Tambah List Item</h3>
                <button onClick={() => setIsOpen(false)}>
                  <CloseIcon />
                </button>
              </Dialog.Title>
              <Dialog.Description className="px-7 pt-9 pb-5 border-b-[1px] border-b-custom-grey-secondary flex flex-col gap-7">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="font-semibold text-xs">
                    NAMA LIST ITEM
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Tambahkan nama list item"
                    className="py-3 px-4 placeholder:text-custom-icon-grey font-normal text-sm text-custom-black outline-none border-[1px] border-custom-grey-secondary rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label htmlFor="title" className="font-semibold text-xs">
                    PRIORITY
                  </label>
                  <Listbox
                    value={selectedPriority}
                    onChange={setSelectedPriority}
                  >
                    {({ open }) => {
                      return (
                        <>
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
                        </>
                      );
                    }}
                  </Listbox>
                </div>
              </Dialog.Description>
              <div className="px-7 flex justify-end pt-3 pb-4">
                <button
                  className="py-3 px-6 bg-custom-blue rounded-full text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Simpan
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>
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
