import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { Suspense, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { api } from "../utils/api";

const UserButton = () => {
    const userQuery = api.user.getCurrentUser.useQuery();
    const [height,setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const onShow = () => {
        if(height===0){
            setHeight(ref.current?.getBoundingClientRect().height as number)
        }else{
            setHeight(0)
        }
    }
    if (!userQuery.isSuccess) {
        return <UserButtonLogin />;
    }
    return (
        <div className="absolute top-2 right-2 rounded-xl bg-gradient-to-br from-yellow-400 to-red-300 p-1">
            <button className="flex flex-row justify-center  px-1" onClick={onShow}>
                {userQuery.data?.name}
            </button>
            <div className="overflow-hidden ease-in-out transition-all" style={{height:height}}>
                <div ref={ref}>
                    <div>Profile</div>
                    <div>Settings</div>
                    <button onClick={()=>signOut()}>Signout</button>
                </div>
            </div>
        </div>
    );
};
const UserButtonLogin = () => {
    return (
        <div className="absolute top-2 right-2">
            <button
                className="flex w-24 flex-row justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-red-300 p-1" onClick={()=>signIn()}>
                Login
            </button>
        </div>
    );
};

const UserButtonLoad = () => {
    return (
        <div className="absolute top-2 right-2">
            <div className=" flex w-24 flex-row justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-red-300 p-1">
                <svg
                    viewBox="0 0 110 110"
                    height={30}
                    width={30}
                    xmlns="http://www.w3.org/2000/svg"
                    className=" animate-spin"
                >
                    <ellipse
                        className="stroke-blue-400"
                        stroke="#999999"
                        cx="55"
                        cy="55"
                        id="svg_1"
                        rx="50"
                        ry="50"
                        stroke-width="10"
                        fill-opacity="0"
                        />
                    <path
                        id="svg_9"
                        d="m4.93697,55.81153c2.68748,-47.49957 43.24956,-50.68705 50.00004,-50.74907"
                        opacity="NaN"
                        stroke-width="10"
                        fill="none"
                        className=" stroke-blue-500"
                        />
                </svg>
            </div>
        </div>
    );
};

export { UserButtonLoad };

export default UserButton;
