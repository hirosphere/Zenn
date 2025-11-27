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
        return ef.div({ shadow: css }, ef.main({ class: "FC  PM  AC" }, ef.h1("App Template")));
    }
    VC.App = App;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoielRlbXBsYXRlIGNvcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BR19aL3pUZW1wbGF0ZSBjb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUEyQixFQUFFLEVBQWEsR0FBRyxFQUFRLE1BQU0sa0JBQWtCLENBQUU7QUFJbkcsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFFO0FBRXhCOzs7RUFHRTtBQUVGLE1BQU0sS0FBVyxFQUFFLENBa0JsQjtBQWxCRCxXQUFpQixFQUFFO0lBR2xCLFNBQWdCLElBQUksQ0FBRyxDQUFvQixJQUFZLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBRyxDQUFDLEVBQUcsSUFBSSxDQUFFLENBQUEsQ0FBQyxDQUFDO0lBQTdFLE9BQUksT0FBeUUsQ0FBQTtJQUU3RixNQUFhLElBQUk7UUFFaEIsS0FBSyxDQUFXO1FBQ2hCLEtBQUssQ0FBVztRQUNoQixLQUFLLENBQVk7UUFFakIsWUFBYyxDQUFvQjtZQUVqQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBTSxFQUFFLEdBQUcsQ0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLENBQUMsQ0FBRSxDQUFFLElBQUksRUFBRSxDQUFFO1FBQzNELENBQUM7S0FDRDtJQVpZLE9BQUksT0FZaEIsQ0FBQTtBQUNGLENBQUMsRUFsQmdCLEVBQUUsS0FBRixFQUFFLFFBa0JsQjtBQUlELE1BQU0sS0FBVyxFQUFFLENBU2xCO0FBVEQsV0FBaUIsRUFBRTtJQUVsQixNQUFhLEdBQUc7UUFFUixTQUFTLEdBQUcsSUFBSSxDQUFHLEtBQUssQ0FBRSxDQUFFO1FBQzVCLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFFO1FBRXBCLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBZSxrQkFBa0IsQ0FBRSxDQUFFO0tBQzNEO0lBTlksTUFBRyxNQU1mLENBQUE7QUFDRixDQUFDLEVBVGdCLEVBQUUsS0FBRixFQUFFLFFBU2xCO0FBSUQsTUFBTSxLQUFXLEVBQUUsQ0FnRGxCO0FBaERELFdBQWlCLEVBQUU7SUFFbEIsU0FBUztJQUVULE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkJyQixDQUFFO0lBR0gsZ0JBQWdCO0lBRWhCLFNBQWdCLEdBQUc7UUFFbEIsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsTUFBTSxFQUFHLEdBQUcsRUFBRSxFQUNoQixFQUFFLENBQUMsSUFBSSxDQUVOLEVBQUUsS0FBSyxFQUFHLFlBQVksRUFBRSxFQUN4QixFQUFFLENBQUMsRUFBRSxDQUFHLGNBQWMsQ0FBRSxDQUN4QixDQUNELENBQUU7SUFDSixDQUFDO0lBWGUsTUFBRyxNQVdsQixDQUFBO0FBQ0YsQ0FBQyxFQWhEZ0IsRUFBRSxLQUFGLEVBQUUsUUFnRGxCIn0=