import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInForm from './Components/LogInForm/LogInForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import MainCabinet from './Components/MainCabinet/MainCabinet'
import SiteFooter from "./Components/SiteFooter/SiteFooter";
import SiteHeader from "./Components/SiteHeader/SiteHeader";
import POSPage from './Components/POSPage/POSPage'

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
        <Routes>
          <Route path="/login" element={<LogInForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/cabinet" element={<MainCabinet />}></Route>
          <Route path="/:id" element={<POSPage/>}/>
        </Routes>
      <SiteFooter /> 
    </BrowserRouter>
  );
}



export default App;
