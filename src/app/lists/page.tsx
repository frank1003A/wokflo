"use client";
import { useTable } from "@refinedev/core";
import { RiDraggable } from "react-icons/ri";

const ListHeader = (list: any) => {
  return (
    <div className="flex items-center gap-2">
      {list.emoji}
      {list.name}
    </div>
  );
};

const TaskComponent = () => {
  return (
    <div draggable className="flex items-center  bg-[#eee] mb-3 p-2 gap-3">
      <button className="btn p-0 btn-square btn-ghost btn-xs hover:bg-none">
        <RiDraggable className="h-4 w-4" />
      </button>
      <input
        type="checkbox"
        defaultChecked
        className="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
      />
      <span className="text-black">fsfs</span>
    </div>
  );
};

export default function HomePageLists() {
  const {
    tableQueryResult: { data, isLoading, error },
  } = useTable();

  const Lists = data?.data;

  return (
    <>
      {/**{isLoading && <div>....Loading</div>}
      <Emoji unified="" />
      <EmojiPicker onEmojiClick={(e) => e.emoji} />
      

      <div className="bg-stone-50">
        <span className="text-neutral-500">
          Are you tired of juggling multiple task and deadlines? Our To-Do List
          app is here to simplify your life and boost your productivity. Whether
          it&apos;s work-related projects, household chores, or personal goals,
          we&apos;ve got you covered
        </span>
      </div>
      {Lists?.map((list) => {
        return (
          <div className="collapse" key={list.name}>
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title text-xl">
              <ListHeader {...list} />
            </div>
            <div className="collapse-content">
              <div className="flex-row">
                {list.tasks &&
                  list.tasks.map((task) => {
                    return <TaskComponent key={task.title} {...task} />;
                  })}
              </div>
            </div>
          </div>
        );
      })} */}
    </>
  );
}
