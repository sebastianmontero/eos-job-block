import React from 'react';
import {
    Jumbotron,
    Navbar,
    Nav,
    NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = (props) => {
    const isContractor = window.location.href.endsWith('/posted-jobs');
    let links = '';
    if (isContractor) {
        links = (
            <Nav pullRight>
                <LinkContainer exact to="/">
                    <NavItem>
                        Home
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/posted-jobs">
                    <NavItem>
                        Posted Jobs
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    } else {
        links = (
            <Nav pullRight>
                <LinkContainer exact to="/">
                    <NavItem>
                        Home
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/post-job">
                    <NavItem>
                        Post Job
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/my-posted-jobs">
                    <NavItem>
                        My Posted Jobs
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    }

    return (
        <Jumbotron>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Job Block
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {links}
                </Navbar.Collapse>
            </Navbar>
        </Jumbotron>
    );
};

export default Header;
