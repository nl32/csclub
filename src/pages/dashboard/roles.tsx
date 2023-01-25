import { useRef, useState } from "react";
import TopHomeLink from "../../components/TopHomeLink";
import LoginButton from "../../components/UserButton";
import { RouterOutputs, api } from "../../utils/api";

const roleDash = () => {
    const useRoles = api.role.getAll.useQuery()
    return <>
        <div className="h-screen w-screen bg-blue-800">
            <TopHomeLink />
            <LoginButton />
            <div className="ml-40 flex flex-col justify-center pt-20 text-left">
                <div className="my-2 justify-self-start">
                    <h1 className="p-2 bg-gradient-to-br from-yellow-300 to-red-300 bg-clip-text text-8xl font-extrabold text-transparent">
                        Role Management
                    </h1>
                </div>
                {useRoles.isSuccess &&<div>
                    {useRoles.data.map((role)=>{
                        return <RoleBox role={role} />                    })}
                </div>}
            </div>
        </div>
        </>
}
type ArrElement<ArrType extends readonly unknown[]> =
ArrType extends readonly (infer ElementType)[] ? ElementType : never;

type roleBoxProps = {
    role: ArrElement<RouterOutputs["role"]["getAll"]>
}

const RoleBox = ({role}:roleBoxProps) => {
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const onShow = () => {
        if(height === 0){
            setHeight(ref.current?.getBoundingClientRect().height as number)
        }else{
            setHeight(0)
        }
    }
    return <>
        <div key={role.id} className="bg-blue-600 p-2">
            <div className="flex flex-row">
                <h1 className="text-xl font-extrabold">
                    {role.slug}
                </h1>
                <button className="ml-auto" onClick={onShow}> Expand</button>
            </div>
            <div className="overflow-hidden ease-in-out transition-all" style={{height:height}}>
                <div ref={ref}>
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <div>
                                <h2 className="text-lg">Permissions</h2>
                                {role.permissions.map((permission)=>{
                                    return <div key={permission.id} className="bg-blue-800 rounded-md p-1">
                                        <div className="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-red-400">
                                            {permission.slug}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div>
                            <h2>Users</h2>
                            {role.Users.map((user)=>{
                                return <div key={user.id} className="bg-blue-800 rounded-md p-1">
                                    <div className="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-red-400">
                                        {user.name}
                                    </div>
                                </div>
                            })}</div>
                    </div> 
                </div>
            </div>
        </div>
        </>
}

export default roleDash;
