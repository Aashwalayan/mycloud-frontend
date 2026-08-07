import LogoHeader from "./Components/LogoHeader";
import Title from "./Components/Title";
import './App.css'
import NewButton from "./Components/NewButton";
import Sidebar from "./Components/Sidebar/Sidebar";

function App(){
  return (
    <>
    <div className="sidebar">

      <div className="header">
        <LogoHeader className="logo-header"/>
        <Title/>
      </div>

        <NewButton/>
        <Sidebar/>
    </div>
    </>
  )
}

export default App;