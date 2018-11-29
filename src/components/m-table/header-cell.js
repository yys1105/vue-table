export default {
  name: 'TableHeaderCell',
  functional: true,
  props: {
    // row: Object,
    render: Function,
    index: Number,
    title: String
    // column: {
    //   type: Object,
    //   default: null
    // }
  },
  render: (h, ctx) => {
    const params = {
      title: ctx.props.title,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};