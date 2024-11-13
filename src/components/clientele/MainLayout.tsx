import React from "react";
import { ClienteleItem } from "./types/constant";
import Grid from "./Grid";
import Clientele from "./Clientele";

interface MainLayoutProps{
   clienteleData:ClienteleItem
  }

const MainLayout:React.FC <MainLayoutProps>=({clienteleData})=>{
    return(
        <main className="bg-black overflow-hidden">
             <Clientele clienteleData={clienteleData}/>
            <div className="mt-12">
            <Grid clienteleData={clienteleData} />
            </div>

        </main>
    )
}

export default MainLayout;