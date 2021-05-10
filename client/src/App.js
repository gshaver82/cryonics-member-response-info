import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import privateHomePage from "./pages/privateHomeFolder/privateHomePage";
import memberDashboard from "./pages/memberDashboardFolder/memberDashboard";
import profile from "./pages/profileFolder/profile";
import { AuthProvider } from "./quickstartComponents/Auth";
import PrivateRoute from "./quickstartComponents/PrivateRoute";
import secondPage from "./pages/secondFolder/secondPage";
import publicHomePage from "./pages/publicHomeFolder/publicHomePage";
import "./style.css";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./quickstartComponents/DarkMode/useDarkMode";
import Toggle from "./quickstartComponents/DarkMode/Toggler";
import { GlobalStyles } from "./quickstartComponents/DarkMode/GlobalStyles";
import { lightTheme, darkTheme } from "./quickstartComponents/DarkMode/Theme";
import TOSPage from "./pages/TOSFolder/TOSPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyFolder/PrivacyPolicyPage";

function App() {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    if (!componentMounted) {
        return <div />
    };
    return (
        <ThemeProvider theme={themeMode}>
            <>
                <GlobalStyles />
                <Toggle theme={theme} toggleTheme={toggleTheme} />
                <AuthProvider>
                    <Router>
                        <Switch>
                            <Route exact path="/publicHomePage" component={publicHomePage} />
                            <Route exact path="/TOSPage" component={TOSPage} />
                            <Route exact path="/PrivacyPolicyPage" component={PrivacyPolicyPage} />
                            <Route exact path="/Login" component={Login} />
                            <PrivateRoute exact path="/secondPage" component={secondPage} />
                            <PrivateRoute exact path="/privateHomePage" component={privateHomePage} />
                            <PrivateRoute exact path="/memberDashboard" component={memberDashboard} />
                            <PrivateRoute exact path="/profile" component={profile} />
                            <Route path="/" component={publicHomePage} />
                        </Switch>
                    </Router>
                </AuthProvider>
            </>
        </ThemeProvider>
    );
}
export default App;