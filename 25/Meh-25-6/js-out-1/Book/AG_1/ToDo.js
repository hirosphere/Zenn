import { Leaf, Live, ef, pl } from "../../Meh/Meh.js";
var DM;
(function (DM) {
    DM.sample_data = {
        title: "やるべきリスト[]",
        lists: [
            {
                title: "Todo 日本史",
                items: [
                    { title: "財閥街をつくる", completed: false },
                    { title: "官庁街をつくる", completed: false },
                    { title: "石油を掘る", completed: false },
                    { title: "ウランを掘る", completed: false },
                    { title: "露天炭を掘る", completed: false },
                    { title: "炭鉱を掘る", completed: false },
                    { title: "銀座線を掘る", completed: false },
                    //	{ title : "丸の内線を掘る" , completed : false } ,
                    //	{ title : "日比谷線を掘る" , completed : false } ,
                    //	{ title : "千代田線を掘る" , completed : false } ,
                    //	{ title : "有楽町線を掘る" , completed : false } ,
                ]
            },
            {
                title: "「聴く」",
                items: [
                    { title: "わんこの肚鳴りを聴く", completed: false },
                    { title: "ニャンコの足掻きを聴く", completed: false },
                    { title: "ねずみのいびきを聴く", completed: false },
                    { title: "牛の屁を聴く", completed: false },
                    { title: "文鳥のゲップを聴く", completed: false },
                ]
            },
        ]
    };
})(DM || (DM = {}));
var VM;
(function (VM) {
    class Applet {
        doc = Live(DM.sample_data);
        constructor() {
            this.doc.lists.renn.each(list => randDone(list));
        }
    }
    VM.Applet = Applet;
    const randDone = (list) => list.items.renn.each(i => i.completed.$ = Math.random() > 0.8);
})(VM || (VM = {}));
var VC;
(function (VC) {
    const css = /* css */ `
		
		* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

		.FR { display : flex ;  flex-direction : row ; }
		.FC { display : flex ;  flex-direction : column ; }
		.AC { align-items : center ; }
		.PGMM { padding : 1em ;  gap : 1em ; }
		.PGMX { padding : 1em ;  gap : 1ex ; }
		.PGXX { padding : 1ex ;  gap : 1ex ; }


		ul { list-style : none ; }

		.TODO_LIST { width : min( 35em 100% ) ; }
		.TODO_LIST  li
		{
			border-bottom : 1px dotted hsl( 50  3%  100% ) ;
		}

		.TODO_ITEM
		{
			background : hsl( 50  3%  85% ) ;

			display : grid ;
			grid-template-columns : auto 20em 4em ;
			gap : 1ex ;

			padding : 0.6ex 1em ;
		}

		.EDITOR
		{

		}

		.JSON
		{
			width : 50em ; height : 30em ; padding : 1ex ;
			color : hsl ( 0  0%  10% ) ; font-family : courier ;
			tab-size : 4ex ;
		}
	
	`;
    VC.Applet = () => {
        const vm = new VM.Applet;
        return ef.div({ shadow: css }, ef.main({ class: "FC PGXX AC" }, ef.h1(vm.doc.title), pl.each(vm.doc.lists.renn, o => TodoList(o.target)), ef.section(ef.textarea({ class: "JSON", props: { value: Leaf.transR(vm.doc, o => JSON.stringify(o, null, "\t")) } }))));
    };
    const TodoList = (dm) => ef.article({ class: "TODO_LIST FC PGXX" }, ef.h2(dm.title), Editor(dm), ef.ul(pl.each(dm.items.renn, o => TodoItem(o))));
    const Editor = (dm) => {
        const title = Leaf("すべき何か");
        const click = () => {
            dm.items.insert([{ title: title.$, completed: false }], 0);
            title.$ = "まだ何かしたい？";
        };
        return ef.section({ class: "EDITOR  FR PGXX" }, ef.input({ biBind: { vChan: title } }), ef.button({ passive: { click } }, "新規作成"));
    };
    const TodoItem = (o) => {
        const d = o.target;
        return ef.li({ class: "TODO_ITEM" }, ef.input({ attrs: { type: "checkbox" }, biBind: { chInp: d.completed } }), ef.span({ class: "_TEXT" }, d.title), ef.button({ passive: { click() { o.delete(); } } }, "削除"));
    };
})(VC || (VC = {}));
export const ToDo = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9Eby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvVG9Eby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBa0IsRUFBRSxFQUFHLEVBQUUsRUFBZSxNQUFNLGtCQUFrQixDQUFFO0FBRXRGLElBQVUsRUFBRSxDQTJEWDtBQTNERCxXQUFVLEVBQUU7SUF3QkUsY0FBVyxHQUN4QjtRQUNDLEtBQUssRUFBRyxXQUFXO1FBQ25CLEtBQUssRUFDTDtZQUNDO2dCQUNDLEtBQUssRUFBRyxVQUFVO2dCQUNsQixLQUFLLEVBQ0w7b0JBQ0MsRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3pDLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN6QyxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDdkMsRUFBRSxLQUFLLEVBQUcsUUFBUSxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3hDLEVBQUUsS0FBSyxFQUFHLFFBQVEsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN4QyxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDdkMsRUFBRSxLQUFLLEVBQUcsUUFBUSxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3pDLDhDQUE4QztvQkFDOUMsOENBQThDO29CQUM5Qyw4Q0FBOEM7b0JBQzlDLDhDQUE4QztpQkFDN0M7YUFDRDtZQUNEO2dCQUNDLEtBQUssRUFBRyxNQUFNO2dCQUNkLEtBQUssRUFDTDtvQkFDQyxFQUFFLEtBQUssRUFBRyxZQUFZLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDNUMsRUFBRSxLQUFLLEVBQUcsYUFBYSxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7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