import { useAuth0 } from "@auth0/auth0-react";
import { React } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

function HomePageBtns() {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <Row>
            <h2 className="h2 bold8">Occupati di accessibilità.</h2>
          </Row>
          <Row>
            <p>
              MyWcag4All è uno strumento che ti aiuta a tenere traccia e ad
              implementare l'accessibilità nel tuo sito.
            </p>
          </Row>
          <Row>
            <Col>
              <Button
                as="a"
                role=""
                variant="primary"
                className="shadow1 my-2 w-100 bold8 btn-grad"
                onClick={() => loginWithRedirect({ ui_locales: "it" })}
              >
                Accedi a MyWcag4All
              </Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button
                as="a"
                role=""
                variant="primary"
                className="shadow1 my-2 w-100 bold8 btn-grad"
                onClick={() =>
                  loginWithRedirect({ ui_locales: "it", screen_hint: "signup" })
                }
              >
                Registrati
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
export default HomePageBtns;
