import { message } from "antd";
import { useState } from "react";

export const useFetchWithState = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, param) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...param,
        headers: {
          'Content-Type': 'application/json' // set Content-Type to application/json
        },
      });
      if (!response.ok) {
        if (response.status === 500) {
          message.error('Server error occurred. Please try again later.') // usually pop up server error message 
          setError('Server error occurred. Please try again later.');
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetch: fetchData
  };
}