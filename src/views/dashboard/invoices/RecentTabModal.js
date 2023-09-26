import React, { useState } from "react";
import {
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CNavItem,
  CNav,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
} from "@coreui/react";
import CounterSale from "./recentsale/CounterSale";
import OnTable from "./recentsale/OnTable";
import PickUp from "./recentsale/PickUp";
import HomeDelivery from "./recentsale/HomeDelivery";
import RazorPay from "./recentsale/RazorePay";
import Zometo from "./recentsale/Zometo";
import Swiggy from "./recentsale/Swiggy";
import ReturnBIll from "./recentsale/ReturnBIll";
import { useSelector } from "react-redux";

function RecentTabModal({ booking, setBooking }) {
  const [activeKey, setActiveKey] = useState(1);

  const recentBooking = useSelector(
    (state) => state.recentBooking.recentBookings
  );


  // counter salesd Notification
  const getCountersale = () => {
    let countersaleLength = [];
    
    recentBooking && recentBooking.forEach(({ sales_json }) => {
      try {
        // const sales_json = JSON.parse(sales_json);

        if (sales_json.cartSumUp.deliveryMode) {
          const deliveryMode = sales_json.cartSumUp.deliveryMode;
          if (deliveryMode > 0) {
            const counterTab = deliveryMode == "1" ? deliveryMode : null;
            countersaleLength.push(counterTab);
          }
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });
    const filteredPayModes = countersaleLength.filter(Boolean);

    return filteredPayModes; // Return the array of payMode values
  };
  const counterSaleArray = getCountersale();




  // Pick Up Notification
  const getPickUp = () => {
    let pickUpLength = [];

    recentBooking.forEach(({ sales_json }) => {
      try {
        if (sales_json.cartSumUp.deliveryMode) {
          const deliveryMode = sales_json.cartSumUp.deliveryMode;
          if (deliveryMode > 0) {
            const pickUpTab = deliveryMode == "3" ? deliveryMode : null;
            pickUpLength.push(pickUpTab);
          }
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });

    const filteredPickUp = pickUpLength.filter(Boolean);

    return filteredPickUp; // Return the array of payMode values
  };
  const pickUpArray = getPickUp();

  // Home Delivery Notification
  const getHomeDelivery = () => {
    let HomeDeliveryLength = [];

    recentBooking.forEach(({ sales_json }) => {
      try {
        if (sales_json.cartSumUp.deliveryMode) {
          const deliveryMode = sales_json.cartSumUp.deliveryMode;
          if (deliveryMode > 0) {
            const homeDeliveryTab = deliveryMode == "4" ? deliveryMode : null;
            HomeDeliveryLength.push(homeDeliveryTab);
          }
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });

    const filteredHomeDelivery = HomeDeliveryLength.filter(Boolean);

    return filteredHomeDelivery; // Return the array of payMode values
  };
  const HomeDeliveryArray = getHomeDelivery();

  // Razor Pay tab Notification
  const getRazorPay = () => {
    let razorPayLength = [];
    recentBooking.forEach(({ sales_json }) => {
      try {
        // const sales_json = JSON.parse(sales_json);

        if (sales_json.cartSumUp.payDetails) {
          const payDetails = sales_json.cartSumUp.payDetails;
          if (payDetails > 0) {
            const payMode =
              payDetails[0].payMode == "24" ? payDetails[0] : null;
            razorPayLength.push(payMode);
          }
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });
    const filteredRazorPay = razorPayLength.filter(Boolean);
    return filteredRazorPay; // Return the array of payMode values
  };
  const razorPayArray = getRazorPay();

  // Zomato Delivery Notification
  const getZomato = () => {
    let zomatoLength = [];

    recentBooking.forEach(({ sales_json }) => {
      try {
        if (sales_json.selectedCustomerJson.customer_name) {
          const deliveryMode = sales_json.selectedCustomerJson.customer_name;
          if (deliveryMode > 0) {
            const zomatoTab =
              deliveryMode.slice(0, 6) == "ZOMATO" ? deliveryMode : null;
            zomatoLength.push(zomatoTab);
          }
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });

    const filteredZomato = zomatoLength.filter(Boolean);

    return filteredZomato; // Return the array of payMode values
  };
  const zomatoArray = getZomato();

  // Swiggy Delivery Notification
  const getswiggy = () => {
    let swiggyLength = [];

    recentBooking.forEach(({ sales_json }) => {
      try {
        if (sales_json.selectedCustomerJson.customer_name) {
          const deliveryMode = sales_json.selectedCustomerJson.customer_name;
          if (deliveryMode > 0) {
            const zomatoTab =
              deliveryMode.slice(0, 6) == "SWIGGY" ? deliveryMode : null;
            swiggyLength.push(zomatoTab);
          }
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });

    const filteredSwiggy = swiggyLength.filter(Boolean);

    return filteredSwiggy; // Return the array of payMode values
  };
  const swiggyArray = getswiggy();

  // on Table Notification
  const getOnTable = () => {
    const onTableArray = [];

    recentBooking.forEach(({ sales_json }) => {
      try {
        const deliveryMode = sales_json.cartSumUp.deliveryMode;
        const payDetails = sales_json.cartSumUp.payDetails
          ? sales_json.cartSumUp.payDetails[0].payMode
          : undefined;

        if (
          (deliveryMode === "2" && payDetails == undefined) ||
          (deliveryMode === "2" && payDetails !== "24")
        ) {
          onTableArray.push(true);
        }
      } catch (error) {
        console.error("Error parsing sales_json:", error);
      }
    });

    return onTableArray; // Return the array of filtered items
  };
  const onTableArray = getOnTable();
  return (
    <div>
      <CModal size="xl" visible={booking} onClose={() => setBooking(false)}>
        <CModalHeader onClose={() => setBooking(false)}>
          <CModalTitle>Recent Sales List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="pills" role="tablist">
            <CNavItem>
              <CNavLink
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Counter Sale{" "}
                <span className="badge"> {counterSaleArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                On Table <span className="badge"> {onTableArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Pick UP <span className="badge"> {pickUpArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 4}
                onClick={() => setActiveKey(4)}
              >
                Home Delivery{" "}
                <span className="badge"> {HomeDeliveryArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 5}
                onClick={() => setActiveKey(5)}
              >
                Razorpay <span className="badge"> {razorPayArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 6}
                onClick={() => setActiveKey(6)}
              >
                Zomato <span className="badge"> {zomatoArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 7}
                onClick={() => setActiveKey(7)}
              >
                Swiggy <span className="badge"> {swiggyArray.length}</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 8}
                onClick={() => setActiveKey(8)}
              >
                Return Bills <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
          </CNav>

          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="countersale"
              visible={activeKey === 1}
            >
              <CounterSale recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="ontable"
              visible={activeKey === 2}
            >
              <OnTable recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="pickup"
              visible={activeKey === 3}
            >
              <PickUp recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="homedelivery"
              visible={activeKey === 4}
            >
              <HomeDelivery recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="razorpay"
              visible={activeKey === 5}
            >
              <RazorPay recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="zomoto"
              visible={activeKey === 6}
            >
              <Zometo recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="swiggy"
              visible={activeKey === 7}
            >
              <Swiggy recentBooking={recentBooking} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="returnbill"
              visible={activeKey === 8}
            >
              <ReturnBIll />
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBooking(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default RecentTabModal;
