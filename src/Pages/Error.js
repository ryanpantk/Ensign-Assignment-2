import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../Components/Button";

export default function ErrorPage() {
    const navigate=useNavigate();
    function handleClick() {
        navigate("/");
    }
  
    return (
      <div class="w-screen h-screen flex flex-col items-center justify-center">
        <p className="text-3xl font-bold my-8">Oops!</p>
        <p className="text-xl font-semibold">Sorry, an unexpected error has occurred.</p>
        <div className="my-4">
            <PrimaryButton text="Return to Home" onClick={() => handleClick("/")} />
        </div>
      </div>
    );
  }
  