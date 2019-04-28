<template>
  <div>
    <a-table
      :pagination="false"
      size="middle"
      :showHeader="false"
      bordered
      :dataSource="dataSource"
      :columns="columns"
    >
      <template slot="pollOption" slot-scope="text, record">
        <editable-cell
          :ref="'cell-' + record.key"
          :text="text"
          @change="onCellChange(record.key, 'pollOption', $event)"
        />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-button class="editable-add-btn" @click="handleAdd">+</a-button>
  </div>
</template>
<script>
import EditableCell from './EditableCell'
/*
 * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
 */
export default {
  components: {
    EditableCell
  },
  data() {
    return {
      dataSource: [
        {
          key: '0',
          pollOption: 'Choice 1'
        },
        {
          key: '1',
          pollOption: 'Choice 2'
        }
      ],
      count: 2,
      columns: [
        {
          title: 'Option',
          dataIndex: 'pollOption',
          width: '80%',
          scopedSlots: { customRender: 'pollOption' }
        },
        {
          title: '',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    handleAdd() {
      const { count, dataSource } = this
      const newData = {
        key: count,
        pollOption: `New Option ${count}`
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
      this.$nextTick(() => {
        const refId = 'cell-' + newData.key
        this.$refs[refId].edit()
      })
    }
  }
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
