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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/salonRegForm" element={<SalonRegForm />} />
        <Route
          path="/SalonRegistrationPage"
          element={<SalonRegistrationPage />}
        />
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
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}
const Root = () => {
  return (
    <>
      <div className="space-x-5 ">
        <Link to="/">Home</Link>
        <Link to="/salonRegForm">SalonRegForm</Link>
        <Link to="/userLogin">UserLogin</Link>
        <Link to="/userRegistration">UserRegistration</Link>
        <Link to="/salon">salon</Link>
        <Link to="/profile/user">user</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default App;
