import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { loginRequest } from '../actions/creators';

const Login = props => {
    const [errors, setErrors] = React.useState('');
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email!')
            .required('Email is required!'),
        password: Yup.string().required('Password is required!'),
    });
    return (
        <div>
            <Navbar />
            <header className="container__fluid homepage__header" />
            <div className="container auth__page">
                <div className="login__illo">
                    <img
                        src="https://res.cloudinary.com/prvnbist/image/upload/v1562069703/Propery-App/form_illo.svg"
                        alt=""
                    />
                </div>
                <div className="login__form">
                    <h3>Login</h3>
                    {errors && (
                        <span className="error__message">
                            {errors}
                        </span>
                    )}
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(
                            values,
                            { setSubmitting, resetForm },
                        ) => {
                            props.loginRequest(values);
                            setTimeout(() => {
                                if (props.errors.message) {
                                    setErrors(props.errors.message);
                                    resetForm();
                                } else {
                                    props.history.push('/');
                                }
                                setSubmitting(false);
                            }, 500);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />{' '}
                                {touched.email && errors.email && (
                                    <span className="error__message">
                                        {errors.email}
                                    </span>
                                )}
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />{' '}
                                {touched.password &&
                                    errors.password && (
                                        <span className="error__message">
                                            {errors.password}
                                        </span>
                                    )}
                                <button
                                    type="submit"
                                    className="btn btn__primary"
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
    loginRequest: value => dispatch(loginRequest(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
