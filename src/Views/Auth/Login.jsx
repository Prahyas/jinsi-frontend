import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../ContextAPI/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  let navigate = useNavigate();
  const { apiData } = useContext(DataContext);
  const [api, setapi] = apiData;
  const initialFormState = {
    identifier: '',
    password: '',
  };
  const [loginDetails, setloginDetails] = useState(initialFormState);
  const { currentUserData } = useContext(DataContext);
  const [currentUser, setcurrentUser] = currentUserData;

  const errorNotification = (error) => {
    toast.error(`${error}`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    console.log('current User', currentUser);
  }, [currentUser]);

  const Login = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${api}/api/auth/local`, loginDetails);
      setcurrentUser(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.log(error.response.data.error.message);
      errorNotification(error.response.data.error.message);
    }
  };

  return (
    <>
      <div className='bg-gray-200 flex justify-center items-center h-screen p-3'>
        <form className='w-full sm:w-2/5 bg-white p-6 rounded-md shadow-xl'>
          <div className='mb-6'>
            <span className='font-bold text-2xl'> Login </span>
          </div>
          <div className='mb-6'>
            <label
              for='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              इमेल
            </label>
            <input
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dred-500 focus:border-dred-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dred-500 dark:focus:border-dred-500'
              placeholder='name@email.com'
              required
              value={loginDetails.identifier}
              onChange={(e) =>
                setloginDetails({
                  ...loginDetails,
                  identifier: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-6'>
            <label
              for='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              पास्स्वोर्ड 
            </label>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-dred-500 focus:border-dred-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dred-500 dark:focus:border-dred-500'
              required
              value={loginDetails.password}
              onChange={(e) =>
                setloginDetails({
                  ...loginDetails,
                  password: e.target.value,
                })
              }
            />
          </div>
          {/* <div className='flex items-start mb-6'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                aria-describedby='remember'
                type='checkbox'
                className='w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-dred-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-dred-600 dark:ring-offset-gray-800'
                required=''
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                for='remember'
                className='font-medium text-gray-900 dark:text-gray-300'
              >
                इमेल पास्स्वोर्ड  सम्झनुहोस्
              </label>
            </div>
          </div> */}
          <div className='flex md:flex-col items-center '></div>
          <button
            // to='/admin/dashboard'
            onClick={(e) => {
              Login(e);
            }}
            className='mr-3 mb-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-dred-600 dark:hover:bg-dred-700 dark:focus:ring-dred-800'
          >
            लग्-इन् गर्नुहोस्
          </button>
          <Link to='/auth/register' className='text-sm underline text-red-400'>
            नया खाता खोल्नुहोस्
          </Link>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
