import { React, useState, useMemo, useEffect } from "react";
import Container from "../components/container/Container";
import WebsiteForm from "../components/website-form/WebsiteForm";
import ItemList from "../components/item-list/ItemList";
import MyPagination from "../components/pagination/MyPagination";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import axios from "../service/client";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContainerB from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/esm/Spinner";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  resetToolFilter,
  setToolsData,
  setToolsDataLicense,
  setToolsDataTypes,
} from "../store/slice.tools";
import { setWebsitesData } from "../store/websiteSlice";
import { resetTestFilter } from "../store/testSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { addUser } from "../store/authSlice";
function PageWebsites(props) {
  const [showList, setShowList] = useState(true);
  const [websiteToUpdate, setWebsiteToUpdate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const _user = useSelector((state) => state.auth.user);
  const page = useSelector((state) => state.website.page_website);
  const websites = useSelector((state) => state.website.data_websites);

  useTitle("I miei siti | Accessibilità | MyWcag4All");
  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    const email = user?.email;
    const id = user?.sub.split("|")[1];

    axios
      .get("/user", {
        params: {
          user_id: id,
          user_email: email,
        },
      })
      .then(function (res) {
        const uemail = res.data.email;
        const uname = res.data.username;
        const uid = res.data.id;
        dispatch(addUser({ email: uemail, username: uname, id: uid }));
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
      });

    dispatch(resetTestFilter());
    dispatch(resetToolFilter());
    axios
      .get("/websites", {
        params: {
          user: id,
        },
      })
      .then(function (res) {
        dispatch(setWebsitesData({ data: res.data }));
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
      });

    axios.get("/tools", {}).then(function (res) {
      dispatch(setToolsData({ data: res.data }));
    });
    axios.get("/tool-types", {}).then(function (res) {
      dispatch(setToolsDataTypes({ data: res.data }));
    });
    axios.get("/tool-licenses", {}).then(function (res) {
      dispatch(setToolsDataLicense({ data: res.data }));
    });
  }, []);

  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 8;
    for (i = 0, j = websites?.length; i < j; i += chunk) {
      temporary = websites.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [websites]);

  const websiteByPage = useMemo(() => {
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const updateHandling = (id) => {
    // alert("modify")
    setWebsiteToUpdate(id);
    setShowList(false);
  };

  const onClickHandler = () => {
    setShowList(false);
  };

  const display = useMemo(() => {
    if (showList) {
      return (
        <>
          <Card className="main-card shadow1">
            <Link
              to="create"
              className="w-100 btn btn-primary"
              onClick={onClickHandler}
            >
              Inserisci un sito
            </Link>
          </Card>

          <br />
          {isLoading ? (
            <Card className="main-card shadow1 text-center">
              <div className="w-100 text-center">
                <Spinner animation="border" role="status" className="m-5">
                  <span className="visually-hidden">
                    Caricamento dei risultati
                  </span>
                </Spinner>
              </div>
            </Card>
          ) : (
            <>
              {listGrouped.length !== 0 && (
                <ContainerB className="mt-5 md-display-none">
                  <Row>
                    <Col xs={5} className="px-2 bold8 responsive-font-size">
                      <span>NOME DEL SITO</span>
                    </Col>

                    <Col
                      xs={1}
                      className="p-0 text-center bold8 text-center responsive-font-size"
                    >
                      <span>PUNTI</span>
                    </Col>

                    <Col
                      xs={2}
                      className="p-0 text-center bold8 text-center responsive-font-size"
                    >
                      <span>WCAG</span>
                    </Col>

                    <Col xs={4} className="p-0 text-center"></Col>
                  </Row>
                </ContainerB>
              )}
              <ItemList
                cardList={websiteByPage}
                index={page}
                type="website"
                updateHandling={updateHandling}
                element={"sito"}
              />
            </>
          )}

          {listGrouped.length > 1 && !isLoading && (
            <>
              <Card className="main-card my-3 shadow1">
                <MyPagination
                  totalPage={listGrouped.length}
                  actualPage={page}
                  type="website"
                />
              </Card>
            </>
          )}
        </>
      );
    } else {
      return <WebsiteForm id={websiteToUpdate} type="create" />;
    }
  }, [listGrouped, page, showList, websiteByPage, websiteToUpdate, isLoading]);

  const breadcrumb_pages = [
    {
      page: "Home - I miei siti",
      url: "/accessibility-dev/websites",
      isCurrent: true,
      state: "websites",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title={props.title} className="title-a11y" />

      {display}
    </Container>
  );
}
export default PageWebsites;
