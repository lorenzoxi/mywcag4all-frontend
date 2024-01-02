import "./App.css";
import { React } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicPageRanking from "./pages/PublicPageRanking";
import PublicPageMyths from "./pages/PublicPageMyths";
import PublicPageTools from "./pages/PublicPageTools";
import PageHome from "./pages/PublicPageHome";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/footer/Footer";
import "./index.css";
import PublicPageTool from "./pages/PublicPageTool";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Header from "./components/header/Header";
import PublicPageNotFound from "./pages/PublicPageNotFound";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    !isAuthenticated && !isLoading && (
      <>
        <Header />

        <Container className="d-flex justify-content-center">
          <Routes>
          <Route path="*" element={<PublicPageNotFound title="Accessibilità" />} />

          <Route path="/" element={<Navigate replace to="/accessibility-dev" />} />

            <Route
              path="/accessibility-dev/"
              element={<PageHome title="Accessibilità" />}
            />

            <Route
              path="/accessibility-dev/tools"
              element={
                <PublicPageTools title="Strumenti per l'accessibilità" />
              }
            />

            <Route path="/accessibility-dev/tools">
              <Route path=":toolid" element={<PublicPageTool />} />
            </Route>

            <Route
              path="/accessibility-dev/ranking"
              element={<PublicPageRanking title="Classifica" />}
            />
            <Route
              path="/accessibility-dev/myths"
              element={
                <PublicPageMyths />
              }
            />
          </Routes>
        </Container>

        <Footer />
      </>
    )
  );
}

export default App;
