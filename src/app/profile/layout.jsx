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
          <aside className="-mr-4 px-2 lg:px-4 rounded-lg bg-popover py-8 shadow-sm lg:w-1/4">
            <header className="flex flex-col items-center justify-center gap-2 text-center">
              <Avatar className="size-16">
                <AvatarImage src="https://github.com/shadcn.pn" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <h1 className="text-primary text-xl font-bold">
                Albab ibn Makbul
              </h1>
              <div className="text-sm space-y-1 font-medium text-muted-foreground">
                <p>albabmakbul@gmail.com</p>
                <p>+8801612103500</p>
              </div>
            </header>
            <Separator className="my-4" />
            <UserMenu />
          </aside>
          {/* content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
