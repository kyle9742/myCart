import React, { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useData = (url, endpoint, customConfig, deps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLocading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(url)
      .then((res) => {setData(res.data); setIsLoading(false); deps ? deps : []})
      .catch((err) => {setError(err.message); setIsLoading(false);});
  }, []);

  return { data, error, isLocading };
};

export default useData;
