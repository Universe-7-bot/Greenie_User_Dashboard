import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useState } from 'react';
import { useRouter } from 'next/router';
import userData from './db';
import fs from "fs";

const Home = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(true);
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleUserDetails = () => {
    setUserDetails(true);
    setCreateAccount(false);
  }
  const handleCreateAccount = () => {
    setUserDetails(false);
    setCreateAccount(true);
  }
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      id: userData.length + 1,
      creationDate: new Date().toLocaleDateString(),
      username: username,
      email: email,
      password: password,
      phone: phone
    };
    console.log(newUserData);
    userData.push(newUserData);
    // const fs = require('fs');
    fs.writeFileSync('./db.js', `export default ${JSON.stringify(userData, null, 2)};`);
    // setFormData({
    //   username: '',
    //   email: '',
    //   password: '',
    //   phone: '',
    // });
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
  }
  return (
    <>
      <div className="w-full h-screen flex lg:flex-row flex-col">
        <div className="lg:w-[20%] w-full bg-indigo-700 lg:h-full h-[12%] flex items-center lg:justify-center">
          <div className="flex lg:flex-col flex-row w-full items-center lg:p-0 p-2">
            <div className={`flex items-center justify-center flex-row ${userDetails ? 'bg-indigo-400 rounded-lg' : 'bg-indigo-700'} hover:bg-indigo-400 hover:rounded-lg p-4 w-5/6`} onClick={handleUserDetails}>
              <DashboardOutlinedIcon className='text-indigo-100'
              />
              <p className='ml-1.5 text-indigo-100 text-lg font-semibold'>User Details</p>
            </div>
            <div className={`flex items-center justify-center flex-row ${createAccount ? 'bg-indigo-400 rounded-lg' : 'bg-indigo-700'} hover:bg-indigo-400 hover:rounded-lg p-4 w-5/6 lg:mt-2`} onClick={handleCreateAccount}>
              <GroupAddOutlinedIcon className='text-indigo-100' />
              <p className='ml-1.5 text-indigo-100 text-lg font-semibold'>Create Account</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] w-full bg-indigo-100 lg:h-full h-[88%] flex items-center justify-center">
          {
            createAccount ?
              <div className='lg:w-5/6 flex flex-col'>
                <p className='text-3xl font-bold text-center'>Create your account</p>
                <div className='lg:mt-4 lg:w-full w-full mt-4'>
                  {/* <form action="" onSubmit={handleFormSubmit} className=''> */}
                    <div className='lg:w-full w-full my-4 flex flex-col items-center justify-center'>
                      <p className='text-base font-medium lg:w-1/2 w-full'>Username</p>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='pl-2 lg:w-1/2 w-full h-8 mt-2 rounded-md outline-none focus:border-solid focus:border-[2.5px] focus:border-indigo-300' />
                    </div>
                    <div className='lg:w-full w-full my-4 flex flex-col items-center justify-center'>
                      <p className='text-base font-medium lg:w-1/2 w-full'>Email</p>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='pl-2 lg:w-1/2 w-full h-8 mt-2 rounded-md outline-none focus:border-solid focus:border-[2.5px] focus:border-indigo-300' />
                    </div>
                    <div className='lg:w-full w-full my-4 flex flex-col items-center justify-center'>
                      <p className='text-base font-medium lg:w-1/2 w-full'>Password</p>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='pl-2 lg:w-1/2 w-full h-8 mt-2 rounded-md outline-none focus:border-solid focus:border-[2.5px] focus:border-indigo-300' />
                    </div>
                    <div className='lg:w-full w-full my-4 flex flex-col items-center justify-center'>
                      <p className='text-base font-medium lg:w-1/2 w-full'>Phone</p>
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='pl-2 lg:w-1/2 w-full h-8 mt-2 rounded-md outline-none focus:border-solid focus:border-[2.5px] focus:border-indigo-300' />
                    </div>
                    <div className='lg:w-full my-6 lg:my-7 flex items-center justify-center'>
                      <button type='submit' onClick={handleFormSubmit} className='lg:w-1/2 w-full bg-indigo-600 h-8 lg:h-9 rounded-md text-indigo-100 font-semibold'>Submit</button>
                    </div>
                  {/* </form> */}
                </div>
              </div>
            : ""
          }
        </div>
      </div>
    </>
  )
}

export default Home;