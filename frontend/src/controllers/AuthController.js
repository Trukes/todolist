
import apiConnect from "../services/api.connect";

const authController = {
    register: function (params, cb) {
        apiConnect.post(
            '/register',
            {
                "username": params.username,
                "password": params.password,
                "name": params.name
            },
            (response) => { // get response
                cb(response);
            }
        )
    },
    login: function(params, cb) {
        apiConnect.post(
            '/auth/login',
            {
                username: params.username,
                password: params.password
            },
            (response) => {
                if(response.status === "OK"){
                    let token = response.payload.token;
                    localStorage._token_ = token;
                                
                    localStorage.userdata = JSON.stringify(response.payload.userdata);

                    return cb(response);
                } else {
                    return cb(response);
                }
            }
        )
    },
    logout: function(cb) {
        apiConnect.post(
            '/auth/logout',
            {},
            (response) => {
                localStorage._token_ = '';
                if(response.status === "OK"){
                    return cb(response);
                } else {
                    return cb(response);
                }
            }
        )
    },
    getUserFullName: function () {
        return JSON.parse(localStorage.userdata).name;
    },
}


export default authController;