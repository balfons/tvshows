import { useEffect } from "react";
import "./App.css";
import ShowSearch from "./pages/ShowSearch/ShowSearch";
import { Toaster, toast } from "sonner";

function App() {
  const handleOffline = () => {
    toast.error("Network connection lost", {
      description: "Check your internet connection",
    });
  };

  const handleOnline = () => {
    toast.success("Network connection restored");
  };

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <>
      <Toaster richColors />
      <ShowSearch />
    </>
  );
}

export default App;
