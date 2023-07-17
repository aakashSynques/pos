// import React, { useState, useEffect } from "react";
// import { fetch } from "../../utils";

// const CustomerSearchBox = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
  
//     const handleSearch = async () => {
//       try {
//         const token = localStorage.getItem("pos_token");
//         const headers = { Authorization: `Bearer ${token}` };
//         const body = { query: searchQuery };
  
//         const response = await fetch("http://posapi.q4hosting.com/api/customers/search/POS", "post", body, headers);
  
//         if (response.status === 200) {
//           const { data } = response;
//           setSearchResults(data); // Update the search results
//         } else {
//           console.log("Search failed");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
  
//     useEffect(() => {
//       handleSearch();
//     }, []); // Perform the initial search on component mount
  
//     return (
//       <div>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
  
//         <ul>
//           {searchResults.map((result) => (
//             <li key={result.id}>{result.name}</li> // Adjust the key and value based on your API response
//           ))}
//         </ul>
//       </div>
//     );
// };
  
import React, { useState, useEffect } from "react";
import { fetch } from "../../utils";

const CustomerSearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = async () => {
      try {
        const token = localStorage.getItem("pos_token");
        const headers = { Authorization: `Bearer ${token}` };
        const body = { query: searchQuery };
  
        const response = await fetch("http://posapi.q4hosting.com/api/customers/search/POS", "post", body, headers);
  
        if (response.status === 200) {
          const { data } = response;
          setSearchResults(data); // Update the search results
        } else {
          console.log("Search failed");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      handleSearch();
    }, []); // Perform the initial search on component mount
  
    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
  
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.name}</li> // Adjust the key and value based on your API response
          ))}
        </ul>
      </div>
    );
}

export default CustomerSearchBox