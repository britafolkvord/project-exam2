import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
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
import AdminFooter from './components/layout/admin/adminFooter';
import PublicFooter from './components/layout/public/publicFooter';
import Navigation from './components/layout/Nav';

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <ProtectedRoute path="/admin">
                        <Navigation admin={true} />
                        <Container fluid className="adminContainer">
                            <Switch>
                                <Route path="/admin/dashboard" exact component={Dashboard} />
                                <Route path="/admin/adminEnquiries/enquiries" exact component={Enquiries} />
                                <Route path="/admin/adminMessages/messages" exact component={Messages} />
                                <Route path="/admin/adminHotels/hotels" exact component={Hotels} />
                                <Route path="/admin/hotels/add" exact component={AddHotel} />
                                <Route path="/admin/hotels/edit/:id" exact component={EditHotel} />
                            </Switch>
                            <AdminFooter admin={true} />
                        </Container>
                    </ProtectedRoute>

                    <Route path="/">
                        <Navigation />
                        <Container fluid>
                            <Route path="/" exact component={Home} />
                            <Route path="/accommodation" exact component={Accommodation} />
                            <Route path="/accommodation/:id" component={AccommodationDetails} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                        </Container>
                        <PublicFooter />
                    </Route>

                    <Redirect to="/" />
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
