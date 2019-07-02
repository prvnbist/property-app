import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="container__fluid">
                <div className="container">
                    <span id="logo">
                        <Link to="/">Fresh Estates</Link>
                    </span>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
