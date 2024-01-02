import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Container from "../components/container/Container";
import ToolList from "../components/tool-list/ToolList";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import axios from "../service/client";
import TestType from "../components/test-type/TestType";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTitle } from "../hooks/HookTitle";

const PageTest = (props) => {
  const [data, setData] = useState({});
  const [toolList, setToolList] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.testid;

  useTitle("Test ", id, " | Lista di test | Accessibilità | MyWcag4All");

  useEffect(() => {
    axios
      .get("/test", {
        params: {
          id: id,
        },
      })
      .then(function (res) {
        // alert(JSON.stringify(res.data))

        setData(res.data.test);
        setToolList(res.data.tools);
        setCriteria(res.data.criteria);
        setIsLoading(false);
      })
      .catch(function (error) {
        //console.log(error);
        setIsLoading(false);
      });
  }, []);

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
      page: "Lista test",
      url: "/accessibility-dev/a11y/tests",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Dettagio test " + id,
      url: "/accessibility-dev/a11y/" + id,
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Card className="card-specific shadow">
        <Card.Header className="border-bottom">
          <h1 className="bold7 text-center">Specifiche Test {params.testid}</h1>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <>
              <div className="text-center">
                <Spinner animation="border" role="status" className="m-5">
                  <span className="visually-hidden">Caricamento</span>
                </Spinner>
              </div>
            </>
          ) : (
            <>
              <h2 className="bold7">Informazioni</h2>
              <Row as="dl">
                <Col as="dt" sm={3}>
                  <p>Descrizione: </p>
                </Col>
                <Col as="dd" sm={9}>
                  <p>{data.purpose} </p>
                </Col>

                <Col as="dt" sm={3}>
                  <p>Tipologia di test: </p>
                </Col>
                <Col as="dd" sm={9}>
                  {data.type} <TestType type={data.type_no} />
                </Col>

                <Col as="dt" sm={3}>
                  <p>Procedura: </p>
                </Col>
                <Col as="dd" sm={9}>
                  <p>{data.description} </p>
                </Col>
              </Row>

              <hr aria-hidden="true" alt="" />

              <h2 className="bold7">Accessibilità</h2>

              <Row as="dl">
                <Col as="dt" sm={3}>
                  <p>
                    <strong>Livello WCAG: </strong>
                  </p>
                </Col>
                <Col as="dd" sm={9}>
                  <p>{data.level}</p>
                </Col>
                <Col as="dt" sm={3}>
                  <p>
                    <strong>Criteri WCAG: </strong>
                  </p>
                </Col>
                <Col as="dd" sm={9}>
                  <ul>
                    {criteria &&
                      criteria.map((element) => {
                        return (
                          <li>
                            {element.index} - {element.name}
                          </li>
                        );
                      })}
                  </ul>
                </Col>

                <Col as="dt" sm={3}>
                  <p>
                    <strong>Criteri AGID: </strong>
                  </p>
                </Col>
                <Col as="dd" sm={9}>
                  <ul>
                    {criteria &&
                      criteria.map((element) => {
                        return (
                          <li>
                            9.{element.index} - {element.name}
                          </li>
                        );
                      })}
                  </ul>
                </Col>
              </Row>

              <hr aria-hidden="true" alt="" />

              <h2 className="bold7">Strumenti</h2>

              {!toolList && (
                <>
                  <p>Nessun strumento disponibile</p>
                </>
              )}

              {toolList && toolList.length > 0 && (
                <>
                  <ToolList toolList={toolList} />
                </>
              )}
            </>
          )}

          <Link
            to="/accessibility-dev/a11y/tests"
            className="btn btn-secondary shadow1 w-100 mt-3"
            state={{ location: "a11y" }}
            rel="prev"
          >
            Torna alla lista dei test
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PageTest;
