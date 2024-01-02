import Card from "react-bootstrap/Card";
import Title from "../components/title/Title";
import Container from "../components/container/Container";
import { React, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import axios from "../service/client";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Price from "../components/price/Price";
import { useTitle } from "../hooks/HookTitle";

function PageTool(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const location = useLocation();
  const name = location.state.name;
  
  useTitle("Strumento ", name ," | Lista strumenti | Accessibilità | MyWcag4All");

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Lista strumenti e risorse",
      url: "/accessibility-dev/tools",
      isCurrent: false,
      state: "tools",
    },
    {
      page: name,
      url: "/accessibility-dev/tools/" + name,
      isCurrent: true,
      state: "tools",
    },
  ];

  useEffect(() => {
    axios
      .get("/tool", {
        params: {
          id: params.toolid,
        },
      })
      .then(function (res) {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        //console.log(error);
        setIsLoading(false);
      });
  }, []);

  const info = useMemo(() => {
    return isLoading ? (
      <>
        <div className="text-center">
          <Spinner animation="border" role="status" className="m-5">
            <span className="visually-hidden">Caricamento</span>
          </Spinner>
        </div>
      </>
    ) : (
      <>
        <Card className="card-specific shadow1">
          <Card.Header className="border-bottom">
            <h2 className="bold7">{data.tool?.name}</h2>
          </Card.Header>

          <Card.Body>
            <h3 className="my-3">Informazioni sullo strumento</h3>

            <Row as="dl">
              <Col as="dt" sm={3}>
                Sito ufficiale:
              </Col>
              <Col as="dd" sm={9}>
                {data.tool?.url ? (
                  <a className="default-anchor" href={data.tool?.url} hrefLang={"en"} target="_blank" rel="noopener noreferrer external">
                    vai al sito ufficiale di {data.tool?.name}
                  </a>
                ) : (
                  <span>Sito ufficiale</span>
                )}
              </Col>

              <Col as="dt" sm={3}>
                Licenza:
              </Col>
              <Col as="dd" sm={9}>
                {data.tool?.license}
              </Col>

              <Col as="dt" sm={3}>
                Codice sorgente:
              </Col>
              <Col as="dd" sm={9}>
                {data.tool?.source_code ? (
                  <a className="default-anchor" href={data.tool?.source_code} hrefLang={"en"} target="_blank" rel="noopener noreferrer external">
                    {" "}
                    consulta il codice sorgente{" "}
                  </a>
                ) : (
                  <span> Codice sorgente non disponibile</span>
                )}
              </Col>

              <Col as="dt" sm={3}>
                Prezzo:
              </Col>
              <Col as="dd" sm={9}>
                <Price price={data.tool?.price} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }, [data, isLoading]);

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="SPECIFICHE STRUMENTO" className="title-a11y" />
      {info}

      <Card className="card-specific shadow1 my-2">
        <Card.Body>
          <Link
            to="/accessibility-dev/tools"
            className="btn btn-secondary shadow-sm w-100"
            state={{ location: "a11y" }}
          >
            Torna alla lista degli strumenti
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default PageTool;
