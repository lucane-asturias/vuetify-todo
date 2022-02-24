<template>
  <div class="home">
    <field-add-task />

    <list-task v-if="$store.state.tasks.length" />
    
    <no-tasks v-else/>
  </div>
</template>

<script>
  // import FieldAddTask from '@/components/Todo/FieldAddTask.vue';

  export default {
    name: 'Todo',
    components: {
      // 'field-add-task' : FieldAddTask
      // using require fc from webpack under default configuration property to add component
      'field-add-task' : require('@/components/Todo/FieldAddTask.vue').default,
      'list-task' : require('@/components/Todo/ListTasks.vue').default,
      'no-tasks' : require('@/components/Todo/NoTasks.vue').default,
    },
  };
</script>