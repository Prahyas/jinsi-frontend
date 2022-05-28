import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();
4;

export const DataProvider = (props) => {
  const [parameter, setParameter] = useState('');
  // const [api, setapi] = useState('http://localhost:1337');
  const [api, setapi] = useState('https://jinsibackend.herokuapp.com');
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setfilteredDepartments] = useState([]);
  const [details, setDetails] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const getLocal = () => {
      // if (localStorage.getItem('departments') === null) {
      //   localStorage.setItem('departments', JSON.stringify([]));
      // } else {
      //   let localDb = JSON.parse(localStorage.getItem('departments'));
      //   setDepartments(localDb);
      // }
      // if (localStorage.getItem('filteredDepartments') === null) {
      //   localStorage.setItem('filteredDepartments', JSON.stringify([]));
      // } else {
      //   let localDb = JSON.parse(localStorage.getItem('filteredDepartments'));
      //   setfilteredDepartments(localDb);
      // }
      // if (localStorage.getItem('details') === null) {
      //   localStorage.setItem('details', JSON.stringify([]));
      // } else {
      //   let localDb = JSON.parse(localStorage.getItem('details'));
      //   setDetails(localDb);
      // }
      if (localStorage.getItem('parameter') === null) {
        localStorage.setItem('parameter', JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem('parameter'));
        setParameter(localDb);
      }
      if (localStorage.getItem('currentUser') === null) {
        localStorage.setItem('currentUser', JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem('currentUser'));
        setcurrentUser(localDb);
      }
    };
    getLocal();
  }, []);

  useEffect(() => {
    const saveLocal = () => {
      // localStorage.setItem('departments', JSON.stringify(departments));
      // localStorage.setItem(
      //   'filteredDepartments',
      //   JSON.stringify(filteredDepartments)
      // );
      // localStorage.setItem('details', JSON.stringify(details));
      localStorage.setItem('parameter', JSON.stringify(parameter));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };
    saveLocal();
  }, [parameter, currentUser]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${api}/api/departments?populate[0]=details&populate[1]=details.goods`
      );
      setDepartments(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchfilteredDepartments = async () => {
    try {
      const response = await axios.get(
        `${api}/api/departments?filters[name][$eq]=${parameter}&populate[0]=details&populate[1]=details.goods`
      );
      setfilteredDepartments(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${api}/api/departments?populate[0]=details&populate[1]=details.goods`
      );
      setDetails(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDetails();
  }, []);

  useEffect(() => {
    fetchfilteredDepartments();
  }, [parameter]);

  return (
    <DataContext.Provider
      value={{
        apiData: [api, setapi],
        departmentsData: [departments, setDepartments],
        fetchDepartmentsFunction: { fetchDepartments },
        filteredDepartmentsData: [filteredDepartments, setfilteredDepartments],
        fetchfilteredDepartmentsFunction: { fetchfilteredDepartments },
        detailsData: [details, setDetails],
        fetchDetailsFunction: { fetchDetails },
        parameterData: [parameter, setParameter],
        currentUserData: [currentUser, setcurrentUser],
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
