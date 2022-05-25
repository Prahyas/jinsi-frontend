import { useContext, useEffect, useState } from 'react';
import nepalsarkarlogo from '../Assets/nepalsarkarlogo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { DataContext } from '../ContextAPI/data';

const Navbar = ({ showNav, setshowNav }) => {
  let navigate = useNavigate();
  const [dropdown, setdropdown] = useState(false);
  const { currentUserData } = useContext(DataContext);
  const [currentUser, setcurrentUser] = currentUserData;

  const Logout = (e) => {
    e.preventDefault();
    setcurrentUser({});
    navigate('/auth/login');
  };

  useEffect(() => {
    console.log('current user', currentUser);
  }, [currentUser]);

  return (
    <>
      <nav className='flex justify-between px-5 items-center fixed lg:ml-[20%] h-[60px] border-b-2 bg-gray-200 shadow w-[100%] lg:w-[80%]'>
        <div>
          <p className='hidden lg:block text-base dark:text-white'>Welcome!</p>
          <button onClick={() => setshowNav(!showNav)} className='lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </button>
        </div>
        <div className='flex justify-center items-center space-x-3 '>
          <button onClick={() => setdropdown(!dropdown)}>
            <img
              className='inline-block h-8 w-8 lg:h-10 lg:w-10  rounded-full ring-2 ring-red-700'
              src={nepalsarkarlogo}
              alt=''
            />
          </button>
          <div
            className={`${
              dropdown ? 'block' : 'hidden'
            } fixed top-14 right-4 z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
          >
            {/* <ul className='py-1' aria-labelledby='dropdownDividerButton'>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  Earnings
                </a>
              </li>
            </ul> */}
            <div className='py-1'>
              <button
                className='block py-2 px-4 text-sm text-red-700 '
                onClick={(e) => {
                  Logout(e);
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
