import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import userData from './db';

const Home = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(true);
  const [createAccount, setCreateAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [userdata, setUserdata] = useState(userData);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleUserDetails = () => {
    setUserDetails(true);
    setCreateAccount(false);
  }
  const handleCreateAccount = () => {
    setUserDetails(false);
    setCreateAccount(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('./api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          phone: phone
        }),
      });

      if (res.status == 400) {
        setError("Missing required fields")
        setTimeout(() => {
          setError("");
        }, 1500);
        return;
      }

      if (res.ok) {
        const newUserData = await res.json();
        // console.log('New User Data:', newUserData);

        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setUserDetails(true);
          setCreateAccount(false);
        }, 2000);
        // router.push('/');
      } else {
        console.error('Failed to create account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleSearch = () => {
    const filteredData = userData.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserdata(filteredData);
  }

  const handleOpen = (user) => {
    setOpen(true);
    setCurrentUser(user);
  }

  const handleClose = () => setOpen(false);

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
                      <button type='submit' onClick={handleSubmit} className='lg:w-1/2 w-full bg-indigo-600 h-8 lg:h-9 rounded-md text-indigo-100 font-semibold'>Submit</button>
                  </div>
                  {
                    error !== "" ? <div className='lg:w-full flex items-center justify-center'>
                      <Alert className='lg:w-1/2 w-full' severity="error">{ error }</Alert>
                    </div> : ""
                  }
                  {
                    success ? <div className='lg:w-full flex items-center justify-center'>
                      <Alert className='lg:w-1/2 w-full' severity="success">Account created successfully</Alert>
                    </div> : ""
                  }
                  {/* </form> */}
                </div>
              </div>
            : ""
          }
          {
            userDetails ? 
              <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row w-full items-center justify-center my-10'>
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder='Search by username' className='pl-2 h-10 lg:w-[40%] w-[60%] rounded-l-md outline-none focus:border-solid focus:border-[2.5px] focus:border-indigo-300'/>
                  <button onClick={handleSearch} className='bg-indigo-600 lg:w-[8%] w-[15%] rounded-r-md font-semibold h-10 text-indigo-100'>Search</button>
                </div>
                <div className='lg:w-full w-full flex justify-center lg:p-0'>
                  <table id='myTable' className='border-2 border-solid border-indigo-200 border-collapse lg:w-5/6 w-5/6'>
                    <thead className=''>
                      <tr className='bg-indigo-500'>
                        <th className='lg:p-4 p-0 py-3 text-indigo-100'>ID</th>
                        <th className='lg:p-4 p-0 py-3 text-indigo-100'>Username</th>
                        <th className='lg:p-4 p-0 py-3 text-indigo-100'>Email</th>
                        <th className='lg:p-4 p-0 py-3 text-indigo-100'>Phone</th>
                        <th className='lg:p-4 p-0 py-3 text-indigo-100'>Creation Date</th>
                        <th className='lg:p-4 p-0 py-3 text-indigo-100'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userdata.map((user) => (
                          <tr className='border-b-2 bg-indigo-50 border-indigo-200' key={user.id}>
                            <td className='lg:p-2 p-0 py-3 text-center'>{user.id}</td>
                            <td className='lg:p-2 p-0 py-3 text-center'>{user.username}</td>
                            <td className='lg:p-2 p-0 py-3 text-center'>{user.email}</td>
                            <td className='lg:p-2 p-0 py-3 text-center'>{user.phone}</td>
                            <td className='lg:p-2 p-0 py-3 text-center'>{user.creationDate}</td>
                            <td className='lg:p-2 p-0 py-3 flex items-center justify-center'>
                            <button className='bg-green-700	text-white h-6 font-semibold lg:text-xs rounded-lg lg:p-2 p-0 py-2 flex items-center justify-center text-[8px]' onClick={() => handleOpen(user)}>Generate Report</button>
                            </td>
                          </tr>
                      ))}
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            <p className='text-xl font-semibold text-center'>User Details</p>
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p className='my-2 text-base'><span className='font-semibold'>User ID: </span>{currentUser.id}</p>
                            <p className='my-2 text-base'><span className='font-semibold'>Username: </span>{currentUser.username}</p>
                            <p className='my-2 text-base'><span className='font-semibold'>Email: </span>{currentUser.email}</p>
                            <p className='my-2 text-base'><span className='font-semibold'>Phone: </span>{currentUser.phone}</p>
                            <p className='my-2 text-base'><span className='font-semibold'>Date of creation: </span>{currentUser.creationDate}</p>
                          </Typography>
                        </Box>
                      </Modal>
                    </tbody>
                  </table>
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