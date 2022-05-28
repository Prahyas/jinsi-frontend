import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = ({ errorTitle, errorMsg }) => {
  return (
    <div className='z-20 h-screen w-screen flex justify-center items-center bg-red-300 fixed left-0 top-0 '>
      <div
        id='alert-additional-content-2'
        className='w-1/2 p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200'
        role='alert'
      >
        <div className='flex items-center'>
          <svg
            className='mr-2 w-5 h-5 text-red-700 dark:text-red-800'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <h3 className='text-lg font-medium text-red-700 dark:text-red-800'>
            {errorTitle}
          </h3>
        </div>
        <div className='mt-2 mb-4 text-sm text-red-700 dark:text-red-800'>
          {errorMsg}
        </div>
        <div className='flex'>
          <NavLink
            to='/auth/login'
            type='button'
            className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900'
          >
            लग्-इन् गर्नुहोस्
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
