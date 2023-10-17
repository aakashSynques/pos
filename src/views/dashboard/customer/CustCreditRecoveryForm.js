import {
    CButton,
    CForm,
    CFormSelect,
    CFormInput,
    CFormTextarea
} from "@coreui/react";

const CustCreditRecoveryForm = () => {
    return (
        <div>
            <CForm>
                <CFormSelect
                    className="rounded-0 font-size-2"
                    aria-label="Default select example"
                    style={{ marginBottom: "7%" }}
                    options={[
                        { label: "Entry Type", value: "" },
                        { label: "Advance amount", value: "1" },
                    ]}
                />
                <CFormTextarea
                    className="rounded-0 font-size-2"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Narration"
                    style={{ marginBottom: "7%" }}
                ></CFormTextarea>
                <CFormInput
                    className="rounded-0 font-size-2"
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Amount"
                    style={{ marginBottom: "7%" }}
                />
                <CFormSelect
                    className="rounded-0 font-size-2"
                    aria-label="Default select example"
                    style={{ marginBottom: "7%" }}
                    options={[
                        { label: "Mode", value: "1" },
                        { label: "Cash", value: "2" },
                        { label: "HDFC QR", value: "3" },
                        { label: "HDFC CC", value: "4" },
                        { label: "Plutus CC", value: "5" },
                        { label: "PayTm", value: "6" },
                        { label: "PhonePe", value: "7" },
                        { label: "Swiggy Dineout", value: "8" },
                        { label: "NEFT", value: "9" },
                        { label: "Cheque", value: "10" },
                    ]}
                />
                <CFormInput
                    className="rounded-0 font-size-2"
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Ref. Bank/Cheque/Card"
                    style={{ marginBottom: "2%" }}
                />

                <CButton
                    className="btn-sm btn-block btn-primary w-100 mt-2 font-size-2"
                    style={{ background: "#1A82C3" }}
                >
                    {" "}
                    <span className="badge bg-light">
                        <i className="fa fa-plus text-primary"></i>
                    </span>{" "}
                    CREDIT RECOVERY{" "}
                </CButton>
            </CForm>
        </div>
    )
}

export default CustCreditRecoveryForm
