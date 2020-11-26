import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Menu, X, Settings, User, LogOut } from 'react-feather';

import { showRightSidebar } from '../redux/actions';
import ProfileDropdown from './ProfileDropdown';

import logo from '../assets/images/logo.svg';

const ProfileMenus = [
    {
        label: 'My Account',
        icon: User,
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: Settings,
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: LogOut,
        redirectTo: '/account/logout',
        hasDivider: true,
    },
];

class Topbar extends Component {
    constructor(props) {
        super(props);

        this.handleRightSideBar = this.handleRightSideBar.bind(this);
    }

    /**
     * Toggles the right sidebar
     */
    handleRightSideBar = () => {
        this.props.showRightSidebar();
    };

    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
                    <Container fluid>
                        {/* logo */}
                        <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
                            <span className="logo-lg">
                                <img src={logo} alt="Logo lg" height="43" />
                            </span>
                            <span className="logo-sm">
                                <img src={logo} alt="Logo dm" height="43" />
                            </span>
                        </Link>

                        {/* menu*/}
                        <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
                            <li className="">
                                <button
                                    className="button-menu-mobile open-left disable-btn"
                                    onClick={this.props.openLeftMenuCallBack}>
                                    <Menu className="menu-icon" />
                                    <X className="close-icon" />
                                </button>
                            </li>
                        </ul>

                        <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                            <li className="notification-list">
                                <button
                                    className="btn btn-link nav-link right-bar-toggle"
                                    onClick={this.handleRightSideBar}>
                                    <Settings />
                                </button>
                            </li>

                            <ProfileDropdown
                                profilePic={user.image}
                                menuItems={ProfileMenus}
                                username={user.full_name}
                                description={user.role}
                            />
                        </ul>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { showRightSidebar })(Topbar);
