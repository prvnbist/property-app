import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { editProperty, clearMessages } from '../actions/creators';

const EditProperty = props => {
    const [property, setProperty] = React.useState({});
    React.useEffect(() => {
        const getProperties = async url => {
            const response = await fetch(url);
            const data = await response.json();
            setProperty(data);
            return data;
        };
        getProperties(`/api/properties/${props.match.params.id}`);
    }, [props.match.params.id]);
    const CreateSchema = Yup.object().shape({
        name: Yup.string().required('Property name is required!'),
        location: Yup.string().required('Address is required!'),
        amenities: Yup.string().required('Amenties is required!'),
        price: Yup.number()
            .typeError('Price must be a number!')
            .required('Price is required!'),
    });
    return (
        <div>
            <Navbar />
            <header className="container__fluid homepage__header" />
            <main className="container">
                <div className="auth__page">
                    <div className="login__illo">
                        <img
                            src="https://res.cloudinary.com/prvnbist/image/upload/v1562069703/Propery-App/form_illo.svg"
                            alt=""
                        />
                    </div>
                    <div className="login__form">
                        <h3>Edit Property</h3>
                        {props.propertyMessages && (
                            <span className="success__message">
                                {props.propertyMessages.message}
                            </span>
                        )}
                        {Object.keys(property).length === 0 ? (
                            <div>Loading...</div>
                        ) : (
                            <Formik
                                initialValues={{
                                    name: property.name,
                                    price: property.price,
                                    location: property.location,
                                    amenities: property.specs,
                                }}
                                validationSchema={CreateSchema}
                                onSubmit={(
                                    values,
                                    { setSubmitting },
                                ) => {
                                    const updatedData = {
                                        id: property._id,
                                        ...(values.name !==
                                            property.name && {
                                            name: values.name,
                                        }),
                                        ...(values.price !==
                                            property.price && {
                                            price: values.price,
                                        }),
                                        ...(values.amenities !==
                                            property.specs && {
                                            specs: values.amenities,
                                        }),
                                        ...(values.location !==
                                            property.location && {
                                            location: values.location,
                                        }),
                                    };
                                    props.editProperty(updatedData);
                                    setTimeout(() => {
                                        props.clearMessages();
                                        setSubmitting(false);
                                    }, 3000);
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
                                        <label htmlFor="name">
                                            Property Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter the name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {touched.name &&
                                            errors.name && (
                                                <span className="error__message">
                                                    {errors.name}
                                                </span>
                                            )}
                                        <label htmlFor="price">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            placeholder="Enter the price in LPA"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price}
                                        />
                                        {touched.price &&
                                            errors.price && (
                                                <span className="error__message">
                                                    {errors.price}
                                                </span>
                                            )}
                                        <label htmlFor="location">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder="Enter the address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.location}
                                        />
                                        {touched.location &&
                                            errors.location && (
                                                <span className="error__message">
                                                    {errors.location}
                                                </span>
                                            )}
                                        <label htmlFor="amenities">
                                            Amenities
                                        </label>
                                        <input
                                            type="text"
                                            name="amenities"
                                            id="amenities"
                                            placeholder="Enter comma separated amenities"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.amenities}
                                        />
                                        {touched.amenities &&
                                            errors.amenities && (
                                                <span className="error__message">
                                                    {errors.amenities}
                                                </span>
                                            )}
                                        <button
                                            type="submit"
                                            className="btn btn__primary"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

const mapStateToProps = state => ({
    propertyMessages: state.propertyMessages,
});

const mapDispatchToProps = dispatch => ({
    editProperty: value => dispatch(editProperty(value)),
    clearMessages: () => dispatch(clearMessages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditProperty);
