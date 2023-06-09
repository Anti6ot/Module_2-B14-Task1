import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfessionConext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionConext);
};

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getProfession(id) {
    return professions.find((p) => p._id === id);
  }

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setIsLoading(false);
  }

  return (
    <ProfessionConext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionConext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
