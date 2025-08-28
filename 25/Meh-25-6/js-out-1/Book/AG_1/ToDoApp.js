import { Live, ef, pl } from "../../Meh/Meh.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9Eb0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvVG9Eb0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsSUFBSSxFQUFrQixFQUFFLEVBQUcsRUFBRSxFQUFlLE1BQU0sa0JBQWtCLENBQUU7QUFFdEYsSUFBVSxFQUFFLENBMERYO0FBMURELFdBQVUsRUFBRTtJQXdCRSxjQUFXLEdBQ3hCO1FBQ0MsS0FBSyxFQUFHLFdBQVc7UUFDbkIsS0FBSyxFQUNMO1lBQ0M7Z0JBQ0MsS0FBSyxFQUFHLFVBQVU7Z0JBQ2xCLEtBQUssRUFDTDtvQkFDQyxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDdkMsRUFBRSxLQUFLLEVBQUcsUUFBUSxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3hDLEVBQUUsS0FBSyxFQUFHLFFBQVEsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN4QyxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDdkMsRUFBRSxLQUFLLEVBQUcsUUFBUSxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3hDLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN6QyxFQUFFLEtBQUssRUFBRyxTQUFTLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDekMsRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7b0JBQ3pDLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRyxTQUFTLEVBQUcsS0FBSyxFQUFFO29CQUN6QyxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsU0FBUyxFQUFHLEtBQUssRUFBRTtvQkFDdkMsRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUU7aUJBQ3pDO2FB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