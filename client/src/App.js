import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import exampleHomePage from "./pages/exampleHomeFolder/exampleHomePage";
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

function App() {
    const [theme, toggleTheme, componentMounted] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!componentMounted) {
        return <div />
    };


    return (

        <ThemeProvider theme={themeMode}>
        <>
        <GlobalStyles/>
            <Toggle theme={theme} toggleTheme={toggleTheme} />

        
        <AuthProvider>
            <Router>
                <Switch>
                    
                    <Route exact path="/secondPage" component={secondPage} />
                    <Route exact path="/Login" component={Login} />
                    <Route path="/publicHomePage" component={publicHomePage} />
                    <PrivateRoute exact path="/publicHomePage" component={publicHomePage} /> 
                    <PrivateRoute exact path="/exampleHomePage" component={exampleHomePage} />                    
                    <Route path="/" component={publicHomePage} />
                </Switch>
            </Router>
        </AuthProvider>

        </>
        </ThemeProvider>
    );
}

export default App;