"use client";
import React from "react";
import { SustainabilityData } from "./types/constant";
// import Page1 from './Page1'
import Page1 from "./Page1"
import Page2 from "./Page2";
import Page3 from "./Page3";

interface MainLayoutProps{
  sustainData:SustainabilityData;
}

// const Page1 = dynamic(() => import("./Page1"), {
//   ssr: false,
//   loading: () => (
//     <div className="mt-8 flex items-center justify-center h-full ">
//       <div className="w-full h-[60rem] lg:w-full   mx-20 bg-white rounded-[40px] relative">
//         <div className="flex flex-col items-center justify-center mt-48">
//           <Image width={50}  height={50} src="/assets/loading.gif" alt="" />
//         </div>
//       </div>
//     </div>
//   ),
// });

const Pages:React.FC<MainLayoutProps> = ({sustainData}) => {
  


  
  // const [shown, setShown] = useState(false);
  return (
    <div>
      <Page1 sustainData={sustainData}/>
      {/* {shown && <Page1 />} */}
      <Page2 sustainData={sustainData}/>
      <Page3 sustainData={sustainData}/>
    </div>
  );
};

export default Pages;
