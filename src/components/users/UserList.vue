<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <div>
      <button @click="sort('asc')" :class="{ selected: sorting === 'asc' }">Sort Ascending</button>
      <button @click="sort('desc')" :class="{ selected: sorting === 'desc' }">Sort Descending</button>
    </div>
    <ul>
      <user-item v-for="user in displayedUsers" :key="user.id" :user-name="user.fullName" :id="user.id"
        @list-projects="$emit('list-projects', $event)"></user-item>
    </ul>
  </base-container>
</template>

<script>
import UserItem from './UserItem.vue';
import useSearch from '../../hooks/search';
import { ref, computed } from 'vue';

export default {
  components: {
    UserItem,
  },
  props: ['users'],
  emits: ["list-projects"],
  setup(props) {
    // const enteredSearchTerm = ref("");
    // const activeSearchTerm = ref("");
    // const availableUsers = computed(function () {
    //   let users = [];
    //   if (activeSearchTerm.value) {
    //     users = props.users.filter((usr) =>
    //       usr.fullName.includes(activeSearchTerm.value)
    //     );
    //   } else if (props.users) {
    //     users = props.users;
    //   }
    //   return users;
    // });

    // watch(enteredSearchTerm, function (val) {
    //   setTimeout(() => {
    //     if (val === enteredSearchTerm.value) {
    //       activeSearchTerm.value = val;
    //     }
    //   }, 300);
    // })

    // function updateSearch(val) {
    //   enteredSearchTerm.value = val;
    // }
    const { enteredSearchTerm, availableItems, updateSearch } = useSearch(props.users, 'fullName');

    const sorting = ref(null);
    const displayedUsers = computed(function () {
      if (!sorting.value) {
        return availableItems.value;
      }
      return availableItems.value.slice().sort((u1, u2) => {
        if (sorting.value === 'asc' && u1.fullName > u2.fullName) {
          return 1;
        } else if (sorting.value === 'asc') {
          return -1;
        } else if (sorting.value === 'desc' && u1.fullName > u2.fullName) {
          return -1;
        } else {
          return 1;
        }
      });
    })

    function sort(mode) {
      sorting.value = mode;
    }

    return {
      enteredSearchTerm,
      updateSearch,
      displayedUsers,
      sorting,
      sort
    }

  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>