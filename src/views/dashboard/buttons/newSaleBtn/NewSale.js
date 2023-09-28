import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CContainer,
    CRow,
    CCol,
} from '@coreui/react';
import { toast } from 'react-toastify';
import { fetch } from "../../../../utils";
import {
    clearCartItems,
    clearSelectedCustomer,
} from "../../../../action/actions";

const NewSale = () => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const selectedCustomer = useSelector(
        (state) => state.customer.selectedCustomer
    );
    const cartSumUp = useSelector((state) => state.cart.cartSumUp);
    const selectedCustomersJson = useSelector(
        (state) => state.customer.selectedCustomerJson
    );
    const cartItems = useSelector((state) => state.cart.cartItems);




    const handleSaveSale = async () => {
        try {
            const token = localStorage.getItem("pos_token");
            const headers = { Authorization: `Bearer ${token}` };
            const body = {
                productsInCart: cartItems,
                selectedCustomerJson: selectedCustomersJson,
                cartSumUp: cartSumUp,
                psid: 0,
            };
            const response = await fetch(
                "/api/sales/saveSales",
                "post",
                body,
                headers
            );

            if (response.status === 200) {
                toast.success("Sale Saved successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                });


                dispatch(clearCartItems());
                dispatch(clearSelectedCustomer());
                setVisible(false);


            } else {
                console.log("Failed to submit sale. Status code:", response.status);
                const errorData = await response.json();
                console.log("Error data:", errorData); // Log the response data for debugging
                toast.error("Failed to submit sale. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred while submitting the sale.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };


    const discardSale = async () => {

        toast.error("Sale Cleared, You can start new sale", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });

        dispatch(clearCartItems());
        dispatch(clearSelectedCustomer());
        setVisible(false);
    }


    const handleKeyDown = (event) => {
        if (event.shiftKey && event.key === 'N') {
            setVisible(!visible);
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [visible]);

    return (
        <div>
            <CButton
                className="light-outlet light-outlet2"
                style={{ background: '#f0ad4e' }}
                onClick={() => setVisible(!visible)}
                disabled={!selectedCustomer || cartItems.length === 0}
            >
                <b>New Sale</b>
                <p>[Shift + N]</p>
            </CButton>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Sales Confirmation</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <center>
                        <font size="5" color="red"> Current sale is ongoing.</font>
                        <small className="font-size-2">
                            <br />
                            * To save the current sale <b>Press Save &amp; Proceed button</b>.<br />
                            <b>OR</b><br />
                            * To Clear the current sale <b>Press Don't Save &amp; Proceed button</b>.
                        </small>
                    </center>
                </CModalBody>
                <CModalFooter>
                    <CContainer>
                        <CRow>
                            <CCol sm={5} className="text-start">
                                <CButton className="btn btn-sm btn-success font-size-3 rounded-1" onClick={handleSaveSale}>
                                    Save sale &amp; Proceed
                                </CButton>
                            </CCol>
                            <CCol sm={7} className="text-end">
                                <CButton className="btn btn-sm btn-warning text-white font-size-3 pl-2 pr-2 py-1 rounded-1" onClick={discardSale}>
                                    Don't Save &amp; Proceed
                                </CButton>

                                <CButton
                                    color="secondary"
                                    className="btn btn-sm font-size-3 rounded-1"
                                    style={{ marginLeft: '8px' }}
                                    onClick={() => setVisible(false)}
                                >
                                    Close
                                </CButton>
                            </CCol>
                        </CRow>
                    </CContainer>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default NewSale;
