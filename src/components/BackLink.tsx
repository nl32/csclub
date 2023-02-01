import Link from "next/link";

type BackLinkProps = {
  href?: string;
};
export default function BackLink({ href }: BackLinkProps) {
  return (
    <div className=" absolute top-2 left-2 transition-all hover:scale-125">
      <Link href={href ?? "/"}>
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
  );
}
