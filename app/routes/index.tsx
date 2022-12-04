import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

type link = {
  href: string;
  text: string;
};

export const loader = async () => {
  const res = await fetch("https://api.npoint.io/d227c1ee9ad7db82d1c9");
  const data = await res.json();
  return json({ links: data as Array<link> });
};

export default function Index() {
  const { links } = useLoaderData<typeof loader>();
  console.log(links);
  return (
    <div>
      <div className="flex flex-col bg-blue-800 h-screen w-screen justify-center items-center content-center text-center">
        <div className="justify-self-start my-2">
          <h1 className="text-transparent bg-clip-text text-9xl font-extrabold bg-gradient-to-br from-yellow-300 to-red-300">
            CS Club
          </h1>
          <h2 className="text-transparent bg-clip-text text-xl font-extrabold bg-gradient-to-br from-yellow-300 to-red-300">
            At Mckinney High School
          </h2>
        </div>
        <div className="my-2 mb-1">
          <h2 className="text-yellow-500 text-4xl">Quick links</h2>
          <ul className="text-yellow-400">
            {links.map((link) => {
              return (
                <li
                  className="text-2xl hover:scale-125 transition ease-in-out"
                  key={link.text}
                >
                  <a href={link.href}>{link.text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="my-2">
          <h2 className="text-4xl text-yellow-500">About</h2>
          <ul className="flex-row flex">
            <li className="p-1">
              <Link to="/about" aria-label="About Page">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black hover:fill-slate-800 scale-125 hover:scale-150 transition ease-in-out"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
                  </svg>
                </span>
              </Link>
            </li>
            <li className="p-1">
              <Link to="/officers" aria-label="List of Club Officers">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    className="fill-black hover:fill-slate-800 scale-125 hover:scale-150 transition ease-in-out"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                      clipRule="evenodd"
                    />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                  </svg>
                </span>
              </Link>
            </li>
            <li className="p-1">
              <a href="https://github.com/nl32/csclub" aria-label="Source Code">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-black hover:fill-slate-800 scale-125 hover:scale-150 transition ease-in-out"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
