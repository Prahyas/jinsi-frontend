import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import EditDetailsModal from '../../Components/DetailsModals/EditDetailsModal';
import { DataContext } from '../../ContextAPI/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const { apiData } = useContext(DataContext);
  const [api, setapi] = apiData;
  const { departmentsData } = useContext(DataContext);
  const [departments, setDepartments] = departmentsData;
  const { filteredDepartmentsData } = useContext(DataContext);
  const [filteredDepartments, setFilteredDepartments] = filteredDepartmentsData;
  const { fetchDepartmentsFunction } = useContext(DataContext);
  const { fetchDepartments } = fetchDepartmentsFunction;
  const { fetchDetailsFunction } = useContext(DataContext);
  const { fetchDetails } = fetchDetailsFunction;
  const [editModal, setEditModal] = useState(false);
  const [selectedDetail, setselectedDetail] = useState(null);

  const deleteDetail = async (deleteDetailId) => {
    await axios
      .delete(`${api}/api/details/${deleteDetailId}`)
      .then((response) => {
        deleteNotification();
        setInterval(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        errorNotification();
      });
  };

  const editRow = (detail) => {
    setselectedDetail(detail);
  };
  const deleteNotification = () =>
    toast.success('Deleted successfully', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const errorNotification = () => {
    toast.error('Error, something went wrong', {
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
    console.log('departments', departments);
  }, [departments]);
  useEffect(() => {
    console.log('filteredDepartments', filteredDepartments);
  }, [departments]);
  useEffect(() => {
    console.log('selected', selectedDetail);
  }, [selectedDetail]);

  return (
    <>
      {filteredDepartments.map((department) => {
        return (
          <>
            <div className='flex justify-between items-center mb-2'>
              <p class='text-2xl dark:text-white'>
                {department.attributes.name}
              </p>
              <div class='hidden h-10 lg:flex'>
                <span class='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-3 w-3'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </span>
                <input
                  type='text'
                  id='website-admin'
                  class='rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-red-500 focus:border-red-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                  placeholder='Search'
                />
              </div>
            </div>

            <hr className='mb-5' />

            <div class=' overflow-x-auto shadow-md sm:rounded-lg'>
              <table class='table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    {/* <th scope='col' class='px-6 py-3'>
                      स.नं.
                    </th> */}
                    <th scope='col' class='px-6 py-3'>
                      समानको नाम (स्पेसिफिकेसन) (परिमाण)
                    </th>

                    <th scope='col' class='px-6 py-3'>
                      बुझेको मिति
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      बुझी लिनेको नाम
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      आर्थिक वर्ष
                    </th>

                    <th scope='col' class='px-6 py-3'>
                      <span class='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {department.attributes.details.data.map((detail) => {
                    return (
                      <tr
                        key={detail.id}
                        class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                      >
                        {/* <th
                          scope='row'
                          class='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                        >
                          {detail.id}
                        </th> */}
                        <td class='px-6 py-4 space-y-1'>
                          {detail.attributes.goods.map((good) => {
                            return (
                              <span class='inline-block bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'>
                                {good.goodname} {``} ({good.specification}) {``}{' '}
                                ({good.quantity})
                              </span>
                            );
                          })}
                        </td>

                        <td class='px-6 py-4'>{detail.attributes.date}</td>
                        <td class='px-6 py-4'>
                          {detail.attributes.customername}{' '}
                        </td>
                        <td class='px-6 py-4'>
                          {detail.attributes.fiscalyear}{' '}
                        </td>

                        <td class='flex px-4 py-4'>
                          <a
                            onClick={() => {
                              setEditModal(true);
                              editRow(detail);
                            }}
                            class='mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              class='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                              <path
                                fill-rule='evenodd'
                                d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                                clip-rule='evenodd'
                              />
                            </svg>
                          </a>

                          {editModal ? (
                            <EditDetailsModal
                              editModal={editModal}
                              setEditModal={setEditModal}
                              departmentId={detail.id}
                              detailId={detail.id}
                              attributes={selectedDetail.attributes}
                              // updateDepartments={updateDepartments}
                            />
                          ) : null}
                          <a
                            onClick={() => deleteDetail(detail.id)}
                            class='font-medium text-red-600 dark:text-blue-500 hover:underline'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              class='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fill-rule='evenodd'
                                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                clip-rule='evenodd'
                              />
                            </svg>
                          </a>
                          <ToastContainer />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Details;
