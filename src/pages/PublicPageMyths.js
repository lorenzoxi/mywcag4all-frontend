import { React, useState, useEffect, useMemo, useRef } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "../service/client";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Note from "../components/note/Note";
import Title from "../components/title/Title";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { getMyths } from "../service/api/api.myths";

function PageMyths(props) {
  const [myths, setMyths] = useState([]);
  const [index, setIndex] = useState(0);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Falsi miti e stereotipi",
      url: "/accessibility-dev/myths",
      isCurrent: true,
      state: "myths",
    },
  ];

  useTitle("Miti e stereotipi | MyWcag4All");

  useEffect(() => {
    getMyths().then((res) => {
      const sorted_myths = res.sort(() => Math.random() - 0.5);
      setMyths(sorted_myths);
    });
  }, []);

  const onClickHandler = (event) => {
    setIndex(event.target.dataset.index);
  };

  const tabpanels = useMemo(() => {
    return myths.map((element) => {
      return (
        <li className="my-3">
          <Card id={element.id} className="card-specific shadow1 my-5">
            <Card.Header as="h2" className="border-bottom">
              {element.title}
            </Card.Header>
            <Card.Body>{element.description}</Card.Body>

            <a className="visually-hidden" href="#container">
              Torna al contenuto principale
            </a>
          </Card>
        </li>
      );
    });
  }, [myths]);

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Card className="main-card shadow1">
        <Title title="Falsi miti e stereotipi" />

        <ul className="list-unstyled d-flex justify-content-around -flex-row flex-wrap">
          {myths.map((element) => {
            return (
              <Note
                href={element.id}
                title={element.title}
                description={element.description}
                onClick={onClickHandler}
                index={element.id}
                uid={element.id}
                color={element.index % 6}
              />
            );
          })}
        </ul>
      </Card>
      <ul className="list-unstyled">{tabpanels}</ul>

      <Card className="main-card shadow1 my-5">
        <Link className="btn btn-secondary w-100" to="/accessibility-dev/">
          Torna alla home.
        </Link>
      </Card>
    </Container>
  );
}
export default PageMyths;
