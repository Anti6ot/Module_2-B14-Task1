import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality();
  console.log(isLoading);
  if (!isLoading) {
    return (
      <>
        {qualities.map((el) => (
          <Quality key={el} id={el} />
        ))}
      </>
    );
  } else {
    return "Loading.....";
  }
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
