import { React, useState, useEffect } from "react";
import WcagLevels from "../wcag-levels/WcagLevels";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import axios from "../../service/client";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTestDataIsApplicable,
  updateTestDataIsPassed,
} from "../../store/wcagSlice";

function WcagItemCard(props) {
  const [isApplicable, setIsApplicable] = useState(props.isApplicable);
  const [isPassed, setIsPassed] = useState(props.isPassed);
  const user = useSelector((state) => state.auth.user);
  const website = useSelector((state) => state.website.website);
  const dispatch = useDispatch();

  const onClickHandlerSwitch = () => {
    if (isApplicable) {
      setIsApplicable(false);
      setIsPassed(true);
    } else {
      setIsApplicable(true);
    }
  };

  const onClickHandlerCheckbox = () => {
    if (isPassed) {
      setIsPassed(false);
    } else {
      setIsPassed(true);
    }
  };

  useEffect(() => {
    dispatch(updateTestDataIsPassed({ id: props.id, value: isPassed }));
    dispatch(updateTestDataIsApplicable({ id: props.id, value: isApplicable }));
    axios
      .post("/wcag", {
        id: props.id,
        user: user.id,
        website: website.id,
        is_applicable: isApplicable,
        is_passed: isPassed,
      })
      .then(function (res) {})
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [
    onClickHandlerSwitch,
    onClickHandlerCheckbox,
    dispatch,
    props.id,
    user.id,
    website.id,
    isApplicable,
    isPassed,
  ]);

  return (
    <li
      key={props.id}
      className="test-item d-block flex-row border justify-content-betweew w-100 align-items-center p-1 mb-5"
    >
      <Row className="d-flex align-items-center py-0 wcag-item">
        <Col md={12} lg={2} className="d-inline-block align-self">
          <Badge bg="secondary" as="h3">
            Criterio {props.index}
          </Badge>
        </Col>
        <Col md={12} lg={6} className="d-inline-block align-self">
          <h3 className="h5">
            <a
              className="default-anchor"
              hrefLang={"en"}
              href={`${props.url}`}
              target="_blank"
              rel="external noreferrer"
            >
              {props.title}
            </a>
          </h3>
        </Col>

        <Col md={12} lg={1} className="text-right align-self">
          <WcagLevels link="" level={props.wcaglevel} />
        </Col>

        <Col md={12} lg={1} className="text-right align-self">
          <span className="visually-hidden">
            È un criterio conentuto nella dichiarazione di accessibilità:{" "}
          </span>
          {props.isAgid && <Badge>AGID</Badge>}
        </Col>

        <Col md={12} lg={2} className="d-inline-block align-self">
          <Form className="d-inline-block">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                checked={isApplicable}
                inline
                type="switch"
                id={`applicable-${props.id}`}
                label="Applicabile"
                aria-label={`criterio ${props.index} applicabile`}
                onClick={onClickHandlerSwitch}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mt-0">
              <Form.Check
                inline
                checked={isPassed}
                disabled={isApplicable ? false : true}
                type="switch"
                label="Superato"
                aria-label={`criterio ${props.index} applicabile`}
                id={`passed-${props.id}`}
                onClick={onClickHandlerCheckbox}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </li>
  );
}

export default WcagItemCard;
