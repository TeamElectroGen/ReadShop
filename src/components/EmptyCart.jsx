import Link from "next/link";
import { Button } from "./ui/button";

const EmptyCart = ({ title = "", desc = "" }) => {
  return (
    <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed bg-background shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <iframe
          className="size-44"
          src="https://lottie.host/embed/4ea3277b-0726-40d8-96b1-371eca9b22aa/PeY7eOR0BB.json"
        />

        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
        <Button asChild className="mt-4 font-semibold">
          <Link href={"/"}>Browser books</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
