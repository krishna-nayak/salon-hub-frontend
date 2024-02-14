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
import UserRegistration from "./pages/Registration";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound404";
import Salon from "./pages/Salon";
import SalonDetails from "./pages/SalonDetails";
import SalonProfile from "./pages/profile/SalonProfile";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path="/salonRegForm" element={<SalonRegForm />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegistration" element={<UserRegistration />} />
        <Route path="/notFound404" element={<NotFound />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/salonDetails/:salonId" element={<SalonDetails />} />
        <Route path="/salonProfile" element={<SalonProfile />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
const Root = () => {
  return (
    <>
      <div className="space-x-5">
        <Link to="/">Home</Link>
        <Link to="/salonRegForm">SalonRegForm</Link>
        <Link to="/userLogin">UserLogin</Link>
        <Link to="/userRegistration">UserRegistration</Link>
        <Link to="/salon">salon</Link>
        <Link to="/salonProfile">SalonProfile</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default App;
