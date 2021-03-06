
import apiConnect from "../services/api.connect";

const projectController = {
    createProject: function (params, cb) {
        apiConnect.post(
            '/projects',
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
    getAllProjects: function (cb) {
        apiConnect.get(
            '/projects',
            (response) => { // get response
                cb(response);
            }
        )
    },
    updateProject: function (id, params, cb) {
        apiConnect.put(
            `/projects/${id}`,
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
    deleteProject: function (projectId, params, cb) {
        apiConnect.delete(
            `/projects/${projectId}`,
            params,
            (response) => { // get response
                cb(response);
            }
        )
    },
}


export default projectController;