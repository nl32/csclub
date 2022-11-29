import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div >
      <div className="pl-2 flex flex-col bg-blue-500 h-screen w-screen justify-center items-center content-center text-center">
        <div className="justify-self-start">        
          <h1 className="py-5 text-transparent bg-clip-text text-9xl font-extrabold bg-gradient-to-br from-yellow-300 to-red-300">CS Club</h1>
        </div>
        <h2 className="text-yellow-500 text-2xl">Quick links</h2>
        <ul className="text-yellow-400">
          <li className="text-lg hover:scale-125 transition ease-in-out">
            <a href="https://drive.google.com/drive/folders/1QCT9rlajr4Uap754LJy_viF59__MlOVQ?usp=share_link">
              Google Drive Folder
            </a>
          </li>
          <li className="text-lg hover:scale-125 transition ease-in-out">
            <a href="https://docs.google.com/spreadsheets/d/1FC8qnr5ursH3uul3To0HTgqsdixC3tvDvJVcaTaYhQI/edit?usp=share_link">            
              Competition signup
            </a>
          </li>
          <li className="text-lg hover:scale-125 transition ease-in-out">
            <a href="https://www.remind.com/join/mhs-csclub">
              Remind
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
