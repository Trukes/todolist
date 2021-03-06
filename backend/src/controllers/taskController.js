const { isValidObjectId } = require("mongoose");
const { Task, Project } = require("../models/models");


/**
 * create tasks associated to user
 * @param {*} req title needed
 * @param {*} res 
 */
exports.createTask = async (req, res) => {

    let userAuth = req.userAuth;
    let data = req.body;
    data.task_owner = userAuth._id;
    let projectId = req.body.projectId;

    if(projectId === undefined || !isValidObjectId(projectId))
        return res.status(200).send({status: "NOK", payload: [], message: "Internal Error: Project Id not provided or invalid."});
    
    try{
        let task = await Task.create(data);   
        let project = await Project.findOneAndUpdate(
            { _id: projectId, project_owner: userAuth._id },
            {
                $push: {
                    tasks: task._id
                }
            },
            { new: true, useFindAndModify: false }
        );

        if(project === null || project.length === 0){
            // DELETE TASK
            await Task.findByIdAndDelete(task._id);           
            return res.status(200).send({status: "NOK", payload: [], message: "Internal Error: unable to find project."});
        }
        
        return res.status(200).send({status: "OK", payload: { project: project, task: task }, message: `Task ${task.title} created successufully`});
    } catch(e){
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to create task."});
    }    
};
/**
 * Get all tasks from user
 * @param {*} req 
 * @param {*} res 
 */
exports.findUserTasks = async (req, res) => {

    let userAuth = req.userAuth;    // let data = req.body;

    // if(projectId === undefined || !isValidObjectId(projectId))
    //     return res.status(200).send({status: "NOK", payload: [], message: "Internal Error: Project Id not provided or invalid."});

    try {
        let task = await Task.find({task_owner: userAuth._id});
        return res.status(200).send({status: "OK", payload: { task: task }, message: "Data retrieved successfully"});
    } catch (e){
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to find tasks."});
    }
    
};
/**
 * Get task by id from user
 * @param {*} req 
 * @param {*} res 
 */
exports.findUserTaskById = async (req, res) => {
    
    let userAuth = req.userAuth;
    let taskId = req.params.id;
    
    try {
        let task = await Task.findOne({_id: taskId, task_owner: userAuth._id});
        if(task.length === 0)
            return res.status(200).send({status: "OK", payload: { task: [] }, message: "Data retrieved successfully"});
        
        return res.status(200).send({status: "OK", payload: {task: task}, message: "Data retrieved successfully"});
    } catch (e) {
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to find task."});
    }
};
/**
 * update task by id from user
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUserTask = async (req, res) => {

    let userAuth = req.userAuth;
    let taskId = req.params.id;
    let data = req.body;

    // TODO :: validation
    // validation to allow only fields like
    // title and status

    // Se for status para false
    // atualizar o closed_at
    if(data.status){
        data.closed_at = Date.now();
    }

    try {
        let task = await Task.findOneAndUpdate(
            {_id: taskId, task_owner: userAuth._id}, 
            { $set: data },
            { new: true, runValidators: true }
        );
        if(!task)
            return res.status(200).send({status: "NOK", payload: [], message: "Internal Error: task not found"});

        return res.status(200).send({status: "OK", payload: { task: task }, message: "Task updated successfully"});
    } catch (e) {
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to update task."});
    }  
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteUserTask = async (req, res) => {
    
    let userAuth = req.userAuth;
    let data = req.body;
    data.task_owner = userAuth._id;
    let projectId = req.body.projectId;
    let taskId = req.params.id;

    if(projectId === undefined || !isValidObjectId(projectId))
        return res.status(200).send({status: "NOK", payload: [], message: "Internal Error: Project Id not provided or invalid."});
    
    try{
        let task = await Task.findOneAndDelete({_id: taskId, task_owner: userAuth._id});
        let project = await Project.findOneAndUpdate(
            { _id: projectId, project_owner: userAuth._id },
            {
                $pull: {
                    tasks: task._id
                }
            },
            { new: true, useFindAndModify: false }
        );
        return res.status(200).send({status: "OK", payload: { project: project }, message: "Data retrieved successfully"});
    } catch(e){
        console.log(e);
        return res.status(200).send({status: "NOK", payload: e, message: "Internal Error: unable to delete task."});
    }    
};



