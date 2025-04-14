import { Link } from "react-router-dom"

const Section1 = () => {
  return (
    <div className="hero min-h-185 flex justify-center items-center px-5 flex-col dark:bg-gray-700 dark:text-white">
      <div className="flex justify-center items-center w-[min(1100px,100%)] flex-col md:flex-row gap-3 md:gap-0">
        <div className="left w-full md:w-[50%] flex flex-1 flex-col items-center md:items-baseline gap-3 md:gap-0">
          <div className="header text-5xl md:text-7xl font-[Bebas_Neue] w-[min(100%,400px)] md:w-[55%] text-center md:text-left">
            Empower Your Financial Future Today!
          </div>
          <span className="tag text-base md:text-lg text-center md:text-left md:w-[80%] md:mt-5">
            Take control of your finances and achieve your dreams with Expense
            Tracker Pro. Start now!
          </span>
          <Link className=" md:block hidden bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-blue-800 active:bg-green-700 transition duration-300 font-[inter] mt-8">
            Get Started
          </Link>
        </div>
        <div className="right w-[min(100%,400px)] md:w-[50%] flex flex-1 h-full">
          <img src="/images/Hero.svg" alt="" className="animate-on-scroll" />
        </div>
      </div>
      <Link to="/signup" className=" md:hidden bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-blue-800 active:bg-green-700 transition duration-300 font-[inter] mt-10">
        Get Started
      </Link>
     
   </div>
  )
}
export default Section1