import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

import { deleteProperty } from '../actions/creators';

const Property = props => {
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
    return (
        <div>
            <Navbar />
            <header className="container__fluid homepage__header" />
            <main
                id="property__page"
                className="container homepage__main"
            >
                {Object.keys(property).length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    <div className="property__card">
                        <div
                            className="property__card__thumbnail"
                            style={{
                                backgroundImage: `url(${
                                    property.image
                                        ? property.image
                                        : 'https://via.placeholder.com/1500x200'
                                })`,
                            }}
                        />
                        <div className="property__card__details">
                            <div id="top__row">
                                <div>
                                    <h3>{property.name}</h3>
                                    <span>
                                        by
                                        {property.user_id.name}
                                    </span>
                                </div>
                                <div>
                                    {props.currentUser.id ===
                                    property.user_id._id ? (
                                        <React.Fragment>
                                            <Link
                                                to={`/edit/${
                                                    property._id
                                                }`}
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn__primary"
                                                >
                                                    Edit
                                                </button>
                                            </Link>
                                            <Link to="/">
                                                <button
                                                    type="button"
                                                    className="btn btn__outline__light"
                                                    style={{
                                                        marginLeft:
                                                            '16px',
                                                    }}
                                                    onClick={() =>
                                                        props.deleteProperty(
                                                            property._id,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </Link>
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            </div>
                            <div>
                                <h3>{property.specs}</h3>
                                <span>{property.location}</span>
                            </div>
                            <div>
                                <h3 className="property__card__details__price">
                                    {`₹ ${property.price} LPA`}
                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const mapStateToProps = state => ({ currentUser: state.currentUser });
const mapDispatchToProps = dispatch => ({
    deleteProperty: id => dispatch(deleteProperty(id)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Property);
