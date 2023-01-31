import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import TipTap, { CodeEditor } from "../../../components/TipTap";
import { api } from "../../../utils/api";

const ProblemPage = () => {
    const router = useRouter()
    const { id } = router.query
    const problemQuery = api.problems.get.useQuery({ id: Number.parseInt(id as string) })
    const [editable, setEditable] = useState(false);
    return <>
        <div className="h-screen w-screen bg-blue-800">
            <div className=" absolute top-2 left-2 transition-all hover:scale-125">
                <Link href="/problems/view">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                        className="fill-yellow-400 hover:fill-yellow-500"
                    >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 9V8l-4 4 4 4v-3h4v-2h-4z" />
                    </svg>
                </Link>
            </div>
            <div className="flex flex-col justify-center pt-20 text-left">
                {problemQuery.isFetched && <>
                    {problemQuery.data?.name && <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent ml-40">
                        {problemQuery.data?.name}
                    </h1>}
                    <div className="m-4">
                        <ActionBar editable={editable} setEditable={setEditable} />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-lg bg-white h-full p-2 rounded-md">
                                <TipTap content={JSON.parse(problemQuery.data?.content as string)} editable={editable} />
                                <div>
                                    {problemQuery.data?.answers.map((answer, index) => {
                                        return <div key={answer.id} className="flex flew-row my-1">
                                            <div className="mr-5 px-1 bg-gray-200 rounded-md">{String.fromCharCode(index + 65)}</div>
                                            <div>
                                                <TipTap content={JSON.parse(answer.content as string)} editable={editable} />
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                            {problemQuery.data?.code &&
                                <div className="h-full p-2 rounded-md bg-white">
                                    <CodeEditor content={JSON.parse(problemQuery.data?.code as string)} editable={editable} />
                                </div>
                            }
                        </div>
                    </div>
                </>}
            </div>
        </div>
    </>
}

type ActionBarProps = {
    editable: boolean,
    setEditable: Dispatch<SetStateAction<boolean>>
}
const ActionBar = ({ editable, setEditable }: ActionBarProps) => {
    return <div className="bg-white p-1 mb-2 rounded-md">
        <button type="button" className="bg-gradient-to-br from-yellow-300 to-red-300 hover:to-red-500 active:from-yellow-500 p-1 rounded-md" onClick={() => { setEditable(!editable) }}>Edit</button>
    </div>
}

export default ProblemPage;