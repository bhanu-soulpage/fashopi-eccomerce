
import NavBar from "components/NavBar/navbar"
import SideNav  from "components/sidenav/sidenav"

export default function Dashboard () {
    return(
       
        <div>
                <NavBar/>
             <div className="d-flex">
                 <SideNav/>
                 <h1 className="p-5">Dashboard</h1>

            </div>
            
            
                
        </div>
    )
}