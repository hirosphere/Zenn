import { ef } from "../Meh/Meh.js";
const parts = ["Un", "Deux", "Trois"];
function dyndex(title, depth = 1) {
    const rt = {
        type: "Dyndex",
        title,
        open: depth == 1,
        dyn_parts: index => Object.fromEntries(parts.map(name => [name, dyndex(`${name} de ${depth}`, depth + 1)]))
    };
    return rt;
}
export const Dyndex = dyndex("Dyndex");
/* */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhRc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9JbmRleFFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUF3QixNQUFNLGVBQWUsQ0FBRTtBQUsxRCxNQUFNLEtBQUssR0FBRyxDQUFFLElBQUksRUFBRyxNQUFNLEVBQUcsT0FBTyxDQUFFLENBQUU7QUFFM0MsU0FBUyxNQUFNLENBQUcsS0FBYyxFQUFHLFFBQWlCLENBQUM7SUFFcEQsTUFBTSxFQUFFLEdBQ1I7UUFDQyxJQUFJLEVBQUcsUUFBUTtRQUNmLEtBQUs7UUFDTCxJQUFJLEVBQUcsS0FBSyxJQUFJLENBQUM7UUFDakIsU0FBUyxFQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FFdEMsS0FBSyxDQUFDLEdBQUcsQ0FFUixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBRyxHQUFJLElBQUssT0FBUSxLQUFNLEVBQUUsRUFBRyxLQUFLLEdBQUcsQ0FBQyxDQUFFLENBQUUsQ0FDbkUsQ0FDRDtLQUNELENBQUE7SUFFRCxPQUFPLEVBQUUsQ0FBRTtBQUNaLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWMsTUFBTSxDQUFHLFFBQVEsQ0FBRSxDQUFFO0FBSXRELEtBQUs7QUFFTCxNQUFNLEtBQVcsRUFBRSxDQWtDbEI7QUFsQ0QsV0FBaUIsRUFBRTtJQUVsQixTQUFnQixJQUFJLENBQUcsS0FBZ0I7UUFFdEMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsTUFBTSxFQUFHLEdBQUcsRUFBRSxFQUNoQixFQUFFLENBQUMsSUFBSSxDQUVOLEVBQUUsQ0FBQyxFQUFFLENBQUcsS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUNyQixDQUNELENBQUU7SUFDSixDQUFDO0lBVmUsT0FBSSxPQVVuQixDQUFBO0lBRUQsS0FBSztJQUVMLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQnJCLENBQUU7QUFDSixDQUFDLEVBbENnQixFQUFFLEtBQUYsRUFBRSxRQWtDbEIifQ==