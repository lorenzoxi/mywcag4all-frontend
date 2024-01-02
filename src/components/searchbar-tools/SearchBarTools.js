import { React, useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "../../service/client";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {
  updateToolFilterWord,
  updateToolFilterType,
  updateToolFilterLicense,
  filterTestData,
  resetToolFilter,
} from "../../store/slice.tools";
import { useSelector, useDispatch } from "react-redux";

function SearchBarTools(props) {
  const tools = useSelector((state) => state.tools);
  const toolsClasses = useSelector((state) => state.tools.classes);

  const dispatch = useDispatch();

  // const [data, setData] = useState();
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    dispatch(resetToolFilter());
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "type":
        dispatch(updateToolFilterType({ value: value }));
        break;
      case "word":
        dispatch(updateToolFilterWord({ value: value }));
        break;
      default:
        break;
    }

    dispatch(filterTestData());
  };

  const getClasses = useMemo(() => {
    return (
      toolsClasses.map((_class, index) => {
        return <option id={`tool_class_${index}`} key={`tool-class-${index}`} value={_class._id}> {_class.name} </option>;
      })
    );
  }, [tools]);

  return (
    <Card className="main-card mb-5 shadow1">
      <a href={props.uid} className="visually-hidden">
        Salta la searchbox e vai alla lista di tools
      </a>

      <Form
        className="d-flex"
        onSubmit={handleSearch}
        role="search"
        aria-controls="tools-list"
      >
        <Container>
          <Row>
            <Col md={12} lg={3} className="px-1 my-1">
              <Form.Label className="visually-hidden" htmlFor="type">
                Tipologia
              </Form.Label>
              <Form.Select
                name="type"
                id="type"
                onChange={handleChange}
                defaultValue={tools.filter_type}
              >
                <option value="">Tipologia</option>
                {getClasses}
              </Form.Select>
            </Col>

            <Col md={12} lg={6} className="px-1 my-1">
              <Form.Label className="visually-hidden" htmlFor="word">
                Cerca per nome
              </Form.Label>
              <Form.Control
                placeholder="Cerca per nome..."
                name="word"
                id="word"
                onChange={handleChange}
                defaultValue={tools.filter_word}
              />
            </Col>

            <Col md={12} lg={3} className="px-1 my-1">
              <Button
                variant="outline-secondary"
                value="Cerca"
                type="reset"
                className="w-100"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>

      {props.hint && (
        <Row className="mt-3 p-0">
          <Col className="px-3">
            <Link
              className="btn btn-primary w-100 p-0"
              to="/accessibility-dev/tools/hint"
              state={{ location: "tools" }}
            >
              Suggerisci uno strumento
            </Link>
          </Col>
        </Row>
      )}
    </Card>
  );
}

export default SearchBarTools;
