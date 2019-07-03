export const makeProperty = async payload => {
    try {
        const response = await fetch('/api/properties/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem(
                    'access-token',
                )}`,
            },
            body: JSON.stringify({
                name: payload.name,
                price: payload.price,
                location: payload.location,
                specs: payload.amenities,
            }),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};
