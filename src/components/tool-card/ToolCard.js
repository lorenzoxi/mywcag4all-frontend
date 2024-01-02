import Card from "react-bootstrap/Card";
import { React } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Price from "../price/Price";

function ToolCard(props) {

  return (
    <Card className="w-100 card-specific shadow-sm">
      <Card.Header as="h3" className="bold8 border-bottom">
        {props.data.name}
      </Card.Header>

      <Card.Body>
        <h4 className="bold7">Informazioni</h4>

        <Row as="dl">
          <Col as="dt" lg={3}>
            Sito ufficiale:
          </Col>
          <Col as="dd" lg={9}>
            {props.data?.url ? (
              <a className="default-anchor" hrefLang={"en"}  href={props.data?.url} rel="noopener noreferrer external"  target="_blank"> Sito ufficiale </a>
            ) : (
              <span> Sito non disponibile</span>
            )}
          </Col>

          <Col as="dt" lg={3}>Licenza:</Col>
          <Col as="dd" lg={9}>
            {props.data?.url_license ? (
              <a className="default-anchor" hrefLang={"en"} href={props.data?.url_license} target="_blank" rel="noopener noreferrer external"> {props.data?.license} </a>
            ) : (
              <span> {props.data?.license}</span>
            )}
          </Col>

          <Col as="dt" lg={3}>Codice sorgente:</Col>
          <Col as="dd" lg={9}>
            {props.data?.source_code ? (
              <a className="default-anchor" hrefLang={"en"} href={props.data?.source_code} rel="noopener noreferrer external"  target="_blank"> Codice sorgente </a>
            ) : (
              <span> Codice sorgente non disponibile</span>
            )}
          </Col>

          <Col as="dt" lg={3}>Prezzo:</Col>
          <Col as="dd" lg={9}>
            <Price price={props.data?.price} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ToolCard;
