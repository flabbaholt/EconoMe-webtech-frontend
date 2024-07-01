<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { DropdownItem } from '@/components/TransactionForm.vue';

const props = defineProps({
  modalId: String,
  title: String,
  placeholder: String
});

const emit = defineEmits(['add-option']);

const newOption = ref<string>('');
let idCounter = 0;

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
          <h5 class="modal-title" :id="modalId + 'Label'">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control" :id="'new' + modalId" v-model="newOption" :placeholder="placeholder">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addOption">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>