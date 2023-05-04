import React, { useContext, useState, useEffect } from "react";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvder = ({ children }) => {
  const [quality, setQuality] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getQuality(id) {
    return quality.find((p) => p._id === id);
  }

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.get();
      setQuality(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    // setIsLoading(false);
  }
  return (
    <QualityContext.Provider value={{ quality, isLoading, getQuality }}>
      {children}
      {/* {!isLoading ? children : "Loading.."} */}
    </QualityContext.Provider>
  );
};

QualityProvder.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
