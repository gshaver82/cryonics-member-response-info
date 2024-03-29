import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import privateHomePage from "./pages/privateHomeFolder/privateHomePage";
import MemberDash from "./pages/memberDashboardFolder/MemberDash";
import profile from "./pages/profileFolder/profile";
import { AuthProvider } from "./quickstartComponents/Auth";
import PrivateRoute from "./quickstartComponents/PrivateRoute";
import secondPage from "./pages/secondFolder/secondPage";
import publicHomePage from "./pages/publicHomeFolder/publicHomePage";
import AutoheartwatchSignup from "./pages/publicHomeFolder/AutoheartwatchSignup";
import "./cssBattery.css";
import "./style.css";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./quickstartComponents/DarkMode/useDarkMode";
import Toggle from "./quickstartComponents/DarkMode/Toggler";
import { GlobalStyles } from "./quickstartComponents/DarkMode/GlobalStyles";
import { lightTheme, darkTheme } from "./quickstartComponents/DarkMode/Theme";
import TOSPage from "./pages/TOSFolder/TOSPage";
import AppPage from "./pages/AppFolder/AppPage";
import AlcorPage from "./pages/AlcorFolder/AlcorPage";
import AppProfileDeletePage from "./pages/AppProfileDelete/AppProfileDeletePage";
import CIPage from "./pages/CIFolder/CIPage";
import ClockfaceCards from "./pages/ClockfaceFolder/ClockfaceCards";
import test from "./pages/TestFolder/test";
import PrivacyPolicyPage from "./pages/PrivacyPolicyFolder/PrivacyPolicyPage";
import NavTabs from "./components/NavTabs";
import ProfileDetails from "./components/ProfileDetails";
import FBAlertClear from "./components/FBAlertClear";

function App() {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    if (!componentMounted) {
        return <div />
    };
    return (
        <Router>
            <div>
                <ThemeProvider theme={themeMode}>
                    <>
                        <GlobalStyles />
                        <Toggle theme={theme} toggleTheme={toggleTheme} />
                        <AuthProvider>

                            <div>
                                <NavTabs />
                                <Switch>
                                    <PrivateRoute path="/test" component={test} />
                                    <Route exact path="/publicHomePage" component={publicHomePage} />
                                    <Route exact path="/TOSPage" component={TOSPage} />
                                    <Route exact path="/App" component={AppPage} />
                                    <Route exact path="/PrivacyPolicyPage" component={PrivacyPolicyPage} />
                                    <Route exact path="/AutoheartwatchSignup" component={AutoheartwatchSignup} />
                                    <Route exact path="/Login" component={Login} />
                                    <Route exact path="/AppProfileDelete" component={AppProfileDeletePage} />
                                    <Route exact path="/AlcorPage" component={AlcorPage} />
                                    <Route exact path="/CIPage" component={CIPage} />
                                    <Route exact path="/ClockfaceCards" component={ClockfaceCards} />
                                    <PrivateRoute exact path="/secondPage" component={secondPage} />
                                    <PrivateRoute exact path="/privateHomePage" component={privateHomePage} />
                                    <PrivateRoute exact path="/MemberDashboard/:_id" component={ProfileDetails} />
                                    <Route exact path="/FBAlertClear/:_id" component={FBAlertClear} />
                                    <PrivateRoute exact path="/MemberDashboard" component={MemberDash} />
                                    <PrivateRoute exact path="/profile" component={profile} />
                                    <Route path="/" component={publicHomePage} />
                                </Switch>
                            </div>
                        </AuthProvider>
                    </>
                </ThemeProvider>
            </div>
        </Router>
    );
}
export default App;