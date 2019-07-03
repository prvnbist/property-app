import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

const Home = () => {
    const [properties, setProperties] = React.useState([]);
    React.useEffect(() => {
        const getProperties = async url => {
            const response = await fetch(url);
            const data = await response.json();
            setProperties(data);
            return data;
        };
        getProperties('/api/properties/');
    }, []);
    return (
        <div>
            <Navbar />
            <header className="container__fluid homepage__header">
                <div className="container" />
            </header>
            <main className="container homepage__main">
                {!properties ? (
                    <div>Loading...</div>
                ) : (
                    properties.map(property => (
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
                                                ? property.image
                                                : 'https://via.placeholder.com/300x150'
                                        })`,
                                    }}
                                />
                                <div className="property__card__details">
                                    <div>
                                        <h3>{property.name}</h3>
                                        <span>
                                            by {property.user_id.name}
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
};

export default Home;
