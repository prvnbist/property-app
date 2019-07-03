export const fetchProperty = async payload => {
    try {
        const response = await fetch(`/api/properties/${payload}`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};
