import { ef, DOM as dom } from "../../Meh/Meh.js";
const log = console.log;
var VM;
(function (VM) {
    class App {
        play() {
            ;
        }
    }
    VM.App = App;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    const css = /* css */ `

	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

	.FR { display : flex ;  flex-direction : row ; }
	.FC { display : flex ;  flex-direction : column ; }
	.OA { overflow : auto ; }
	.AC { align-items : center ; }
	.PGMM { padding : 1em ;  gap : 1em ; }
	.PGMX { padding : 1em ;  gap : 1ex ; }
	.PGXX { padding : 1ex ;  gap : 1ex ; }
	.TC { text-align : center ; }

	button { padding : 1ex 1em ; }
	
	`;
    function App() {
        const app = new VM.App();
        return ef.div({ shadow: css }, ef.main({ class: "FC PGXX TC" }, ef.h1("Tonne"), Pane(app)));
    }
    VC.App = App;
    function Pane(app) {
        return ef.section(ef.button({}, "鳴れ"));
    }
    /* */
    function main() {
        dom.add(App(), "body");
    }
    VC.main = main;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9ubmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BR18xL1Rvbm5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxFQUFFLEVBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUUzRSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFFO0FBVXpCLElBQVUsRUFBRSxDQVNYO0FBVEQsV0FBVSxFQUFFO0lBRVgsTUFBYSxHQUFHO1FBRVIsSUFBSTtZQUVWLENBQUM7UUFDRixDQUFDO0tBQ0Q7SUFOWSxNQUFHLE1BTWYsQ0FBQTtBQUNGLENBQUMsRUFUUyxFQUFFLEtBQUYsRUFBRSxRQVNYO0FBS0QsTUFBTSxLQUFXLEVBQUUsQ0FrRGxCO0FBbERELFdBQWlCLEVBQUU7SUFFbEIsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7RUFlckIsQ0FBRTtJQUVILFNBQWdCLEdBQUc7UUFFbEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFHLENBQUU7UUFFM0IsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsTUFBTSxFQUFHLEdBQUcsRUFBRSxFQUVoQixFQUFFLENBQUMsSUFBSSxDQUVOLEVBQUUsS0FBSyxFQUFHLFlBQVksRUFBRSxFQUN4QixFQUFFLENBQUMsRUFBRSxDQUFHLE9BQU8sQ0FBRSxFQUNqQixJQUFJLENBQUcsR0FBRyxDQUFFLENBQ1osQ0FDRCxDQUFFO0lBQ0osQ0FBQztJQWZlLE1BQUcsTUFlbEIsQ0FBQTtJQUVELFNBQVMsSUFBSSxDQUFHLEdBQVk7UUFFM0IsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFFLENBQUMsTUFBTSxDQUFHLEVBQUksRUFBRyxJQUFJLENBQUUsQ0FDekIsQ0FBRTtJQUNKLENBQUM7SUFFRCxLQUFLO0lBRUwsU0FBZ0IsSUFBSTtRQUVuQixHQUFHLENBQUMsR0FBRyxDQUFHLEdBQUcsRUFBRyxFQUFHLE1BQU0sQ0FBRSxDQUFFO0lBQzlCLENBQUM7SUFIZSxPQUFJLE9BR25CLENBQUE7QUFDRixDQUFDLEVBbERnQixFQUFFLEtBQUYsRUFBRSxRQWtEbEIifQ==