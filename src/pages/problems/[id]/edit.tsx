import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import BackLink from "../../../components/BackLink";
import MCAnswerEdit from "../../../components/MCAnswerEdit";
import TipTap, { CodeEditor } from "../../../components/TipTap";
import type { RouterInputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import { createProblemSchema } from "../../../utils/schemas";
import type { SubmitHandler } from "react-hook-form";
import type { Answer } from "@prisma/client";
import type { JSONContent } from "@tiptap/core";

type Problem = Omit<
  RouterInputs["problems"]["edit"],
  "content" | "code" | "answers"
> & {
  content: JSONContent;
  code: JSONContent;
  answers: Array<Answer>;
};

const Page = () => {
  const router = useRouter();
  const id = Number.parseInt(router.query.id as string);
  const problemQuery = api.problems.get.useQuery(
    {
      id: id,
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        reset({
          name: data.name ?? "",
          content: data.content as JSONContent,
          code: data.code as JSONContent,
          answers: data.answers,
        });
      },
    }
  );
  const { register, handleSubmit, control, formState, reset } =
    useForm<Problem>({
      resolver: zodResolver(createProblemSchema),
      defaultValues: {
        name: problemQuery.data?.name ?? "",
        content: problemQuery.isSuccess
          ? (problemQuery.data?.content as JSONContent)
          : undefined,
        code: {},
        answers: problemQuery.isSuccess
          ? problemQuery.data?.answers
          : ([] as Array<Answer>),
      },
    });
  const createProblem = api.problems.edit.useMutation({});
  const onSubmit: SubmitHandler<Problem> = (data) => {
    createProblem.mutate(data);
  };
  return (
    <>
      <div className="h-screen w-screen bg-blue-800">
        <BackLink href="/problems/" />
        <div className="ml-40 flex flex-col justify-center pt-20 text-left">
          <div className="my-2 justify-self-start">
            <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent">
              Create new problem
            </h1>
          </div>
          <div className="container w-[80rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-2 rounded-md bg-blue-500 p-1 ">
                <label htmlFor="name" className="text-yellow-300">
                  Name:{" "}
                </label>
                <input {...register("name")} />
              </div>
              <div className="grid grid-cols-5 grid-rows-2">
                <div className="col-span-3 m-2 rounded-md bg-blue-500">
                  <Controller
                    name="content"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TipTap
                        content={field.value}
                        stateCallback={field.onChange}
                        editable={true}
                      />
                    )}
                  />
                </div>
                <div className=" col-span-2  row-span-2 m-2 bg-blue-500 p-1">
                  <Controller
                    name="code"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <CodeEditor
                        content={field.value ?? ""}
                        stateCallback={field.onChange}
                        editable={true}
                      />
                    )}
                  />
                </div>
                <div className="col-span-3 m-2">
                  <Controller
                    name="answers"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <MCAnswerEdit
                        value={
                          field.value as Array<{
                            content: JSONContent;
                            correct: boolean;
                          }>
                        }
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex">
                <input
                  type="submit"
                  value="submit"
                  className="ml-auto rounded-md bg-gradient-to-br from-yellow-300 to-red-300 p-1 text-xl"
                  onClick={() => {
                    console.log(FormData);
                    console.log(formState.errors);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default Page;
