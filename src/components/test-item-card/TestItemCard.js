import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WcagLevels from "../wcag-levels/WcagLevels";
import TestType from "../test-type/TestType";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "../../service/client";
import Badge from "react-bootstrap/Badge";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTestDataIsApplicable,
  updateTestDataIsPassed,
} from "../../store/testSlice";

function TestItemCard(props) {
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

    dispatch(updateTestDataIsPassed({ id: props.id, value: isPassed}));
    dispatch(updateTestDataIsApplicable({ id: props.id, value: isApplicable}));
    axios
      .post("/test", {
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
      className="test-item d-block flex-row justify-content-betweew w-100 px-1 my-2"
    >
      <Container>
        <Row>
          <Col md={12} lg={1} className="test-item-head align-self-center">
            <Badge bg="secondary" as="h3">
              Test {props.id}
            </Badge>
          </Col>
          <Col md={12} lg={5} className="align-self-center">
            <span className="visually-hidden">Nome del test: </span>
            <p className="p-0 m-0 bold6">{props.title} </p>
          </Col>
          <Col md={12} lg={1} className="text-center align-self-center">
            <span className="visually-hidden">
              Livello WCAG minimo associato al test:{" "}
            </span>
            <WcagLevels link="" level={props.wcaglevel} />
          </Col>
          <Col md={12} lg={1} className="text-center align-self-center">
            <TestType link="" type={props.type} />
          </Col>

          <Col md={12} lg={2} className="align-self-center">
            <Form className="d-inline-block">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  checked={isApplicable}
                  inline
                  type="switch"
                  label="Applicabile"
                  aria-label={`test ${props.id} applicabile`}
                  name={`applicable-${props.id}`}
                  id={`applicable-${props.id}`}
                  onChange={onClickHandlerSwitch}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  checked={isPassed}
                  disabled={isApplicable ? false : true}
                  inline
                  type="switch"
                  label="Superato"
                  aria-label={`test ${props.id} superato`}
                  id={`passed-${props.id}`}
                  name={`passed-${props.id}`}
                  onChange={onClickHandlerCheckbox}
                />
              </Form.Group>
            </Form>
          </Col>

          <Col
            md={12}
            lg={2}
            className="d-flex justify-content-center align-self-center text-right"
          >
            <Link
              className="btn btn-outline-primary px-1 my-1 w-75"
              to={`${props.id}`}
              state={{ location: "a11y" }}
              rel="next"
            >
              Dettagli
            </Link>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

export default TestItemCard;
