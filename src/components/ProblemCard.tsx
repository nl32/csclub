import { Answer, MCProblem } from "@prisma/client"
import Link from "next/link"
import { RouterOutputs } from "../utils/api"
import TipTap from "./TipTap"

type ProblemCardProps = {
    problem: MCProblem & { answers: Answer[] }
}

const ProblemCard = ({ problem }: ProblemCardProps) => {

    return <>
        <Link href={{ pathname: "/problems/view/[id]", query: { id: problem.id } }}>
            <div className="bg-white p-2 w-80 rounded-md drop-shadow-md hover:scale-110  transition-transform ease-in-out">
                {problem.name && <h1 className="w-full border-black border-b">{problem.name}</h1>}
                <div className="text-lg">
                    <TipTap content={JSON.parse(problem.content as string)} editable={false} />
                </div>
            </div>
        </Link>
    </>
}

export default ProblemCard
