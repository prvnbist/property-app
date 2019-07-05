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
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ color: '#fff' }}>
                                {props.currentUser.name}
                            </span>
                            <Link to="/create">
                                <button
                                    type="button"
                                    className="btn btn__outline"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line
                                                x1="12"
                                                y1="5"
                                                x2="12"
                                                y2="19"
                                            />
                                            <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                            />
                                        </svg>
                                    </span>
                                    <span className="nav__action__text">
                                        Create
                                    </span>
                                </button>
                            </Link>
                            <Link to="/">
                                <button
                                    type="button"
                                    className="btn btn__primary"
                                    onClick={() => props.logout()}
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#ffffff"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
                                        </svg>
                                    </span>
                                    <span className="nav__action__text">
                                        Logout
                                    </span>
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
