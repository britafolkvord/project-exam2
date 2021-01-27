import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Home from './components/home/Home';
import Accommodation from './components/accommodation/Accommodation';
import AccommodationDetails from './components/accommodation/AccommodationDetails';
import Contact from './components/contact/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Hotels from './components/admin/Hotels';
import AddHotel from './components/admin/AddHotel';
import EditHotel from './components/admin/EditHotel';
import Dashboard from './components/admin/Dashboard';
import Navigation from './components/layout/Nav';
import Enquiries from './components/adminEnquiries/Enquiries';
import Messages from './components/adminMessages/Messages';
import PageFooter from './components/layout/Footer';

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Navigation />
                <Container fluid>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/accommodation" exact component={Accommodation} />
                        <Route path="/accommodation/:id" component={AccommodationDetails} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <ProtectedRoute path="/admin" exact component={Dashboard} />
                        <ProtectedRoute path="/adminEnquiries/Enquiries" exact component={Enquiries} />
                        <ProtectedRoute path="/adminMessages/Messages" exact component={Messages} />
                        <ProtectedRoute path="/admin/hotels" exact component={Hotels} />
                        <ProtectedRoute path="/admin/hotels/add" exact component={AddHotel} />
                        <ProtectedRoute path="/admin/hotels/edit/:id" exact component={EditHotel} />
                        <Redirect to="/" />
                    </Switch>
                </Container>
                <PageFooter />
            </Router>
        </AuthContextProvider>
    );
}

export default App;
