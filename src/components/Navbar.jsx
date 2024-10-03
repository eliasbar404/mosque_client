
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Toggle } from "./ui/toggle"
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"
import Logo from "../assets/Logo.png"

export default function Navbar() {
  const links = [
    { path: "/", element: "Accueil", id: 1},
    { path: "/Articles", element: "Articles", id: 2 },
    { path: "/Events", element:"Evenements", id: 3},
    { path: "/Dons", element: "Dons", id: 4 },
    { path: "/Contact", element:"Contact", id: 5 }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950 ">
      <div className="flex h-16 justify-between px-4 md:px-6">
        <Link href="#" className="flex text-center text-3xl size-10">
          <h1 className="font-bold mt-[12px]">A</h1>
          <img src={Logo} alt="logo" className="size-full mt-[4.5px]"/>
          <h1 className="font-bold mt-[12px]">H</h1>
        </Link>
        <nav className="hidden items-center gap-6 text-md font-medium md:flex">
          {
            links.map(item => <Link key={item.id} to={item.path}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              
            >
              {item.element}
            </Link>)
          } 
        </nav>
        <div className="flex items-center gap-8">
          {/* <div className="hidden items-center gap-2 text-sm font-medium md:flex">
            <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">123-456-7890</span>
          </div> */}
          <div className="hidden items-center gap-4 text-md font-medium md:flex">
            <Link to="/Login"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                  Log in
            </Link>
            <Link to="/Register"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                  Register
              </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <ProfileIcon />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[100px] p-4">
              <div className="flex flex-col items-center text-sm font-medium gap-2">
                <Link to="/login"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    
                  >
                    Log In
                </Link>
                <Link to="/register"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    
                  >
                    Register
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Toggle aria-label="Toggle dark mode" className="rounded-full">
            <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Toggle> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <div className="grid gap-4  justify-center">
              {
                links.map(item => <Link key={item.id} to={item.path}
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                  {item.element}
                </Link>)
              }
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function ProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-user-round h-5 w-5 text-gray-500 dark:text-gray-400"
    >
      <path d="M18 20a6 6 0 0 0-12 0"/>
      <circle cx="12" cy="10" r="4"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  )
}
