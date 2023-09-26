import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

export default   function useFetch (url,outlet_id) {

const [recentBooking, setRecentBooking] = useState([]);
const [loading, setLoading] = useState(true);
const [networkError, setNetworkError] = useState(false);



  let isFirstCall = true;
  let intervalId;

  const getAllRecentInvoices = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (isFirstCall) {
        setLoading(true);
        isFirstCall = false; // Update the flag after the first call
      }
      const response = await axios.post(
    url,
        { outlet_id },
        { headers }
      );
      console.log(response);
      setRecentBooking(response.data.recentOrders);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "No Recent Orders Found.") {
        console.log("No Returned Orders Found.");
        setNetworkError(true);
        setLoading(false);
      } else if (err.response.data.message == "Outlet Id Required.") {
        if (isFirstCall) {
            setLoading(true);
            isFirstCall = false; 
          }
        console.log(err);
      } else {
        console.log(err);
        setNetworkError(true);
        setLoading(false);
      }
    }
  };
//   useEffect(() => {
//     if(outlet_id){
//        getAllRecentInvoices()
//     }
//   }, [outlet_id]);

useEffect(() => {
    clearInterval(intervalId);
    
    if (outlet_id) {
      getAllRecentInvoices();
    }
  
    intervalId = setInterval(() => {
      if (outlet_id) {
        getAllRecentInvoices();
      }
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [outlet_id]);  

  console.log(recentBooking)

return { recentBooking, loading, networkError };

}