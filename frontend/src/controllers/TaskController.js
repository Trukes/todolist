
import apiConnect from "../services/api.connect";

const taskController = {
    createTask: function (params, cb) {
        apiConnect.post(
            '/tasks',
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
    getAllTasks: function (cb) {
        apiConnect.get(
            '/tasks',
            (response) => { // get response
                cb(response);
            }
        )
    },
    updateTask: function (id, params, cb) {
        apiConnect.put(
            `/tasks/${id}`,
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
    deleteTask: function (projectId, params, cb) {
        apiConnect.delete(
            `/tasks/${projectId}`,
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
    changeStatusTask: function (projectId, params, cb) {
        params = {
            ...params
        }
        apiConnect.put(
            `/tasks/${projectId}`,
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
}


export default taskController;