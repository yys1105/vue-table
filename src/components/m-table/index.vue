<template>
  <div class="table-wrap">
    <table :style="{width:tableWidth}">
      <colgroup>
        <col
          v-for="column in columns"
          :width="column.width"
        >
      </colgroup>
      <thead>
        <tr>
          <th v-for="(column,index) in columns">
            <div v-if="column.headerRender">
              <header-cell
                :render="column.headerRender"
                :title="column.title"
                :index="index"
              ></header-cell>
            </div>
            <div v-else>{{column.title}}</div>
          </th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="row in data">
          <td v-for="(column,index) in columns">
            <div v-if="column.render">
              <cell :row="row" :render="column.render" :index="index" :column="column"></cell>
            </div>
            <div v-else>{{row[column.key]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HeaderCell from "./header-cell.js";
import Cell from "./cell.js";
export default {
  props: {
    columns: Array,
    data: Array
  },
  data() {
    return {};
  },
  computed: {
    tableWidth: function() {
      let width = 0;
      this.columns.forEach(column => {
        width += column.width ? column.width : 80;
      });
      return width + "px";
    }
  },
  components: { HeaderCell, Cell }
};
</script>
<style lang="stylus" scoped>
.table-wrap
  display: flex
  flex-wrap: nowrap
  overflow-y: auto
  table
    min-width: 100%
    table-layout: fixed
    border-collapse: separate
</style>
