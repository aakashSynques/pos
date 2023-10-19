import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CForm,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSubmittedPickUpDateTime } from "../../../../action/actions";
import { toast } from "react-toastify";

const ChangePickUpModel = ({ onClose, visiblePicKUp }) => {
  const [selectedPickUpDateTime, setSelectedPickUpDateTime] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: "",
  });

  const dispatch = useDispatch();
  const handlePickUpSubmit = () => {
    dispatch(
      setSubmittedPickUpDateTime(
        selectedPickUpDateTime.date,
        selectedPickUpDateTime.time || defaultTime
      )
    );
    toast("Pickup information changed to");
    onClose();

    setSubmittedPickUpDateTime({ ...selectedPickUpDateTime }); // Store the submitted data
    // setVisiblePickUp(false);
  };

  const [defaultTime, setDefaultTime] = useState();
  const timeOptions = [
    'Early Morning',
    '09:45 AM',
    '10:00 AM',
    '10:15 AM',
    '10:30 AM',
    '10:45 AM',
    '11:00 AM',
    '11:15 AM',
    '11:30 AM',
    '11:45 AM',
    '12:00 PM',
    '12:30 PM',
    '12:45 PM',
    '01:00 PM',
    '01:15 PM',
    '01:30 PM',
    '01:45 PM',
    '02:00 PM',
    '02:15 PM',
    '02:30 PM',
    '02:45 PM',
    '03:00 PM',
    '03:15 PM',
    '03:30 PM',
    '03:45 PM',
    '04:00 PM',
    '04:15 PM',
    '04:30 PM',
    '04:45 PM',
    '05:00 PM',
    '05:00 PM',
    '05:15 PM',
    '05:30 PM',
    '05:45 PM',
    '06:00 PM',
    '06:15 PM',
    '06:30 PM',
    '06:45 PM',
    '07:00 PM',
    '07:15 PM',
    '07:30 PM',
    '07:45 PM',
    '08:00 PM',
    '08:15 PM',
    '08:30 PM',
    '08:45 PM',
    '09:00 PM',
    '09:15 PM',
    '09:30 PM',
    '09:45 PM',
    '10:00 PM',
    '10:15 PM',
    '10:30 PM',
    '10:45 PM',
    '11:00 PM',
    '11:15 PM',
    '11:30 PM',
    'Midnight 12 Timing',
  ];
  useEffect(() => {
    // Calculate the current time and find the nearest time option
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentMinutes = hours * 60 + minutes;
    let nearestTime = '';
    let timeDifference = Infinity;
    timeOptions.forEach((option) => {
      const optionTime = option.split(' ');
      const timeParts = optionTime[0].split(':');
      const optionHour = parseInt(timeParts[0]);
      const optionMinutes = parseInt(timeParts[1]);
      const optionIsAfterNoon = optionTime[1] === 'PM';
      const optionTotalMinutes = (optionHour % 12 + (optionIsAfterNoon ? 12 : 0)) * 60 + optionMinutes;
      const diff = Math.abs(currentMinutes - optionTotalMinutes);

      if (diff < timeDifference) {
        timeDifference = diff;
        nearestTime = option;
      }
    });
    setDefaultTime(nearestTime);
  }, []);


  const today = new Date();
  const nextThreeMonths = new Date();
  nextThreeMonths.setMonth(today.getMonth() + 3);

  const minDate = today.toISOString().slice(0, 10); // Convert to yyyy-mm-dd format
  const maxDate = nextThreeMonths.toISOString().slice(0, 10); // Convert to yyyy-mm-dd format



  return (
    <>
      <CModal
        size="sm"
        backdrop="static"
        visible={visiblePicKUp}
        onClose={onClose}
      >
        <CModalHeader>
          <CModalTitle>Change PickUp</CModalTitle>
        </CModalHeader>
        <CForm>
          <CModalBody>
            <legend className="col-form-label">PickUp Date</legend>
            <input
              type="date"
              className="form-control input-md rounded-0"
              autoComplete="off"
              value={selectedPickUpDateTime.date}
              min={minDate} // Set the minimum selectable date
              max={maxDate} // Set the maximum selectable date
              onChange={(e) =>
                setSelectedPickUpDateTime({
                  ...selectedPickUpDateTime,
                  date: e.target.value,
                })
              }
            />

            <legend className="col-form-label mt-3">PickUp Time</legend>
            <CFormSelect
              key={defaultTime} // Add the key prop to force a re-render
              className="rounded-0 font-size"
              value={selectedPickUpDateTime.time || defaultTime}
              minDate={today}
              maxDate={nextThreeMonths}
              onChange={(e) =>
                setSelectedPickUpDateTime({
                  ...selectedPickUpDateTime,
                  time: e.target.value,
                })
              }
            >
              <option value="Early Morning">Early Morning</option>
              <option value="09:45 AM">09:45 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:15 AM">10:15 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="10:45 AM">10:45 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:15 AM">11:15 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="11:45 AM">11:45 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="12:15 PM">12:15 PM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="12:45 PM">12:45 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="01:15 PM">01:15 PM</option>
              <option value="01:30 PM">01:30 PM</option>
              <option value="01:45 PM">01:45 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:15 PM">02:15 PM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="02:45 PM">02:45 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="03:15 PM">03:15 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="03:45 PM">03:45 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="04:15 PM">04:15 PM</option>
              <option value="04:30 PM">04:30 PM</option>
              <option value="04:45 PM">04:45 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="05:15 PM">05:15 PM</option>
              <option value="05:30 PM">05:30 PM</option>
              <option value="05:45 PM">05:45 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="06:15 PM">06:15 PM</option>
              <option value="06:30 PM">06:30 PM</option>
              <option value="06:45 PM">06:45 PM</option>
              <option value="07:00 PM">07:00 PM</option>
              <option value="07:15 PM">07:15 PM</option>
              <option value="07:30 PM">07:30 PM</option>
              <option value="07:45 PM">07:45 PM</option>
              <option value="08:00 PM">08:00 PM</option>
              <option value="08:15 PM">08:15 PM</option>
              <option value="08:30 PM">08:30 PM</option>
              <option value="08:45 PM">08:45 PM</option>
              <option value="09:00 PM">09:00 PM</option>
              <option value="09:15 PM">09:15 PM</option>
              <option value="09:30 PM">09:30 PM</option>
              <option value="09:45 PM">09:45 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="10:15 PM">10:15 PM</option>
              <option value="10:30 PM">10:30 PM</option>
              <option value="10:45 PM">10:45 PM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="11:15 PM">11:15 PM</option>
              <option value="11:30 PM">11:30 PM</option>
              <option value="Midnight 12 Timing">Midnight 12 Timing</option>
            </CFormSelect>

          </CModalBody>
          <CModalFooter>
            <CButton
              color="success"
              className="rounded-1 py-1"
              onClick={handlePickUpSubmit}
            >
              <i className="fa fa-plus"></i> Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default ChangePickUpModel;

