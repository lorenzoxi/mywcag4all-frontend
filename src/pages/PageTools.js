import { React, useState, useMemo, useEffect } from "react";
import Container from "../components/container/Container";
import MyPagination from "../components/pagination/MyPagination";
import ItemList from "../components/item-list/ItemList";
import Title from "../components/title/Title";
import SearchBarTools from "../components/searchbar-tools/SearchBarTools";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";

function PageTools(props) {
  const [isLoading, setIsLoading] = useState(false);

  useTitle("Lista strumenti | Accessibilità | MyWcag4All");
  const toolsData = useSelector((state) => state.tools.tools_data_filtered);
  const page = useSelector((state) => state.tools.filter_page);

  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 9;
    for (i = 0, j = toolsData.length; i < j; i += chunk) {
      temporary = toolsData.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [toolsData]);

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
      page: "Lista strumenti e risorse",
      url: "/accessibility-dev/a11y/tools",
      isCurrent: true,
      state: "tools",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="STRUMENTI PER L'ACCESSIBILITÀ" className="title-tools" />

      <SearchBarTools uid="tools-list" hint={true} />
      <br />

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
          {listGrouped.length > 0 && (
            <Row className="responsive-font-size md-display-none">
              <Col xs={5} className="px-3 bold8">
                <span> NOME </span>
              </Col>

              <Col xs={3} className="p-0 text-center bold8">
                <span>TIPOLOGIA</span>
              </Col>

              <Col xs={2} className="p-0 text-center bold8">
                <span>LICENZA</span>
              </Col>

              <Col xs={2} className="p-0 text-center"></Col>
            </Row>
          )}

          <ItemList
            cardList={cardsByPage}
            index={page}
            type="tool"
            uid="tools-list"
            element="strumento"
          />
          {listGrouped.length > 1 && !isLoading && (
            <>
              <Card className="main-card my-3 shadow1">
                <MyPagination
                  totalPage={listGrouped.length}
                  actualPage={page}
                  type={"tools"}
                />
              </Card>
            </>
          )}
        </>
      )}
    </Container>
  );
}
export default PageTools;
