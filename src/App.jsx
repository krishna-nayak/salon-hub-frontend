import React from "react";
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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route path="/salonRegForm" element={<SalonRegForm />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegistration" element={<UserRegistration />} />
        <Route path="/notFound404" element={<NotFound />} />
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
      {/* <div>
        <Link to="/">Home</Link>
        <Link to="/salonRegForm">SalonRegForm</Link>
        <Link to="/userLogin">UserLogin</Link>
        <Link to="/userRegistration">UserRegistration</Link>
      </div> */}
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default App;
