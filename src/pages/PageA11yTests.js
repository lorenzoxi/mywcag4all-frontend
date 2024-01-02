import { React, useState, useMemo, useEffect } from "react";
import Container from "../components/container/Container";
import MyPagination from "../components/pagination/MyPagination";
import Card from "react-bootstrap/Card";
import SearchBar from "../components/searchbar/SearchBar";
import ItemList from "../components/item-list/ItemList";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import axios from "../service/client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useTitle } from "../hooks/HookTitle";
import { useSelector,useDispatch } from "react-redux";
import { filterTestData } from "../store/testSlice";

function PageA11y(props) {
  const [isLoading, setIsLoading] = useState(false);
  const website = useSelector((state) => state.website.website);
  const user = useSelector((state) => state.auth.user);
  const page = useSelector((state) => state.test.filter_page);
  const testData = useSelector((state) => state.test.test_data_filtered);

  useTitle("Tests | Dashboard | Accessibilità | MyWcag4All");
  const dispatch = useDispatch();

  const updateData = () => {
    axios
      .post("/website-update-level-and-score", {
        user: user.id,
        website: website.id,
      })
      .then(function (res) { })
      .catch(function (error) {});
  };


  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 10;
    for (i = 0, j = testData.length; i < j; i += chunk) {
      temporary = testData.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [testData]);

  const updateFilters = () => {
    dispatch(filterTestData())
  };

  const displayPagination = useMemo(() => {
    //console.log("listGrouped ",listGrouped)
    return (
      <MyPagination
        totalPage={listGrouped.length}
        actualPage={page}
        type={"test"}

      />
    );
  }, [listGrouped.length, page]);

  const cardsByPage = useMemo(() => {
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const displayItems = useMemo(() => {
    return (
      <ItemList
        cardList={cardsByPage}
        index={page}
        type="test"
        uid="tests-list"
        element="test"
      />
    );
  }, [cardsByPage, page]);

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
      page: 'Lista test accessibilità per il sito "' + website.name + '"',
      url: "/accessibility-dev/a11y/tests",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Title title={"TEST DI ACCESSIBILITÀ "} className="title-a11y" />

      <SearchBar
        uid="tests-list"
        updateFilters={updateFilters}
      />

      {isLoading ? (
        <>
          <div className="text-center">
            <Spinner animation="border" role="status" className="m-5">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        </>
      ) : (
        <>
          {displayItems}

          <Card className="main-card my-3 shadow1">
            <Row>
              <Col>
                <Link
                  to="/accessibility-dev/a11y/choice"
                  className="btn btn-success btn-block shadow w-100"
                  state={{ location: "a11y" }}
                  rel="prev"
                  onClick={updateData}
                >
                  Salva e torna alla pagina dashboard
                </Link>
              </Col>
              <Col>
                <Link
                  to="/accessibility-dev/a11y/wcag"
                  className="btn btn-success btn-block shadow w-100"
                  state={{ location: "a11y" }}
                  rel="prev"
                  onClick={updateData}
                >
                  Vai ai criteri WCAG
                </Link>
              </Col>
            </Row>
          </Card>

          {listGrouped.length > 1 && !isLoading && (
            <>
              <Card className="main-card my-3 shadow1">
                {displayPagination}
              </Card>
            </>
          )}
        </>
      )}
    </Container>
  );
}
export default PageA11y;
