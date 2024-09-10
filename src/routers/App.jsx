import { Suspense } from "react";
// import Loader from '../components/render/Loader'
import Render from "../components/render/Render";
import Tea from "../components/ui/loader/tea";
import Navbar from "../components/ui/navbar";

function App() {
  return (
    <>
      <Suspense fallback={<Tea />}>
      <Navbar />
        <Render />
      </Suspense>
    </>
  );
}

export default App;
