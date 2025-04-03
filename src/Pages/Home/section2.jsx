const Section2 = ()=>{
  return (
    <div className="justify-center items-center flex md:px-5 flex-col gap-5 min-h-185 py-20 text-[#333333]">
      <div className="header flex justify-center w-full">
        <p className="text-[35px] md:text-[48px] lg:text-[56px] md:w-[330px] leading-11 md:leading-15 lg:leading-17 text-center font-[Lilita_One]">Key Features Overview</p>
      </div>
      <div className="features flex flex-col lg:flex-row items-center lg:justify-evenly gap-8 w-[min(1150px,100%)]">
        <div className="feature-card animate-on-scroll flex-1 lg:h-120 w-[min(90%,500px)] lg:w-[min(100%,370px)] bg-[rgba(127,127,127,0.2)] rounded-lg flex flex-col px-2 md:px-5 py-10">
          <div className="top min-h-60 flex-1 rounded-t-lg flex justify-center">
            <div className="relative w-[175px] h-[175px]">
              <img src="/images/Oval.svg" alt="" className="absolute top-18 left-18 w-22 h-22" />
              <img src="/images/Ovalfill.svg" alt="" className="absolute top-4 left-4 w-15 h-15" />
              <img src="/images/rectangle blue.svg" alt="" className="absolute top-10 left-10 w-25 h-25" />
              <img src="/images/rocketsvg.svg" alt="" className="absolute top-15 left-15" />
            </div>
          </div>
          <div className="bottom rounded-b-lg flex flex-col overflow-hidden">
            <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Easy Tracking</div>
            <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left">Effortlessly monitor income and expenses. Gain insights into spending habits with Expense Tracker Pro's intuitive interface and powerful reporting tools.</p>
          </div>
        </div>
        <div className="feature-card animate-on-scroll flex-1 lg:h-120 w-[min(90%,500px)] lg:w-[min(100%,370px)] bg-[rgba(127,127,127,0.2)] rounded-lg flex flex-col px-2 md:px-5 py-10">
          <div className="top min-h-60 flex-1 rounded-t-lg flex justify-center">
            <div className="relative w-[175px] h-[175px]">
              <img src="/images/Oval.svg" alt="" className="absolute top-18 left-18 w-22 h-22" />
              <img src="/images/Ovalfill.svg" alt="" className="absolute top-4 left-4 w-15 h-15" />
              <img src="/images/rectangle green.svg" alt="" className="absolute top-10 left-10 w-25 h-25 rotate-90" />
              <img src="/images/lock.svg" alt="" className="absolute top-15 left-17" />
            </div>
          </div>
          <div className="bottom rounded-b-lg flex flex-col overflow-hidden">
            <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Insightful Reports</div>
            <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left">Visualize spending patterns. Make informed decisions. Expense Tracker Pro's detailed reports provide clarity. Achieve financial goals with confidence and ease.</p>
          </div>
        </div>
        <div className="feature-card animate-on-scroll flex-1 lg:h-120 w-[min(90%,500px)] lg:w-[min(100%,370px)] bg-[rgba(127,127,127,0.2)] rounded-lg flex flex-col px-2 md:px-5 py-10">
          <div className="top min-h-60 flex-1 rounded-t-lg flex justify-center">
            <div className="relative w-[175px] h-[175px]">
              <img src="/images/Oval.svg" alt="" className="absolute top-18 left-18 w-22 h-22" />
              <img src="/images/Ovalfill.svg" alt="" className="absolute top-4 left-4 w-15 h-15" />
              <img src="/images/rectangle yellow.svg" alt="" className="absolute top-10 left-10 w-25 h-25 -rotate-90" />
              <img src="/images/briefcasesvg.svg" alt="" className="absolute top-17 left-16" />
            </div>
          </div>
          <div className="bottom rounded-b-lg flex flex-col overflow-hidden">
            <div className="header text-3xl font-[Bebas_Neue] tracking-widest text-center lg:text-left">Smart Budgets</div>
            <p className="content mt-1 leading-loose font-[Assistant] text-center lg:text-left">Create personalized budgets. Stay on track with Expense Tracker Pro's smart notifications. Achieve financial goals faster and easier than ever before.</p>
          </div>
        </div>
      </div>
      </div>
  )
}
export default Section2