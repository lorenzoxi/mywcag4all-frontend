import React from "react";
import Badge from "react-bootstrap/Badge";

function WcagLevels(props) {
  return (
    <Badge pill bg="dark">
      {props.level === 0 ? (
        <abbr title="nessun livello WCAG corrispondente"> N.A. </abbr>
      ) : (
        <abbr title={`livello WCAG ${props.level}`}> {props.level} </abbr>
      )}
    </Badge>
  );
}

export default WcagLevels;
