import {
  Route,
  createBrowserRouter,
  Link,
  Outlet,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import SalonRegForm from "./pages/AddSalon/SalonRegForm";
import UserLogin from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound404";
import Salon from "./pages/Salon";
import SalonDetails from "./pages/SalonDetails";
import SalonProfile from "./pages/profile/SalonProfile";

import { Toaster } from "@/components/ui/sonner";

import SalonRegistrationPage from "./pages/SalonRegistrationPage";
import UserProfile from "./pages/profile/UserProfile";
import ProfileLayout from "./pages/profile/layout/ProfileLayout";
import MyAppointment from "./pages/profile/MyAppointment";
import { ThemeProvider, useTheme } from "./hooks/context/theme-provider";
import { Toggle } from "./components/ui/toggle";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/salonRegForm" element={<SalonRegForm />} />
        <Route path="/SalonRegistration" element={<SalonRegistrationPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/userRegistration" element={<UserRegistration />} />
        <Route path="/notFound404" element={<NotFound />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/salonDetails/:salonId" element={<SalonDetails />} />
        <Route path="/profile" element={<ProfileLayout />}>
          <Route path="/profile/user" element={<UserProfile />} />
          <Route path="/profile/my-appointment" element={<MyAppointment />} />
          <Route path="/profile/salon" element={<SalonProfile />} />
        </Route>
      </Route>
    )
  );
  return (
    <div className="">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}
const Root = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="space-x-5 dark:text-white">
        <Link to="/">Home</Link>
        <Link to="/SalonRegistration">SalonRegForm</Link>
        <Link to="/login">UserLogin</Link>
        <Link to="/userRegistration">UserRegistration</Link>
        <Link to="/salon">salon</Link>
        <Link to="/profile/user">user</Link>
        <ToggleTheme />
      </div>
      <div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
};
export default App;
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";

function ToggleTheme() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
