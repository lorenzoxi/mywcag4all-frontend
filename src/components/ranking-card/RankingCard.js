import { React } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Col";
import { FaStar } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";

function RankingCard(props) {
  return (
    <ListGroup.Item
      as="li"
      key={props.position}
      className={`w-100 shadow-sm rank-position mx-0 my-1`}
    >
      <Row className="d-flex align-items-center p-0">
        <Col xs={1} className="text-center">
          <Badge
            bg=""
            pill
            className={
              props.position <= 3
                ? `shadow1 pos-${props.position}`
                : `shadow1 pos-generic`
            }
          >
            <FaStar className="" alt={`posizione numero ${props.position}`} />
          </Badge>
        </Col>

        <Col xs={4}>
          <span className="visually-hidden">Username dell'utente:</span>
          <span>{props.username} </span>
        </Col>

        <Col xs={2} className="text-center ">
          <span className="visually-hidden">Punteggio totale dell'utente:</span>
          <Badge bg="warning" text="dark">
            {props.totalScore}
          </Badge>
        </Col>

        <Col xs={2} className="text-center ">
          <span className="visually-hidden">Siti totali dell'utente:</span>
          <Badge bg="secondary" text="white">
            {props.totalWebsite}
          </Badge>
        </Col>

        <Col xs={1} className="text-center ">
          <span className="visually-hidden">
            Siti totali dell'utente che hanno raggiunto il livello WAG A:
          </span>
          <Badge pill bg="primary" text="white">
            {props.totalA}
          </Badge>
        </Col>

        <Col xs={1} className="text-center">
          <span className="visually-hidden">
            Siti totali dell'utente che hanno raggiunto il livello WAG AA:
          </span>

          <Badge pill bg="primary" text="white">
            {props.totalAA}
          </Badge>
        </Col>

        <Col xs={1} pill className="text-center p-0">
          <span className="visually-hidden">
            Siti totali dell'utente che hanno raggiunto il livello WAG AAA:
          </span>
          <Badge pill bg="primary" text="white">
            {props.totalAAA}
          </Badge>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default RankingCard;
