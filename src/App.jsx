import LogoHeader from "./Components/LogoHeader";
import Title from "./Components/Title";
import './App.css'
import NewButton from "./Components/NewButton";
import Sidebar from "./Components/Sidebar/Sidebar";
import Searchbar from "./Components/Searchbar";
import MainCard from "./Components/MainCard";

function App(){
  return (
    <>
    <div className="app">

      <div className="header">
        <LogoHeader className="logo-header"/>
        <Title/>
        <Searchbar/>
      </div>

        <div className="sidebar-container">
        <NewButton />
        <Sidebar />
      </div>

      <MainCard/>

    </div>
    </>
  )
}

export default App;