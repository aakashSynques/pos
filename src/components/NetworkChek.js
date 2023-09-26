
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const NetworkChek = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnlineStatusChange = () => {
          setIsOnline(navigator.onLine);
        };
    
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
    
        return () => {
          window.removeEventListener('online', handleOnlineStatusChange);
          window.removeEventListener('offline', handleOnlineStatusChange);
        };
      }, []);

  return (
    <div>
      {/* Check if the user is offline and display a notification */}
      {!isOnline && (
        <ToastContainer
          position="top-center"
          autoClose={false}
          hideProgressBar={true}
          closeOnClick={false}
          draggable={false}
          pauseOnHover={false}
        >
          <div className="toast-notification">
            No network connectivity. Please check your internet connection.
          </div>
        </ToastContainer>
      )}
    </div>
  )
}

export default NetworkChek