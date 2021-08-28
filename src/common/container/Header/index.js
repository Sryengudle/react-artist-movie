import React, { Component, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, } from 'reactstrap';
import { isUserExist, validateUser } from '../../../utils/users';
import { useHistory } from 'react-router-dom';
// const links = [
//     { href: '/home', text: 'Home' },
//     { href: '/login', text: isUserExist(validateUser()) ? 'LOGIN' : 'LOGOUT' },
// ];

// const createNavItem = ({ href, text, className }) => (
//     <NavItem>
//         <NavLink href={href} className={className}>{text}</NavLink>
//     </NavItem>
// );

const Header = () => {
    const [isOpen, setOpen] = useState(false);
    const history = useHistory()
    const [user, setUser] = useState({})
    useEffect(() => {
        if (validateUser()) {
            setUser(validateUser())
        }
    }, [validateUser()])

    const toggle = () => setOpen(!isOpen);

    const loginLogout = () => {
        if (isUserExist(user)) {
            localStorage.clear();
            history.push('/')
        } else history.push('/login')
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/home">Demo Movies</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {/* {links.map(createNavItem)} */}
                        <NavItem>
                            <NavLink href="/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={loginLogout}>{isUserExist(user) ? 'LOGOUT' : 'LOGIN'}</NavLink>
                        </NavItem>
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );

}

export default Header;
