import TopHomeLink from "../components/BackLink";

type Officer = {
  name: string;
  desc: string;
};

const list: Array<Officer> = [
  { name: "Ethan Bickel", desc: "Club President" },
  { name: "Josh Ward", desc: "Club President" },
];

export default function Officers() {
  return (
    <>
      <div className="h-screen w-screen bg-blue-800">
        <TopHomeLink />
        <div className="ml-40 justify-center pt-20 text-left">
          <div className="my-2 justify-self-start">
            <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent">
              Our Officers
            </h1>
          </div>
          <div className="grid">
            {list.map((officer) => {
              return (
                <div
                  key={officer.name}
                  className="m-1 flex  max-w-xs rounded-lg bg-blue-700 p-2"
                >
                  <div>
                    <h1 className="bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-2xl font-light text-transparent">
                      {" "}
                      {officer.name}
                    </h1>
                    <p className="text-md bg-gradient-to-br from-yellow-400 to-red-200 bg-clip-text text-transparent">
                      {officer.desc}
                    </p>
                  </div>
                  <div className=" top-1/4 right-1 ml-auto h-24 w-24 origin-center rounded-full bg-slate-700"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
