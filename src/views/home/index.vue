<template>
  <div>
    <m-table
      :columns="columns"
      :data="data"
    ></m-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name",
          width: 300,
          headerRender: (h, params) => {
            return h("div", [h("strong", params.title)]);
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
          width: 400
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
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
</style>