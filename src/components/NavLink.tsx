import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link to={href} className="">
      <Button
        variant={"linkHover2"}
        className="text-foreground hover:text-foreground hover:no-underline active:font-semibold justify-start"
      >
        {children}
      </Button>
    </Link>
  );
}
