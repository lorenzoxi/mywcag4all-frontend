import { React, useState, useEffect, useMemo } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "../service/client";
import WebsiteForm from "../components/website-form/WebsiteForm";
import Card from "react-bootstrap/Card";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/authSlice";
import { resetTestFilter } from "../store/testSlice";
import { resetToolFilter } from "../store/slice.tools";

function PageProfile(props) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [state, setState] = useState("");
  const [sendedChangePasswordEmail, setSendedChangePasswordEmail] =
    useState(false);
  const { logout } = useAuth0();
  useTitle("Profilo | MyWcag4All");

  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, 100000));
  }

  useEffect(() => {
    dispatch(resetTestFilter());
    dispatch(resetToolFilter());
  });

  useEffect(() => {
    if (sendedChangePasswordEmail) {
      timeout().then(() => {
        setSendedChangePasswordEmail(false);
      });
    }
  }, [sendedChangePasswordEmail]);

  const changePasswordHandler = () => {
    const email = user.email;
    setSendedChangePasswordEmail(true);

    var options = {
      method: "POST",
      url: "https://dev-8qx3cl3t.us.auth0.com/dbconnections/change_password",
      headers: { "content-type": "application/json" },
      data: {
        client_id: "5onLRQnQW2CcgsWkm1HTmv2wJm8kjKmX",
        email: email,
        connection: "MyWcagForAllDatabase",
      },
    };

    axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });

    setTimeout(2000);
  };

  const onDeleteHandler = () => {
    const email = user.email;
    axios
      .delete("/user", {
        params: {
          email: email,
        },
      })
      .then((res) => {
        logout({ returnTo: "https://web.math.unipd.it/accessibility-dev/" });
      })
      .catch((error) => {
        logout({ returnTo: "https://web.math.unipd.it/accessibility-dev/" });
        //console.log(error);
      })
      .then(() => {});
  };

  const deleteAccountHandler = () => {
    //console.log(user);
    setState("showDeleteActions");
  };

  const onResetHandler = () => {
    setState("");
  };

  const breadcrumb_pages = [
    { page: "Home", url: "/accessibility-dev/a11y", isCurrent: false },
    { page: "Profilo", url: "/accessibility-dev/profile", isCurrent: true },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Title title="PROFILO" className="title-a11y" />

      <Card className="main-card shadow1">
        <h2 className="bold6">Informazioni</h2>
        <hr aria-hidden="true" alt="" />
        <Row className="dl">
          <Col as="dt" sm={2}>
            Email
          </Col>
          <Col as="dd" sm={10}>
            {user?.email}
          </Col>
        </Row>
        <Row className="dl">
          <Col as="dt" sm={2}>
            Username
          </Col>
          <Col as="dd" sm={10}>
            {user?.username}
          </Col>
        </Row>
      </Card>

      <Card className="main-card mt-5 shadow1">
        <h2 className="bold6 mb-3">Gestisci</h2>
        <hr aria-hidden="true" alt="" />

        <Row>
          <Col sm={12}>
            <Button
              variant="warning w-100 mb-3"
              onClick={changePasswordHandler}
              disabled={sendedChangePasswordEmail}
            >
              {!sendedChangePasswordEmail
                ? "Cambia password"
                : "L'email di ripristino password è stata inviata con successo. Controlla la tua casella di posta elettronica."}
            </Button>
          </Col>

          <Col sm={12}>
            <Button
              variant="danger w-100"
              onClick={deleteAccountHandler}
              aria-controls="delete-user-btns"
            >
              Cancella profilo
            </Button>
          </Col>
        </Row>

        {state === "showDeleteActions" && (
          <>
            <Row className="mt-1" id="delete-user-btns">
              <Col sm={6}>
                <Button
                  variant="danger"
                  className="w-100"
                  type="button"
                  onClick={onDeleteHandler}
                >
                  Cancella per sempre il tuo profilo - operazione irreversibile
                </Button>
              </Col>

              <Col sm={6}>
                <Button
                  variant="secondary"
                  className="w-100"
                  type="button"
                  onClick={onResetHandler}
                >
                  Annulla operazione
                </Button>
              </Col>
            </Row>
          </>
        )}

        {state !== "showDeleteActions" && <WebsiteForm type="state" />}
      </Card>
    </Container>
  );
}
export default PageProfile;
