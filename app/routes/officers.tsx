import { Link } from "@remix-run/react";

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
      <div className="bg-blue-800 h-screen w-screen">
        <div className=" absolute top-2 left-2 hover:scale-125 transition-all">
          <Link to={"/"}>
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
        <div className="ml-40 pt-20 justify-center text-left">
          <div className="justify-self-start my-2">
            <h1 className="text-transparent bg-clip-text text-8xl font-extrabold bg-gradient-to-br from-yellow-300 to-red-300">
              Our Officers
            </h1>
          </div>
          <div className="grid">
            {list.map((officer) => {
              return (
                <div
                  key={officer.name}
                  className="bg-blue-700 p-2  m-1 rounded-lg max-w-xs flex"
                >
                  <div>
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-red-300 text-2xl font-light">
                      {" "}
                      {officer.name}
                    </h1>
                    <p className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-red-200 text-md">
                      {officer.desc}
                    </p>
                  </div>
                  <div className=" rounded-full bg-slate-700 h-24 w-24 top-1/4 right-1 origin-center ml-auto"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
