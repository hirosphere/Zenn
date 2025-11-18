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
            this.title = i.title ?? "";
            this.depth = i.depth ?? 0;
            this.parts = i.parts?.map(p => new node(p)) ?? [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFNMLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfWi9IU0wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQTJCLEVBQUUsRUFBd0IsTUFBTSxrQkFBa0IsQ0FBRTtBQUluRyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUU7QUFFeEI7OztFQUdFO0FBRUYsTUFBTSxLQUFXLEVBQUUsQ0FrQmxCO0FBbEJELFdBQWlCLEVBQUU7SUFHbEIsU0FBZ0IsSUFBSSxDQUFHLENBQW9CLElBQVksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFHLENBQUMsRUFBRyxJQUFJLENBQUUsQ0FBQSxDQUFDLENBQUM7SUFBN0UsT0FBSSxPQUF5RSxDQUFBO0lBRTdGLE1BQWEsSUFBSTtRQUVoQixLQUFLLENBQVc7UUFDaEIsS0FBSyxDQUFXO1FBQ2hCLEtBQUssQ0FBWTtRQUVqQixZQUFjLENBQW9CO1lBRWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFNLEVBQUUsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUcsQ0FBQyxDQUFFLENBQUUsSUFBSSxFQUFFLENBQUU7UUFDM0QsQ0FBQztLQUNEO0lBWlksT0FBSSxPQVloQixDQUFBO0FBQ0YsQ0FBQyxFQWxCZ0IsRUFBRSxLQUFGLEVBQUUsUUFrQmxCO0FBSUQsTUFBTSxLQUFXLEVBQUUsQ0EyQmxCO0FBM0JELFdBQWlCLEVBQUU7SUFFbEIsTUFBYSxHQUFHO1FBRVIsU0FBUyxHQUFHLElBQUksQ0FBRyxLQUFLLENBQUUsQ0FBRTtRQUM1QixPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUU7S0FHOUI7SUFOWSxNQUFHLE1BTWYsQ0FBQTtJQUVELE1BQWEsT0FBTztRQUVaLEtBQUssR0FBRyxDQUFBLElBQWUsQ0FBQSxDQUFFO0tBQ2hDO0lBSFksVUFBTyxVQUduQixDQUFBO0FBY0YsQ0FBQyxFQTNCZ0IsRUFBRSxLQUFGLEVBQUUsUUEyQmxCO0FBSUQsTUFBTSxLQUFXLEVBQUUsQ0FnRGxCO0FBaERELFdBQWlCLEVBQUU7SUFFbEIsU0FBUztJQUVULE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkJyQixDQUFFO0lBR0gsZ0JBQWdCO0lBRWhCLFNBQWdCLEdBQUc7UUFFbEIsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsTUFBTSxFQUFHLEdBQUcsRUFBRSxFQUNoQixFQUFFLENBQUMsSUFBSSxDQUVOLEVBQUUsS0FBSyxFQUFHLFlBQVksRUFBRSxFQUN4QixFQUFFLENBQUMsRUFBRSxDQUFHLEtBQUssQ0FBRSxDQUNmLENBQ0QsQ0FBRTtJQUNKLENBQUM7SUFYZSxNQUFHLE1BV2xCLENBQUE7QUFDRixDQUFDLEVBaERnQixFQUFFLEtBQUYsRUFBRSxRQWdEbEIifQ==