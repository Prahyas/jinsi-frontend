import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../ContextAPI/data';

const Register = () => {
  let navigate = useNavigate();
  const { apiData } = useContext(DataContext);
  const [api, setapi] = apiData;
  const initialFormState = {
    username: '',
    email: '',
    password: '',
  };
  const [registerDetails, setregisterDetails] = useState(initialFormState);
  const { currentUserData } = useContext(DataContext);
  const [currentUser, setcurrentUser] = currentUserData;

  useEffect(() => {
    console.log('current', currentUser);
  }, [currentUser]);

  const Register = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${api}/api/auth/local/register`,
        registerDetails
      );
      console.log('Response', response);
      setcurrentUser(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <>
      <div className='bg-gray-200 flex justify-center items-center h-screen p-3'>
        <form className='w-full sm:w-2/5 bg-white p-6 rounded-md shadow-xl'>
          <div className='mb-6'>
            <span className='font-bold text-2xl'>Register</span>
          </div>
          <div className='mb-6'>
            <label
              for='username'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              तपाइको नाम
            </label>
            <input
              type='text'
              id='username'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
              placeholder='JohnDoe'
              required
              value={registerDetails.username}
              onChange={(e) =>
                setregisterDetails({
                  ...registerDetails,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-6'>
            <label
              for='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              तपाईँको इमेल
            </label>
            <input
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
              placeholder='name@emmail.com'
              required
              value={registerDetails.email}
              onChange={(e) =>
                setregisterDetails({
                  ...registerDetails,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-6'>
            <label
              for='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              तपाईँको पास्स्वोर्ड 
            </label>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
              required
              value={registerDetails.password}
              onChange={(e) =>
                setregisterDetails({
                  ...registerDetails,
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
                className='w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-red-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-gray-800'
                required=''
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                for='remember'
                className='font-medium text-gray-900 dark:text-gray-300'
              >
                I agree with the Terms & Conditions
              </label>
            </div>
          </div> */}
          <div className='flex md:flex-col items-center '></div>
          <button
            type='submit'
            className='mr-3 mb-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            onClick={(e) => {
              Register(e);
            }}
          >
            नया खाता खोल्नुहोस्
          </button>
          <Link to='/auth/login' className='text-sm underline text-red-400'>
            पहिले नै खाता छ ?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
