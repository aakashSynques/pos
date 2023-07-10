import React from "react";
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <CInputGroup>
      <CFormInput
        type="text"
        placeholder="Search Product Code OR Name"
        style={{
            fontSize: "12px", borderRadius: 0,
        }}
      />
    </CInputGroup>
  );
};

export default SearchBar;
