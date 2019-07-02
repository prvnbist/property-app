import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { login } from '../actions/creators';

const Login = props => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email!')
            .required('Email is required!'),
        password: Yup.string().required('Password is required!'),
    });
    return (
        <div>
            <Navbar />
            <div className="container">
                <Formik
                    initialValues={{
                        email: 'prvnbist@gmail.com',
                        password: 'xLr8e47@',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            props.login(values);
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
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {touched.email &&
                                errors.email &&
                                errors.email}
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {touched.password &&
                                errors.password &&
                                errors.password}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    login: value => dispatch(login(value)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Login);
