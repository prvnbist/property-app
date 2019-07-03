import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

import { fetchProperties } from '../actions/creators';

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchProperties();
    }
    render() {
        const data = this.props.properties;
        return (
            <div>
                <Navbar />
                <header className="container__fluid homepage__header">
                    <div className="container">header</div>
                </header>
                <main className="container homepage__main">
                    {!data ? (
                        <div>Loading...</div>
                    ) : (
                        data.map(property => (
                            <Link
                                to={`properties/${property._id}`}
                                key={property._id}
                            >
                                <div className="property__card">
                                    <div
                                        className="property__card__thumbnail"
                                        style={{
                                            backgroundImage: `url(${
                                                property.image
                                            })`,
                                        }}
                                    />
                                    <div className="property__card__details">
                                        <div>
                                            <h3>{property.name}</h3>
                                            <span>
                                                by{' '}
                                                {
                                                    property.user_id
                                                        .name
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <h3>{property.specs}</h3>
                                            <span>
                                                {property.location}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="property__card__details__price">
                                                {`₹ ${
                                                    property.price
                                                } LPA`}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({ properties: state.properties });

const mapDispatchToProps = dispatch => ({
    fetchProperties: () => dispatch(fetchProperties()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
