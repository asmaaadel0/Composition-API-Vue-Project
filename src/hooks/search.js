import { ref, computed, watch } from 'vue';

export default function useSearch(items,searchProp){
    const enteredSearchTerm = ref("");
    const activeSearchTerm = ref("");
    const availableItems = computed(function () {
      let filteredItems = [];
      if (activeSearchTerm.value) {
        filteredItems = items.filter((usr) =>
          usr[searchProp].includes(activeSearchTerm.value)
        );
      } else if (items) {
        filteredItems = items;
      }
      return filteredItems;
    });

    watch(enteredSearchTerm, function (val) {
      setTimeout(() => {
        if (val === enteredSearchTerm.value) {
          activeSearchTerm.value = val;
        }
      }, 300);
    })

    function updateSearch(val) {
      enteredSearchTerm.value = val;
    }
    return { 
        enteredSearchTerm,
        availableItems,
        updateSearch
     };
}