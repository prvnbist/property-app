import React from 'react';
import { connect } from 'react-redux';

import { getProperty } from '../actions/creators';

import Navbar from '../components/Navbar';

class Property extends React.Component {
    componentDidMount() {
        this.props.getProperty(this.props.match.params.id);
    }
    render() {
        const { property } = this.props;
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
                                <div>
                                    <h3>{property.name}</h3>
                                    <span>
                                        by
                                        {property.user_id.name}
                                    </span>
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
    }
}

const mapStateToProps = state => ({
    property: state.property,
});

const mapDispatchToProps = dispatch => ({
    getProperty: value => dispatch(getProperty(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Property);
