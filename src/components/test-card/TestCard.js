import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Container from "../container/Container";
import Title from "../title/Title";
import ToolList from "../tool-list/ToolList";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import axios from "../../service/client";
import TestType from "../test-type/TestType";

const TestCard = (props) => {
  const [data, setData] = useState({});
  const [toolList, setToolList] = useState([]);
  const [criteria, setCriteria] = useState([]);

  const params = useParams();
  const id = params.testid;

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
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {});
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
      <Title
        title={`SPECIFICHE TEST ${params.testid}`}
         className="title-a11y"
      />
      <Breadcrumb pages={breadcrumb_pages} />

      <Card>
        <Card.Header>
          <h2>{data.title} </h2>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <h3>Informazioni sul test</h3>
            <div className="row">
              <div className="col-sm-2">
                <p>
                  <strong>Descrizione: </strong>
                </p>
              </div>
              <div className="col-sm-9">
                <p>{data.purpose} </p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                <p>
                  <strong>Tipologia di test: </strong>
                </p>
              </div>
              <div className="col-sm-9">
                <p>
                  <TestType type={data.type_no} /> - {data.type}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                <p>
                  <strong>Procedura: </strong>
                </p>
              </div>
              <div className="col-sm-9">
                <p>{data.description} </p>
              </div>
            </div>
          </div>

          <hr  aria-hidden="true" alt=""/>

          <h3>Accessibilità</h3>
          <div className="row">
            <div className="col-sm-2">
              <p>
                <strong>Criteri WCAG: </strong>
              </p>
            </div>
            <div className="col-sm-9">
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
              <a className="default-anchor" hrefLang={"en"} href={data.wcaglineguideurl}> {data.wcaglineguide} </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <p>
                <strong>Livello WCAG: </strong>
              </p>
            </div>
            <div className="col-sm-9">
              <p>{data.level}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <p>
                <strong>Riferimento AGID: </strong>
              </p>
            </div>
            <div className="col-sm-9">
              <p>{data.agid}</p>
            </div>
          </div>

          <hr  aria-hidden="true" alt=""/>

          <h3>Strumenti</h3>

          {toolList.length <= 0 && (
            <>
              <p>Nessun strumento disponibile</p>
            </>
          )}

          {toolList && toolList.length > 0 && (
            <>
              <ToolList toolList={toolList} />
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TestCard;
