import './App.css'
import {Routes, Route} from "react-router-dom";
import PathRoutes from './helpers/Routes.helper';
/*Components */
import Form from "./components/Form/Form.jsx";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar"


function App() {

  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path={PathRoutes.HOME} element={<Home />}/>
        <Route path={PathRoutes.DETAIL} element={<Detail />}/>
        <Route path={PathRoutes.FORM} element={<Form />}/>
      </Routes>
    </div>
  )
}

export default App
