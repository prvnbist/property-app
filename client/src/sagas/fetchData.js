export const fetchData = async () => {
    try {
        const response = await fetch('/api/properties/');
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};
