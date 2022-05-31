import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import EditDetailsModal from '../../Components/DetailsModals/EditDetailsModal';
import { DataContext } from '../../ContextAPI/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleDetail from './SingleDetail';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import ReactToPrint from 'react-to-print';
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';
import { adToBs, bsToAd } from '@sbmdkl/nepali-date-converter';

const Details = () => {
  const { apiData } = useContext(DataContext);
  const [api, setapi] = apiData;
  const { departmentsData } = useContext(DataContext);
  const [departments, setDepartments] = departmentsData;
  const { filteredDepartmentsData } = useContext(DataContext);
  const [filteredDepartments, setFilteredDepartments] = filteredDepartmentsData;
  const { fetchDepartmentsFunction } = useContext(DataContext);
  const [editModal, setEditModal] = useState(false);
  const [selectedDetail, setselectedDetail] = useState(null);
  const [reportModal, setreportModal] = useState(false);
  const initialDate1 = {
    date1: '',
    timestamp1: '',
  };
  const initialDate2 = {
    date2: '',
    timestamp2: '',
  };
  const [searchDate1, setserchDate1] = useState(initialDate1);
  const [searchDate2, setserchDate2] = useState(initialDate2);

  const componentRef = useRef();

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
  }, [filteredDepartments]);
  useEffect(() => {
    console.log('selected', selectedDetail);
  }, [selectedDetail]);
  useEffect(() => {
    console.log('date1', searchDate1);
    console.log('date2', searchDate2);
  }, [searchDate1, searchDate2]);

  // useEffect(() => {
  //   if (searchDate1 || searchDate2) {
  //     const daterangeSearch = () => {
  //       filteredDepartments.attributes.details.data
  //         .filter(
  //           (data) =>
  //             data.timestamp * 1000 >= searchDate1.timestamp1 &&
  //             data.timestamp * 1000 <= searchDate2.timestamp2
  //         )
  //         .map((data) => {
  //           const date = new Date(data.timestamp * 1000);
  //           const dd = date.toDateString();
  //           console.log('dd', dd);
  //         });
  //     };
  //     daterangeSearch();
  //   }
  // }, [searchDate1, searchDate2]);

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
                <div>
                  <NepaliDatePicker
                    className=' mr-5'
                    value={searchDate1.date1}
                    onChange={(value) => {
                      console.log(value);
                      const adDate = bsToAd(value);
                      const timeStamp = Date.parse(adDate);
                      setserchDate1({
                        ...searchDate1,
                        date1: value,
                        timestamp1: timeStamp,
                      });
                    }}
                    options={{ calenderLocale: 'ne', valueLocale: 'en' }}
                  />
                </div>
                <div>
                  <NepaliDatePicker
                    inputClassName='form-control'
                    className='mr-5'
                    value={searchDate2.date2}
                    onChange={(value) => {
                      console.log(value);
                      const adDate = bsToAd(value);
                      const timeStamp = Date.parse(adDate);
                      setserchDate2({
                        ...searchDate2,
                        date2: value,
                        timestamp2: timeStamp,
                      });
                    }}
                    options={{ calenderLocale: 'ne', valueLocale: 'en' }}
                  />
                </div>
                <button
                  onClick={() => {
                    setserchDate1(initialDate1);
                    setserchDate2(initialDate2);
                  }}
                  className='mr-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-dred-600 dark:hover:bg-dred-700 dark:focus:ring-dred-800'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                {/* <span class='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
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
                /> */}
              </div>
            </div>

            <hr className='mb-5' />
            <div className='flex justify-end mb-5 px-5'>
              <ReactToPrint
                trigger={() => (
                  <button className='mr-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-dred-600 dark:hover:bg-dred-700 dark:focus:ring-dred-800'>
                    प्रिन्ट गर्नुहोस
                  </button>
                )}
                content={() => componentRef.current}
              />
              <ReactHtmlTableToExcel
                id='test-table-xls-button'
                className='download-table-xls-button text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-dred-600 dark:hover:bg-dred-700 dark:focus:ring-dred-800'
                table='table-to-xls'
                filename='tablexls'
                sheet='tablexls'
                buttonText='डाउन्लोड गर्नुहोस'
              />
            </div>
            <div
              ref={componentRef}
              class=' overflow-x-auto shadow-md sm:rounded-lg'
            >
              <table
                id='table-to-xls'
                class='table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400'
              >
                <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    {/* <th scope='col' class='px-6 py-3'>
                      स.नं.
                    </th> */}
                    <th scope='col' class='px-6 py-3'>
                      समानको नाम (स्पेसिफिकेसन) (परिमाण)
                    </th>

                    <th scope='col' class='w-[15%] px-6 py-3'>
                      बुझेको मिति
                    </th>
                    <th scope='col' class='w-[15%] px-6 py-3'>
                      बुझी लिनेको नाम
                    </th>
                    <th scope='col' class='w-[15%] px-6 py-3'>
                      आर्थिक वर्ष
                    </th>

                    <th scope='col' class='no-print px-6 py-3'>
                      <span class='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                {searchDate1.date1 ||
                searchDate1.timestamp1 ||
                searchDate2.date2 ||
                searchDate2.timestamp2 ? (
                  <>
                    <tbody>
                      {department.attributes.details.data
                        .filter(
                          (detail) =>
                            detail.attributes.timestamp >=
                              searchDate1.timestamp1 &&
                            detail.attributes.timestamp <=
                              searchDate2.timestamp2
                          // detail.attributes.timestamp ===
                          // searchDate1.timestamp1
                        )
                        .map((detail) => {
                          return (
                            <tr
                              key={detail.id}
                              class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
                            >
                              <td class='px-6 py-4 space-y-1'>
                                {detail.attributes.goods.map((good) => {
                                  return (
                                    <span class='flex bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'>
                                      {``} {good.goodname} {``} (
                                      {good.specification}) {``}({good.quantity}
                                      )
                                    </span>
                                  );
                                })}
                              </td>

                              <td class='px-6 py-4'>
                                {' '}
                                {detail.attributes.date}
                              </td>
                              <td class='px-6 py-4'>
                                {detail.attributes.customername}{' '}
                              </td>
                              <td class='px-6 py-4'>
                                {detail.attributes.fiscalyear}{' '}
                              </td>

                              <td class='no-print background flex px-6 py-4'>
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

                                <a
                                  onClick={() => deleteDetail(detail.id)}
                                  class='mr-2 font-medium text-red-600 dark:text-blue-500 hover:underline'
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
                                <a
                                  onClick={() => {
                                    setreportModal(true);
                                    editRow(detail);
                                  }}
                                  class='font-medium text-gray-600 dark:text-blue-500 hover:underline'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                                    <path
                                      fillRule='evenodd'
                                      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                      clipRule='evenodd'
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
                                {reportModal ? (
                                  <SingleDetail
                                    reportModal={reportModal}
                                    setreportModal={setreportModal}
                                    departmentId={detail.id}
                                    // detailId={detail.id}
                                    selectedDetail={selectedDetail}
                                    attributes={selectedDetail.attributes}
                                    // updateDepartments={updateDepartments}
                                  />
                                ) : null}
                                <ToastContainer />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </>
                ) : (
                  <>
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
                                  <span class='flex bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'>
                                    {``} {good.goodname} {``} (
                                    {good.specification}) {``}({good.quantity})
                                  </span>
                                );
                              })}
                            </td>

                            <td class='px-6 py-4'> {detail.attributes.date}</td>
                            <td class='px-6 py-4'>
                              {detail.attributes.customername}{' '}
                            </td>
                            <td class='px-6 py-4'>
                              {detail.attributes.fiscalyear}{' '}
                            </td>

                            <td class='no-print background flex px-6 py-4'>
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

                              <a
                                onClick={() => deleteDetail(detail.id)}
                                class='mr-2 font-medium text-red-600 dark:text-blue-500 hover:underline'
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
                              <a
                                onClick={() => {
                                  setreportModal(true);
                                  editRow(detail);
                                }}
                                class='font-medium text-gray-600 dark:text-blue-500 hover:underline'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                                  <path
                                    fillRule='evenodd'
                                    d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                    clipRule='evenodd'
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
                              {reportModal ? (
                                <SingleDetail
                                  reportModal={reportModal}
                                  setreportModal={setreportModal}
                                  departmentId={detail.id}
                                  // detailId={detail.id}
                                  selectedDetail={selectedDetail}
                                  attributes={selectedDetail.attributes}
                                  // updateDepartments={updateDepartments}
                                />
                              ) : null}
                              <ToastContainer />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Details;
