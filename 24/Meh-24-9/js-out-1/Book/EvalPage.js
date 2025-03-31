import { leaf, ef, pl } from "../meh/index.js";
export const EvalPage = () => {
    const tab_current = leaf(2);
    return ef.main({ class: "EVAL_PAGE" }, ef.p("Eval ", tab_current), pl.switch(tab_current, cur => Eval(cur)));
};
const Eval = (num) => {
    return ef.section({ class: "EVAL" }, ef.section({ class: "EVAL_EDIT" }, ef.textarea({ class: "EVAL_CODE", binds: {}, props: { value: sample } }), ef.textarea({ class: "EVAL_OUTPUT", binds: {} }), ef.textarea({ class: "EVAL_INPUT", binds: {} })), ef.section({ class: "EVAL_DISPLAY", binds: {} }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbFBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9FdmFsUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFVLEVBQUUsRUFBRyxFQUFFLEVBQVEsTUFBTSxpQkFBaUIsQ0FBRTtBQUkvRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBRTVCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUUsQ0FBRTtJQUVoQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBRWIsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUcsT0FBTyxFQUFHLFdBQVcsQ0FBRSxFQUM5QixFQUFFLENBQUMsTUFBTSxDQUVSLFdBQVcsRUFDWCxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBRyxHQUFHLENBQUUsQ0FDbkIsQ0FDRCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBRSxHQUFZLEVBQUcsRUFBRTtJQUUvQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRSxFQUNsQixFQUFFLENBQUMsT0FBTyxDQUVULEVBQUUsS0FBSyxFQUFHLFdBQVcsRUFBRSxFQUN2QixFQUFFLENBQUMsUUFBUSxDQUFHLEVBQUUsS0FBSyxFQUFHLFdBQVcsRUFBRyxLQUFLLEVBQUcsRUFBSSxFQUFHLEtBQUssRUFBRyxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsRUFBRSxDQUFFLEVBQ25GLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsYUFBYSxFQUFHLEtBQUssRUFBRyxFQUFJLEVBQUUsQ0FBRSxFQUN4RCxFQUFFLENBQUMsUUFBUSxDQUFHLEVBQUUsS0FBSyxFQUFHLFlBQVksRUFBRyxLQUFLLEVBQUcsRUFBSSxFQUFFLENBQUUsQ0FDdkQsRUFDRCxFQUFFLENBQUMsT0FBTyxDQUFHLEVBQUUsS0FBSyxFQUFHLGNBQWMsRUFBRyxLQUFLLEVBQUcsRUFBSSxFQUFFLENBQUUsQ0FDeEQsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELE1BQU0sTUFBTSxHQUVaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNEJDLENBQUUifQ==