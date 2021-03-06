<template>
<div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      
      <!-- Column -->
      <div v-for="project in projects" v-bind:key="project._id" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        <ProjectCardComponent :project="project" @getAllProjects="getAllProjects" />
      </div>

      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        <ProjectCardCreateComponent @getAllProjects="getAllProjects" />
      </div>
      <!-- END Column -->

    </div>
</div>  

</template>
<script>
import ProjectCardComponent from "../components/ProjectCardComponent.vue";
import ProjectCardCreateComponent from "../components/ProjectCardCreateComponent.vue";
import projectController from "../controllers/ProjectController";

export default {
  name: 'ProjectViewComponent',
  components: {
    ProjectCardComponent,
    ProjectCardCreateComponent
  },
  props: {
    msg: String
  },
  data: function () {
    return {
      projects: []
    }
  },
  mounted: function () {
    this.getAllProjects();
  },
  methods: {
    createTask: function() {
      this.getAllProjects();
    },
    getAllProjects: function() {
      var self = this;
      projectController.getAllProjects(function(data) {
        self.projects = data.payload.project;
      })
    }
  }
}
</script>