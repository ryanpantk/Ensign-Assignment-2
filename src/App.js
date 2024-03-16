import { Outlet } from "react-router";
import NavBar from "./Components/NavBar";
import { ToastContainer } from 'react-toastify';

export default function App() {
    return (
      <>
        <ToastContainer />
        <NavBar />
        <Outlet />
      </>
    )
}
  