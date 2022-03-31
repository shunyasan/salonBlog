import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Switch, Route } from "react-router";
import { Page404 } from "../components/pages/error/Page404";
import { Home } from "../components/pages/Home";
import { SearchSalon } from "../components/pages/salon/SearchSalon";
import { Footer } from "../components/templete/Footer";
import { Header } from "../components/templete/Header";
import { clinicRoutes } from "./ClinicRoutes";
import { featureRoutes } from "./FeatureRoutes";
import { homeRoutes } from "./HomeRoutes";
import { treatmentPartsRoutes } from "./TreatmentPartsRoutes";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/">
        <Header topPage={true}>
          <Home />
        </Header>
        <Footer />
      </Route>
      <Route
        path="/salon"
        render={({ match: { url } }) => (
          <Switch>
            {homeRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route
        path="/feature"
        render={({ match: { url } }) => (
          <Switch>
            {featureRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route
        path="/clinic"
        render={({ match: { url } }) => (
          <Switch>
            {clinicRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route
        path="/treatment-parts"
        render={({ match: { url } }) => (
          <Switch>
            {treatmentPartsRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route path="*">
        <Header>
          <Page404 />
        </Header>
        <Footer />
      </Route>
    </Switch>
  );
});
