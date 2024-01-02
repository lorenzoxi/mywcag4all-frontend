import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/authSlice";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Row className="m-0 p-0">
      <Col className="text-center m-0 p-0">
        <Button
          className="w-75 "
          variant="danger"
          onClick={() => 
            logout({ returnTo: `${process.env.REACT_APP_LOGOUT_REDIRECT_URL}` })
          }
        >
          Log Out
        </Button>
      </Col>
    </Row>
  );
};

export default LogoutButton;
