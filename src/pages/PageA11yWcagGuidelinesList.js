import { React, useState, useMemo } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useTitle } from "../hooks/HookTitle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PageA11yWcagGuidelineList(props) {
  const [wcag1, setWcag1] = useState(false);
  const [wcag2, setWcag2] = useState(false);
  const [wcag3, setWcag3] = useState(false);
  const [wcag4, setWcag4] = useState(false);
  const website = useSelector((state) => state.website.website);

  useTitle("Controllo sezioni WCAG | Dashboard | Accessibilità | MyWcag4All");

  

  const onClickHandler = (event) => {
    const section = Number(event.target.dataset.section);
    const value = event.target.checked;
    switch (Number(section)) {
      case 1:
        setWcag1(value);
        break;

      case 2:
        setWcag2(value);
        break;

      case 3:
        setWcag3(value);
        break;

      case 4:
        setWcag4(value);
        break;

      default:
        break;
    }
  };

  const procede = useMemo(() => {
    if (wcag1 && wcag2 && wcag3 && wcag4) {
      return (
        <Link
          to="/accessibility-dev/a11y/result"
          className="btn btn-success w-100 mt-3 shadow"
          state={{ location: "a11y" }}
        >
          Guarda i risultati
        </Link>
      );
    } else {
      return (
        <span className="btn btn-success w-100 disabled mt-3 shadow">
          Controlla le sezioni WCAG prima di procedere
        </span>
      );
    }
  }, [wcag1, wcag2, wcag3, wcag4]);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Accessibilità",
      url: "/accessibility-dev/a11y",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Dashboard",
      url: "/accessibility-dev/a11y/choice",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Verifica WCAG",
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title
        title={
          'Sezioni WCAG per il sito "' +
          website.name +
          '"'
        }
        className="title-a11y"
      />

      <Row>
        <Col sm={3} className="d-flex align-items-stretch">
          <Card className="card-specific shadow-sm">
            <Card.Header as="h2" className="h3 border-bottom">
              Sezione WCAG 1
            </Card.Header>
            <Card.Body>
              Le informazioni e i componenti dell'interfaccia utente devono
              essere presentati agli utenti in modi in cui essi possano
              percepirli.
            </Card.Body>
            <Card.Footer>
              <Link
                to="/accessibility-dev/a11y/wcag-guidelines/1"
                className="btn btn-primary"
                state={{ location: "a11y" }}
              >
                Vai alla checklist dei criteri della sezione 1
              </Link>
              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Sezione 1 controllata"
                  id="section-1"
                  onClick={onClickHandler}
                  data-section="1"
                />
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>

        <Col sm={3} className="d-flex align-items-stretch">
          <Card className="card-specific shadow-sm">
            <Card.Header as="h2" className="h3 border-bottom">
              Sezione WCAG 2
            </Card.Header>
            <Card.Body>
              I componenti e la navigazione dell'interfaccia utente devono
              essere utilizzabili.
            </Card.Body>
            <Card.Footer>
              <Link
                to="/accessibility-dev/a11y/wcag-guidelines/2"
                className="btn btn-primary"
                state={{ location: "a11y" }}
              >
                Vai alla checklist dei criteri della sezione 2
              </Link>
              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Sezione 2 controllata"
                  onClick={onClickHandler}
                  id="section-2"
                  data-section="2"
                />
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>

        <Col sm={3} className="d-flex align-items-stretch">
          <Card className="card-specific shadow-sm">
            <Card.Header as="h2" className="h3 border-bottom">
              Sezione WCAG 3
            </Card.Header>
            <Card.Body>
              Le informazioni e le operazioni dell'interfaccia utente devono
              essere comprensibili.
            </Card.Body>
            <Card.Footer>
              <Link
                to="/accessibility-dev/a11y/wcag-guidelines/3"
                className="btn btn-primary"
                state={{ location: "a11y" }}
              >
                Vai alla checklist dei criteri della sezione 3
              </Link>
              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Sezione 3 controllata"
                  onClick={onClickHandler}
                  id="section-3"
                  data-section="3"
                />
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>

        <Col sm={3}>
          <Card className="card-specific shadow-sm">
            <Card.Header as="h2" className="h3 border-bottom">
              Sezione WCAG 4
            </Card.Header>
            <Card.Body>
              Il contenuto deve essere abbastanza robusto per essere
              interpretato in maniera affidabile da una grande varietà di
              programmi utente, comprese le tecnologie assistive.{" "}
            </Card.Body>
            <Card.Footer>
              <Link
                to="/accessibility-dev/a11y/wcag-guidelines/4"
                className="btn btn-primary"
                state={{ location: "a11y" }}
              >
                Vai alla checklist dei criteri della sezione 4
              </Link>
              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Sezione 4 controllata"
                  onClick={onClickHandler}
                  data-section="4"
                  id="section-4"
                />
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card className="main-card shadow1">
            {procede}
            <Link
              to="/accessibility-dev/a11y/choice"
              className="btn btn-secondary w-100 mt-3"
              state={{ location: "a11y" }}
            >
            Torna alla Dashboard
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default PageA11yWcagGuidelineList;
