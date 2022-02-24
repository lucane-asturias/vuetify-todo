import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: null,
    tasks: [
      {
        id: 1,
        title: 'Wake up',
        done: false,
        dueDate: '2023-10-16',
      },
      {
        id: 2,
        title: 'Get apples',
        done: false,
        dueDate: '2023-10-17',
      },
      {
        id: 3,
        title: 'Eat apples',
        done: false,
        dueDate: null,
      }
    ],
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTaskTitle) {
      if (newTaskTitle === '') return;

      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      const task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTaskTitle(state, payload) {
      const task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      const task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      // prevent duplicate if a snackbar its already being shown
      if (state.snackbar.show) {
        state.snackbar.show = false; // hide snackbar
        timeout = 300;
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle);
      commit('showSnackbar', 'Task added!');
    },
    deleteTask({ commit }, taskID) {
      commit('deleteTask', taskID);
      commit('showSnackbar', 'Task deleted!');
    },
    updateTaskTitle({ commit }, payload) {
      commit('updateTaskTitle', payload);
      commit('showSnackbar', 'Task updated!');
    },
    updateTaskDueDate({ commit }, payload) {
      commit('updateTaskDueDate', payload);
      commit('showSnackbar', 'Due date updated!');
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) return state.tasks;
      /* filtering where text on the search includes one specific character from title's name;
        which essentially mean its filtering out the titles that dont have what was typed */
      return state.tasks.filter(task =>
        task.title.toLowerCase().includes(state.search.toLowerCase()) // filter case insensitve
      )
    }
  }
})
