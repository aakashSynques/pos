import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetch } from "../../../utils";
import { setCustomerAccountJson } from "../../../action/actions";

const GetAllAccountsData = ({ customer_id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem("pos_token");
        const headers = { Authorization: `Bearer ${token}` };
        const body = {
          cust_id: customer_id,
        };
        const response = await fetch(
          "/api/customers/getCustomerAccount",
          "post",
          body,
          headers
        );

        dispatch(setCustomerAccountJson(response.data.cust_acc_json));
      } catch (err) {
        console.error("Error ", err);
      }
    };

    if (customer_id) {
      fetchAccountData();
    }
  }, [customer_id, dispatch]);

  return null;
};

export default GetAllAccountsData;
