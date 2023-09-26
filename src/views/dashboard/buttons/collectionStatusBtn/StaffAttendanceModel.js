import React, { useState, useEffect, useRef } from "react";
import Autosuggest from "react-autosuggest";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CurrentDate from "../../../../components/CurrentDate";
import { useSelector } from "react-redux"; // Import useSelector
import { fetch } from "../../../../utils";

const StaffAttendanceModel = () => {
  const [attendanceModel, setAttendanceModel] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]); // To store the selected names as an array
  const [focusedItem, setFocusedItem] = useState(null); // To store the currently focused item
  const [staffAttendanceData, setStaffAttendanceData] = useState([]); // Store staff attendance data
  const inputRef = useRef(null);

  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  useEffect(() => {
    if (query) {
      getProductSearch();
    } else {
      setSuggestions([]); // Clear suggestions when the query is empty
    }
  }, [query]);

  useEffect(() => {
    // Focus on the input element when the modal is opened
    if (attendanceModel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [attendanceModel]);

  const getProductSearch = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        rand: 0.44369813330371355, // LIMIT PARAMETER
        query: query,
      };

      const response = await fetch(
        "/api/customers/search/POS",
        "POST",
        body,
        headers
      );

      // Filter suggestions where cust_type_id is 4
      const filteredSuggestions = response.data.suggestions.filter(
        (suggestion) => suggestion.json.cust_type_id === 4
      );

      // Handle the response here, set filtered suggestions or do other operations.
      setSuggestions(filteredSuggestions);
    } catch (err) {
      setError("An error occurred while fetching customer data.");
    } finally {
      setLoading(false);
    }
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    // Create a new staff attendance object
    const newAttendance = {
      cust_id: suggestion.json.cust_id,
      working_hours: 12, // You can set the working hours as needed
      attendance_status: 1, // You can set the attendance status as needed
      ap_ids: "1,2,3,4,5", // You can set the ap_ids as needed
    };

    // Add the new staff attendance to the array
    setStaffAttendanceData([...staffAttendanceData, newAttendance]);
    setQuery("");
  };

  const onKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Enter") {
      event.preventDefault();
      if (focusedItem !== null) {
        setSelectedNames([...selectedNames, focusedItem]);
        setQuery("");
        setFocusedItem(null);
      }
    }
  };

  const submitTodayAttendanceReport = async () => {
    try {
      // Create the attendance sheet data
      const attendanceSheet = {
        outlet_id: selectedOutletId,
        staff_attendances: staffAttendanceData,
      };

      console.log("Attendance sheet submitted successfully",attendanceSheet);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting attendance sheet:", error);
    }
  };



  

  return (
    <>
      <CButton
        color="warning pl-2 pr-2 py-1 text-white rounded-1"
        style={{ fontSize: "15px" }}
        onClick={() => setAttendanceModel(!attendanceModel)}
      >
        <span className="badge bg-white text-warning">
          <i className="fa fa-tasks"></i>
        </span>{" "}
        Mark Attendance
      </CButton>{" "}
      <CModal
        visible={attendanceModel}
        onClose={() => setAttendanceModel(false)}
        keyboard={true}
        size="lg"
        className="closing-table"
      >
        <CModalHeader onClose={() => setAttendanceModel(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            Today's Staff Attendance <CurrentDate />
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="table table-bordered collection-table-style table-hover mode-2">
            <thead>
              <tr>
                <th colSpan={2} className="bg-light table-titlse-style">
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={getProductSearch}
                    onSuggestionsClearRequested={() => setSuggestions([])}
                    getSuggestionValue={(suggestion) => suggestion.value}
                    renderSuggestion={(suggestion) => (
                      <div className="custom-suggestion">
                        {/* Add your custom styling here */}
                        <span>{suggestion.value}</span>
                      </div>
                    )}
                    inputProps={{
                      placeholder: "Search for a customer...",
                      value: query,
                      onChange: (e, { newValue }) => setQuery(newValue),
                      onKeyDown: onKeyDown, // Handle Tab and Enter keys
                      style: {
                        width: "100%",
                        height: "30px",
                        border: "1px solid #e3ecf5",
                      },
                      ref: inputRef, // Reference to the input element
                    }}
                    onSuggestionSelected={onSuggestionSelected} // Handle suggestion selection
                    onSuggestionHighlighted={({ suggestion }) => {
                      // Check if suggestion is not null before setting focused item
                      if (suggestion) {
                        setFocusedItem(suggestion.value);
                      } else {
                        // Handle the case when there is no suggestion
                        setFocusedItem(null);
                      }
                    }}
                  />
                </th>
                <th colSpan={7} className="bg-light table-titlse-style"></th>
              </tr>
              <tr>
                <th width="3%" className="bg-light table-titlse-style">
                  &nbsp;
                </th>
                <th className="bg-light table-titlse-style">
                  Present Staff List
                </th>
                <th width="8%" className="bg-light table-titlse-style">
                  Hours
                </th>
                <th width="9%" className="bg-light table-titlse-style">
                  Punctuality
                </th>
                <th width="9%" className="bg-light table-titlse-style">
                  Shave/Haircut
                </th>
                <th width="9%" className="bg-light table-titlse-style">
                  Formal shoes
                </th>
                <th width="9%" className="bg-light table-titlse-style">
                  Behaviour with Co-worker
                </th>
                <th width="9%" className="bg-light table-titlse-style">
                  Behaviour with Customer
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedNames.map((name, index) => (
                <tr key={index}>
                  <td align="center">
                    <i className="fa fa-times text-danger"></i>
                  </td>
                  <td>
                    <small>{name}</small>
                  </td>
                  <td className="text-center" style={{ background: "#ffffc0" }}>
                    <input
                      type="number"
                      maxLength="4"
                      min="0"
                      max="24"
                      className="form-control input-sm text-center rounded-0"
                      value="12"
                      style={{ height: "23px", fontSize: "14px" }}
                      name={`staffAttendHours_${index}`}
                    />
                  </td>
                  <td className="text-center pt-2">
                    <input
                      type="checkbox"
                      value="1"
                      defaultChecked={true}
                      name={`staffAttendParam_${index}_1`}
                    />
                  </td>
                  <td className="text-center pt-2">
                    <input
                      type="checkbox"
                      value="1"
                      defaultChecked={true}
                      name={`staffAttendParam_${index}_2`}
                    />
                  </td>
                  <td className="text-center pt-2">
                    <input
                      type="checkbox"
                      value="1"
                      defaultChecked={true}
                      name={`staffAttendParam_${index}_3`}
                    />
                  </td>
                  <td className="text-center pt-2">
                    <input
                      type="checkbox"
                      value="1"
                      defaultChecked={true}
                      name={`staffAttendParam_${index}_4`}
                    />
                  </td>
                  <td className="text-center pt-2">
                    <input
                      type="checkbox"
                      value="1"
                      defaultChecked={true}
                      name={`staffAttendParam_${index}_5`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton className="btn btn-sm btn-success" onClick={submitTodayAttendanceReport}>
            <span className="badge text-success bg-white">
              <i className="fa fa-plus"></i>
            </span>{" "}
            Submit Attendance Sheet
          </CButton>
          <CButton
            className="btn btn-sm btn-light border"
            onClick={() => setAttendanceModel(false)}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default StaffAttendanceModel;
