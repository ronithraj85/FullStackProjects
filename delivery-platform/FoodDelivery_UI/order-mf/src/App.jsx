import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Orders />
    </>
  );
}
