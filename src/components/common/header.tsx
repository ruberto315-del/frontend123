import { Link } from "react-router"
import logo from "../../assets/logo.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center w-full justify-between px-4 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full">
                <div className="hidden"></div>

        <Link to="/" className="flex items-center gap-2">
        <img src={logo} className="w-10"/>
        <h4 className="font-bold text-xl">DOSTAWA</h4>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li><Link to="/">Заходи</Link></li>
            <li><Link to="/archive">Архів</Link></li>
            <li><Link to="/my-courses">Мої Заходи</Link></li>
            <li><Link to="/admin">Адміністрування</Link></li>
          </ul>
          <DropdownMenu>
  <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
  <DropdownMenuContent align="end">

      <div className="">
      <p className="text-sm font-medium text-text-primary">Admin</p>
      <p className="text-xs text-text-secondary">admin@gmail.com</p>
    </div>

    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />

    <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

    <DropdownMenuItem>Профіль</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Вийти</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
      </div>
    </header>
  )
}

export default Header