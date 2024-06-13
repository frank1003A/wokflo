import { ListDragButton, WsDragButton } from "@components/DragDrop";
import { List, Workspace } from "@prisma/client";
import { useTable } from "@refinedev/core";
import Skeleton from "react-loading-skeleton";

const LeftBar = () => {
  const {
    tableQueryResult: { data, isLoading: isListLoading },
  } = useTable({ resource: "lists" });

  const {
    tableQueryResult: { data: ws },
  } = useTable({ resource: "workspaces" });

  const nu = [11, 3, 4, 4, 3];

  const List = data?.data;
  const wS = ws?.data;
  return (
    <div className="max-w-[280px] w-full h-full bg-stone-50 px-5">
      <h1 className="font-bold">Private</h1>

      <ul className="flex flex-col">
        {isListLoading ? (
          <Skeleton className="h-10" count={5} />
        ) : (
          List?.map((list, index) => {
            return (
              <li key={list.title}>
                <ListDragButton list={list as List} count={nu[index]} />
              </li>
            );
          })
        )}
      </ul>

      <h1 className="font-bold">Workspace</h1>

      <ul className="flex flex-col">
        {wS?.map((ws) => {
          return (
            <li key={ws.name}>
              <WsDragButton workspace={ws as Workspace} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftBar;
