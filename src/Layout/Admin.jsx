import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Dashboard from '../Views/Admin/Dashboard';
import Details from '../Views/Admin/Details';
import Settings from '../Views/Admin/Settings';

const Admin = () => {
  const [showNav, setshowNav] = useState(false);

  return (
    <>
      <Sidebar showNav={showNav} setshowNav={setshowNav} />

      <Navbar showNav={showNav} setshowNav={setshowNav} />

      <div className='bg-gray-100 lg:ml-[20%] w-[100%] lg:w-[80%] min-h-screen p-6'>
        <div className='mt-14'>
          <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='details' element={<Details />} />
            <Route path='settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
