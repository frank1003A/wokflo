import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { useMenu } from "@refinedev/core";
import useLayoutStore from "@zustand/store/layoutstore/store";
import clsx from "clsx";
import { Ellipsis, Plus, Text } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import logo from "../../assets/logo.png";

interface HeaderWithActionProps {
  name: string;
  icon?: React.ReactElement;
  hasCreateBtn?: boolean;
  isCollapsed: boolean;
}
const HeaderWithAction = ({
  name,
  icon,
  isCollapsed,
  hasCreateBtn,
}: HeaderWithActionProps) => {
  return (
    <>
      <div
        className={clsx(
          "transition-all flex items-center justify-start gap-4 font-bold w-full",
          isCollapsed ? "lg:hidden" : ""
        )}
      >
        {name}
      </div>
      {hasCreateBtn && (
        <button
          className={clsx(
            "bg-none h-6 w-6 mr-2 ml-auto",
            isCollapsed ? "lg:hidden" : ""
          )}
        >
          {hasCreateBtn && icon}
        </button>
      )}
    </>
  );
};

interface AccItemExtProps extends HeaderWithActionProps {
  expand: () => void;
  isCollapsed: boolean;
  children: ReactNode;
  /*** @alias Accordion Value */
  value: string;
}

const DataGroup = ({
  expand,
  isCollapsed,
  name,
  icon,
  hasCreateBtn,
  children,
  value,
}: AccItemExtProps) => {
  return (
    <AccordionItem
      className="border-b-zinc-500 last-of-type:border-none"
      value={value}
    >
      <AccordionTrigger
        onClick={expand}
        className={clsx(
          "no-underline hover:bg-primary_hover items-center  text-sm capitalize text-zinc-500",
          isCollapsed ? "px-6 lg:px-3 lg:justify-center " : "px-6 justify-start"
        )}
      >
        <HeaderWithAction
          name={name}
          icon={icon}
          hasCreateBtn={hasCreateBtn}
          isCollapsed={isCollapsed}
        />
      </AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col">{children}</ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const Data = ({
  isCollapsed,
  name,
}: {
  isCollapsed: boolean;
  name: string;
}) => {
  return (
    <li
      className={clsx(
        "flex items-center transition-all hover:bg-primary_hover p-3 gap-4 text-sm capitalize text-white font-bold w-full",
        isCollapsed ? "px-6 lg:px-3" : "px-6",
        isCollapsed ? "lg:justify-center" : "justify-between"
      )}
    >
      <Link
        className={clsx("flex items-center  gap-4 text-sm")}
        href={"/favorite/3232424"}
      >
        <div className="text-zinc-500 w-6 h-6  rounded-md bg-sky-400"></div>

        <span
          className={clsx(
            isCollapsed ? "lg:hidden" : "",
            isCollapsed ? "px-0 lg:px-3" : "px-0"
          )}
        >
          {name}
        </span>
      </Link>

      <button
        className={clsx(
          "h-6 w-6 text-base ml-auto bg-none flex items-center justify-center",
          isCollapsed && "flex lg:hidden"
        )}
      >
        <Ellipsis />
      </button>
    </li>
  );
};

const LeftBar = () => {
  const { isCollapsed, toggleCollapsed, expand, collapse } = useLayoutStore(
    (state) => state
  );
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

  return (
    <aside
      className={clsx(
        "transition-all h-screen overflow-y-auto scrollbar-hide max-w-[250px] w-full bg-[#161719] py-6",
        isCollapsed ? "w-full translate-x-0 lg:w-[60px]" : "-translate-x-full",
        "fixed lg:translate-x-0 lg:relative"
      )}
    >
      <div className="flex items-center justify-center px-6">
        <Link className="flex items-center justify-start gap-3" href={"/"}>
          <Image
            className="flex items-center justify-center"
            src={logo}
            alt="wokflo_logo"
            width={40}
            height={40}
          />
          <div
            className={clsx(
              "text-sm font-bold text-white",
              isCollapsed ? "lg:hidden" : ""
            )}
          >
            WokFlo
          </div>
        </Link>

        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={toggleCollapsed}
          className="ml-auto hover:bg-primary_hover hover:text-inherit text-white"
        >
          <Text />
        </Button>
      </div>

      <ul className="flex flex-col mt-3 mb-3">
        {menuItems.map((item, index) => {
          return (
            <li key={item.name}>
              <Link
                href={item.route as string}
                className={clsx(
                  "transition-all hover:bg-primary_hover  p-3 flex items-center justify-start gap-3 text-sm capitalize text-white font-bold w-full",
                  isCollapsed ? "px-6 lg:px-3" : "px-6",
                  isCollapsed ? "lg:justify-center" : "justify-start"
                )}
              >
                <div className="text-zinc-500 h-6 w-6 flex items-center justify-center">
                  {" "}
                  {item.icon}
                </div>
                <span className={clsx(isCollapsed ? "lg:hidden" : "")}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Separator className="border-t border-t-zinc-500" />
      {/** Favorite */}
      <Accordion type="single" collapsible>
        <DataGroup
          name="Favorite"
          isCollapsed={isCollapsed}
          expand={expand}
          value="item-1"
        >
          <Data name="StrataScratch" isCollapsed={isCollapsed} />
        </DataGroup>

        {/** PROJECTS */}
        <DataGroup
          name="Projects"
          isCollapsed={isCollapsed}
          expand={expand}
          hasCreateBtn
          icon={<Plus className="h-4 w-4" />}
          value="item-2"
        >
          <Data name="StrataScratch" isCollapsed={isCollapsed} />
        </DataGroup>

        {/** Channels */}
        <DataGroup
          name="Channels"
          isCollapsed={isCollapsed}
          expand={expand}
          hasCreateBtn
          icon={<Plus className="h-4 w-4" />}
          value="item-3"
        >
          <Data name="StrataScratch" isCollapsed={isCollapsed} />
        </DataGroup>

        {/** PORTFOLIO */}
        <DataGroup
          name="Portfolio"
          isCollapsed={isCollapsed}
          expand={expand}
          hasCreateBtn
          icon={<Plus className="h-4 w-4" />}
          value="item-4"
        >
          <Data name="StrataScratch" isCollapsed={isCollapsed} />
        </DataGroup>
      </Accordion>
    </aside>
  );
};

export default LeftBar;
