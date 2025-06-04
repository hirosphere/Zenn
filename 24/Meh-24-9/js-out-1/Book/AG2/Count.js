import { leaf, ef } from "../../meh/index.js";
var VM;
(function (VM) {
    class Applet {
        counters = [new Counter(),];
    }
    VM.Applet = Applet;
    class Counter {
        count = leaf(0);
        step = leaf("120");
        add() {
            this.count.$ += Number(this.step.$);
        }
    }
    VM.Counter = Counter;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    const css = /* css */ `

	.FV { display : flex ; flex-direction : column ; }

	button
	{
		border-radius : 1ex ;
		min-width : 5em ;
		height : 3em ;
		padding-inline : 1ex ;
	}

	:host
	{
		display : flex ;
		flex-direction : column ;
		align-items : center ;
	}
	
	.Counter
	{
		border-radius : 1em ;
		background : oklch( 100%  0%  0 / 70% ) ;
		height : 12em ;

		padding : 1em ;
	}

	.Counter .display
	{
		width : 6em ;
		padding-block : 1ex ;
		text-align : center ;
		font-size : 48px ;
	}

	.Counter .bar
	{
		display : flex ;
		justify-content : center ;
		align-items : stretch ;
		gap : 0.8ex ;
	}

	.Counter input
	{
		font-size : 24px ;
		text-align : center ;
	}

	`;
    VC.Applet = (vm = new VM.Applet) => {
        return ef.main({ shadow: { css } }, ef.h1("実績カウンタ"), ...vm.counters.map(i => Counter(i)));
    };
    const Counter = (vm) => {
        return ef.article({ class: "Counter FV" }, ef.span({ class: "display" }, vm.count), ef.span({ class: "bar" }, ef.input({ style: { width: "5ex" }, binds: { value_input: vm.step } }), ef.button({ acts: { click() { vm.add(); } } }, "追加"), ef.button({ acts: { click() { vm.count.$ = 0; } } }, "リセット")));
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BRzIvQ291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBVSxFQUFFLEVBQWEsTUFBTSxvQkFBb0IsQ0FBRTtBQUVsRSxJQUFVLEVBQUUsQ0FpQlg7QUFqQkQsV0FBVSxFQUFFO0lBRVgsTUFBYSxNQUFNO1FBRWxCLFFBQVEsR0FBRyxDQUFFLElBQUksT0FBTyxFQUFHLEVBQUksQ0FBRTtLQUNqQztJQUhZLFNBQU0sU0FHbEIsQ0FBQTtJQUVELE1BQWEsT0FBTztRQUVuQixLQUFLLEdBQUcsSUFBSSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBQ3BCLElBQUksR0FBRyxJQUFJLENBQUcsS0FBSyxDQUFFLENBQUU7UUFFdkIsR0FBRztZQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxDQUFFO1FBQ3pDLENBQUM7S0FDRDtJQVRZLFVBQU8sVUFTbkIsQ0FBQTtBQUNGLENBQUMsRUFqQlMsRUFBRSxLQUFGLEVBQUUsUUFpQlg7QUFFRCxNQUFNLEtBQVcsRUFBRSxDQW9GbEI7QUFwRkQsV0FBaUIsRUFBRTtJQUVsQixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0RyQixDQUFFO0lBRVUsU0FBTSxHQUFHLENBQUUsS0FBaUIsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFHLEVBQUU7UUFFMUQsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViLEVBQUUsTUFBTSxFQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFFcEIsRUFBRSxDQUFDLEVBQUUsQ0FBRyxRQUFRLENBQUUsRUFFbEIsR0FBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUUsQ0FBRSxDQUMxQyxDQUFFO0lBQ0osQ0FBQyxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBRSxFQUFlLEVBQUcsRUFBRTtRQUVyQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsS0FBSyxFQUFHLFlBQVksRUFBRSxFQUV4QixFQUFFLENBQUMsSUFBSSxDQUFHLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRSxFQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUUsRUFFNUMsRUFBRSxDQUFDLElBQUksQ0FFTixFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsRUFFakIsRUFBRSxDQUFDLEtBQUssQ0FBRyxFQUFFLEtBQUssRUFBRyxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsRUFBRyxLQUFLLEVBQUcsRUFBRSxXQUFXLEVBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUUsRUFDOUUsRUFBRSxDQUFDLE1BQU0sQ0FBRyxFQUFFLElBQUksRUFBRyxFQUFFLEtBQUssS0FBTSxFQUFFLENBQUMsR0FBRyxFQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFHLElBQUksQ0FBRSxFQUM1RCxFQUFFLENBQUMsTUFBTSxDQUFHLEVBQUUsSUFBSSxFQUFHLEVBQUUsS0FBSyxLQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUcsTUFBTSxDQUFFLENBQ25FLENBQ0QsQ0FBRTtJQUNKLENBQUMsQ0FBQTtBQUNGLENBQUMsRUFwRmdCLEVBQUUsS0FBRixFQUFFLFFBb0ZsQiJ9