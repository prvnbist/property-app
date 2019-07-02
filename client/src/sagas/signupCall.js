const signUpCall = async ({ payload }) => {
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
                password: payload.password,
            }),
        });
        const data = await response.json();
        console.log('TCL: signUpCall -> data', data);
        return '';
    } catch (e) {
        console.log(e);
    }
};
export default signUpCall;