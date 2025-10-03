import { Live, Renn, Key, ef, pl, log } from "../../Meh/Meh.js";
import { Eki } from "../../API/Eki.js";
const uned = undefined;
/* Doc Model */
var DM;
(function (DM) {
    async function load(data_path, onload) {
        log(data_path);
        const eki = await Eki.create(data_path);
        onload(eki);
    }
    DM.load = load;
})(DM || (DM = {}));
/* View Model */
var VM;
(function (VM) {
    class Index extends Key {
        dm;
        parts;
        selected;
        constructor(dm, agg) {
            super(Live(uned));
            this.dm = dm;
            this.parts = dm.parts?.map(part => new Index(part, this)) ?? [];
            this.selected = agg?.get_item(this);
        }
    }
    VM.Index = Index;
})(VM || (VM = {}));
/* View Component */
var VC;
(function (VC) {
    const css = /* css */ `
	
	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }
	
	.FC { display : flex ; flex-direction : column ; }
	.FR { display : flex ; flex-direction : row ; }
	.PGMM { padding : 1em ; gap : 1em ; }
	.PGMX { padding : 1em ; gap : 1ex ; }
	.OA { overflow : auto ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	:host
	{
		color : hsl( 0  0%  7% ) ;
	}

	ul.Tabs
	{
		cursor : default ;

		display : flex ;
		list-style : none ;
		gap: 0.4ex  0.1ex ;
		flex-wrap : wrap ;
		justify-content : center ;
	}

	li.Tab
	{
		background-color : hsl( 45  3%  96% ) ;
		border-bottom : 0.3ex  solid  hsl( 45  3%  80% ) ;
		padding : 1.0ex 1.2em ;
		white-space : nowrap ;
	}

	li.Tab:hover
	{
		background-color : hsl( 45  3%  92% ) ;
		border-color : hsl( 45  3%  70% ) ;
	}

	li.Selected , li.Selected:hover
	{
		border-color : hsl( 96  50%  50% ) ;
		background-color : hsl( 45  3%  14% ) ;

		color : hsl( 0  0  100% ) ;
	
		border-bottom-width : 0.4ex ;
		padding-bottom : 0.9ex ;
	}

	.Index
	{
		display : none ;
	}

	.Index.Selected { display : flex ; }

	.Index > .Index
	{
		font-size : 1.00em ;
	}

	footer { height : 20em ; }
	
	`;
    VC.App = (dapapath) => {
        const lc = new Renn();
        DM.load(dapapath, (eki) => { lc.insert([eki.rootIndex]); });
        return ef.div({ shadow: css }, ef.main({ class: "FC PGMX OA AC" }, ef.h1("Eki API"), pl.each(lc, index => Index(new VM.Index(index))), ef.footer()));
    };
    const Index = (vm) => ef.section({ class: ["Index  FC PGMM AC", { Selected: vm.selected ?? true }] }, ef.h2(vm.dm.name), Tabs(vm), pl.flush(vm.current, index => (index ? Index(index) : uned)));
    const Tabs = (index) => ef.ul({ class: "Tabs" }, ...index.parts.map(part => Tab(part)));
    const Tab = (index) => ef.li({
        class: ["Tab", { Selected: index.selected ?? false }],
        active: {
            click(ev) { index.selected?.select(); }
        }
    }, index.dm.name);
    VC.TabsSwitch = (index) => ef.section({ class: "TabsSwitch" }, pl.flush(index.current, part => part?.dm.name ?? "-.."));
})(VC || (VC = {}));
export const EkiApp = VC.App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpLXFzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRWtpLXFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxHQUFHLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBYyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUNqRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFFeEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFFO0FBS3hCLGVBQWU7QUFFZixJQUFVLEVBQUUsQ0FTWDtBQVRELFdBQVUsRUFBRTtJQUVKLEtBQUssVUFBVSxJQUFJLENBQUcsU0FBa0IsRUFBRyxNQUE4QjtRQUUvRSxHQUFHLENBQUcsU0FBUyxDQUFFLENBQUU7UUFFbkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFHLFNBQVMsQ0FBRSxDQUFFO1FBQzVDLE1BQU0sQ0FBRyxHQUFHLENBQUUsQ0FBRTtJQUNqQixDQUFDO0lBTnFCLE9BQUksT0FNekIsQ0FBQTtBQUNGLENBQUMsRUFUUyxFQUFFLEtBQUYsRUFBRSxRQVNYO0FBR0QsZ0JBQWdCO0FBRWhCLElBQVUsRUFBRSxDQXlCWDtBQXpCRCxXQUFVLEVBQUU7SUFJWCxNQUFhLEtBQU0sU0FBUSxHQUFXO1FBT3BCO1FBTFYsS0FBSyxDQUFhO1FBQ1QsUUFBUSxDQUF3QjtRQUVoRCxZQUVpQixFQUFjLEVBQzlCLEdBQWE7WUFHYixLQUFLLENBQUcsSUFBSSxDQUFXLElBQUksQ0FBRSxDQUFFLENBQUU7WUFKakIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUs5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFNLEVBQUUsR0FBRyxDQUUxQixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFHLElBQUksRUFBRyxJQUFJLENBQUUsQ0FFakMsSUFB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