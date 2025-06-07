import { leaf, ef } from "../../meh/index.js";
var VM;
(function (VM) {
    class Applet {
        counters = Array.from({ length: 5 }, i => new Counter());
    }
    VM.Applet = Applet;
    class Counter {
        count = leaf(0);
        step = leaf("120");
        constructor() {
            this.count.$ = +this.step.$ * Math.floor(Math.random() * 20);
        }
        add() {
            this.count.$ += Number(this.step.$);
        }
    }
    VM.Counter = Counter;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    /* CSS */
    const css = /* css */ `

	.FV { display : flex ; flex-direction : column ; }
	.FH { display : flex ; }
	.PGX { padding : 1ex ; gap : 1ex ; }
	.FWR { flex-wrap : wrap ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	button
	{
		border-radius : 1ex ;
		min-width : 5em ;
		height : 3em ;
		padding-inline : 1ex ;
	}

	button:focus
	{
		border : 2px  solid  oklch( 65%  50%  135 ) ;
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
		padding-block : 1.4ex ;
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
    /* */
    VC.Applet = (vm = new VM.Applet) => {
        return ef.main({ shadow: { css } }, ef.h1("実績カウンタ"), ef.section({ class: "FH FWR PGX JC" }, ...vm.counters.map(i => Counter(i))));
    };
    const Counter = (vm) => {
        return ef.article({ class: "Counter FV" }, ef.span({ class: "display" }, vm.count), ef.span({ class: "bar" }, ef.input({ style: { width: "5ex" }, binds: { value_input: vm.step } }), ef.button({ action: { click() { vm.add(); } } }, "追加"), ef.button({ action: { click() { vm.count.$ = 0; } } }, "リセット")));
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BRzIvQ291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBVSxFQUFFLEVBQWEsTUFBTSxvQkFBb0IsQ0FBRTtBQUVsRSxJQUFVLEVBQUUsQ0FzQlg7QUF0QkQsV0FBVSxFQUFFO0lBRVgsTUFBYSxNQUFNO1FBRWxCLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFHLEVBQUUsTUFBTSxFQUFHLENBQUMsRUFBRSxFQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUcsQ0FBRSxDQUFFO0tBQ2hFO0lBSFksU0FBTSxTQUdsQixDQUFBO0lBRUQsTUFBYSxPQUFPO1FBRW5CLEtBQUssR0FBRyxJQUFJLENBQUcsQ0FBQyxDQUFFLENBQUU7UUFDcEIsSUFBSSxHQUFHLElBQUksQ0FBRyxLQUFLLENBQUUsQ0FBRTtRQUV2QjtZQUVDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLENBQUMsTUFBTSxFQUFHLEdBQUcsRUFBRSxDQUFFLENBQUE7UUFDbEUsQ0FBQztRQUVELEdBQUc7WUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBRTtRQUN6QyxDQUFDO0tBQ0Q7SUFkWSxVQUFPLFVBY25CLENBQUE7QUFDRixDQUFDLEVBdEJTLEVBQUUsS0FBRixFQUFFLFFBc0JYO0FBRUQsTUFBTSxLQUFXLEVBQUUsQ0FzR2xCO0FBdEdELFdBQWlCLEVBQUU7SUFFbEIsU0FBUztJQUVULE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNERyQixDQUFFO0lBRUgsS0FBSztJQUVRLFNBQU0sR0FBRyxDQUFFLEtBQWlCLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRyxFQUFFO1FBRTFELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FFYixFQUFFLE1BQU0sRUFBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBRXBCLEVBQUUsQ0FBQyxFQUFFLENBQUcsUUFBUSxDQUFFLEVBRWxCLEVBQUUsQ0FBQyxPQUFPLENBRVQsRUFBRSxLQUFLLEVBQUcsZUFBZSxFQUFFLEVBQzNCLEdBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFFLENBQUUsQ0FDMUMsQ0FDRCxDQUFFO0lBQ0osQ0FBQyxDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBRSxFQUFlLEVBQUcsRUFBRTtRQUVyQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsS0FBSyxFQUFHLFlBQVksRUFBRSxFQUV4QixFQUFFLENBQUMsSUFBSSxDQUFHLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRSxFQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUUsRUFFNUMsRUFBRSxDQUFDLElBQUksQ0FFTixFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsRUFFakIsRUFBRSxDQUFDLEtBQUssQ0FBRyxFQUFFLEtBQUssRUFBRyxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsRUFBRyxLQUFLLEVBQUcsRUFBRSxXQUFXLEVBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUUsRUFDOUUsRUFBRSxDQUFDLE1BQU0sQ0FBRyxFQUFFLE1BQU0sRUFBRyxFQUFFLEtBQUssS0FBTSxFQUFFLENBQUMsR0FBRyxFQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFHLElBQUksQ0FBRSxFQUM5RCxFQUFFLENBQUMsTUFBTSxDQUFHLEVBQUUsTUFBTSxFQUFHLEVBQUUsS0FBSyxLQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUcsTUFBTSxDQUFFLENBQ3JFLENBQ0QsQ0FBRTtJQUNKLENBQUMsQ0FBQTtBQUNGLENBQUMsRUF0R2dCLEVBQUUsS0FBRixFQUFFLFFBc0dsQiJ9