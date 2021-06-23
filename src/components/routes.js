import React from "react"

import { BrowserRouter,Route,Switch, Redirect } from "react-router-dom"

import PrivateRoute from "./privateRoute"


// Pages
import LoginPage from "../pages/loginPage/LoginPage";
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import LandingPage from "../pages/landingPage/LandingPage";
import AboutPage from "../pages/aboutPage/AboutPage";
import PlanosPage from "../pages/plansPage/PlansPage";
import BusinessPage from "../pages/businessPage/BusinessPage";
import PetListPage from "../pages/petsPage/pet-list-page";
import PetFormPage from "../pages/petsPage/pet-form-page";
import AppointmentPage from "../pages/appointmentPage/AppointmentPage";

const routePaths = {
    login: "/login",
    registration: "/registration",
    dashboard: "/dashboard",
    notFound: "/404",
    about: "/nos",
    plans: "/planos",
    businessList: "/rede-referenciada",
    pets: "/pets",
    appointment:"/agendamentos"
  }

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route
                exact
                path="/"
                render={(props) => (
                <LandingPage {...props}/>
                )}
            />
            <Route
                exact
                path={routePaths.about}
                render={(props) => (
                <AboutPage {...props} />
                )}
            />
            <Route
                exact
                path={routePaths.plans}
                render={(props) => (
                <PlanosPage {...props}  />
                )}
            />
            <Route
                exact
                path={routePaths.login}
                render={(props) => (
                <LoginPage
                    {...props}
                    dashboardPath={routePaths.dashboard}
                />
                )}
            />
            <PrivateRoute
                exact
                path={routePaths.dashboard}
                component={DashboardPage}
            />
            <PrivateRoute
                exact
                path={routePaths.appointment}
                component={AppointmentPage}
            />

            <Route
                exact
                path={routePaths.registration}
                render={(props) => (
                <RegistrationPage {...props} />
                )}
            />
            <Route
                exact
                path={routePaths.businessList}
                render={(props) => (
                <BusinessPage {...props}/>
                )}
            />
            <PrivateRoute exact path="/pets" component={PetListPage} />
            <PrivateRoute exact path="/pets/new" component={PetFormPage} />
            <PrivateRoute exact path="/pets/edit/:_id" component={PetFormPage} />
            {/* <PrivateRoute exact path="/agendamentos/new" component={AppointmentFormPage}/> */}
            <Route
                exact
                path={routePaths.notFound}
                component={NotFoundPage}
            />
            <Redirect to={routePaths.notFound} />
        </Switch>
  </BrowserRouter>
);

export default Routes;