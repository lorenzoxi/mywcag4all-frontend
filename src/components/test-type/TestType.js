import React from "react";
import { FaCogs, FaCog, FaHandPaper, FaQuestionCircle } from "react-icons/fa";

function TestType(props) {
  const displayIcon = () => {
    switch (props.type) {
      case 1:
        return (
            <FaCogs className="badge-item-card" alt="test di tipo automatico" />
        );
      case 2:
        return (
            <FaCog
              className="badge-item-card"
              alt="test di tipo semiautomatico"
            />
        );
      case 3:
        return (
            <FaHandPaper
              className="badge-item-card"
              alt="test di tipo manuale"
            />
        );
      default:
        return (
            <FaQuestionCircle
              alt="test di tipo non identificato"
            />
        );
    }
  };

  return displayIcon();
}

export default TestType;
