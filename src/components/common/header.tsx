import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "@/api/auth-client";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const Header = () => {
  const { data: session, isPending } = useSession();

  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 flex items-center w-full justify-between px-4 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full">
        <div className="hidden"></div>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-10" />
          <h4 className="font-bold text-xl">DOSTAWA</h4>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <Link to="/">Заходи</Link>
            </li>
            <li>
              <Link to="/archive">Архів</Link>
            </li>
            <li>
              <Link to="/my-courses">Мої Заходи</Link>
            </li>
            <li>
              <Link to="/admin">Адміністрування</Link>
            </li>
          </ul>
          {isPending ? (
            <div className="w-9">
            <Spinner className="h-5 w-5" />
            </div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="">
                  <p className="text-sm font-medium text-text-primary">{session.user.name}</p>
                  <p className="text-xs text-text-secondary">{session.user.email}</p>
                </div>

                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Avatar>
                  <AvatarImage
                    src={session.user.image ? session.user.image : undefined}
                    alt="avatar"
                    />
                    <AvatarFallback className="uppercase">{session.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div>
                <DropdownMenuItem>Профіль</DropdownMenuItem>
                </div>
                <DropdownMenuItem variant="destructive" onClick={() => {
                  signOut()
                  navigate("/", {replace: true})

                  }}>Вийти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth" />
              <Button variant="primary" size="sm">
                Увійти
              </Button>
              <Link to="/auth" />

              <Button size="sm">Зареєструватись</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
