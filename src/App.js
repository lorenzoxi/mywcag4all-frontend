import "./App.css";
import { React, useCallback, useEffect, useState, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import PageTest from "./pages/PageTest";
import PageA11yTests from "./pages/PageA11yTests";
import PageA11y from "./pages/PageA11y";
import PageWebsites from "./pages/PageWebsites";
import PageRanking from "./pages/PageRanking";
import PageTools from "./pages/PageTools";
import PageTool from "./pages/PageTool";
import PageA11yDashboard from "./pages/PageA11yDashboard";
import Footer from "./components/footer/Footer";
import "./index.css";
import PageA11yTips from "./pages/PageA11yTips";
import PageProfile from "./pages/PageProfile";
import PageNotFound from "./pages/PageNotFound";
import PageWebsiteCreate from "./pages/PageWebsiteCreate";
import PageA11yWcagGuidelineList from "./pages/PageA11yWcagGuidelinesList";
import PageA11yWcagGuideline from "./pages/PageA11yWcagGuideline";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageA11yResult from "./pages/PageA11yResult";
import Header from "./components/header/Header";
import PageToolsHint from "./pages/PageToolsHint";
import PageWebsiteDelete from "./pages/PageWebsiteDelete";
import PageWebsiteUpdate from "./pages/PageWebsiteUpdate";
import PageA11yGuide from "./pages/PageA11yGuide";
import PublicPageMyths from "./pages/PublicPageMyths";
import Spinner from "react-bootstrap/esm/Spinner";
import { useTitle } from "./hooks/HookTitle";

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [isTokenAvailable, setIsTokenAvailable] = useState(true);

  const getAccessToken = useCallback(() => {
    getAccessTokenSilently().then((token) => {
      localStorage.setItem("token", token);
      setIsTokenAvailable(true);
    });
  });

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken, user]);

  const [location, setLocation] = useState("");
  const currentPath = useLocation();

  useEffect(() => {
    setLocation(currentPath);
  }, [currentPath]);

  useTitle("MyWcag4All");

  const display = useMemo(() => {
    // if (isAuthenticated && (isLoading || !isTokenAvailable)) { TODO: to develop
    if (false) {
      return (
        <div id="main" className="d-flex flex-row justify-content-center m-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    } // else if (!isLoading && isAuthenticated && isTokenAvailable) {
    else if (true) { // { TODO: to develop
      return (
        <>
          <Header />
          <div id="main" className="d-flex flex-row">
            <Navbar currentLocation={location} />

            <Routes>
              <Route
                path="*"
                element={<PageNotFound title="Accessibilità" />}
              />

              <Route path="/accessibility-dev/">
                <Route
                  path="/accessibility-dev/"
                  element={
                    <Navigate replace to="/accessibility-dev/websites" />
                  }
                />

                <Route
                  path="a11y/"
                  element={<PageA11y title="Accessibilità" />}
                />
                <Route
                  path="a11y/tips"
                  element={<PageA11yTips title="Accessibilità" />}
                />
                <Route
                  path="a11y/guide"
                  element={<PageA11yGuide title="Istruzioni per l'uso" />}
                />
                <Route
                  path="a11y/choice"
                  element={<PageA11yDashboard title="Accessibilità" />}
                />
                <Route
                  path="a11y/tests"
                  element={<PageA11yTests title="Accessibilità" />}
                />
                <Route
                  path="a11y/wcag"
                  element={
                    <PageA11yWcagGuidelineList title="Accessibilità wcag" />
                  }
                />
                <Route
                  path="a11y/result"
                  element={<PageA11yResult title="Risultati" />}
                />

                <Route path="a11y/wcag-guidelines">
                  <Route
                    path=":guideline"
                    element={<PageA11yWcagGuideline />}
                  />
                </Route>

                <Route path="a11y/tests">
                  <Route path=":testid" element={<PageTest />} />
                </Route>

                <Route
                  path="tools/"
                  element={<PageTools title="Strumenti per l'accessibilità" />}
                />
                <Route path="tools">
                  <Route path=":toolid" element={<PageTool />} />
                </Route>

                <Route
                  path="tools/hint"
                  element={
                    <PageToolsHint title="Suggerisci struemnti per l'accessibilità" />
                  }
                />

                <Route
                  path="websites/"
                  element={
                    <PageWebsites className="w-75" title="I miei siti" />
                  }
                />

                <Route
                  path="websites/create"
                  element={
                    <PageWebsiteCreate className="w-75" title="I miei siti" />
                  }
                />

                <Route path="websites/delete">
                  <Route
                    path=":websiteid"
                    element={<PageWebsiteDelete type="delete" />}
                  />
                </Route>

                <Route path="websites/update">
                  <Route
                    path=":websiteid"
                    element={<PageWebsiteUpdate type="update" />}
                  />
                </Route>

                <Route
                  path="ranking"
                  element={<PageRanking title="Classifica" />}
                />
                <Route
                  path="profile"
                  element={<PageProfile title="Profilo" />}
                />

                <Route
                  path="/accessibility-dev/myths"
                  element={<PublicPageMyths />}
                />
              </Route>
            </Routes>
          </div>
          <Footer />
        </>
      );
    }
  }, [isAuthenticated, isLoading, isTokenAvailable, location]);

  return <>{display}</>;
}

export default App;
