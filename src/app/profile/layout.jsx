import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "@/components/UserMenu";

export const metadata = {
  title: "Profile | User name here..",
  description: "This is profile page of user",
};

const ProfileLayout = ({ children }) => {
  return (
    <>
      <div className="container my-12 space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">My Account</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        {/* Dashboard container */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* navigation */}
          <aside className="-mr-4 lg:w-1/4 py-8 rounded-lg bg-popover shadow-sm">
            <header className="flex flex-col gap-2 text-center items-center justify-center">
              <Avatar className="size-16">
                <AvatarImage src="https://github.com/shadcn.pn" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <h1 className="text-lg font-bold text-primary text-gradient">Albab ibn Makbul</h1>
              <p>Reader</p>
            </header>
            <Separator className="my-4" />
            <UserMenu />
          </aside>
          {/* content */}
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
