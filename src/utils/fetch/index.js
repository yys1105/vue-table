import axios from 'axios';
import storejs from 'storejs';
import moduleEvent from '@/event/moduleEvent';

var instanceAxios = axios.create()
instanceAxios.interceptors.request.use(
    function (config) {
        config.headers['token'] = storejs("token");
        return config
    },
    function (error) {
        moduleEvent.$emit("errorNetWork", '网络异常');
        return Promise.reject(error)
    },
)
instanceAxios.interceptors.response.use(
    function (response) {
        let resData = response.data;
        moduleEvent.$emit('moduleload', false);

        if (resData.code == 200) return resData
        else {
            moduleEvent.$emit("errorNetWork", resData.message);
            moduleEvent.$emit('actionload', false)
            return Promise.reject(response);
        }

    },
    function (error) {
        moduleEvent.$emit("errorNetWork", error.message);
        moduleEvent.$emit('moduleload', false);
        return Promise.reject(error)
    },
)

instanceAxios.defaults.withCredentials = true
instanceAxios.defaults.timeout = 115000

const TOKEN = 'token';

const http = {
    post: function (action, params = {}) {
        // let token = storejs("token");
        // let formData = params;
        // if (!(params instanceof FormData)) {
        //     formData = new FormData();
        //     for (let key of Object.keys(params)) {
        //         formData.append(key, params[key] !== null ? params[key] : '')
        //     }
        // }!formData[TOKEN] && token && formData.append(TOKEN, token);
        return instanceAxios
            .post(action, formData)
            .then(function (response) {
                return response
            })
    },
    get: function (action, params = {}) {
        // let token = storejs("token");
        // !params[TOKEN] && token && Object.assign(params, {
        //     [TOKEN]: token
        // });
        return instanceAxios
            .get(action, {
                params
            })
            .then(function (response) {
                return response
            })
    },
    put: function (action, params = {}) {
        // if (storejs("?key")) params.token = storejs("token");
        return instanceAxios
            .put(action, params)
            .then(function (response) {
                return response
            })
    },
    delete: function (action, params = {}) {
        // if (storejs("?key")) params.token = storejs("token");
        return instanceAxios
            .delete(action, {
                params
            })
            .then(function (response) {
                return response
            })
    }
}

export default http