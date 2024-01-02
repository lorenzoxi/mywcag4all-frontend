import { React, useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTestFilterWord,
  updateTestFilterIsApplicable,
  updateTestFilterIsPassed,
  updateTestFilterLevel,
  updateTestFilterType,
  updateTestParentFilterTag,
  updateTestFilterTag,
  resetTestFilter,
  updateTestFilterPage,
} from "../../store/testSlice";

function SearchBar({ uid, updateFilters }) {

  const testFilters = useSelector((state) => state.test);
  // const testFilters = useSelector((state) => state.test.filter_page);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleParentButtonClick = (event) => {
    const tag = event.target.dataset.tag;
    dispatch(updateTestFilterPage({index: 1}));
    dispatch(updateTestParentFilterTag({ tag: tag }));
    dispatch(updateTestFilterTag({ tag: null }));
    updateFilters();
  };

  const handleChildButtonClick = (event) => {
    const tag = event.target.dataset.tag;
    dispatch(updateTestFilterPage({index: 1}));
    dispatch(updateTestFilterTag({ tag: tag }));
    updateFilters();
  };

  const onChangeHandler = (event) => {
    const word = event.target.value;
    dispatch(updateTestFilterWord({ word: word }));
    updateFilters();
  };

  const handleReset = () => {
    dispatch(resetTestFilter());
  };

  const onChangeHandlerCheckbox = (event) => {
    const name = event.target.name;
    const value = event.target.checked;

    switch (name) {
      case "passed":
        dispatch(updateTestFilterIsPassed({ value: value }));

        break;
      case "applicable":
        dispatch(updateTestFilterIsApplicable({ value: value }));
        break;
      default:
        break;
    }
    updateFilters();
  };

  const onChangeHandlerSelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "type":
        dispatch(updateTestFilterType({ value: value }));
        break;
      case "level":
        dispatch(updateTestFilterLevel({ value: value }));
        break;
      default:
        break;
    }
    updateFilters();
  };

  const buttonToDisplay = useMemo(() => {
    switch (testFilters.filter_parent_tag) {
      case "1":
        return (
          <>
            <Col className="p-0 mr-1">
              <Button
                variant="primary"
                data-tag="6"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                HTML
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="7"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Form
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="8"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Tabelle
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="9"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Aiuti alla navigazione
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="10"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Orientamento strutturale
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                classdata-tag="11"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Separazione
              </Button>
            </Col>

            <Col className="p-0 ml-1">
              <Button
                variant="primary"
                data-tag="12"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Link
              </Button>
            </Col>
          </>
        );

      case "2":
        return (
          <>
            <Col className="p-0 mr-1">
              <Button
                variant="success"
                data-tag="13"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                CSS
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="14"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                No CSS
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="15"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Immagini
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="16"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Colori
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="17"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Layout
              </Button>
            </Col>

            <Col className="p-0 mr-1">
              <Button
                variant="success"
                data-tag="18"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Animazioni
              </Button>
            </Col>
          </>
        );

      case "3":
        return (
          <>
            <Col className="p-0 mr-1">
              <Button
                variant="warning"
                data-tag="19"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Elementi dinamici
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="20"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Tastiera
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="21"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Modalità di input
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="22"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Errori
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="23"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Tempo di utilizzo
              </Button>
            </Col>

            <Col className="p-0 ml-1">
              <Button
                variant="warning"
                data-tag="24"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Autenticazione
              </Button>
            </Col>
          </>
        );

      case "4":
        return (
          <>
            <Col className="p-0">
              <Button
                variant="danger"
                data-tag="25"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Testo
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="26"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Immagini
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="27"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Grafici
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="28"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Dati
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="29"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Media
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="30"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Sovraccarico cognitivo
              </Button>
            </Col>

            <Col className="p-0">
              <Button
                variant="danger"
                data-tag="31"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Disorientamento
              </Button>
            </Col>
          </>
        );

      case "5":
        return (
          <>
            <Col className="p-0">
              <Button
                variant="info"
                className="w-100 h-100 shadow-sm"
                data-tag="32"
                onClick={handleChildButtonClick}
              >
                Stati
              </Button>
            </Col>

            <Col className="mx-1">
              <Button
                variant="info"
                className="w-100 h-100 shadow-sm"
                data-tag="33"
                onClick={handleChildButtonClick}
              >
                Ruoli
              </Button>
            </Col>

            <Col className="p-0">
              <Button
                variant="info"
                className="w-100 h-100 shadow-sm"
                data-tag="34"
                onClick={handleChildButtonClick}
              >
                Proprietà
              </Button>
            </Col>
          </>
        );

      default:
        return <> </>;
    }
  }, [testFilters]);

  const displayControls = useMemo(() => {
    return (
      <>
        <Row className="px-0 w-100">
          <Col lg={3}>
            <Form.Label className="visually-hidden" htmlFor="inputquery">
              Cerca uno o più test
            </Form.Label>
            <Form.Control
              placeholder="Cerca..."
              name="inputquery"
              id="inputquery"
              onKeyUp={onChangeHandler}
              defaultValue={testFilters.filter_word}
            />
          </Col>

          <Col lg={2} className="my-1">
            <Form.Check
              inline
              defaultChecked={true}
              label="Applicabile"
              type="checkbox"
              name="applicable"
              id="applicable"
              onClick={onChangeHandlerCheckbox}
              value={testFilters.filer_isApplicable}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Superato"
              id="passed"
              name="passed"
              onClick={onChangeHandlerCheckbox}
              value={testFilters.filter_isPassed}
            />
          </Col>

          <Col lg={3} className="my-1">
            <Form.Label className="visually-hidden" htmlFor="test_level">
              Livello WCAG del test
            </Form.Label>
            <Form.Select
              name="level"
              id="test_level"
              onChange={onChangeHandlerSelect}
            >
              <option value="">Livello</option>
              <option value="1" selected={testFilters.filter_level === "1"}>
                A
              </option>
              <option value="2" selected={testFilters.filter_level === "2"}>
                AA
              </option>
              <option value="3" selected={testFilters.filter_level === "3"}>
                AAA
              </option>
              <option value="0" selected={testFilters.filter_level === "4"}>
                Non specificato
              </option>
            </Form.Select>
          </Col>

          <Col lg={3} className="my-1">
            <Form.Label className="visually-hidden" htmlFor="test_type">
              Tipologia di test
            </Form.Label>
            <Form.Select
              name="type"
              id="test_type"
              onChange={onChangeHandlerSelect}
            >
              <option value="">Tipologia di test</option>
              <option value="1" selected={testFilters.filter_type === "1"}>
                Automatico
              </option>
              <option value="2" selected={testFilters.filter_type === "2"}>
                Semiautomatico
              </option>
              <option value="3" selected={testFilters.filter_type === "3"}>
                Manuale
              </option>
            </Form.Select>
          </Col>

          <Col lg={1}>
            <Button
              type="reset"
              variant="outline-secondary w-100 px-0 my-1"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </>
    );
  }, [testFilters]);

  return (
    <>
      <a href={uid} className="visually-hidden">
        Salta la searchbox e vai alla lista di test
      </a>

      <Card className="main-card mb-5 shadow-sm pt-0">
        <Card.Header as="h2" className="bg-neutral text-center py-2">
          <span className="visually-hidden">Barra di ricerca</span>
          <FaSearch alt="" />
        </Card.Header>

        <Form
          className="m-0 mt-3 px-0"
          onSubmit={handleSubmit}
          role="search"
          aria-controls="tests-list"
        >
          {displayControls}

          <Container className="mb-2 mt-4 border-top pt-4" role="toolbar">
            <Row
              className="p-0 d-flex justify-content-between"
              arial-control="test-btns-list"
            >
              <Col className="mr-3 p-0">
                <Button
                  variant="primary"
                  className="w-100 shadow-sm"
                  data-tag="1"
                  onClick={handleParentButtonClick}
                >
                  Struttura
                </Button>
              </Col>
              <Col className="mx-3 p-0">
                <Button
                  variant="success"
                  className="w-100 shadow-sm"
                  data-tag="2"
                  onClick={handleParentButtonClick}
                >
                  Presentazione
                </Button>
              </Col>

              <Col className="mx-3 p-0">
                <Button
                  variant="warning"
                  className="w-100 shadow-sm"
                  data-tag="3"
                  onClick={handleParentButtonClick}
                >
                  Comportamento
                </Button>
              </Col>

              <Col className="mx-3 p-0">
                <Button
                  variant="danger"
                  className="w-100 shadow-sm"
                  data-tag="4"
                  onClick={handleParentButtonClick}
                >
                  Contenuti
                </Button>
              </Col>
              <Col className="ml-3 p-0">
                <Button
                  variant="info"
                  className="w-100 shadow-sm"
                  data-tag="5"
                  onClick={handleParentButtonClick}
                >
                  W-ARIA
                </Button>
              </Col>
            </Row>
            <Row className="pt-3" id="test-btns-list">
              {buttonToDisplay}
            </Row>
          </Container>
        </Form>
      </Card>
    </>
  );
}

export default SearchBar;
