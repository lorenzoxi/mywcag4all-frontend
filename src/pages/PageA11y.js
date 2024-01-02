import { React, useMemo, useState, useEffect } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "../service/client";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { addWebsite } from "../store/websiteSlice";
import { setTestData } from "../store/testSlice";
import { resetToolFilter } from "../store/slice.tools";

function PageA11y(props) {
  const [websites, setWebsites] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const website = useSelector((state) => state.website.website);

  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    let index = event.target.selectedIndex;
    let optionElement = event.target.childNodes[index];
    dispatch(addWebsite({ id: optionElement.value, name: optionElement.text }));

    setIsSelected(true);
  };

  useTitle("Accessibilità | MyWcag4All");

  useEffect(() => {

    dispatch(resetToolFilter())
    
    const id = user.id;
    axios
      .get("/websites", {
        params: {
          user: id,
        },
      })
      .then(function (res) {
        setWebsites(res.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        //console.log(error);
        setIsLoading(false);
      });
  }, []);

  const loadTestData = () => {
    axios
      .get("/tests", {
        params: {
          website: website.id,
        },
      })
      .then(function (res) {
        dispatch(setTestData({ data: res.data }));
      });
  };

  const display = useMemo(() => {
    return (
      <Form.Select
        aria-label="Default select example"
        id="select_type"
        size="lg"
        onChange={handleOnChange}
        className="mb-5 mt-5"
        aria-controls="btn-init"
      >
        <option value="" hidden>
          Seleziona il sito che vuoi testare
        </option>
        {websites.map((website) => {
          return <option value={website.id}> {website.name} </option>;
        })}
      </Form.Select>
    );
  }, [websites]);

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
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="ACCESSIBILITÀ" className="title-a11y" />

      <Card className="main-card shadow1">
        <h2 className="bold6">
          Inizia selezionando un sito {process.env.REACT_APP_HELLO}{" "}
        </h2>
        {websites.length > 0 && display}
        {websites.length === 0 && !isLoading && (
          <p>
            Non sembra che tu abbia ancora inserito un sito,{" "}
            <Link
              to="/accessibility-dev/websites/create"
              state={{ location: "websites" }}
              className="default-anchor"
            >
              inseriscine uno adesso
            </Link>
            !
          </p>
        )}

        <div id="btn-init">
          {isSelected && (
            <Link
              to="/accessibility-dev/a11y/choice"
              className="btn btn-danger w-100 bold8"
              state={{ location: "a11y" }}
              onClick={loadTestData}
            >
              Inizia la valutazione di accessibilità
            </Link>
          )}
        </div>
      </Card>
    </Container>
  );
}
export default PageA11y;
