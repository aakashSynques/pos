import React, { useState, useEffect } from "react";
import {
    CButton,
    CCol,
    CContainer,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow,
} from "@coreui/react";
import { fetch } from "../../utils";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    setOutletList,
    setSelectedOutletId,
    setSelectedOutletData,
    selectDelivery,
    setNewCart,
} from "../../action/actions";
import { BallTriangle } from "react-loader-spinner";

const ChangeOutlet = ({ setSelectedOutletId }) => {
    const [loading, setLoading] = useState(true);
    const [outletmodel, setOutletmodel] = useState(false);
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [outletListdata, setOutletListdata] = useState([]);
    const [networkError, setNetworkError] = useState(false);
    const [deliverymodel, setDeliverymodel] = useState(false); // Add this state

    const dispatch = useDispatch();
    const selectedOutletId = useSelector(
        (state) => state.selectedOutletId.selectedOutletId
    );




    const cartItems = useSelector((state) => state.cart.cartItems);
    const allProducts = useSelector((state) => state.allProducts.allProducts);

    const getPriceForOutlet = (product) => {
        const outletId = selectedOutletId.toString();
        if (product.rate_chart && product.rate_chart[outletId]) {
            const rateForOutlet = product.rate_chart[outletId][0];
            if (rateForOutlet && rateForOutlet.prod_rate !== undefined) {
                return rateForOutlet.prod_rate;
            }
        }
        return "prod rate";
    };
    function generateUniqueNumber() {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substr(2, 5); // Using 5 characters for randomness
        return `${timestamp.toString() + randomString}`;
    }

    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
        setSelectedOutletId(outlet.outlet_id);
        setOutletmodel(false); // Close the outlet model
        setDeliverymodel(true); // Open the delivery model

        // cartItem manipulation START
        const matchingProducts = allProducts.filter((product) => {
            return cartItems.some((cartItem) => cartItem.prod_id === product.prod_id);
        });

        let newCart = matchingProducts
            .map((item) =>
                item.rate_chart[selectedOutletId][0].stock_availability === 1
                    ? {
                        prod_id: item.prod_id,
                        prod_code: item.prod_code,
                        prod_sign: item.prod_sign,
                        prod_name: item.prod_name,
                        prod_description: item.prod_description,
                        prod_rate: getPriceForOutlet(item),
                        category_id: item.category_id,
                        prod_KOT_status: item.prod_KOT_status,
                        prod_Parcel_status: item.prod_Parcel_status,
                        prod_Discount_status: item.prod_Discount_status,
                        prod_Complementary_status: item.prod_Complementary_status,
                        prod_Toppings_status: item.prod_Toppings_status,
                        prod_Customized_status: item.prod_Customized_status,
                        prod_Delivery_heads: item.prod_Delivery_heads,
                        prod_image: item.prod_image,
                        prod_Recommended: item.prod_Recommended,
                        prod_OnlineListing: item.prod_OnlineListing,
                        prod_TagsGroups: item.prod_TagsGroups,
                        prod_DeActive: item.prod_DeActive,
                        status: item.status,
                        eby: item.eby,
                        eat: item.eat,
                        recipe_outcome_value: item.recipe_outcome_value,
                        recipe_outcome_unit: item.recipe_outcome_unit,
                        stock_status: item.stock_status,
                        stock_current_value: item.stock_current_value,
                        LHB_prod_id: item.LHB_prod_id,
                        category_name: item.category_name,
                        category_heads: item.category_heads,
                        recipeCount: item.recipeCount,
                        is_parcel: 0,
                        is_complementary: 0,
                        is_complementary_note: "",
                        is_note: 0,
                        is_prod_note: "",
                        prod_qty: item.prod_qty,
                        prod_discount: item.prod_discount,
                        prod_discount_offered: item.prod_discount_offered,
                        total_amount: item.prod_rate,
                        KOT_pick: 0,
                        KOT_ready: 0,
                        KOT_dispatch: 0,
                        urno: generateUniqueNumber(),
                        associated_prod_urno: null,
                        toppings: [],
                        customized: [],
                    }
                    : null
            )
            .filter(Boolean);
        dispatch(setNewCart(newCart));
    };

    const getOutletListdata = async () => {
        try {
            const token = localStorage.getItem("pos_token");
            const headers = { Authorization: `Bearer ${token}` };
            setLoading(true);
            const response = await fetch(
                "/api/outlets/assigned",
                "get",
                null,
                headers
            );
            setOutletListdata(response.data.allAssignedOutlets);
            dispatch(setOutletList(response.data.allAssignedOutlets));
            setLoading(false);
            setNetworkError(false); // Reset networkError state if the request succeeds
            dispatch(setSelectedOutletData(selectedOutletId, outletListdata));
        } catch (err) {
            // console.log(err);
            setLoading(false);
            setNetworkError(true); // Set networkError state to true if there is a network error
        }
    };
    useEffect(() => {
        getOutletListdata();
    }, [outletmodel]);

    // useEffect(() => {
    //   const handleKeyPressOutlet = (e) => {
    //     if (e.key === "F1") {
    //       e.preventDefault();
    //       setOutletmodel(true);
    //     }
    //   };
    //   window.addEventListener("keydown", handleKeyPressOutlet);
    //   return () => {
    //     window.removeEventListener("keydown", handleKeyPressOutlet);
    //   };
    // }, []);



    // delivery mode model
    const [deliveryListdata, setDeliveryListdata] = useState([]);

    const selectedDelivery = useSelector(
        (state) => state.delivery.selectedDelivery
    );
    const handleSelectDelivery = (delivery) => {
        dispatch(selectDelivery(delivery)); // Dispatch the action with the selected delivery
        setDeliverymodel(false);
    };
    const getDeliveryListdata = async () => {
        try {
            const token = localStorage.getItem("pos_token");
            const headers = { Authorization: `Bearer ${token}` };
            const response = await fetch(
                "/api/outlets/config-data",
                "get",
                null,
                headers
            );
            setDeliveryListdata(response.data.delivery_heads.slice(1));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getDeliveryListdata();
    }, []);

    useEffect(() => {
        const handleKeyPressDelivey = (e) => {
            if (e.key === "F2") {
                e.preventDefault();
                setDeliverymodel(true);
            }
        };
        window.addEventListener("keydown", handleKeyPressDelivey);
        return () => {
            window.removeEventListener("keydown", handleKeyPressDelivey);
        };
    }, []);

    return (
        <>
            {/* outlet model */}
            <CButton
                className="gray-outlet"
                onClick={() => setOutletmodel(!outletmodel)}
            >
                <b>OUTLET - [F1]</b> <br />
                {selectedOutlet && (
                    <div>
                        <p style={{ color: "#09a30e" }}>{selectedOutlet.outlet_name}</p>
                    </div>
                )}

            </CButton>
            <CModal
                size="lg"
                visible={outletmodel}
                className="outletmodelform"
                backdrop="static"
            >
                <CModalHeader>
                    <CModalTitle>BNS - Outlets</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CContainer>
                        <CRow>
                            {loading ? (
                                <div className="loader-container">
                                    <BallTriangle color="#00BFFF" height={80} width={80} />
                                </div>
                            ) : networkError ? (
                                <div className="error-message text-danger">
                                    <b>Network Error: Unable to fetch data.</b>
                                </div>
                            ) : (
                                outletListdata.map((outlet) => (
                                    <CCol className="aws-btn" sm={6} key={outlet.outlet_id}>
                                        <CButton
                                            className={`btn btn-block location-btn w-100 ${selectedOutlet?.outlet_id === outlet.outlet_id
                                                ? "selected-outlet"
                                                : ""
                                                }`}
                                            onClick={() => handleSelectOutlet(outlet)}
                                            data-id={outlet.outlet_id}
                                        >
                                            <div>
                                                <h3 className="mb-0" style={{ fontWeight: "bold" }}>
                                                    {outlet.outlet_name}
                                                </h3>
                                                <p className="mb-0">{outlet.outlet_address}</p>
                                                <p className="mb-0">{outlet.outlet_contact_no}</p>
                                            </div>
                                        </CButton>
                                    </CCol>
                                ))
                            )}
                        </CRow>
                    </CContainer>
                </CModalBody>
            </CModal>

            {/* delivery mode model */}
            <div>
                <CButton
                    className="gray-outlet"
                    onClick={() => setDeliverymodel(!deliverymodel)}
                >
                    <b>DELIVERY - [F2]</b> <br />
                    <div>
                        <p style={{ color: "#09a30e" }}>{selectedDelivery}</p>
                    </div>
                </CButton>
                <CModal
                    size="sm"
                    visible={deliverymodel}
                    className="outletmodelform"
                    backdrop="static"
                >
                    <CModalHeader>
                        <CModalTitle>Delivery Mode</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {Array.isArray(deliveryListdata) &&
                            deliveryListdata.map((delivery) => (
                                <CButton
                                    className={`btn btn-block location-btn w-100 ${selectedDelivery === delivery ? "selected-outlet" : ""
                                        }`}
                                    key={delivery}
                                    onClick={() => handleSelectDelivery(delivery)}
                                >
                                    <div>
                                        <h3 className="mb-0" style={{ fontWeight: "bold" }}>
                                            {delivery}
                                        </h3>
                                    </div>
                                </CButton>
                            ))}
                    </CModalBody>
                </CModal>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    outletList: state.outlets || [], // Set default value as an empty array
});
const mapDispatchToProps = {
    setOutletList,
    setSelectedOutletId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeOutlet);
