<template>
    <div>
        <div v-for="task in taskProp" v-bind:key="task._id">
            <div class="flex items-center justify-between leading-none p-2 md:p-4 shadow">
                <p>
                  <input @click="changeStatusTask(task._id, task.status)" type="checkbox" v-model="task.status" :disabled="task.status" />
                </p>
                <p>
                  <input :class="(task.status ? 'line-through' : '')" class="bg-white" type="text" v-model="task.title" :disabled="task.status" v-on:keyup.enter="updateTask(task._id, task.title)" />
                </p>


                <v-popover>
                  <!-- <button class="tooltip-target b3">Click me</button> -->
                  <p class="text-xs text-gray-400 cursor-pointer">
                    {{ moment(task.created_at).fromNow() }}
                  </p>

                  <template class="bg-indigo-500" slot="popover">
                      <p>Created At: {{task.created_at}}</p>
                      <p>Closed At: {{task.closed_at}}</p>
                  </template>
                </v-popover>

                <p v-show="!task.status"><button @click="deleteTask(task._id)">
                    <svg class="block h-6 w-6 s-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>                
                </button></p>
            </div>
        </div>
    </div>
    

</template>
<script>
import moment from "moment";

export default {
  name: 'TaskCardComponent',
  props: {
    taskProp: Array
  },
  data: function () {
    return {
        moment : moment,
        task_input: '',
        instanceToast: {}
    }  
  },
  computed: {
    //  taskProp: function() {
    //    return this.project.tasks.filter(function(task) {
    //      return !task.status
    //  });
    // },
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
      deleteTask: function(id) {
        this.$emit('deleteTask', id);
      },
      changeStatusTask: function(id, status) {
        this.$emit('changeStatusTask', id, status);
      },
      updateTask: function(id, title){
        this.$emit('updateTask', id, title);
      }
  }
}
</script>