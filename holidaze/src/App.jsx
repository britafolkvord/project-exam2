import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { Routes } from './constants/Routes';
import Home from './components/home/Home';
import Accommodation from './components/accommodation/Accommodation';
import AccommodationDetails from './components/accommodation/AccommodationDetails';
import Contact from './components/contact/Contact';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Hotels from './components/adminHotels/Hotels';
import AddHotel from './components/admin/AddHotel';
import EditHotel from './components/admin/EditHotel';
import Dashboard from './components/dashboard/Dashboard';
import Enquiries from './components/adminEnquiries/Enquiries';
import Messages from './components/adminMessages/Messages';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Nav';
import Unauthorized from './components/unauthorized/Unauthorized';

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <ProtectedRoute path={Routes.admin.admin}>
                        <Navigation admin={true} />
                        <Container fluid className="adminContainer">
                            <Switch>
                                <Route path={Routes.admin.dashboard} exact component={Dashboard} />
                                <Route path={Routes.admin.enquiries} exact component={Enquiries} />
                                <Route path={Routes.admin.messages} exact component={Messages} />
                                <Route path={Routes.admin.hotels.hotels} exact component={Hotels} />
                                <Route path={Routes.admin.hotels.add} exact component={AddHotel} />
                                <Route path={`${Routes.admin.hotels.edit}/:id`} exact component={EditHotel} />
                            </Switch>
                            <Footer admin={true} />
                        </Container>
                    </ProtectedRoute>

                    <Route path={Routes.home}>
                        <Navigation />
                        <Container fluid>
                            <Route path={Routes.home} exact component={Home} />
                            <Route path={Routes.accommodation.accommodation} exact component={Accommodation} />
                            <Route
                                path={`${Routes.accommodation.accommodation}/:id`}
                                component={AccommodationDetails}
                            />
                            <Route path={Routes.contact} component={Contact} />
                            <Route path={Routes.login} component={Login} />
                            <Route path={Routes.register} component={Register} />
                            <Route path={Routes.unauthorized} component={Unauthorized} />
                        </Container>
                        <Footer />
                    </Route>
                    <Redirect to={Routes.home} />
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
