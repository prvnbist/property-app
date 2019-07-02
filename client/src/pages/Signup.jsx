import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { loginRequest } from '../actions/creators';

const Signup = () => {
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Name is too short!')
            .max(50, 'Name is too long!')
            .required('Name is required!'),
        email: Yup.string()
            .email('Please enter a valid email!')
            .required('Email is required!'),
        password: Yup.string()
            .min(8, 'Password is too short!')
            .max(20, 'Password is too long!')
            .matches(
                /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/,
                'Password must have atleast one lowercase letter, one uppercase letter, one digit' +
                    ' and one special character.',
            )
            .required('Password is required!'),
    });
    return (
        <div>
            <Navbar />
            <header className="container__fluid" />
            <div className="container__fluid">
                <div className="container auth__page">
                    <div className="login__illo">
                        <img
                            src="https://res.cloudinary.com/prvnbist/image/upload/v1562069703/Propery-App/form_illo.svg"
                            alt=""
                        />
                    </div>
                    <div className="login__form">
                        <h3>Signup</h3>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                name: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(
                                        JSON.stringify(
                                            values,
                                            null,
                                            2,
                                        ),
                                    );
                                    fetch('/api/users/register', {
                                        method: 'POST',
                                        headers: {
                                            Accept:
                                                'application/json',
                                            'Content-Type':
                                                'application/json',
                                        },
                                        body: JSON.stringify({
                                            name: values.name,
                                            email: values.email,
                                            password: values.password,
                                        }),
                                    })
                                        .then(data =>
                                            console.log(
                                                'Request success: ',
                                                data,
                                            ),
                                        )
                                        .catch(error =>
                                            console.log(
                                                'Request failure: ',
                                                error,
                                            ),
                                        );
                                    setSubmitting(false);
                                }, 400);
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
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && (
                                        <span className="error__message">
                                            {errors.name}
                                        </span>
                                    )}
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {touched.email &&
                                        errors.email && (
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
                                    />
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
                                        Signup
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
