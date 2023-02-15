import { Answer, MCProblem } from "@prisma/client";
import Link from "next/link";
import { api, RouterOutputs } from "../utils/api";
import TipTap from "./TipTap";

type ProblemCardProps = {
  problem: MCProblem & { answers: Answer[] };
};

const ProblemCard = ({ problem }: ProblemCardProps) => {
  const utils = api.useContext();
  const preFetch = () => {
    utils.problems.get.prefetch({ id: problem.id });
  };
  return (
    <>
      <Link
        href={{ pathname: "/problems/[id]", query: { id: problem.id } }}
        onMouseOver={preFetch}
      >
        <div className="w-80 rounded-md bg-white p-2 drop-shadow-md transition-transform  ease-in-out hover:scale-110">
          {problem.name && (
            <h1 className="w-full border-b border-black">{problem.name}</h1>
          )}
          <div className="text-lg">
            <TipTap
              content={JSON.parse(problem.content as string)}
              editable={false}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProblemCard;
