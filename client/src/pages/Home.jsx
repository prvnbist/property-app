import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

import { requestProperties } from '../actions/creators';

class Home extends React.Component {
    componentDidMount() {
        this.props.requestProperties();
    }
    render() {
        console.log(this.props.property);
        return (
            <div className="Home">
                <Navbar />
                <div className="container">
                    {/* {this.state.property.map(property => (
                        <span>{property.name}</span>
                    ))} */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ property: state.property });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestProperties }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
