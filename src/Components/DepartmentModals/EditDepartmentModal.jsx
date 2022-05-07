import { useEffect, useState } from 'react';

const EditDepartmentModal = ({
  setEditModal,
  id,
  editDepartmentData,
  seteditDepartmentData,
  updateDepartments,
}) => {
  return (
    <>
      <div class=' bg-rgba overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 flex justify-center items-center h-full '>
        <div class='relative px-4 w-full max-w-2xl h-full md:h-auto pt-5'>
          <div class='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div class='flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600'>
              <h3 class='text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white'>
                शाखा सच्याउनुहोस्
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
                <div class='mb-2'>
                  <label
                    for='text'
                    class='block text-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    शाखाको नाम
                  </label>
                  <input
                    type='text'
                    value={editDepartmentData.name}
                    onChange={(e) =>
                      seteditDepartmentData({
                        ...editDepartmentData,
                        name: e.target.value,
                      })
                    }
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Department Name'
                    required
                  />
                </div>
                <div class='mb-2'>
                  <label
                    for='text'
                    class='block text-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    प्रकार
                  </label>
                  <select
                    value={editDepartmentData.type}
                    onChange={(e) =>
                      seteditDepartmentData({
                        ...editDepartmentData,
                        type: e.target.value,
                      })
                    }
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
                  >
                    <option value='' selected disabled>
                      Select one...
                    </option>

                    <option>गाउँपालिका</option>
                    <option>वडा कार्यालय</option>
                  </select>
                  {/* <input
                    type='text'
                    value={editDepartmentData.type}
                    onChange={(e) =>
                      seteditDepartmentData({
                        ...editDepartmentData,
                        description: e.target.value,
                      })
                    }
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Description'
                    required
                  /> */}
                </div>
                <div class='mb-2'>
                  <label
                    for='text'
                    class='block text-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    विवरण
                  </label>
                  <input
                    type='text'
                    value={editDepartmentData.description}
                    onChange={(e) =>
                      seteditDepartmentData({
                        ...editDepartmentData,
                        description: e.target.value,
                      })
                    }
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Description'
                    required
                  />
                </div>
              </form>
            </div>

            <div class='flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600'>
              <button
                type='button'
                onClick={() => {
                  setEditModal(false),
                    updateDepartments(id, editDepartmentData);
                }}
                class='text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                पेश गर्नुहोस्
              </button>
              <button
                onClick={() => setEditModal(false)}
                type='button'
                class='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600'
              >
                रद्द
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDepartmentModal;
