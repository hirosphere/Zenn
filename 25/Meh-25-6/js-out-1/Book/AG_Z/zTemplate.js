import { ef } from "../../Meh/Meh.js";
const uned = undefined;
/*
    KV Store

*/
export var DM;
(function (DM) {
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
        return ef.div({ shadow: css }, ef.main({ class: "FC  PM  AC" }, ef.h1("App Template")));
    }
    VC.App = App;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoielRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfWi96VGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF3QyxFQUFFLEVBQXdCLE1BQU0sa0JBQWtCLENBQUU7QUFJbkcsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFFO0FBRXhCOzs7RUFHRTtBQUVGLE1BQU0sS0FBVyxFQUFFLENBZWxCO0FBZkQsV0FBaUIsRUFBRTtJQUVsQixNQUFhLElBQUk7UUFFaEIsS0FBSyxDQUFXO1FBQ2hCLEtBQUssQ0FBVztRQUNoQixLQUFLLENBQVk7UUFFakIsWUFBYyxDQUFvQjtZQUVqQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBTSxFQUFFLEdBQUcsQ0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLENBQUMsQ0FBRSxDQUFFLElBQUksRUFBRSxDQUFFO1FBQzNELENBQUM7S0FDRDtJQVpZLE9BQUksT0FZaEIsQ0FBQTtBQUNGLENBQUMsRUFmZ0IsRUFBRSxLQUFGLEVBQUUsUUFlbEI7QUFJRCxNQUFNLEtBQVcsRUFBRSxDQUtsQjtBQUxELFdBQWlCLEVBQUU7SUFFbEIsTUFBYSxHQUFHO0tBRWY7SUFGWSxNQUFHLE1BRWYsQ0FBQTtBQUNGLENBQUMsRUFMZ0IsRUFBRSxLQUFGLEVBQUUsUUFLbEI7QUFJRCxNQUFNLEtBQVcsRUFBRSxDQWdEbEI7QUFoREQsV0FBaUIsRUFBRTtJQUVsQixTQUFTO0lBRVQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEyQnJCLENBQUU7SUFHSCxnQkFBZ0I7SUFFaEIsU0FBZ0IsR0FBRztRQUVsQixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBRVosRUFBRSxNQUFNLEVBQUcsR0FBRyxFQUFFLEVBQ2hCLEVBQUUsQ0FBQyxJQUFJLENBRU4sRUFBRSxLQUFLLEVBQUcsWUFBWSxFQUFFLEVBQ3hCLEVBQUUsQ0FBQyxFQUFFLENBQUcsY0FBYyxDQUFFLENBQ3hCLENBQ0QsQ0FBRTtJQUNKLENBQUM7SUFYZSxNQUFHLE1BV2xCLENBQUE7QUFDRixDQUFDLEVBaERnQixFQUFFLEtBQUYsRUFBRSxRQWdEbEIifQ==