import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import WcagLevels from "../wcag-levels/WcagLevels";
import Badge from "react-bootstrap/esm/Badge";
import { useSelector, useDispatch } from "react-redux";
import { addWebsite } from "../../store/websiteSlice";
import axios from "../../service/client";
import { setTestData } from "../../store/testSlice";

function WebsiteItemCard(props) {
  const dispatch = useDispatch();
  const website = useSelector((state) => state.website.website);
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(addWebsite({ id: props.id, name: props.name }));

    axios
      .get("/tests", {
        params: {
          website: props.id,
        },
      })
      .then(function (res) {
        dispatch(setTestData({ data: res.data }));
        navigate("/accessibility-dev/a11y/tests", {
          state: { location: "a11y" },
        });
      });
  };

  return (
    <li key={props.id} className="item-card w-100 shadow-sm">
      <Row className="d-flex align-items-center p-1">
        <Col md={12} lg={5}>
          <button
            className="btn btn-link p-0 m-0 default-anchor"
            to={"/accessibility-dev/a11y/tests"}
            onClick={onClickHandler}
            role="link"
          >
            <h3 className="h5 p-0 m-0">
              <span className="visually-hidden">Titolo del sito: </span>
              {props.name}
            </h3>
          </button>
        </Col>

        <Col md={12} lg={1} className="text-center">
          <Badge bg="warning" text="dark">
            <span className="visually-hidden">Punteggio del sito: </span>
            {props.score}
          </Badge>
        </Col>

        <Col md={12} lg={2} className="text-center">
          <span className="visually-hidden">Livello WCAG: </span>
          <WcagLevels link="" level={props.level} />
        </Col>

        <Col md={12} lg={2} className="my-1 ">
          <Link
            className="btn btn-outline-primary w-100"
            data-btntype="update"
            to={"/accessibility-dev/websites/update/" + props.id}
            state={{ location: "websites", name: props.name }}
          >
            Modifica
          </Link>
        </Col>
        <Col md={12} lg={2} className="">
          <Link
            className="btn btn-outline-danger w-100"
            data-btntype="delete"
            to={"/accessibility-dev/websites/delete/" + props.id}
            state={{ location: "websites", name: props.name }}
          >
            Elimina
          </Link>
        </Col>
      </Row>
    </li>
  );
}

export default WebsiteItemCard;
