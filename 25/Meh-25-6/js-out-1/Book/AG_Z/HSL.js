import { Live, Ease, ef, KVS } from "../../Meh/Meh.js";
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
        root = DM.Node({});
        kv = new KVS("MB_2511_TEMPLATE");
    }
    VM.App = App;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFNMLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfWi9IU0wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQTJCLEVBQUUsRUFBYSxHQUFHLEVBQVEsTUFBTSxrQkFBa0IsQ0FBRTtBQUluRyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUU7QUFFeEI7OztFQUdFO0FBRUYsTUFBTSxLQUFXLEVBQUUsQ0FrQmxCO0FBbEJELFdBQWlCLEVBQUU7SUFHbEIsU0FBZ0IsSUFBSSxDQUFHLENBQW9CLElBQVksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFHLENBQUMsRUFBRyxJQUFJLENBQUUsQ0FBQSxDQUFDLENBQUM7SUFBN0UsT0FBSSxPQUF5RSxDQUFBO0lBRTdGLE1BQWEsSUFBSTtRQUVoQixLQUFLLENBQVc7UUFDaEIsS0FBSyxDQUFXO1FBQ2hCLEtBQUssQ0FBWTtRQUVqQixZQUFjLENBQW9CO1lBRWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFNLEVBQUUsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUcsQ0FBQyxDQUFFLENBQUUsSUFBSSxFQUFFLENBQUU7UUFDM0QsQ0FBQztLQUNEO0lBWlksT0FBSSxPQVloQixDQUFBO0FBQ0YsQ0FBQyxFQWxCZ0IsRUFBRSxLQUFGLEVBQUUsUUFrQmxCO0FBSUQsTUFBTSxLQUFXLEVBQUUsQ0FTbEI7QUFURCxXQUFpQixFQUFFO0lBRWxCLE1BQWEsR0FBRztRQUVSLFNBQVMsR0FBRyxJQUFJLENBQUcsS0FBSyxDQUFFLENBQUU7UUFDNUIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFcEIsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFlLGtCQUFrQixDQUFFLENBQUU7S0FDM0Q7SUFOWSxNQUFHLE1BTWYsQ0FBQTtBQUNGLENBQUMsRUFUZ0IsRUFBRSxLQUFGLEVBQUUsUUFTbEI7QUFJRCxNQUFNLEtBQVcsRUFBRSxDQWdEbEI7QUFoREQsV0FBaUIsRUFBRTtJQUVsQixTQUFTO0lBRVQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEyQnJCLENBQUU7SUFHSCxnQkFBZ0I7SUFFaEIsU0FBZ0IsR0FBRztRQUVsQixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBRVosRUFBRSxNQUFNLEVBQUcsR0FBRyxFQUFFLEVBQ2hCLEVBQUUsQ0FBQyxJQUFJLENBRU4sRUFBRSxLQUFLLEVBQUcsWUFBWSxFQUFFLEVBQ3hCLEVBQUUsQ0FBQyxFQUFFLENBQUcsS0FBSyxDQUFFLENBQ2YsQ0FDRCxDQUFFO0lBQ0osQ0FBQztJQVhlLE1BQUcsTUFXbEIsQ0FBQTtBQUNGLENBQUMsRUFoRGdCLEVBQUUsS0FBRixFQUFFLFFBZ0RsQiJ9