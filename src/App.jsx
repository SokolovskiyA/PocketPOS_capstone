import "./App.scss";
import { ReactSession } from 'react-client-session';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import LogInForm from './Components/LogInForm/LogInForm';
//import RegisterForm from './Components/RegisterForm/RegisterForm';
import MainCabinet from './Components/MainCabinet/MainCabinet'
import SiteFooter from "./Components/SiteFooter/SiteFooter";
import SiteHeader from "./Components/SiteHeader/SiteHeader";
import POSPage from './Components/POSPage/POSPage'
import POSworkingScreen from "./Components/POSworkingScreen/POSworkingScreen";
import AddNewRestaurant from "./Components/AddNewRestaurant/AddNewRestaurant";




function App() {
  ReactSession.setStoreType("localStorage");
  ReactSession.set("username", "Alex");
  ReactSession.set("user_id", "a0e055de-7c2a-11ed-a1eb-0242ac120002");
  ReactSession.set("server_api", "http://localhost:8081");
  
  const id = ReactSession.get("user_id")
  
  return (
    <BrowserRouter>
      <SiteHeader />
        <Routes>
          {/*<Route path="/login" element={<LogInForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>*/}
          <Route path={`/${id}`} element={<MainCabinet />}></Route>
          <Route path={`/${id}/shift`} element={<POSPage/>}/>
          <Route path={`/${id}/shift/:tableId`} element={<POSworkingScreen/>}/>
          <Route path="/user/add-new-restaurant" element={<AddNewRestaurant />}></Route>
        </Routes>
      <SiteFooter /> 
    </BrowserRouter>
  );
}



export default App;
