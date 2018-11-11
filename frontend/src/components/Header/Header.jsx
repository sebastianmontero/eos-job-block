import React from 'react';
import {
    Jumbotron,
    Navbar,
    Nav,
    NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
    <Jumbotron>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    Job Block
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
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
            </Navbar.Collapse>
        </Navbar>
    </Jumbotron>
);

export default Header;
