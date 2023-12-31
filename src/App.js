import "./styles.css";
import Homepage from "./pages/HomePage";
import Description from "./components/CategoryRow/Description";
import Login from './components/Authentication/login/login'
import SignUp from "./components/Authentication/signup/signup";
import {  Route, Routes } from 'react-router-dom'
import RegistrationForm from "./components/RegistrationForm/registration";
import Profile from "./components/Profile/profile";
import { useEffect } from "react";
import { collection,getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
     var userInfo=[];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'memberships'));
        querySnapshot.forEach((doc) => {
          userInfo.push(doc.data());
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // console.log(userInfo);  
  return (
    <div className="App">

        <Routes>
          <Route path='/' element={<Homepage userInfo={userInfo} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/description' element={<Description />} />
          <Route path='/registration' element={<RegistrationForm/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/dashboard' element={<Dashboard userInfo={userInfo}/>}/>
        </Routes>

    </div>
  );
}