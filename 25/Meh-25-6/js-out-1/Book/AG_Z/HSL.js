import { Live, Ease, ef } from "../../Meh/Meh.js";
const uned = undefined;
/*
    KV Store

*/
export var DM;
(function (DM) {
    function Node(i) { return Ease.fromPartial(i, node); }
    DM.Node = Node;
    class node {
        title;
        depth;
        parts;
        constructor(i) {
            this.title = i?.title ?? "";
            this.depth = i?.depth ?? 0;
            this.parts = i?.parts?.map(p => new node(p ?? {})) ?? [];
        }
    }
    DM.node = node;
})(DM || (DM = {}));
export var VM;
(function (VM) {
    class App {
        available = Live(false);
        display = new Display;
    }
    VM.App = App;
    class Display {
        items = (Ease);
    }
    VM.Display = Display;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    /* CSS */
    const css = /* css */ `

	:host { height : 100% ; }
	
	* { box-sizing : border-box ;  margin : 0 ; }
	
	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }

	.OA { overflow : auto ; }
	
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }
	.GX { gap : 1ex ; }

	main
	{
		height : 100% ;
		overflow : auto ;
		color : hsl( 0  0%  20% ) ;
	}

	h1 { text-align : center ; }
	
	`;
    /* Components */
    function App() {
        return ef.div({ shadow: css }, ef.main({ class: "FC  PM  AC" }, ef.h1("HSL")));
    }
    VC.App = App;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFNMLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfWi9IU0wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQTJCLEVBQUUsRUFBa0IsTUFBTSxrQkFBa0IsQ0FBRTtBQUk3RixNQUFNLElBQUksR0FBRyxTQUFTLENBQUU7QUFFeEI7OztFQUdFO0FBRUYsTUFBTSxLQUFXLEVBQUUsQ0FrQmxCO0FBbEJELFdBQWlCLEVBQUU7SUFHbEIsU0FBZ0IsSUFBSSxDQUFHLENBQW9CLElBQVksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFHLENBQUMsRUFBRyxJQUFJLENBQUUsQ0FBQSxDQUFDLENBQUM7SUFBN0UsT0FBSSxPQUF5RSxDQUFBO0lBRTdGLE1BQWEsSUFBSTtRQUVoQixLQUFLLENBQVc7UUFDaEIsS0FBSyxDQUFXO1FBQ2hCLEtBQUssQ0FBWTtRQUVqQixZQUFjLENBQXNCO1lBRW5DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBRSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUUsRUFBRSxLQUFNLEVBQUUsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFFLElBQUksRUFBRSxDQUFFO1FBQ25FLENBQUM7S0FDRDtJQVpZLE9BQUksT0FZaEIsQ0FBQTtBQUNGLENBQUMsRUFsQmdCLEVBQUUsS0FBRixFQUFFLFFBa0JsQjtBQUlELE1BQU0sS0FBVyxFQUFFLENBMkJsQjtBQTNCRCxXQUFpQixFQUFFO0lBRWxCLE1BQWEsR0FBRztRQUVSLFNBQVMsR0FBRyxJQUFJLENBQUcsS0FBSyxDQUFFLENBQUU7UUFDNUIsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFFO0tBRzlCO0lBTlksTUFBRyxNQU1mLENBQUE7SUFFRCxNQUFhLE9BQU87UUFFWixLQUFLLEdBQUcsQ0FBQSxJQUFlLENBQUEsQ0FBRTtLQUNoQztJQUhZLFVBQU8sVUFHbkIsQ0FBQTtBQWNGLENBQUMsRUEzQmdCLEVBQUUsS0FBRixFQUFFLFFBMkJsQjtBQUlELE1BQU0sS0FBVyxFQUFFLENBZ0RsQjtBQWhERCxXQUFpQixFQUFFO0lBRWxCLFNBQVM7SUFFVCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTJCckIsQ0FBRTtJQUdILGdCQUFnQjtJQUVoQixTQUFnQixHQUFHO1FBRWxCLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FFWixFQUFFLE1BQU0sRUFBRyxHQUFHLEVBQUUsRUFDaEIsRUFBRSxDQUFDLElBQUksQ0FFTixFQUFFLEtBQUssRUFBRyxZQUFZLEVBQUUsRUFDeEIsRUFBRSxDQUFDLEVBQUUsQ0FBRyxLQUFLLENBQUUsQ0FDZixDQUNELENBQUU7SUFDSixDQUFDO0lBWGUsTUFBRyxNQVdsQixDQUFBO0FBQ0YsQ0FBQyxFQWhEZ0IsRUFBRSxLQUFGLEVBQUUsUUFnRGxCIn0=