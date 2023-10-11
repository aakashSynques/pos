

import React, { useState } from 'react';
import { fetch } from '../../../utils';


function CustomersSearch() {
  const [query, setQuery] = useState('');

  const getCustomersList = async (value) => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        rand: 0.44369813330371355, // LIMIT PAIRAMETER
        query: query,
      };
      const response = await fetch(
        "/api/customers/search/POS",
        "post",
        body,
        headers
      );
      setCustomerSearchResults(response.data.suggestions.json);
      console.log('new res', response.data.json)
      // Cache the results for the current query
      setCache((prevCache) => ({
        ...prevCache,
        [query]: response.data.suggestions,
      }));
    } catch (err) {
      setError("An error occurred while fetching customer data.");
    }
  };

  // Create a function to handle the search input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(query);
  };

  return (
    <div>
      {/* Create an input field for search */}
      <input
        type="text"
        placeholder="Search customers"
        value={query}
        onChange={handleInputChange}
      />

    </div>
  );
}

export default CustomersSearch;
