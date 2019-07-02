import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Navbar from '../components/Navbar';

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
            <div className="container">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            fetch('/api/users/register', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
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
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {touched.name &&
                                errors.name &&
                                errors.name}
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

export default Signup;
