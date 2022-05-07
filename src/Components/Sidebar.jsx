import { useContext, useEffect, useState } from 'react';
import nepalsarkarlogo from '../Assets/nepalsarkarlogo.png';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../ContextAPI/data';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ showNav, setshowNav }) => {
  const [dropdown1, setdropdown1] = useState(false);
  const [dropdown2, setdropdown2] = useState(false);
  const { parameterData } = useContext(DataContext);
  const [parameter, setParameter] = parameterData;
  const { apiData } = useContext(DataContext);
  const [api, setapi] = apiData;
  const [gaupalika, setgaupalika] = useState([]);
  const [wodakaryalaya, setwodakaryalaya] = useState([]);
  const [parameterModal, setparameterModal] = useState(true);
  const location = useLocation();

  const fetchGaupalika = async () => {
    try {
      const response = await axios.get(
        `${api}/api/departments?filters[type]=गाउँपालिका`
      );
      setgaupalika(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchwodakaryalaya = async () => {
    try {
      const response = await axios.get(
        `${api}/api/departments?filters[type]=वडा%20कार्यालय`
      );
      setwodakaryalaya(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchGaupalika();
    fetchwodakaryalaya();
  }, []);

  return (
    <>
      <div
        className={`${
          showNav ? 'block' : 'hidden'
        } lg:block w-[100%] lg:w-[20%] mt-[7vh] lg:mt-0 h-full fixed overflow-y-auto py-4 px-3 bg-gray-200 dark:bg-gray-800`}
      >
        <div className='hidden lg:flex justify-center mb-5'>
          <img src={nepalsarkarlogo} height={100} width={100} alt='' />
        </div>
        <ul className='space-y-2'>
          <li>
            <NavLink
              to='/admin/dashboard'
              onClick={() => setshowNav(!showNav)}
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
              </svg>
              <span className='ml-3'>नयाँ इन्ट्री </span>
            </NavLink>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              onClick={() => setdropdown1(!dropdown1)}
            >
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span
                className='flex-1 ml-3 text-left whitespace-nowrap'
                sidebar-toggle-item=''
              >
                गाउँपालिका
              </span>
              <svg
                sidebar-toggle-item=''
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>

            <ul className={`${dropdown1 ? 'block' : 'hidden'} py-2 space-y-2`}>
              {gaupalika.map((department) => {
                return (
                  <li>
                    <NavLink
                      to='/admin/details'
                      onClick={() => {
                        setParameter(department.attributes.name),
                          setshowNav(!showNav);
                      }}
                      className='flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    >
                      {department.attributes.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              onClick={() => setdropdown2(!dropdown2)}
            >
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span
                className='flex-1 ml-3 text-left whitespace-nowrap'
                sidebar-toggle-item=''
              >
                ओडा कार्यालय
              </span>
              <svg
                sidebar-toggle-item=''
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
            <ul className={`${dropdown2 ? 'block' : 'hidden'} py-2 space-y-2`}>
              {wodakaryalaya.map((department) => {
                return (
                  <li>
                    <NavLink
                      to='/admin/details'
                      onClick={() => {
                        setParameter(department.attributes.name),
                          setshowNav(!showNav);
                      }}
                      className='flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    >
                      {department.attributes.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <NavLink
              to='/admin/settings'
              onClick={() => setshowNav(!showNav)}
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                  clip-rule='evenodd'
                />
              </svg>
              <span className='ml-3'>सेटिङ</span>
            </NavLink>
          </li>
          {/* <li>
            <a
              href='#'
              className='flex items-center bg-red-700 text-white p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-red-500 dark:hover:bg-gray-700'
            >
              <svg
                className='w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
              </svg>
              <span className='ml-3'>Log out</span>
            </a>
          </li> */}
        </ul>
      </div>
      {!parameter && parameterModal && location.pathname == '/admin/details' ? (
        <>
          <div class=' bg-rgba overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-100 flex justify-center items-center h-full '>
            <div class='relative px-4 w-full max-w-2xl h-full md:h-auto pt-5'>
              <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <div class='flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600'>
                  <h3 class='text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white'>
                    Error
                  </h3>
                  <button
                    type='button'
                    class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    onClick={() => setparameterModal(false)}
                  >
                    <svg
                      class='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>

                <div class='p-6 space-y-6'>
                  {' '}
                  Choose a department from sidebar
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Sidebar;
