import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import TopHomeLink from "../../components/TopHomeLink"
import type { RouterInputs } from "../../utils/api";
import { api } from "../../utils/api"
import { zodResolver } from "@hookform/resolvers/zod";
import { createProblemSchema } from "../../utils/schemas";
import TipTap, { CodeEditor, } from "../../components/TipTap";
import MCAnswerEdit from "../../components/MCAnswerEdit";
import { useRouter } from "next/router";

type Problem = RouterInputs["problems"]["create"]

const Create = () => {
    const router = useRouter();
    const { register, handleSubmit, control, formState } = useForm<Problem>({
        resolver: zodResolver(createProblemSchema),
        defaultValues: {
            name: "",
            content: "",
            code: "",
            answers: [],
        }
    })
    const createProblem = api.problems.create.useMutation({
        onSuccess: (data) => {
            router.push(`/problems/view/${data.id}`,)
        }
    })
    const onSubmit: SubmitHandler<Problem> = (data) => {
        createProblem.mutate(data)
    }
    return <>
        <div className="h-screen w-screen bg-blue-800">
            <TopHomeLink />
            <div className="ml-40 flex flex-col justify-center pt-20 text-left">
                <div className="my-2 justify-self-start">
                    <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent">
                        Create new problem
                    </h1>
                </div>
                <div className="w-[80rem] container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-blue-500 p-1 my-2 rounded-md ">
                            <label htmlFor="name" className="text-yellow-300">Name: </label>
                            <input {...register("name")} />
                        </div>
                        <div className="grid grid-rows-2 grid-cols-5">
                            <div className="bg-blue-500 m-2 col-span-3 rounded-md">
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <TipTap stateCallback={field.onChange} />}
                                />
                            </div>
                            <div className="m-2 row-span-2  col-span-2 bg-blue-500 p-1">
                                <Controller
                                    name="code"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => <CodeEditor stateCallback={field.onChange} />}
                                />
                            </div>
                            <div className="m-2 col-span-3">
                                <Controller
                                    name="answers"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <MCAnswerEdit onChange={field.onChange} />}
                                />

                            </div>
                        </div>
                        <div className="flex">
                            <input
                                type="submit"
                                value="submit"
                                className="ml-auto p-1 bg-gradient-to-br from-yellow-300 to-red-300 rounded-md text-xl"
                                onClick={() => { console.log(FormData); console.log(formState.errors) }}
                            />
                        </div>

                    </form>
                </div>
            </div>
            <div>
            </div>
        </div>

    </>
}

export default Create;