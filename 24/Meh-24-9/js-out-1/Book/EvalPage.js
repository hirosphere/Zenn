import { leaf, Renn, ef, pl } from "../meh/index.js";
var VM;
(function (VM) {
    class App {
        current;
        items = new Renn(Array(8).fill(null).map((i, n) => new Item("Pad" + (n + 1))));
        constructor() {
            this.current = leaf(this.items.orders[0].target);
        }
    }
    VM.App = App;
    class Item {
        title;
        code = leaf(sample);
        output = leaf("");
        input = leaf("");
        constructor(title) {
            this.title = title;
        }
    }
    VM.Item = Item;
})(VM || (VM = {}));
export const EvalPage = () => {
    const vm = new VM.App;
    return ef.main({ class: "EVAL_PAGE" }, ef.p("Eval ", vm.current.value.title), pl.switch(vm.current, cur => Eval(cur)));
};
const Eval = (vm) => {
    return ef.section({ class: "EVAL" }, ef.section({ class: "EVAL_EDIT" }, ef.textarea({ class: "EVAL_CODE", binds: {}, props: { value: vm.code } }), ef.textarea({ class: "EVAL_OUTPUT", binds: {}, props: { value: vm.output } }), ef.textarea({ class: "EVAL_INPUT", binds: {}, props: { value: vm.input } })), ef.section({ class: "EVAL_DISPLAY", binds: {} }));
};
const sample = `	const book_def : navi.t.index =
	{
		name : "" , title : "Meh Root" ,
		parts :
		[
			{ type : "links" , name : "Links" ,  } ,
			{ type : "eval" , name : "Eval" , title : "Eval" } ,
			{ type : "ui-g" , name : "UI" , title : "UI ギャラリー" ,
				parts :
				[
					{ name : "Slide" } ,
					{ name : "HSL" } ,
					{ name : "OKLCH" } ,
					{ name : "Tabs" } ,
				]
			} ,
			{ type : "rail" , name : "Rail" , title : "列車運転" } ,
			{ name : "Tree" , title : "ツリーテスト" , parts : make_part_tree ( 3 ) } ,
			{ type : "h-rails" , name : "H-Rail" , title : "Heart Rails",
				parts :
				[
					{ name : "北海道・東北" , title : "北海道・東北" } ,
					{ name : "関東" , title : "関東" } ,
					{ name : "東海" , title : "東海" } ,
				]
			} ,
		] ,
	} ;
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbFBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9FdmFsUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFRLE1BQU0saUJBQWlCLENBQUU7QUFHL0QsSUFBVSxFQUFFLENBeUJYO0FBekJELFdBQVUsRUFBRTtJQUVYLE1BQWEsR0FBRztRQUVmLE9BQU8sQ0FBbUI7UUFDMUIsS0FBSyxHQUFHLElBQUksSUFBSSxDQUVmLEtBQUssQ0FBRSxDQUFDLENBQUUsQ0FBRSxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUUsR0FBRyxDQUFHLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUcsS0FBSyxHQUFHLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFFLENBQUUsQ0FDOUUsQ0FBRTtRQUVIO1lBRUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUcsSUFBSSxDQUFFLEtBQUssQ0FBRSxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUUsTUFBTSxDQUFFLENBQUU7UUFDNUQsQ0FBQztLQUNEO0lBWlksTUFBRyxNQVlmLENBQUE7SUFFRCxNQUFhLElBQUk7UUFNSztRQUpyQixJQUFJLEdBQUcsSUFBSSxDQUFHLE1BQU0sQ0FBRSxDQUFFO1FBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFDdEIsS0FBSyxHQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUVyQixZQUFxQixLQUFjO1lBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUNsQyxDQUFDO0tBQ0Y7SUFSWSxPQUFJLE9BUWhCLENBQUE7QUFDRixDQUFDLEVBekJTLEVBQUUsS0FBRixFQUFFLFFBeUJYO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUU1QixNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUU7SUFFdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViLEVBQUUsS0FBSyxFQUFHLFdBQVcsRUFBRSxFQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFHLE9BQU8sRUFBRyxFQUFFLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRSxLQUFLLENBQUUsRUFDM0MsRUFBRSxDQUFDLE1BQU0sQ0FFUixFQUFFLENBQUMsT0FBTyxFQUNWLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLEdBQUcsQ0FBRSxDQUNuQixDQUNELENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxNQUFNLElBQUksR0FBRyxDQUFFLEVBQVksRUFBRyxFQUFFO0lBRS9CLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FFaEIsRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLEVBQ2xCLEVBQUUsQ0FBQyxPQUFPLENBRVQsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFHLEtBQUssRUFBRyxFQUFJLEVBQUcsS0FBSyxFQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFFLEVBQ3BGLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsYUFBYSxFQUFHLEtBQUssRUFBRyxFQUFJLEVBQUcsS0FBSyxFQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFFLEVBQ3hGLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsWUFBWSxFQUFHLEtBQUssRUFBRyxFQUFJLEVBQUcsS0FBSyxFQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFFLENBQ3RGLEVBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBRyxFQUFFLEtBQUssRUFBRyxjQUFjLEVBQUcsS0FBSyxFQUFHLEVBQUksRUFBRSxDQUFFLENBQ3hELENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxNQUFNLE1BQU0sR0FFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTRCQyxDQUFFIn0=