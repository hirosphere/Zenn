import { ef } from "../Meh/Meh.js";
export const Dyndex = dyndex("Dyndex");
function dyndex(title, depth = 0) {
    const rt = {
        type: "Dyndex",
        title,
        dyn_parts: index => parts.map(e => dyndex(e, depth + 1))
    };
    return rt;
}
const parts = ["Un", "Deux", "Trois"];
export var VC;
(function (VC) {
    function Page(index) {
        return ef.div({ shadow: css }, ef.main(ef.h1(index.title)));
    }
    VC.Page = Page;
    /* */
    const css = /* css */ `

	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ;  line-height : 1 ; }
	
	main
	{
		display : flex ;
		flex-direction : column ;
		padding : 1ex ;
		align-items : center ;
		gap : 1ex ;

		color : hsl( 0  0%  20% ) ;
	}
	
	
	
	`;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhRc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9JbmRleFFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUF3QixNQUFNLGVBQWUsQ0FBRTtBQUcxRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWMsTUFBTSxDQUFHLFFBQVEsQ0FBRSxDQUFFO0FBR3RELFNBQVMsTUFBTSxDQUFHLEtBQWMsRUFBRyxRQUFpQixDQUFDO0lBRXBELE1BQU0sRUFBRSxHQUNSO1FBQ0MsSUFBSSxFQUFHLFFBQVE7UUFDZixLQUFLO1FBQ0wsU0FBUyxFQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBRyxDQUFDLEVBQUcsS0FBSyxHQUFHLENBQUMsQ0FBRSxDQUFFO0tBQ2hFLENBQUE7SUFFRCxPQUFPLEVBQUUsQ0FBRTtBQUNaLENBQUM7QUFFRCxNQUFNLEtBQUssR0FBRyxDQUFFLElBQUksRUFBRyxNQUFNLEVBQUcsT0FBTyxDQUFFLENBQUU7QUFFM0MsTUFBTSxLQUFXLEVBQUUsQ0FrQ2xCO0FBbENELFdBQWlCLEVBQUU7SUFFbEIsU0FBZ0IsSUFBSSxDQUFHLEtBQWdCO1FBRXRDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FFWixFQUFFLE1BQU0sRUFBRyxHQUFHLEVBQUUsRUFDaEIsRUFBRSxDQUFDLElBQUksQ0FFTixFQUFFLENBQUMsRUFBRSxDQUFHLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FDckIsQ0FDRCxDQUFFO0lBQ0osQ0FBQztJQVZlLE9BQUksT0FVbkIsQ0FBQTtJQUVELEtBQUs7SUFFTCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJyQixDQUFFO0FBQ0osQ0FBQyxFQWxDZ0IsRUFBRSxLQUFGLEVBQUUsUUFrQ2xCIn0=