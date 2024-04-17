import { Outlet } from "react-router-dom";
import Topbar from "../componets/Topbar";

const RootLayout = () => {
    return (
        <div className="w-full">
            <Topbar/>

            <section>
                <Outlet/>
            </section>
        </div>
    )
  }
  
  export default RootLayout;