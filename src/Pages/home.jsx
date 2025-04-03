import Section1 from "./Home/section1";
import Section2 from "./Home/section2";
import Section3 from "./Home/section3";
import Footer from "../components/footer";

const Home = () => {
  console.log("Home page is re-rendered");
  return (
    <>
      <main className="w-full">
        <Section1 />
        <Section2 />
        <Section3 />
      </main>
      <Footer />
    </>
  );
};

export default Home;
