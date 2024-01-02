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
import Price from "../components/price/Price";
import ContainerB from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";

function PublicPageTool(props) {
  const [tool, setTool] = useState({});
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const location = useLocation();
  const name = location.state.name;
  useTitle("Strumento ", name, "| Lista strumenti | MyWcag4All");
  const toolsData = useSelector((state) => state.tools.tools_data_filtered);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "a11y",
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
    const tool = toolsData.find((tool) => tool.index == params.toolid);
    setTool(tool);
    console.log(params.toolid, "tool", tool);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("tool", tool.tags);
    setTags(tool.tags);
  }, [tool]);

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="SPECIFICHE TOOL" className="title-a11y" />
      <>
        <Card className="card-specific shadow">
          <Card.Header className="border-bottom">
            <h2 className="bold7">{tool.name}</h2>
            {tags && tags.map((tag, index) => {
              return (
                <Badge
                  key={index}
                  pillas="span"
                  pill
                  bg="secondary"
                  className="mx-1"
                >
                  {tag}
                </Badge>
              );
            })}
          </Card.Header>

          <Card.Body>
            <h3 className="my-3">Informazioni sullo strumento</h3>

            <Row as="dl">
              <Col as="dt" sm={3}>
                Sito ufficiale:
              </Col>
              <Col as="dd" sm={9}>
                {tool.url ? (
                  <a className="default-anchor" href={tool.url}>
                    vai al sito ufficiale di {tool.name}
                  </a>
                ) : (
                  <span>Sito ufficiale</span>
                )}
              </Col>

              <Col as="dt" sm={3}>
                Licenza:
              </Col>
              <Col as="dd" sm={9}>
                {tool.license}
              </Col>

              <Col as="dt" sm={3}>
                Codice sorgente:
              </Col>
              <Col as="dd" sm={9}>
                {tool.source_code ? (
                  <a className="default-anchor" href={tool.source_code}>
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
                <Price price={tool.price} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <ContainerB>
          <Row>
            <Link
              to="/accessibility-dev/tools"
              className="btn btn-primary mt-4 shadow"
              state={{ location: "a11y" }}
            >
              Torna alla lista degli strumenti
            </Link>
          </Row>
        </ContainerB>
      </>
    </Container>
  );
}
export default PublicPageTool;
