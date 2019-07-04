export const removeProperty = async payload => {
    try {
        const response = await fetch(`/api/properties/${payload}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem(
                    'access-token',
                )}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};
