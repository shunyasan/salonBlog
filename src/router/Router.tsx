import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Switch, Route } from "react-router";
import { Page404 } from "../components/pages/error/Page404";
import { Home } from "../components/pages/Home";
import { SearchSalon } from "../components/pages/salon/SearchSalon";
import { Footer } from "../components/templete/Footer";
import { Header } from "../components/templete/Header";
import { ClinicRoutes } from "./ClinicRoutes";
import { featureRoutes } from "./FeatureRoutes";
import { SalonRoutes } from "./SalonRoutes";
import { informationRoutes } from "./InformationRoutes";
import { newsRoutes } from "./NewsRoutes";
import { treatmentPartsRoutes } from "./TreatmentPartsRoutes";
import { Helmet } from "react-helmet";

export const Router: VFC = memo(() => {
  const { clinicRoutes } = ClinicRoutes();
  const { salonRoutes } = SalonRoutes();
  return (
    <Switch>
      <Route exact path="/">
        <Helmet>
          <meta
            name="description"
            content="自分に合った脱毛プランを検索できるサイトです。東京都内の医療脱毛激戦区である「渋谷・恵比寿・新宿・銀座・六本木・池袋」大手から優良小規模まで、ほぼ全てのクリニックから分析したプランをおすすめします。"
          />
          <title>あなたのための脱毛</title>
        </Helmet>
        <Header topPage={true}>
          <Home />
        </Header>
        <Footer />
      </Route>
      <Route
        path="/salon"
        render={({ match: { url } }) => (
          <Switch>
            {salonRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Helmet>
                  <meta name="description" content={route.description} />
                  <title>{route.title}</title>
                </Helmet>
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
                <Helmet>
                  <meta name="description" content={route.description} />
                  <title>{route.title}</title>
                </Helmet>
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
                <Helmet>
                  <meta name="description" content={route.description} />
                  <title>{route.title}</title>
                </Helmet>
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
                <Helmet>
                  <meta name="description" content={route.description} />
                  <title>{route.title}</title>
                </Helmet>
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route
        path="/news"
        render={({ match: { url } }) => (
          <Switch>
            {newsRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Helmet>
                  <meta name="description" content={route.description} />
                  <title>{route.title}</title>
                </Helmet>
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route
        path="/information"
        render={({ match: { url } }) => (
          <Switch>
            {informationRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Helmet>
                  <meta name="description" content={route.description} />
                  <title>{route.title}</title>
                </Helmet>
                <Header>{route.children}</Header>
                <Footer />
              </Route>
            ))}
          </Switch>
        )}
      />
      {/* ページが引っ掛からなかった場合 */}
      <Route path="*">
        <Header>
          <Page404 />
        </Header>
        <Footer />
      </Route>
    </Switch>
  );
});
