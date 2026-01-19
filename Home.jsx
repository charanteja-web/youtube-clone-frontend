import Sidebar from "../../components/Sidebar/Sidebar"
import Feed from "../../components/Feed/Feed"
import './Home.css'
import { useState } from "react"
 
const Home = ({ sidebar }) => {
    const [category,setCategory]=useState(0);

    return (
        <div className="home-layout">
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
            <div className={`container ${sidebar ? "" : "large-container"}`}>
                <Feed category={category}/>
            </div>
        </div>
    )
}
export default Home
