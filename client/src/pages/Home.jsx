import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

const Home = props => {
    const [properties, setProperties] = React.useState([]);
    const [query, setQuery] = React.useState({
        minPrice: '',
        maxPrice: '',
        limit: '',
        sort: '',
    });
    React.useEffect(() => {
        const getProperties = async url => {
            const response = await fetch(url);
            const data = await response.json();
            setProperties(data);
            return data;
        };
        getProperties(`/api/properties/${props.location.search}`);
    }, [props.location.search]);
    const applyFilters = () => {
        props.history.push({
            pathname: '/',
            search: objectToQuerystring(query),
        });
    };
    const clearFilter = () => {
        setQuery({
            minPrice: '',
            maxPrice: '',
            limit: '',
            sortByPrice: '',
        });
        props.history.push({
            pathname: '/',
            search: '',
        });
    };
    const objectToQuerystring = obj => {
        return Object.keys(obj)
            .filter(i => obj[i] !== '')
            .reduce(function(str, key, i) {
                const delimiter = i === 0 ? '?' : '&';
                key = encodeURIComponent(key);
                const val = encodeURIComponent(obj[key]);
                return [str, delimiter, key, '=', val].join('');
            }, '');
    };
    return (
        <div>
            <Navbar />
            <header className="container__fluid homepage__header">
                <div id="query" className="container">
                    <div id="filter__by__price">
                        <label>Filter By Price(In Lakhs)</label>
                        <div>
                            <input
                                type="number"
                                name="minprice"
                                placeholder="Enter min. price"
                                value={query.minPrice}
                                onChange={e =>
                                    setQuery({
                                        ...query,
                                        minPrice: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="number"
                                name="maxprice"
                                placeholder="Enter max. price"
                                value={query.maxPrice}
                                onChange={e =>
                                    setQuery({
                                        ...query,
                                        maxPrice: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div id="sort__by__price">
                        <label htmlFor="sort">Sort By Price</label>
                        <select
                            name="sort"
                            id="sort"
                            onChange={e =>
                                setQuery({
                                    ...query,
                                    sortByPrice: e.target.value,
                                })
                            }
                        >
                            <option value="">Select order</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div id="apply__filters">
                        <button
                            type="button"
                            className="btn btn__primary"
                            onClick={() => applyFilters()}
                        >
                            Apply
                        </button>
                        <button
                            className="btn btn__outline"
                            onClick={() => clearFilter()}
                        >
                            Clear
                        </button>
                    </div>
                </div>
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
                                            property.images
                                                ? property.images[0]
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
                                            } Lakhs`}
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
