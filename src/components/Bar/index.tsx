import Link from "next/link";

const LeftBar = () => {
  const List = ["test"];
  return (
    <div className="max-w-[280px] w-full h-full bg-[#161719] px-5">
      <Link href={"/"}>
        <h1 className="font-bold">Logo</h1>
      </Link>

      <ul className="flex flex-col">
        {List?.map((list, index) => {
          return <li key={list}>{list}</li>;
        })}
      </ul>

      {/**
       * <Link href={"/"}>
        <h1 className="font-bold">Logo</h1>
      </Link>

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
       */}
    </div>
  );
};

export default LeftBar;
