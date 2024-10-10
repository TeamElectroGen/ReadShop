import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserMenu from "@/components/UserMenu";
import UserInfoCard from "@/components/UserInfoCard";

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
          <aside className="-mr-4 px-2 lg:px-4 lg:self-start rounded-lg py-8 lg:w-1/4 glassmorphism">
            <header className="flex flex-col items-center justify-center gap-2 text-center">
              {/* user infos */}
              <UserInfoCard />
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
