import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { requestProperties } from '../actions/creators';

class Home extends React.Component {
    componentDidMount() {
        this.props.requestProperties();
    }
    render() {
        const data = this.props.properties;
        return (
            <div>
                <Navbar />
                <header className="container__fluid homepage__header">
                    <div className="container">header</div>
                </header>
                <main className="container">
                    {!data ? (
                        <div>Loading...</div>
                    ) : (
                        data.map(property => (
                            <div
                                className="property__card"
                                key={property._id}
                            >
                                <div className="property__card__thumbnail" />
                                <div className="property__card__details">
                                    <span>{property.name}</span>
                                    <span>{property.price}</span>
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({ properties: state.properties });

const mapDispatchToProps = dispatch => ({
    requestProperties: () => dispatch(requestProperties()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
