const { Project } = require("../models/models");


/**
 * create projects associated to user
 * @param {*} req title needed
 * @param {*} res 
 */
exports.createProject = async (req, res) => {

    let userAuth = req.userAuth;
    let data = req.body;
    data.project_owner = userAuth._id;
    try{
        let project = await Project.create(data);
        return res.status(200).send({status: "OK", payload: { project: project }, message: `Project ${project.title} created successfully`});
    } catch(e){
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to create project."});
    }    
};
/**
 * Get all projects from user
 * @param {*} req 
 * @param {*} res 
 */
exports.findUserProjects = async (req, res) => {

    let userAuth = req.userAuth;    // let data = req.body;
    try {
        let project = await Project.find({project_owner: userAuth._id})
            .populate("tasks", "_id title created_at updated_at closed_at status");
        return res.status(200).send({status: "OK", payload: { project: project }, message: `Data retrieved successfully`});
    } catch (e){
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to find projects."});
    }
    
};
/**
 * Get project by id from user
 * @param {*} req 
 * @param {*} res 
 */
exports.findUserProjectById = async (req, res) => {
    
    let userAuth = req.userAuth;
    let projectId = req.params.id;
    
    try {
        let project = await Project.findOne({_id: projectId, project_owner: userAuth._id})
            .populate("tasks", "_id title created_at updated_at closed_at status");
        if(project.length === 0)
            return res.status(200).send({status: "OK", payload: { project: [] }, message: "Data retrieved successfully"});
        
        return res.status(200).send({status: "OK", payload: {project: project}, message: "Data retrieved successfully"});
    } catch (e) {
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to find project."});
    }
};
/**
 * update project by id from user
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUserProject = async (req, res) => {

    let userAuth = req.userAuth;
    let projectId = req.params.id;

    try {
        let project = await Project.findOneAndUpdate(
            {_id: projectId, project_owner: userAuth._id}, 
            {title: req.body.title},
            { new: true, runValidators: true }
        );
        if(!project)
            return res.status(200).send({status: "NOK", payload: [], message: "Internal Error: project not found"});

        return res.status(200).send({status: "OK", payload: { project: project }, message: `Project ${project.title} updated successfully`});
    } catch (e) {
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to update project."});
    }  
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteUserProject = async (req, res) => {
    let userAuth = req.userAuth;
    let projectId = req.params.id;

    try {
        let project = await Project.findOneAndDelete({_id: projectId, project_owner: userAuth._id});
        return res.status(200).send({status: "OK", payload: [], message: `Project ${project.title} deleted successfully.`});        
    } catch (e) {
        return res.status(200).send({status: "NOK", payload: e, message:"Internal Error: unable to delete project."});
    }
};



