import { React } from "react";
import Container from "../components/container/Container";
import ContainerB from "react-bootstrap/Container";
import notfoundpic from "../img/404.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Title from "../components/title/Title";
import { useTitle } from "../hooks/HookTitle";
import Header from "../components/header/Header";
import Spinner from "react-bootstrap/esm/Spinner";

function PublicPageNotFound(props) {
  const { isLoading } = useAuth0();
  useTitle("Pagina non trovata | MyWcag4All");

  return (
    !isLoading &&
    <Container>
      <Title title="Pagina non trovata" className="title-a11y" />

      <ContainerB className="text-center">
        <h2>
          <Link className="default-anchor" to="/accessibility-dev/">
            Torna alla home.
          </Link>
        </h2>
        <img id="notfoundpic" src={notfoundpic} alt="" />
        <p>
          <small>
            <a href="https://storyset.com/web" lang="en">
              Web illustrations by Storyset
            </a>
          </small>
        </p>
      </ContainerB>
    </Container>
  );
}
export default PublicPageNotFound;
