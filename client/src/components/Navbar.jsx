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
                        <button
                            type="button"
                            className="btn btn__outline btn__dark__bg"
                        >
                            <Link to="/login">Login</Link>
                        </button>
                        <button
                            type="button"
                            className="btn btn__primary"
                        >
                            <Link to="/signup">Signup</Link>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
