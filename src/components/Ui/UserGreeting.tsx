import { useSession } from "next-auth/react";
import Login from "../Login";

const UserGreeting = ({ className }: { className: string }) => {
  const { data: session } = useSession();

  if (!session) return <Login />

  return (
    <div className={className}>
      <p className="pb-2">Witaj {session.user.name}</p>
      <Login />
    </div>
  )
}

export default UserGreeting