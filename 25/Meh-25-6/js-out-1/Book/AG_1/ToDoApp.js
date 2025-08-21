import { Compo as Live, ef, pl } from "../../Meh/Meh.js";
var DM;
(function (DM) {
    DM.sample_data = {
        title: "やるべきリスト[]",
        lists: [
            {
                title: "Todo 日本史",
                items: [
                    { title: "石油を掘る", completed: false },
                    { title: "ウランを掘る", completed: false },
                    { title: "露天炭を掘る", completed: false },
                    { title: "炭鉱を掘る", completed: false },
                    { title: "銀座線を掘る", completed: false },
                    { title: "丸の内線を掘る", completed: false },
                    { title: "日比谷線を掘る", completed: false },
                    { title: "千代田線を掘る", completed: false },
                    { title: "有楽町線を掘る", completed: false },
                    { title: "財閥を掘る", completed: false },
                    { title: "政策官庁を掘る", completed: false },
                ]
            },
            {
                title: "「聴く」",
                items: [
                    { title: "わんこの肚鳴りを聴く", completed: false },
                    { title: "ニャンコの足を聴く", completed: false },
                    { title: "ねずみのいびきを聴く", completed: false },
                    { title: "牛の屁を聴く", completed: false },
                ]
            },
        ]
    };
})(DM || (DM = {}));
var VM;
(function (VM) {
    class Applet {
        doc = Live(DM.sample_data);
        d = Live(DM.sample_data);
    }
    VM.Applet = Applet;
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

		.TODO_LIST { width : min( 25em 100% ) ; background : hsl( 210  90%  90% ) ; }
		.TODO_ITEM { display : grid ; grid-template-columns : 20em auto ; gap : 1ex ; }
	
	`;
    VC.Applet = () => {
        const vm = new VM.Applet;
        return ef.main({ class: "FC PGMM AC", shadow: css }, ef.h1(vm.doc.title), pl.each(vm.doc.lists.renn, o => TodoList(o.target)));
    };
    const TodoList = (dm) => ef.article({ class: "TODO_LIST FC PGXX" }, ef.h2(dm.title), ef.ul(pl.each(dm.items.renn, o => TodoItem(o))));
    const TodoItem = (o) => {
        const d = o.target;
        return ef.li({ class: "TODO_ITEM" }, ef.span({ class: "_TEXT" }, d.title), ef.input({ attrs: { type: "checkbox" }, biBind: { chInp: d.completed } }));
    };
})(VC || (VC = {}));
export const ToDo = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9Eb0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvVG9Eb0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsS0FBSyxJQUFJLElBQUksRUFBa0IsRUFBRSxFQUFHLEVBQUUsRUFBTyxNQUFNLGtCQUFrQixDQUFFO0FBRXZGLElBQVUsRUFBRSxDQTBEWDtBQTFERCxXQUFVLEVBQUU7SUF3QkUsY0FBVyxHQUN4QjtRQUNDLEtBQUssRUFBRyxXQUFXO1FBQ25CLEtBQUssRUFDTDtZQUNDO2dCQUNDLEtBQUssRUFBRyxVQUFVO2dCQUNsQixLQUFLLEVBQ0w7b0JBQ0MsRUFBRSxLQUFLLEVBQUcsT0FBTyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3ZDLEVBQUUsS0FBSyxFQUFHLFFBQVEsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN4QyxFQUFFLEtBQUssRUFBRyxRQUFRLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDeEMsRUFBRSxLQUFLLEVBQUcsT0FBTyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3ZDLEVBQUUsS0FBSyxFQUFHLFFBQVEsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN4QyxFQUFFLEtBQUssRUFBRyxTQUFTLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDekMsRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3pDLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN6QyxFQUFFLEtBQUssRUFBRyxTQUFTLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDekMsRUFBRSxLQUFLLEVBQUcsT0FBTyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3ZDLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFF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