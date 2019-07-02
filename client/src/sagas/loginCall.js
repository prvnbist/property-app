const loginCall = async ({ payload }) => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
            }),
        });
        const data = await response.json();
        return data.token.split(' ')[1];
    } catch (e) {
        console.log(e);
    }
};

export default loginCall;
