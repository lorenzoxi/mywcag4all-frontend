import { React, useState, useMemo, useEffect } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import axios from "../service/client";
import WcagGuideline from "../components/wcag-guideline/WcagGuideline";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";

function PageA11yWcagGuideline(props) {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const website = useSelector((state) => state.website.website);

  useTitle("Sezione WCAG ", params.guideline ,"| Controllo criteri WCAG | Dashboard | Accessibilità | MyWcag4All");


  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/guidelines", {
        params: {
          section: params.guideline,
          website: website.id,
        },
      })
      .then(function (res) {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }, []);

  const displaySection = useMemo(() => {
    return (
      data != null &&
      data.map((guideline) => (
        <>
          <WcagGuideline
            index={guideline.index}
            title={guideline.title}
            description={guideline.description}
            criteria={guideline.criteria}
          />
          <br />
        </>
      ))
    );
  }, [data]);

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
      page: "Verifica WCAG",
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Verifica sezione WCAG " + params.guideline,
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: true,
      state: "a11y",
    },
  ];

  const updateData = () => {
    axios
    .post("/website-update-level-and-score", {
      user: user.id,
      website: website.id,
    })
    .then(function (res) {})
    .catch(function (error) {
      //console.log(error);
    });
  }


  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title
        title={`SEZIONE WCAG ${params.guideline}`}
        className="title-a11y"
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
          {displaySection}
          <br />
          <Card className="main-card my-3 shadow1">
            <Link
              to="/accessibility-dev/a11y/choice"
              className="btn btn-success btn-block shadow w-100"
              state={{ location: "a11y" }}
              rel="prev"
              onClick={updateData}
            >
              Salva e torna alle sezioni WCAG
            </Link>
          </Card>

        </>
      )}
    </Container>
  );
}
export default PageA11yWcagGuideline;
