import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'flowbite';
import Admin from './Layout/Admin';
import Auth from './Layout/Auth';
import { DataProvider } from './ContextAPI/data.jsx';
import NotFound from './Components/NotFound';

const App = () => {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/auth/*' element={<Auth />} />
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/' element={<Auth />} />
            <Route
              path='*'
              element={
                <NotFound
                  errorTitle={`माफ गर्नुहोला`}
                  errorMsg={`यो पेजमा केहि पनि छैन`}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
};

export default App;
