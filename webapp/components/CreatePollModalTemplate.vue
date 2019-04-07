<template>
  <a-modal
    :visible="visible"
    title="Create a new collection"
    ok-text="Create"
    @cancel="
      () => {
        $emit('cancel')
      }
    "
    @ok="
      () => {
        $emit('create')
      }
    "
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Title">
        <a-input
          v-decorator="[
            'title',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Description">
        <a-input v-decorator="['description']" type="textarea" />
      </a-form-item>
      <a-form-item class="collection-create-form_last-form-item">
        <a-radio-group
          v-decorator="[
            'modifier',
            {
              initialValue: 'private'
            }
          ]"
        >
          <a-radio value="public">Public</a-radio>
          <a-radio value="private">Private</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
