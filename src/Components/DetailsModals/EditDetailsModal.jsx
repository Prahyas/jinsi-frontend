import React, { useContext, useEffect, useState } from 'react';
import Dashboard from '../../Views/Admin/Dashboard';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import { DataContext } from '../../ContextAPI/data';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDetailsModal = ({
  editModal,
  setEditModal,
  departmentId,
  detailId,
  attributes,
}) => {
  const { apiData } = useContext(DataContext);
  const [api, setapi] = apiData;
  const [inputFields, setInputFields] = useState([...attributes.goods]);
  const initialFormState = {
    department: null,
    goods: attributes.goods,
    date: attributes.date,
    fiscalyear: attributes.fiscalyear,
    customername: attributes.customername,
  };

  const [data, setdata] = useState(initialFormState);
  const { departmentsData } = useContext(DataContext);
  const [departments, setDepartments] = departmentsData;
  const { fetchDetailsFunction } = useContext(DataContext);
  const { fetchDetails } = fetchDetailsFunction;
  const { fetchDepartmentsFunction } = useContext(DataContext);
  const { fetchDepartments } = fetchDepartmentsFunction;
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'goodname') {
      values[index].goodname = event.target.value;
    } else if (event.target.name === 'specification') {
      values[index].specification = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }

    setInputFields(values);
    setdata({ ...data, goods: values });
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ goodname: '', specification: '', quantity: '' });
    setInputFields(values);
    setdata({ ...data, goods: values });
  };

  const handleRemoveFields = (index) => {
    console.log('index', index);
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setdata({ ...data, goods: values });
  };

  const onSubmit = async (editDetailsId) => {
    console.log('data', data);
    await axios
      .put(`${api}/api/details/${editDetailsId}`, {
        data: data,
      })
      .then((response) => {
        setdata(initialFormState);
        successNotification();
        setInterval(() => {
          setEditModal(false);
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        errorNotification();
      });
  };

  const successNotification = () =>
    toast.success('Data successfully submitted', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const errorNotification = () => {
    toast.error('Error, data not submitted', {
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
    console.log('attributes', attributes);
  }, [attributes]);

  return (
    <div class=' bg-rgba overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full '>
      <div class='relative px-4 w-full max-w-2xl h-full pt-10'>
        <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div class='flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600'>
            <h3 class='text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white'>
              फारम{' '}
            </h3>
            <button
              type='button'
              class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
              onClick={() => setEditModal(false)}
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
            <form>
              <div class='mb-6'>
                <label
                  for='countries'
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
                >
                  शाखा छान्नुहोस्
                </label>
                <select
                  id='countries'
                  onChange={(e) =>
                    setdata({
                      ...data,
                      department: e.target.value,
                    })
                  }
                  class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                >
                  <option value='' selected disabled>
                    Select one...
                  </option>
                  {departments.map((department) => (
                    <option value={department.id}>
                      {department.attributes.name}
                    </option>
                  ))}
                </select>
              </div>
              <hr className='mb-5' />
              <div class='mb-6'>
                <div className='flex justify-between items-center mb-2'>
                  <label
                    for='text'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    समानको सुची
                  </label>
                  <button
                    type='button'
                    onClick={() => handleAddFields()}
                    class='flex justify-center items-center py-2 px-3 text-xs font-medium text-center text-white bg-red-500 rounded-lg'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='h-5 w-5 mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                        clip-rule='evenodd'
                      />
                    </svg>
                    <span>नया</span>
                  </button>
                </div>
                {inputFields.map((inputField, index) => {
                  return (
                    <div
                      key={index}
                      className='my-3 flex justify-center items-center space-x-5'
                    >
                      <input
                        type='text'
                        class='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                        required
                        name='goodname'
                        value={inputField.goodname}
                        placeholder='समानको नाम'
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <input
                        type='text'
                        class='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                        required
                        name='specification'
                        value={inputField.specification}
                        placeholder='स्पेसिफिकेसन'
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <input
                        type='text'
                        class='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                        required
                        name='quantity'
                        value={inputField.quantity}
                        placeholder='परिमाण'
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <button
                        type='button'
                        class='py-2 px-3 text-xs font-medium text-center text-white bg-red-500 rounded-lg'
                        onClick={() => handleRemoveFields(index)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          class='h-5 w-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                            clip-rule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className='flex flex-wrap md:flex-row flex-col'>
                <div class='mb-6 grow md:mr-5'>
                  <label
                    for='email'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    बुझेको मिति
                  </label>
                  {/* <Calendar
                    onChange={(value) =>
                      setdata({ ...data, date: value.bsDate })
                    }
                    className='rounded'
                    required
                  /> */}
                  <input
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                    placeholder='yyyy/mm/dd'
                    value={data.date}
                    onChange={(e) =>
                      setdata({
                        ...data,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div class='mb-6  grow'>
                  <label
                    for='text'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    बुझी लिनेको नाम
                  </label>
                  <input
                    type='text'
                    id='text'
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                    value={data.customername}
                    onChange={(e) =>
                      setdata({
                        ...data,
                        customername: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className='flex flex-wrap md:flex-row flex-col'>
                <div class='mb-6 md:mr-6 grow'>
                  <label
                    for='email'
                    class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    आर्थिक वर्ष
                  </label>
                  <input
                    type='text'
                    id='text'
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                    placeholder='2078/2079'
                    value={data.fiscalyear}
                    onChange={(e) =>
                      setdata({
                        ...data,
                        fiscalyear: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <button
                type='button'
                onClick={() => {
                  onSubmit(detailId);
                }}
                class='text-white disabled:opacity-75 disabled:cursor-not-allowed bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                disabled={!data.department}
              >
                Submit
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetailsModal;
