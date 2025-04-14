const Section3 = () => {
  return (
    <div className="justify-center items-center flex md:px-5 flex-col gap-5 min-h-185 py-20 text-[#333333] dark:bg-gray-700 dark:text-[#e9e9e9]">
      <div className="content flex flex-col items-center lg:justify-evenly gap-8 w-[min(1150px,100%)] ">
        <div className="top flex  flex-col lg:flex-row  gap-10 lg:gap-0">
          <div className="left  w-full lg:w-1/2 flex justify-center lg:justify-start">
            <p className="text-[35px] md:text-[48px] lg:text-[56px] md:w-[330px] leading-11 md:leading-15 lg:leading-17 font-[Lilita_One] text-center lg:text-left">Our Services Overview</p>
          </div>
          <div className="right  w-full lg:w-1/2 flex items-center">
            <p className="text-base md:text-lg text-center lg:text-left ml-10">Expense Tracker Pro offers comprehensive financial solutions. Budgeting tools, insightful analytics, and personalized support. Achieve financial success with our expert guidance.</p>
          </div>
        </div>

        <div className="services flex flex-col lg:flex-row items-center lg:justify-evenly gap-8 w-[min(1150px,100%)]  flex-wrap">

          <div className="animate-on-scroll service h-110 w-[min(90%,500px)] lg:w-[48%] bg-[rgba(127,127,127,0.2)] dark:bg-gray-800 rounded-xl flex flex-col pb-10">
            <div className="top  rounded-t-lg bg-[url('/images/analysis.jpg')] bg-cover h-64 w-full"></div>
            <div className="bottom rounded-b-lg flex flex-col overflow-hidden px-2 md:px-5 mt-5">
              <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Budget Creation</div>
              <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left text-lg">Create personalized budgets and track your progress with Expense Tracker Pro's tools.</p>
            </div>
          </div>


          <div className="animate-on-scroll service h-110 w-[min(90%,500px)] lg:w-[48%] bg-[rgba(127,127,127,0.2)] dark:bg-gray-800 rounded-xl flex flex-col pb-10">
            <div className="top  rounded-t-lg bg-[url('/images/analysis.jpg')] bg-cover h-64 w-full"></div>
            <div className="bottom rounded-b-lg flex flex-col overflow-hidden px-2 md:px-5 mt-5">
              <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Automated Tracking</div>
              <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left text-lg">Automate expense tracking, categorize transactions, and gain insights with Expense Tracker Pro's advanced features.</p>
            </div>
          </div>


          <div className="animate-on-scroll service h-110 w-[min(90%,500px)] lg:w-[48%] bg-[rgba(127,127,127,0.2)] dark:bg-gray-800 rounded-xl flex flex-col pb-10">
            <div className="top  rounded-t-lg bg-[url('/images/analysis.jpg')] bg-cover h-64 w-full"></div>
            <div className="bottom rounded-b-lg flex flex-col overflow-hidden px-2 md:px-5 mt-5">
              <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Finacial Analysis</div>
              <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left text-lg">Analyze spending habits, identify trends, and optimize your budget with Expense Tracker Pro's analytics.</p>
            </div>
          </div>


          <div className="animate-on-scroll service h-110 w-[min(90%,500px)] lg:w-[48%] bg-[rgba(127,127,127,0.2)] dark:bg-gray-800 rounded-xl flex flex-col pb-10">
            <div className="top  rounded-t-lg bg-[url('/images/analysis.jpg')] bg-cover h-64 w-full"></div>
            <div className="bottom rounded-b-lg flex flex-col overflow-hidden px-2 md:px-5 mt-5">
              <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Easy Tracking</div>
              <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left text-lg">Effortlessly monitor your income and expenses in real-time with Expense Tracker Pro.</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};
export default Section3;
