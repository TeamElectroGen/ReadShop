"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserInfoCard = () => {
  const { data: session } = useSession();

  return (
    <>
      <Avatar className="size-16">
        <AvatarImage src={session?.user?.image} />
        <AvatarFallback>{session?.user?.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-bold text-primary">{session?.user?.name}</h1>
      <div className="-mt-1 space-y-1 text-xs font-medium text-muted-foreground">
        <p>{session?.user?.email}</p>
        <p>{session?.user?.phone}</p>
      </div>
    </>
  );
};

export default UserInfoCard;
