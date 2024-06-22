import PageComponent from "@components/pages/single_project/PageComponent";

const SingleProject = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col w-full">
      {/** Tabbed Content*/}
      <PageComponent param={params} />
    </div>
  );
};

export default SingleProject;
