import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/creators';

const Navbar = props => {
    return (
        <nav>
            <div className="container__fluid">
                <div className="container">
                    <span id="logo">
                        <Link to="/">Fresh Estates</Link>
                    </span>
                    {Object.keys(props.currentUser).length !== 0 ? (
                        <div>
                            <span style={{ color: '#fff' }}>
                                {props.currentUser.name}
                            </span>
                            <Link to="/create">
                                <button
                                    type="button"
                                    className="btn btn__outline"
                                >
                                    Create
                                </button>
                            </Link>
                            <Link to="/">
                                <button
                                    type="button"
                                    className="btn btn__primary"
                                    onClick={() => props.logout()}
                                >
                                    Logout
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="btn btn__outline btn__dark__bg"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button
                                    type="button"
                                    className="btn btn__primary"
                                >
                                    Signup
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({ currentUser: state.currentUser });

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
