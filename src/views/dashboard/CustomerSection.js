import { CFormInput, CFormSelect, CRow, CCol, CContainer } from "@coreui/react";
import CartSection from "./cart/CartSection";
import { useSelector } from "react-redux";
import CustomersSearch from "./customer/CustomersSearch";


const CustomerSearch = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // cart list

  return (
    <>
      <div className="custormer-search" style={{ background: "white" }}>
        <CustomersSearch />
        {/* cart list */}
        <CartSection cartItems={cartItems} /> 
      </div>
    </>
  );
};

export default CustomerSearch;
