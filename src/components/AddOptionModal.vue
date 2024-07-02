<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { DropdownItem } from '@/components/TransactionForm.vue';

/**
 * Defines properties for AddOptionModal component.
 * @property {String} modalId - The ID for the modal, used for targeting in Bootstrap.
 * @property {String} title - The title displayed on the modal.
 * @property {String} placeholder - The placeholder text for the input field within the modal.
 */
const props = defineProps({
  modalId: String,
  title: String,
  placeholder: String
});

/**
 * Defines the events that this component can emit.
 * Currently, it can emit an 'add-option' event with a DropdownItem payload.
 */
const emit = defineEmits(['add-option']);

/**
 * A reactive reference for the new option's name.
 */
const newOption = ref<string>('');

/**
 * A counter to generate unique IDs for new dropdown items.
 */
let idCounter = 0;

/**
 * Adds a new option to the dropdown.
 * Emits an 'add-option' event with the new option's data.
 */
const addOption = () => {
  const newDropdownItem: DropdownItem = {
    id: idCounter++,
    name: newOption.value
  };
  emit('add-option', newDropdownItem);
  newOption.value = '';
}
</script>

<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- Displays the modal title -->
          <h5 class="modal-title" :id="modalId + 'Label'">{{ title }}</h5>
          <!-- Button to close the modal -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Input field for adding a new option -->
          <input type="text" class="form-control" :id="'new' + modalId" v-model="newOption" :placeholder="placeholder">
        </div>
        <div class="modal-footer">
          <!-- Button to close the modal -->
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <!-- Button to add the new option -->
          <button type="button" class="btn btn-primary" @click="addOption">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>