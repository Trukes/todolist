<template>

            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg bg-indigo-500">

                <!-- <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
                </a> -->

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                        <span class="no-underline hover:underline text-white">
                            Create Project
                        </span>
                    </h1>
                </header>
                
                <!-- <div v-for="task in project.tasks" v-bind:key="task._id">
                    <div v-if="!task.status" class="flex items-center justify-between leading-none p-2 md:p-4 shadow">
                        <p><input type="checkbox" /></p>
                        <p>{{task.title}}</p>
                        <p><button>Apagar</button></p>
                    </div>
                </div> -->

                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                    <form class="w-full" @submit.prevent="submit">                        
                    <!-- <a class="flex items-center no-underline hover:underline text-black" href="#"> -->
                        <!-- <p class="ml-2 text-sm"> -->
                            <input v-on:keyup.enter="createProject" v-model="project_input" class="w-full shadow-md p-3" placeholder="New project? Give me a name" />
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

export default {
  name: 'ProjectCardCreateComponent',
  props: {
    project: Object
  },
  data: function () {
    return {
        project_input: '',
        instanceToast: {}
    }  
  },
  methods: {
      submit: function() {
        console.log('submit');  
      },
      createProject: function() {
        this.$Progress.start();
        var self = this;

        projectController.createProject(
            {
                "title": this.project_input
            },
            function(data) {
                if(data.status === "OK"){
                    self.instanceToast = self.$toast.open(data.message);
                    self.$Progress.finish();
                    self.project_input = '';
                    self.$emit('getAllProjects');
                } else {                    
                   self.$Progress.fail();                    
                }
            }
        );
      },
  }
}
</script>