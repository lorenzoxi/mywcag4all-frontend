import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../service/client";
import WebsiteFormLanding from "../website-form-landing/WebsiteFormLanding";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function WebsiteForm(props) {
  const [website, setWebsite] = useState(null);
  const [websiteName, setWebsiteName] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [websiteIsPA, setWebsiteIsPa] = useState();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(false);
  const [landing, setLanding] = useState(false);
  const [operation, setOperation] = useState("");
  const params = useParams();

  useEffect(() => {
    if (props.type !== "create") {
      axios
        .get("/website", {
          params: {
            website: params.websiteid,
          },
        })
        .then(function (res) {
          setWebsite(res.data);
        })
        .catch(function (error) {
          //console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, []);

  const saveWebsite = () => {
    axios
      .post("/create-website", {
        name: document.getElementById("website_name").value,
        url: document.getElementById("website_url").value,
        is_pa: document.getElementById("website_is_pa_yes").checked
          ? true
          : false,
        user: user.id,
      })
      .then(function (res) {
        // alert(Boolean(res.data))
      })
      .catch(function (error) {
        //console.log(error);
        setError(true);
        setOperation("Errore");
        setError(landing);
      })
      .then(function () {
        // always executed
      });
  };

  const updateWebsite = () => {
    axios
      .post("/update-website", {
        name: websiteName,
        url: websiteUrl,
        is_pa: websiteIsPA ? true : false,
        website: params.websiteid,
      })
      .then(function (res) {
        // alert(Boolean(res.data))
      })
      .catch(function (error) {
        //console.log(error);
        setOperation("Errore");
        setError(landing);
      })
      .then(function () {
        // always executed
      });
  };

  const deleteWebsite = () => {
    axios
      .post("/delete-website", {
        website: params.websiteid,
      })
      .then(function (res) {
        // alert(Boolean(res.data))
      })
      .catch(function (error) {
        //console.log(error);
        setOperation("Errore");
        setError(landing);
      })
      .then(function () {
        // always executed
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (props.type === "delete") {
      deleteWebsite();
      setOperation("Eliminazione sito avvenuta con successo!");

      setLanding(true);
    } else {
      if (website === null) {
        // alert("submit-new")

        saveWebsite();
        setOperation("Inserimento sito avvenuto con successo!");

        setLanding(true);
      } else {
        // alert("submit-update")

        updateWebsite();
        setOperation("Aggiornamento dati del sito avvenuto con successo!");
        setLanding(true);
      }
    }
  };

  useEffect(() => {
    setWebsiteName(website?.name);
    setWebsiteUrl(website?.url);
    setWebsiteIsPa(website?.is_pa);
  }, [website]);

  const onChangeNameHandler = (event) => {
    setWebsiteName(event.target.value);
  };
  const onChangeUrlHandler = (event) => {
    setWebsiteUrl(event.target.value);
  };
  const onClickIsPAHandler = (event) => {
    if (event.target.id === "website_is_pa_yes" && event.target.checked) {
      setWebsiteIsPa(true);
    } else {
      setWebsiteIsPa(false);
    }
  };
  return (
    <>
      {!landing && (props.type === "update" || props.type === "create") && (
        <Card className="card-specific shadow1">
          <Card.Header as="h2" className="border-bottom">
            {props.action}
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmitHandler} action="">
              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  Nome del sito
                  <Form.Control
                    type="text"
                    id="website_name"
                    required
                    aria-required="true"
                    placeholder="Inserisci il nome del tuo sito..."
                    value={websiteName}
                    onChange={onChangeNameHandler}
                  />
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  {" "}
                  <abbr title="Uniform Resource Locator">URL</abbr>
                  <Form.Control
                    type="text"
                    id="website_url"
                    required
                    aria-required="true"
                    placeholder="Inserisci l'indirizzo del tuo sito..."
                    value={websiteUrl}
                    onChange={onChangeUrlHandler}
                  />
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  È un sito tenuto all’applicazione delle normative
                  sull’accessibilità (
                  <a
                    className="default-anchor"
                    href="https://www.gazzettaufficiale.it/eli/id/2004/01/17/004G0015/sg"
                    rel="noreferrer external"
                    target="_blank"
                    hrefLang={"it"}
                  >
                    Legge Stanca
                  </a>{" "}
                  e{" "}
                  <a
                    className="default-anchor"
                    rel="noreferrer external prev"
                    target="_blank"
                    href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32016L2102"
                    hrefLang={"en"}
                  >
                    Direttiva <abbr title="Unione Europea">UE</abbr> 2102 del
                    2016
                  </a>
                  ) ?
                </Form.Label>
                <Form.Check
                  name="group1"
                  id="website_is_pa_yes"
                  label="Si"
                  type="radio"
                  checked={websiteIsPA ? true : false}
                  onClick={onClickIsPAHandler}
                />
                <Form.Check
                  name="group1"
                  id="website_is_pa_no"
                  label="No"
                  type="radio"
                  checked={!websiteIsPA ? true : false}
                  onClick={onClickIsPAHandler}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 shadow1"
                onClick={onSubmitHandler}
              >
                Salva
              </Button>

              <Link
                className="btn btn-secondary w-100 mt-2"
                data-btntype="delete"
                to={"/accessibility-dev/websites/"}
                state={{ location: "websites", name: props.name }}
              >
                Torna ai tuoi siti
              </Link>
            </Form>
          </Card.Body>
        </Card>
      )}

      {!landing && props.type === "delete" && (
        <Card className="card-specific shadow1">
          <Card.Header as="h2" className="border-bottom">
            Confermi l'eliminazione del sito?
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmitHandler} action="">
              <Button type="submit" variant="primary" className="w-100">
                Conferma eliminazione
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {landing && <WebsiteFormLanding action={operation} />}
    </>
  );
}

export default WebsiteForm;
