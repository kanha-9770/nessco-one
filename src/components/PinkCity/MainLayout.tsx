import LandingPage from "@/components/PinkCity/LandingPage"
import SecondPage from "@/components/PinkCity/SecondPage"
import Bluepage from "@/components/PinkCity/Bluepage"
import PinkPage from "@/components/PinkCity/PinkPage"
import Photocolag from "@/components/PinkCity/Photocolag"
import { PinkCityData } from "./types/constant"

interface MainLayoutProps{
    pinkcityData:PinkCityData
}

export default function MainLayout ({pinkcityData}:MainLayoutProps) {

    return (
        <main className="bg-gray-100 lg:overflow-hidden md:overflow-hidden overflow-hidden ">
       <LandingPage pinkcityData={pinkcityData}/>
        <SecondPage  pinkcityData={pinkcityData}/>
         
       <Bluepage pinkcityData={pinkcityData}/>
   
      <PinkPage pinkcityData={pinkcityData}/>
          
      <Photocolag/>
        </main>
    )

}
