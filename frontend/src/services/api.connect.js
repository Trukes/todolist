import axios from "axios";
import constants from "../config/constants";

const apiConnect = {
    post: function (url, params, cb) {
        let token;

        try {
            token = localStorage._token_;
        }catch(e){
            console.log("empty token");
        }

        axios.post(
            `${constants.API_URL}${url}`,
            params,
            {
                headers: {
                    'x-access-token': token
                }
            },
        ).then(
        function(data) {
            cb(data.data);
        },
        function(error){
            cb({status: "NOK", payload: error, message: "Auth expired or wrong token"});
        });
    },
    get: function(url, cb) {

        let token;

        try {
            token = localStorage._token_;
        }catch(e){
            console.log("empty token");
        }

        axios.get(
            `${constants.API_URL}${url}`,
            {
                headers: {
                    'x-access-token': token
                }
            },
        ).then(
        function(data) {
            cb(data.data);
        },
        function(error){
            cb({status: "NOK", payload: error, message: "Auth expired or wrong token"});
        });
    },
    put: function (url, params, cb) {
        let token;

        try {
            token = localStorage._token_;
        }catch(e){
            console.log("empty token");
        }

        axios.put(
            `${constants.API_URL}${url}`,
            params,
            {
                headers: {
                    'x-access-token': token
                }
            },
        ).then(
        function(data) {
            cb(data.data);
        },
        function(error){
            cb({status: "NOK", payload: error, message: "Auth expired or wrong token"});
        });
    },    
    delete: function (url, params, cb) {
        let token;

        try {
            token = localStorage._token_;
        }catch(e){
            console.log("empty token");
        }

        axios.delete(
            `${constants.API_URL}${url}`,
            {
                headers: {
                    'x-access-token': token
                },
                data: params
            }
        ).then(
        function(data) {
            cb(data.data);
        },
        function(error){
            cb({status: "NOK", payload: error, message: "Auth expired or wrong token"});
        });
    },    
}

export default apiConnect