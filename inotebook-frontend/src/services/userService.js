export const createUser = async (user) => {
    try{
        if(user.email === '' || user.password === '' || user.name === '') return null;
        var response = await fetch('http://localhost:3001/api/auth/create-user',{
            method: 'POST',
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json();
        return data.authToken;
    }
    catch(error){
        console.log(error);
    }
}

export const getUserDetails = async(jwtToken) => {
    try{
        var response = await fetch('http://localhost:3001/api/auth/get-user-details',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'jwt-token': jwtToken
            },
        })
        const data = await response.json();
        return data.user;
    }
    catch(error){

    }
}

export const loginUser = async(user) => {
    try{
        const response = await fetch('http://localhost:3001/api/auth/login',{
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                password: user.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const status = await response.status;
        console.log(status);
        const data = await response.json();
        return {authToken : data.authToken, id: data.id, status: status};
    }
    catch(error){
        console.log(error);
    }
}