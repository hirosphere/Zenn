import { ef, times } from "../../../Meh/Meh.js";
import * as common from "../../Common.js";
export var VC;
(function (VC) {
    VC.App = () => {
        return ef.div({ shadow: [common.css, css] }, ef.main({ class: "FC PM GX" }, ef.h1({ class: "TC" }, "Cludenik"), Tree()));
    };
    class ser_c {
        #_next = 1;
        get next() { return this.#_next++; }
    }
    const Tree = () => {
        const ser = new ser_c;
        return ef.nav({ class: "TREE" }, Index("Root", ser));
    };
    const Index = (title, ser, depth = 0) => {
        return ef.div({ class: "INDEX" }, ef.label({ class: ["_HEAD"] }, ef.span({ class: "_THUMB" }, ef.input({ attrs: { type: "radio", name: "rrr" } }), "+"), ef.span({ class: "_TITLE" }, `D${depth} S${ser.next}`)), depth < 4 ? Parts(depth, ser) : undefined);
    };
    const Parts = (depth, ser) => {
        return ef.ul({ class: "PARTS" }, ...times(4, n => Index("Item" + (n + 1), ser, depth + 1)));
    };
    const css = /* CSS */ `
	
	* { color : hsl( 0  0%  30% ) ; }
	
	nav.TREE
	{
		cursor : default ;

		width : 220px ;
		list-style : none ;
		background : hsl( 215  50%  80% ) ;
		padding : 1ex ;

		font-family : sans-serif ;
	}

	.INDEX
	{
		border-radius : 0.0ex  0  0  0.0ex ;
		
		border-top    : 0.1ex solid hsl( 215  0%  40% ) ;
		border-bottom : 0.1ex solid hsl( 215  0%  40% ) ;

		border-left  : 0.5ex solid hsl( 215  0%  30% ) ;

		background-color : hsl( 215  50%  100% / 35% ) ;
	}

	.INDEX > ._HEAD
	{
		display : flex ;
		padding : 0.9ex  1ex ;
		gap : 1ex ;
	}

	.INDEX > ._HEAD > ._THUMB
	{
		color : hsl( 0  0%  60% ) ;
	}

	ul.PARTS
	{
		display : flex ;
		flex-direction : column ;

		padding-left : 1.5ex ;
		padding-bottom : 1.0ex ;
		gap : 0.1ex ;
	}
	
	`;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2x1ZGVuaWsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvQm9vay9BR19aLzAxL0NsdWRlbmlrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0MsRUFBRSxFQUFRLEtBQUssRUFBUSxNQUFNLHFCQUFxQixDQUFFO0FBQy9GLE9BQU8sS0FBSyxNQUFNLE1BQU0saUJBQWlCLENBQUU7QUFHM0MsTUFBTSxLQUFXLEVBQUUsQ0F5R2xCO0FBekdELFdBQWlCLEVBQUU7SUFFTCxNQUFHLEdBQUcsR0FBWSxFQUFFO1FBRWhDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FFWixFQUFFLE1BQU0sRUFBRyxDQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUcsR0FBRyxDQUFFLEVBQUUsRUFDakMsRUFBRSxDQUFDLElBQUksQ0FFTixFQUFFLEtBQUssRUFBRyxVQUFVLEVBQUUsRUFDdEIsRUFBRSxDQUFDLEVBQUUsQ0FBRyxFQUFFLEtBQUssRUFBRyxJQUFJLEVBQUUsRUFBRyxVQUFVLENBQUUsRUFDdkMsSUFBSSxFQUFHLENBQ1AsQ0FDRCxDQUFFO0lBQ0osQ0FBQyxDQUFBO0lBRUQsTUFBTSxLQUFLO1FBQUcsTUFBTSxHQUFHLENBQUMsQ0FBRTtRQUFDLElBQUksSUFBSSxLQUFlLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRyxDQUFFLENBQUMsQ0FBQztLQUFFO0lBRTdFLE1BQU0sSUFBSSxHQUFHLEdBQVksRUFBRTtRQUUxQixNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBRTtRQUV2QixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBRVosRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLEVBQ2xCLEtBQUssQ0FBRyxNQUFNLEVBQUcsR0FBRyxDQUFFLENBQ3RCLENBQUU7SUFDSixDQUFDLENBQUE7SUFFRCxNQUFNLEtBQUssR0FBRyxDQUFFLEtBQWMsRUFBRyxHQUFXLEVBQUcsUUFBaUIsQ0FBQyxFQUFZLEVBQUU7UUFFOUUsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsS0FBSyxFQUFHLE9BQU8sRUFBRSxFQUNuQixFQUFFLENBQUMsS0FBSyxDQUVQLEVBQUUsS0FBSyxFQUFHLENBQUUsT0FBTyxDQUFFLEVBQUUsRUFDdkIsRUFBRSxDQUFDLElBQUksQ0FBRyxFQUFFLEtBQUssRUFBRyxRQUFRLEVBQUUsRUFBRyxFQUFFLENBQUMsS0FBSyxDQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsSUFBSSxFQUFHLE9BQU8sRUFBRyxJQUFJLEVBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBRSxFQUFHLEdBQUcsQ0FBRSxFQUNuRyxFQUFFLENBQUMsSUFBSSxDQUFHLEVBQUUsS0FBSyxFQUFHLFFBQVEsRUFBRSxFQUFHLElBQUssS0FBTSxLQUFNLEdBQUcsQ0FBQyxJQUFLLEVBQUUsQ0FBRSxDQUMvRCxFQUNELEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBRyxLQUFLLEVBQUcsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDN0MsQ0FBRTtJQUNKLENBQUMsQ0FBQTtJQUVELE1BQU0sS0FBSyxHQUFHLENBQUUsS0FBYyxFQUFHLEdBQVcsRUFBWSxFQUFFO1FBRXpELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FFWCxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUUsRUFDbkIsR0FBSSxLQUFLLENBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFHLE1BQU0sR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsRUFBRyxHQUFHLEVBQUcsS0FBSyxHQUFHLENBQUMsQ0FBRSxDQUFFLENBQ3JFLENBQUU7SUFDSixDQUFDLENBQUE7SUFHRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0RyQixDQUFFO0FBQ0osQ0FBQyxFQXpHZ0IsRUFBRSxLQUFGLEVBQUUsUUF5R2xCIn0=