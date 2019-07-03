import React from 'react';

import Navbar from '../components/Navbar';

const Property = props => {
    const [property, setProperty] = React.useState([]);
    React.useEffect(() => {
        const getProperties = async url => {
            const response = await fetch(url);
            const data = await response.json();
            setProperty(data);
            return data;
        };
        getProperties(`/api/properties/${props.match.params.id}`);
    }, []);
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
};

export default Property;
