import { React, useState, useEffect } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Row from "react-bootstrap/Row";
import axios from "../service/client";
import ChartsLevel from "../components/charts-level/ChartsLevel";
import ChartsType from "../components/charts-type/ChartsType";
import Card from "react-bootstrap/Card";
import ContainerB from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";

function PageA11yResult(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const website = useSelector((state) => state.website.website);

  useTitle("Risultati | Controllo sezioni WCAG | Dashboard | Accessibilità | MyWcag4All");

  
  useEffect(() => {
    axios
      .get("/website-result", {
        params: {
          website: website.id,
        },
      })
      .then(function (res) {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        //console.log(error);
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
      page: "Verifica WCAG",
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Risultati",
      url: "/accessibility-dev/a11y/result",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="RISULTATI" className="title-a11y" />
      {isLoading ? (
        <>
          <div className="w-100 text-center">
            <Spinner animation="border" role="status" className="m-5">
              <span className="visually-hidden">Caricamento dei risultati</span>
            </Spinner>
          </div>
        </>
      ) : (
        <>
          <ContainerB>
            <Card className="card-specific shadow1">
              <Card.Header as="h2" className="text-center border-bottom">
                RISULTATI TEST
              </Card.Header>
              <Card.Body>
                <Row as="dl">
                  <Col as="dt" sm={3}>
                    <p>Conformità sito: </p>
                  </Col>
                  <Col as="dd" sm={9}>
                    <p>
                      {data.is_a && data.is_aa && (
                        <Badge bg="success" as="span">
                          conforme
                        </Badge>
                      )}
                      {!data.is_a &&
                        !data.is_aa &&
                        !data?.is_partially_compliant && (
                          <Badge bg="danger" as="span">
                            non conforme
                          </Badge>
                        )}
                      {data?.is_partially_compliant && (
                        <>
                          <Badge bg="warning" as="span" text="black">
                            parzialmente conforme
                          </Badge>
                          <p>
                            Attenzione! La parzialità conforme non garantisce il
                            fatto che il sito sia parzialmente accessibile ma
                            indica solamente il superamento del 50% +1 dei test.
                            Insomma, sei sulla strada giusta, continua così e
                            completa tutti i test!
                          </p>
                        </>
                      )}
                    </p>
                  </Col>

                  <Col as="dt" sm={3}>
                    <p>Test effettuati: </p>
                  </Col>
                  <Col as="dd" sm={9}>
                    <p>
                      <Badge bg="success">
                        {data.passed_tests} {data.passed_tests==1?"test è stato svolto con successo":"test sono stati svolti con successo"}
                      </Badge>{" "}
                      su un totale di{" "}
                      <Badge bg="secondary">
                        {data.applicable_test} test applicabili{" "}
                      </Badge>
                    </p>
                  </Col>

                  <Col as="dt" sm={3}>
                    <p>Punti totali: </p>
                  </Col>
                  <Col as="dd" sm={9}>
                    <Badge bg="warning" as="span" text="black">
                      {data.score} punti
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </ContainerB>
          <ContainerB className="mt-5 p-0">
            <Card className="card-specific shadow1">
              <Card.Header as="h2" className="text-center border-bottom">
                SPECIFICA DEI LIVELLI
              </Card.Header>

              <Card.Body>
                <ChartsLevel
                  level="A"
                  total={data.tot_test_a}
                  passedTest={data.tot_test_a_passed}
                  notPassedTest={data.tot_test_a_not_passed}
                  applicableTest={
                    data.tot_test_a - data.tot_test_a_not_applicable
                  }
                  notApplicableTest={data.tot_test_a_not_applicable}
                  isArchived={data.is_a}
                  amountCriteria={data.tot_criteria_a}
                  passedCriteria={data.passed_criteria_a}
                  notPassedCriteria={data.not_passed_criteria_a}
                  notApplicableCriteria={data.not_applicable_criteria_a}
                  completed={
                    parseInt(data.tot_test_a_not_applicable) +
                    parseInt(data.tot_test_a_passed)
                  }
                  toComplete={parseInt(data.tot_test_a_not_passed)}
                />
                <ChartsLevel
                  level="AA"
                  total={data.tot_test_aa}
                  passedTest={data.tot_test_aa_passed}
                  notPassedTest={data.tot_test_aa_not_passed}
                  applicableTest={
                    data.tot_test_aa - data.tot_test_aa_not_applicable
                  }
                  notApplicableTest={data.tot_test_aa_not_applicable}
                  isArchived={data.is_aa}
                  amountCriteria={data.tot_criteria_aa}
                  passedCriteria={data.passed_criteria_aa}
                  notPassedCriteria={data.not_passed_criteria_aa}
                  notApplicableCriteria={data.tot_test_a_not_applicable}
                  completed={
                    parseInt(data.tot_test_aa_not_applicable) +
                    parseInt(data.tot_test_aa_passed)
                  }
                  toComplete={data.tot_test_aa_not_passed}
                />
                <ChartsLevel
                  level="AAA"
                  total={data.tot_test_aaa}
                  passedTest={data.tot_test_aaa_passed}
                  notPassedTest={data.tot_test_aaa_not_passed}
                  applicableTest={
                    data.tot_test_aaa - data.tot_test_aaa_not_applicable
                  }
                  notApplicableTest={data.tot_test_aaa_not_applicable}
                  isArchived={data.is_aaa}
                  amountCriteria={data.tot_criteria_aaa}
                  passedCriteria={data.passed_criteria_aaa}
                  notPassedCriteria={data.not_passed_criteria_aaa}
                  notApplicableCriteria={data.tot_test_a_not_applicable}
                  completed={
                    parseInt(data.tot_test_aaa_not_applicable) +
                    parseInt(data.tot_test_aaa_passed)
                  }
                  toComplete={data.tot_test_aaa_not_passed}
                />
              </Card.Body>
            </Card>
          </ContainerB>

          <ContainerB className="my-5 p-0">
            <Card className="card-specific shadow1">
              <Card.Header as="h2" className="text-center border-bottom">
                PUNTEGGIO
              </Card.Header>

              <Card.Body>
                <ChartsType
                  score={data.score}
                  total={data.tot_test}
                  automaticTest={parseInt(data.auto)}
                  semiautomaticTest={parseInt(data.semi)}
                  manualTest={parseInt(data.manu)}
                  notPassedTest={data.not_passed_tests}
                  notApplicableTest={data.not_applicable_test}
                />
              </Card.Body>
            </Card>
          </ContainerB>

          <ContainerB className="my-5 p-0">
            <Card className="main-card shadow1">
              <Link
                to="/accessibility-dev/websites"
                className="btn btn-secondary w-100"
                state={{ location: "a11y" }}
              >
                Torna ai miei siti
              </Link>

              <Link
                to="/accessibility-dev/a11y/tests"
                className="btn btn-warning w-100 my-2"
                state={{ filters: { isPassed: false }, location: "a11y" }}
              >
                Visualizza test da ripetere
              </Link>
            </Card>
          </ContainerB>
        </>
      )}
    </Container>
  );
}
export default PageA11yResult;
