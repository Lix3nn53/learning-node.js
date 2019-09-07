import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'Loading';
            case false:
                return <li><a href="/auth/google">Login with google</a></li>;
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                <Link 
                    to={ this.props.auth ? '/surveys' : '/' }
                    className="brand-logo"
                >
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/auth/google">Static</a></li>
                    
                    { this.renderContent() }
                </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);