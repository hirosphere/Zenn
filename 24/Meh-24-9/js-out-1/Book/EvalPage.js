import { leaf, Renn, ef, pl, log } from "../meh/index.js";
var VM;
(function (VM) {
    class App {
        current;
        items = new Renn(Array(8).fill(null).map((i, n) => new Item("Pad" + (n + 1))));
        constructor() {
            this.current = leaf(this.items.orders[0].target);
        }
        eval() {
            log(this.current.value.code.value);
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
        execute() {
            try {
                this.output.value = eval(this.code.value);
            }
            catch (err) {
                this.output.value = String(err);
            }
        }
    }
    VM.Item = Item;
})(VM || (VM = {}));
export const EvalPage = () => {
    const vm = new VM.App;
    return ef.main({ class: "EVAL_PAGE" }, ef.section("Eval ", vm.current.value.title, ef.button({ acts: { click: () => vm.eval() } }, "Eval")), pl.switch(vm.current, cur => Eval(cur)));
};
const Eval = (vm) => {
    return ef.section({ class: "EVAL" }, ef.section({ class: "EVAL_EDIT" }, ef.textarea({ class: "EVAL_CODE", binds: { value_change: vm.code } }), ef.textarea({ class: "EVAL_OUTPUT", binds: {}, props: { value: vm.output } }), ef.textarea({ class: "EVAL_INPUT", binds: {}, props: { value: vm.input } })), ef.section({ class: "EVAL_DISPLAY", binds: {} }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbFBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9FdmFsUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFTLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFFO0FBR3JFLElBQVUsRUFBRSxDQTBDWDtBQTFDRCxXQUFVLEVBQUU7SUFFWCxNQUFhLEdBQUc7UUFFZixPQUFPLENBQW1CO1FBQzFCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FFZixLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUUsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFLEdBQUcsQ0FBRyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLEtBQUssR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFLENBQzlFLENBQUU7UUFFSDtZQUVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxLQUFLLENBQUUsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFLE1BQU0sQ0FBRSxDQUFFO1FBQzVELENBQUM7UUFFRCxJQUFJO1lBRUgsR0FBRyxDQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQTtRQUN0QyxDQUFDO0tBQ0Q7SUFqQlksTUFBRyxNQWlCZixDQUFBO0lBRUQsTUFBYSxJQUFJO1FBTUs7UUFKckIsSUFBSSxHQUFHLElBQUksQ0FBRyxNQUFNLENBQUUsQ0FBRTtRQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFFO1FBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFckIsWUFBcUIsS0FBYztZQUFkLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDbEMsQ0FBQztRQUVGLE9BQU87WUFFTixJQUNBO2dCQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFFO2FBQzlDO1lBQ0QsT0FBUSxHQUFHLEVBQ1g7Z0JBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFHLEdBQUcsQ0FBRSxDQUFFO2FBQ3BDO1FBQ0YsQ0FBQztLQUNEO0lBcEJZLE9BQUksT0FvQmhCLENBQUE7QUFDRixDQUFDLEVBMUNTLEVBQUUsS0FBRixFQUFFLFFBMENYO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUU1QixNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUU7SUFFdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViLEVBQUUsS0FBSyxFQUFHLFdBQVcsRUFBRSxFQUN2QixFQUFFLENBQUMsT0FBTyxDQUVULE9BQU8sRUFBRyxFQUFFLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRSxLQUFLLEVBQ2xDLEVBQUUsQ0FBQyxNQUFNLENBRVIsRUFBRSxJQUFJLEVBQUcsRUFBRSxLQUFLLEVBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRyxFQUFFLEVBQUUsRUFDdkMsTUFBTSxDQUNOLENBQ0QsRUFDRCxFQUFFLENBQUMsTUFBTSxDQUVSLEVBQUUsQ0FBQyxPQUFPLEVBQ1YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUcsR0FBRyxDQUFFLENBQ25CLENBQ0QsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELE1BQU0sSUFBSSxHQUFHLENBQUUsRUFBWSxFQUFHLEVBQUU7SUFFL0IsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsRUFDbEIsRUFBRSxDQUFDLE9BQU8sQ0FFVCxFQUFFLEtBQUssRUFBRyxXQUFXLEVBQUUsRUFDdkIsRUFBRSxDQUFDLFFBQVEsQ0FBRyxFQUFFLEtBQUssRUFBRyxXQUFXLEVBQUcsS0FBSyxFQUFHLEVBQUUsWUFBWSxFQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFFLEVBQzVFLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsYUFBYSxFQUFHLEtBQUssRUFBRyxFQUFJLEVBQUcsS0FBSyxFQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFFLEVBQ3hGLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsWUFBWSxFQUFHLEtBQUssRUFBRyxFQUFJLEVBQUcsS0FBSyxFQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFFLENBQ3RGLEVBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBRyxFQUFFLEtBQUssRUFBRyxjQUFjLEVBQUcsS0FBSyxFQUFHLEVBQUksRUFBRSxDQUFFLENBQ3hELENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxNQUFNLE1BQU0sR0FFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTRCQyxDQUFFIn0=