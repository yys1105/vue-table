<template>
  <div class="demo">
    <div class="content" :style="{height:clientHeight}">
      <m-table
        ref="table"
        :columns="columns"
        :data="data"
        expand
        @loadMore="loadMore"
        :dataLoading.sync="dataLoading"
      >
        <template slot-scope="props">
          <chart></chart>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script>
import Chart from "./chart";
export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name",
          width: 300,
          headerRender: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "title-wrap"
                }
              },
              [h("strong", params.title)]
            );
          },
          render: (h, params) => {
            return h("div", [
              h("span", {
                props: {
                  type: "person"
                }
              }),
              h("strong", "render:" + params.row.name)
            ]);
          }
        },
        {
          title: "Age",
          key: "age",
          width: 100
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        }
        // {
        //   name: "Joe Black",
        //   age: 30,
        //   address: "Sydney No. 1 Lake Park",
        //   date: "2016-10-02"
        // },
        // {
        //   name: "John Brown",
        //   age: 18,
        //   address: "New York No. 1 Lake Park",
        //   date: "2016-10-03"
        // },
        // {
        //   name: "Jim Green",
        //   age: 24,
        //   address: "London No. 1 Lake Park",
        //   date: "2016-10-01"
        // },
        // {
        //   name: "Joe Black",
        //   age: 30,
        //   address: "Sydney No. 1 Lake Park",
        //   date: "2016-10-02"
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04"
        // }
      ],
      time: 0,
      dataLoading: false
    };
  },
  computed: {
    clientHeight: function() {
      return document.documentElement.clientHeight + "px";
    }
  },
  methods: {
    ddd() {
      debugger;
    },
    loadMore() {
      if (this.time <= 2) {
        this.dataLoading = true;
        setTimeout(() => {
          new Array(10).fill(0).forEach((item, index) => {
            this.data.push({
              name: "more data" + index,
              age: 26,
              address: "Ottawa No. 2 Lake Park",
              date: "2016-10-04"
            });
          });
          this.dataLoading = false;
        }, 1000);
      } else {
        this.$refs.table.end = true;
        this.dataLoading = false;
      }

      this.time++;
    }
  },
  components: { Chart }
};
</script>
<style lang='stylus' scoped>
.demo
  background-color: #f2f2f2
  .content
    width: 800px
    margin: 0 auto
</style>