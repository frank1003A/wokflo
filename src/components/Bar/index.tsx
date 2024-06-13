import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Separator } from "@components/ui/separator";
import { useMenu } from "@refinedev/core";
import Link from "next/link";

const LeftBar = () => {
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

  return (
    <div className="max-w-[280px] w-full h-full bg-[#161719]">
      <Link href={"/"}>
        <h1 className="font-bold">Logo</h1>
      </Link>

      <ul className="flex flex-col">
        {menuItems.map((item, index) => {
          return (
            <li key={item.name}>
              <Link
                href={item.route as string}
                className="transition-all hover:bg-primary_hover px-6 p-3 flex items-center justify-start gap-4 text-sm capitalize text-white font-bold w-full"
              >
                <span className="text-zinc-500 h-6 w-6"> {item.icon}</span>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Separator className="border border-zinc-500" />
      {/** Favorite */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:bg-primary_hover text-base capitalize text-zinc-500 px-6">
            <div className="transition-all flex items-center justify-start gap-4 font-bold w-full">
              Favorite
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col">
              <li className="flex items-center justify-between transition-all hover:bg-primary_hover px-5 p-3 gap-4 text-sm capitalize text-white font-bold w-full">
                <Link
                  className="flex items-center justify-start gap-4"
                  href={"/favorite/3232424"}
                >
                  <div className="text-zinc-500 w-6 h-6  rounded-md bg-sky-400"></div>
                  StrataScrach
                </Link>

                <button className="h-6 w-6 text-2xl bg-none flex items-center justify-center">
                  ...
                </button>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
