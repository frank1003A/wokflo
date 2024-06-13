import { List, Workspace } from "@prisma/client";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDraggable } from "react-icons/ri";

export const ListDragButton = ({
  list,
  count,
}: {
  list: List;
  count: number;
}) => {
  return (
    <button className="group py-2 font-medium  transition-all flex items-center bg-transparent hover:bg-gray-200 p-2 w-full rounded-md">
      <RiDraggable className="text-gray-300 h-4 w-4 mr-1" />
      <span className="flex items-center gap-2 text-base font-medium">
        {list.emoji && <span className="mr-0">{list.emoji}</span>}
        {list.name}
      </span>
      <span className="transition-colors text-xs ml-auto flex items-center justify-center bg-gray-200 group-hover:bg-white rounded-md text-black px-1 w-5 h-5">
        {count}
      </span>
    </button>
  );
};

export const WsDragButton = ({ workspace }: { workspace: Workspace }) => {
  return (
    <div className="group py-2 font-medium  transition-all flex items-center bg-transparent hover:bg-gray-200 p-2 w-full rounded-md">
      <RiDraggable className="text-gray-300 h-4 w-4 mr-1" />
      <span className="flex items-center gap-2 text-base font-medium">
        {workspace.emoji && <span className="mr-0">{workspace.emoji}</span>}
        {workspace.name}
      </span>
      <button className="transition-colors text-xs ml-auto flex items-center justify-center  group-hover:bg-white rounded-md text-black px-1 w-5 h-5">
        <HiOutlineDotsHorizontal />
      </button>
    </div>
  );
};
