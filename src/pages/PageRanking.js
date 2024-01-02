import { React, useState, useMemo, useEffect } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import RankingList from "../components/ranking-list/RankingList";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import MyPagination from "../components/pagination/MyPagination";
import axios from "../service/client";
import ContainerB from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { resetToolFilter } from "../store/slice.tools";
import { resetTestFilter } from "../store/testSlice";

function PageRanking(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page = useSelector((state) => state.ranking.page_ranking);
  const dispatch = useDispatch();

  useTitle("Classifica | MyWcag4All");

  useEffect(() => {
    dispatch(resetTestFilter());
    dispatch(resetToolFilter());

    axios
      .get("/ranking")
      .then(function (res) {
        setIsLoading(false);
        setData(res.data);
      })
      .catch(function (error) {
        setIsLoading(false);
        //console.log(error);
      });
  }, []);

  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 6;
    for (i = 0, j = data.length; i < j; i += chunk) {
      temporary = data.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [data]);

  const cardsByPage = useMemo(() => {
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Classifica",
      url: "/accessibility-dev/ranking",
      isCurrent: true,
      state: "ranking",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="CLASSIFICA" className="title-tools" />

      <Card className="main-card shadow1">
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
              {data.length > 0 && (
                <ContainerB className="mb-2">
                  <Row>
                    <Col xs={1}></Col>

                    <Col xs={4} className="p-0 bold7">
                      <span>SVILUPPATORE </span>
                    </Col>

                    <Col xs={2} className="p-0 bold7 text-center">
                      <span>PUNTEGGIO</span>
                    </Col>

                    <Col xs={2} className="p-0 bold7 text-center ">
                      <span>Totale siti</span>
                    </Col>

                    <Col xs={1} className="p-0 bold7 text-center">
                      <span>siti A</span>
                    </Col>

                    <Col xs={1} className="p-0 bold7 text-center">
                      <span>siti AA</span>
                    </Col>
                    <Col xs={1} className="p-0 bold7 text-center">
                      <span>siti AAA</span>
                    </Col>
                  </Row>
                </ContainerB>
              )}

              <RankingList rankingList={cardsByPage} />

              {listGrouped.length > 1 && !isLoading && (
                <>
                  <MyPagination
                    totalPage={listGrouped.length}
                    actualPage={page}
                    type="ranking"
                  />
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default PageRanking;
