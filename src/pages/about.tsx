import TopHomeLink from "../components/TopHomeLink";

export default function About() {
  return (
    <>
      <div className="h-screen w-screen bg-blue-800">
        <TopHomeLink />
        <div className="ml-40 flex flex-col justify-center pt-20 text-left">
          <div className="my-2 justify-self-start">
            <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent">
              About us
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
