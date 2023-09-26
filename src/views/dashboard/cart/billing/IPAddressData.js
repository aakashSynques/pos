
// IPAddressData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IPAddressData = React.forwardRef((props, ref) => { // Forward the ref
  const [publicIp, setPublicIp] = useState('');

  useEffect(() => {
    fetchPublicIp();
  }, []);

  const fetchPublicIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      if (response.status === 200) {
        setPublicIp(response.data.ip);
      } else {
        console.error('Failed to fetch public IP address');
      }
    } catch (error) {
      console.error('Error fetching public IP address:', error);
      }
  };

  // Expose the getPublicIp function using the forwarded ref
  React.useImperativeHandle(ref, () => ({
    getPublicIp() {
      return publicIp;
    }
  }));

  return null; // IPAddressData doesn't render anythingsdf
});

export default IPAddressData;
