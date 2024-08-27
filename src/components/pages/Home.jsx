import Navbar from "../ui/Navbar";
import HomeSection from "../ui/home";
import Plates from "../render/Plates";

function Home() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Navbar />
      <Plates />
      <HomeSection />
    </div>
  );
}

export default Home;
