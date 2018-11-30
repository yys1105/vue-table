<template>
  <div ref="tableComponent" class="hide-scroll">
    <div class="table-content" @click="expandActivedIndex = -1">
      <div ref="tableWrap" class="table-wrap">
        <table ref="table" :style="{width:tableWidth}" @scroll.native="scrollHandler">
          <colgroup>
            <col v-for="column in columns" :width="column.width">
          </colgroup>
          <thead>
            <tr>
              <th v-for="(column,index) in columns">
                <div v-if="column.headerRender">
                  <header-cell :render="column.headerRender" :title="column.title" :index="index"></header-cell>
                </div>
                <div v-else>{{column.title}}</div>
              </th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(row,rowIndex) in data">
              <tr>
                <td v-for="(column,columnIndex) in columns" @click.stop="showExpand(row,rowIndex)">
                  <div v-if="column.render">
                    <cell :row="row" :render="column.render" :index="columnIndex" :column="column"></cell>
                  </div>
                  <div class="row" v-else>{{row[column.key]}}</div>
                </td>
              </tr>
              <tr v-if="expand&&expandActivedIndex==rowIndex" class="expand-row">
                <td :colspan="columns.length">
                  <slot :row="row" :rowIndex="rowIndex"></slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="dataLoading&&!end" class="loading">加载中</div>
      <div v-if="end" class="last">见底啦</div>
    </div>
  </div>
</template>

<script>
import HeaderCell from "./header-cell.js";
import Cell from "./cell.js";
export default {
  props: {
    columns: Array,
    data: Array,
    expand: {
      type: Boolean,
      default: false
    },
    loadSize: { type: Number, default: 10 },
    dataLoading: Boolean
  },
  data() {
    return {
      tableWrapWidth: null,
      dataLength: this.data.length,
      expandActivedIndex: -1,
      end: false
    };
  },
  mounted() {
    this.$refs.tableWrap.parentNode.style.width =
      this.$refs.tableComponent.clientWidth + 15 + "px";
    this.getMore();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    showExpand(row, index) {
      this.expandActivedIndex = this.expandActivedIndex == index ? -1 : index;
    },
    handleScroll() {
      let parentNodeHeight = this.$refs.tableComponent.clientHeight; //400
      let componentHeight = this.$refs.table.clientHeight; //1000
      let scrollTop = this.$refs.tableWrap.parentNode.scrollTop;
      if (
        componentHeight - parentNodeHeight - scrollTop >= 0 &&
        Math.abs(componentHeight - parentNodeHeight - scrollTop) < 10
      ) {
        if (!this.dataLoading && !this.end) {
          this.$emit("loadMore");
          this.$emit("update:dataLoading", true);
        }
      }
    },
    getMore() {
      if (
        this.$refs.tableWrap.clientHeight <
        this.$refs.tableComponent.clientHeight
      ) {
        this.$emit("loadMore");
        this.$emit("update:dataLoading", true);
        console.log("请求数据1");
      }
    }
  },
  watch: {
    // dataLoading: function(val) {
    //   debugger
    //   if(!val) this.getMore();
    // },
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
@import './customStyle.styl'
.hide-scroll
  width: 100%
  height: 100%
  overflow: hidden
.table-content
  width: 100%
  height: 100%
  overflow-y: auto
  .table-wrap
    margin: 0 20px
    box-shadow: 0px 5px 27px 0 rgba(114, 114, 114, 0.3)
  table
    min-width: 100%
    table-layout: fixed
    border-collapse: separate
    border-spacing: 0 0
    // padding: 0 20px
    // box-sizing: border-box
    thead
      tr
        // box-shadow: 0px 5px 27px 0 rgba(114, 114, 114, 0.3)
        th
          background-color: #fff
          padding: 13px 0
          line-height: 26px
    tbody
      tr
        // box-shadow: 0px 5px 27px 0 rgba(114, 114, 114, 0.3)
        &.expand-row
          td
            background-color: #f2f2f2
        td
          background-color: #fff
          padding: 13px 0
          line-height: 26px
.loading, .last
  text-align: center
  line-height: 30px
  padding: 20px 0
</style>
