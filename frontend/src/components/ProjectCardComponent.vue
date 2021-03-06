<template>

            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg">

                <!-- <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
                </a> -->

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                        <input v-on:keyup.enter="updateProject" class="no-underline hover:underline text-black" v-model="project.title" />
                    </h1>
                    <p class="text-grey-darker text-sm">
                        <!-- <button class="bg-indigo-600 text-white p-2 m-1 rounded shadow-md">Edit</button> -->
                        <button class="bg-red-600 text-white p-2 m-1 rounded shadow-md" @click="deleteProject">
                            <svg class="block h-6 w-6 s-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </p>
                </header>
                <hr />
                <TaskCardComponent :taskProp="tasksNotDone" @changeStatusTask="changeStatusTask" @deleteTask="deleteTask" @updateTask="updateTask" />
                <hr />
                <TaskCardComponent :taskProp="tasksDone" />

                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <form class="w-full" @submit.prevent="submit">                        
                    <!-- <a class="flex items-center no-underline hover:underline text-black" href="#"> -->
                        <!-- <p class="ml-2 text-sm"> -->
                            <input v-on:keyup.enter="createTask" v-model="task_input" class="w-full shadow-md p-3" placeholder="What you have to do?" />
                        <!-- </p> -->
                    <!-- </a> -->
                    </form>
                    <!-- <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
                        <span class="hidden">Like</span>
                        <i class="fa fa-heart"></i>
                    </a> -->
                </footer>

            </article>
            <!-- END Article -->

</template>
<script>
import projectController from "../controllers/ProjectController";
import taskController from "../controllers/TaskController";

import TaskCardComponent from "../components/TaskCardComponent"
import moment from "moment";

export default {
  name: 'ProjectCardComponent',
  components: {
      TaskCardComponent
  },
  props: {
    project: Object
  },
  data: function () {
    return {
        moment : moment,
        task_input: '',
        instanceToast: {}
    }  
  },
  computed: {
     tasksNotDone: function() {
       return this.project.tasks.filter(function(task) {
         return !task.status
     });
    },
    tasksDone: function() {
       return this.project.tasks.filter(function(task) {
         return task.status
     });
    },
  },
  methods: {
      submit: function() {
        console.log('submit');  
      },
      createTask: function() {
        this.$Progress.start();
        var self = this;

        taskController.createTask(
            {
                "title": this.task_input,
                "projectId": this.project._id
            },
            function(data) {               
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.task_input = '';
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );
      },
      updateTask: function(id, title) {
        this.$Progress.start();
        var self = this;

        taskController.updateTask(
            id,
            {
                "title": title,
            },
            function(data) {
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );
      },
      deleteTask: function(id) {
        this.$Progress.start();
        var self = this;

        taskController.deleteTask(
            id,
            {
                "projectId": this.project._id
            },
            function(data) {
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.task_input = '';
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );
      },
      changeStatusTask: function(id, status) {
        this.$Progress.start();
        var self = this;

        taskController.changeStatusTask(
            id,
            {
                "projectId": this.project._id,
                "status": !status
            },
            function(data) {
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.task_input = '';
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );
      },
      updateProject: function() {
        this.$Progress.start();
        var self = this;

        projectController.updateProject(
            this.project._id,
            {
                "title": this.project.title,
            },
            function(data) {
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );
      },      
      deleteProject: function() {
        this.$Progress.start();
        var self = this;

        projectController.deleteProject(
            this.project._id,
            {},
            function(data) {
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.task_input = '';
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );          
      }
  }
}
</script>