import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EditeAdForm from './components/EditeAdForm.jsx';
import Home from "./pages/Home.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateAdPage from "./pages/CreateAdPage.jsx";
import AdListPage from "./pages/AdListPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { toggleTheme } from "./redux/actions.js";
import Footer from "./components/Footer.jsx";


const App = () => {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const darkTheme = useSelector(state => state.darkTheme);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <BrowserRouter>
            <Button className="theme-toggle-btn" variant={darkTheme ? 'light' : 'dark'} onClick={handleToggleTheme}>
                {darkTheme ? 'Light Theme' : 'Dark Theme'}
            </Button>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                {token ? (
                    <>
                        <Route path="/createAd" element={<CreateAdPage />} />
                        <Route path="/adList" element={<AdListPage />} />
                        <Route path="/ads/:id/edit" element={<EditeAdForm />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;
