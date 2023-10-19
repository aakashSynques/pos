import React from 'react'
import { useSelector, useDispatch } from "react-redux";

const ReceiverInfo = ({ formSubmitted }) => {
    const submittedHomeDeliveryData = useSelector((state) => state.table.submittedHomeDeliveryData);
    const selectedCustomer = useSelector(
        (state) => state.customer.selectedCustomer
    );

    console.log('submittedHomeDeliveryData', submittedHomeDeliveryData)

    return (
        <>
            <span>
                <label>
                    <font className="font-size-14 font-w-5"> Receiver :</font>
                </label>
                <span>
                    {/* {formSubmitted && (<>
                        {submittedHomeDeliveryData.receiverName} {submittedHomeDeliveryData.receiverMobile}</>
                    )} */}
                    {submittedHomeDeliveryData ? (
                        <>
                            {submittedHomeDeliveryData.receiverName} &nbsp; {submittedHomeDeliveryData.receiverMobile}
                        </>
                    ) : null}

                </span>{" "}
                <br />
                <label>
                    <font className="font-size-14 font-w-5">Address :  </font>
                </label>
                <span>
                    {/* {formSubmitted && (<>{submittedHomeDeliveryData.receiverAd} </>)} */}
                    {submittedHomeDeliveryData ? (
                        <>
                            {submittedHomeDeliveryData.receiverAd}
                        </>
                    ) : null}

                </span> <br />
                <label>
                    <font className="font-size-14 font-w-5">DateTime :  </font>
                </label>
                <span>
                    {submittedHomeDeliveryData ? (
                        <>
                            {submittedHomeDeliveryData.deliveryDate}{" "}
                            {submittedHomeDeliveryData.deliveryTiming}{" "}
                        </>
                    ) : (
                        <span>{new Date().toLocaleDateString()}</span>
                    )}
                </span>
            </span>
        </>
    )
}

export default ReceiverInfo
