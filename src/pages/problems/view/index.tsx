import { useState } from "react";
import ProblemCard from "../../../components/ProblemCard";
import TopHomeLink from "../../../components/TopHomeLink";
import { api } from "../../../utils/api";

const View = () => {
  const problemQuery = api.problems.getInfinite.useInfiniteQuery(
    { limit: 12 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const [pageNumber, setPageNumber] = useState(0);
  return (
    <>
      <div className="h-screen w-screen bg-blue-800">
        <TopHomeLink />
        <div className="ml-40 flex flex-col justify-center pt-20 text-left">
          <div className="my-2 justify-self-start">
            <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent">
              Problems
            </h1>
          </div>
        </div>
        <div className="ml-20">
          <div>Action Bar</div>
          <div className="grid grid-flow-row grid-cols-3 gap-4">
            {problemQuery.data?.pages[pageNumber]?.problems.map((problem) => {
              return <ProblemCard key={problem.id} problem={problem} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
