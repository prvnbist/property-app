export const updateProperty = async payload => {
    try {
        const { id, ...updatedData } = payload;
        const response = await fetch(
            `/api/properties/${payload.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                        'access-token',
                    )}`,
                },
                body: JSON.stringify(updatedData),
            },
        );
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};
