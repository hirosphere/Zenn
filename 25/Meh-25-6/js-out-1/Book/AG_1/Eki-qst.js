import { Live, Key, ef, pl, log } from "../../Meh/Meh.js";
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
	.PGXX { padding : 1ex ; gap : 1ex ; }
	.OA { overflow : auto ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	:host
	{
		color : hsl( 0  0%  10% ) ;
	}

	main { padding : 1em ; gap : 5em ; }


	.Index
	{
		width : 100% ;
		border : 0.05ex  solid  hsl( 45  5%  90% ) ;
		border-radius : 1.0em ;

		display : none ;

		padding : 0.4em ;
		gap : 1ex ;

		background : hsl( 176  50%  50% / 10% ) ;
	}

	.Index.Selected { display : flex ; }

	.Index.Root { font-size: 1.00em ; }
	.Index > .Index { font-size : 1.00em ; }


	ul.Tabs
	{
		cursor : default ;

		max-height : 14em ;
		overflow : auto ;

		border : 1px solid hsl( 0  0%  75% ) ;
		border-radius : 1ex ;

		display : flex ;
		list-style : none ;
		gap: 0.4ex  0.1ex ;
		flex-wrap : wrap ;

		padding : 1em ;
		justify-content : center ;
	}

	li.Tab
	{
		background-color : hsl( 45  3%  96% ) ;
		border-bottom : 0.3ex  solid  hsl( 45  3%  80% ) ;
		padding : 1.2ex 1.36em ;
		white-space : nowrap ;
		color : hsl( 45  0%  13% ) ;
	}

	li.Tab:hover
	{
		background-color : hsl( 45  3%  94% ) ;
		border-color : hsl( 45  3%  70% ) ;
	}

	li.Selected ,
	li.Selected:hover
	{
		border-color : hsl( 96  50%  50% ) ;
		background-color : hsl( 45  3%  92% ) ;

		border-bottom-width : 0.5ex ;
		padding-bottom : 0.8ex ;
	}

	li.Selected:hover
	{
		background-color : hsl( 45  3%  90% ) ;
	}

	footer { height : 20em ; }
	
	`;
    VC.App = (dapapath) => {
        const index = Live(uned);
        const index2 = Live(uned);
        const index3 = Live(uned);
        DM.load(dapapath, (eki) => {
            index3.$ = new VM.Index(eki.rootIndex);
            index2.$ = new VM.Index(eki.rootIndex);
            index.$ = new VM.Index(eki.rootIndex);
        });
        return ef.div({ shadow: css }, ef.main({ class: "FC OA AC" }, ef.h1("Eki API"), pl.key(index, vm => vm ? Index(vm, true) : uned), 
        // pl.key ( index2 , vm => vm ? Index ( vm ) : uned ) ,
        // pl.key ( index3 , vm => vm ? Index ( vm ) : uned ) ,
        ef.footer()));
    };
    const Index = (vm, isroot = false) => ef.section({ class: ["Index FC AC", { Selected: vm.selected ?? true, Root: isroot }] }, ef.h2(vm.dm.name), vm.parts.length ? Tabs(vm) : uned, pl.key(vm.current, index => (index ? Index(index) : uned)));
    const Tabs = (index) => ef.ul({ class: "Tabs" }, ...index.parts.map(part => Tab(part)));
    const Tab = (index) => ef.li({
        class: ["Tab", { Selected: index.selected ?? false }],
        active: {
            click(ev) { index.selected?.select(); }
        }
    }, index.dm.name);
    VC.TabsSwitch = (index) => ef.section({ class: "TabsSwitch" }, pl.key(index.current, part => part?.dm.name ?? "-.."));
})(VC || (VC = {}));
export const EkiApp = VC.App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpLXFzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRWtpLXFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFVLEdBQUcsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFjLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUV4QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUU7QUFLeEIsZUFBZTtBQUVmLElBQVUsRUFBRSxDQVNYO0FBVEQsV0FBVSxFQUFFO0lBRUosS0FBSyxVQUFVLElBQUksQ0FBRyxTQUFrQixFQUFHLE1BQThCO1FBRS9FLEdBQUcsQ0FBRyxTQUFTLENBQUUsQ0FBRTtRQUVuQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUcsU0FBUyxDQUFFLENBQUU7UUFDNUMsTUFBTSxDQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQ2pCLENBQUM7SUFOcUIsT0FBSSxPQU16QixDQUFBO0FBQ0YsQ0FBQyxFQVRTLEVBQUUsS0FBRixFQUFFLFFBU1g7QUFHRCxnQkFBZ0I7QUFFaEIsSUFBVSxFQUFFLENBeUJYO0FBekJELFdBQVUsRUFBRTtJQUlYLE1BQWEsS0FBTSxTQUFRLEdBQVc7UUFPcEI7UUFMVixLQUFLLENBQWE7UUFDVCxRQUFRLENBQXdCO1FBRWhELFlBRWlCLEVBQWMsRUFDOUIsR0FBYTtZQUdiLEtBQUssQ0FBRyxJQUFJLENBQVcsSUFBSSxDQUFFLENBQUUsQ0FBRTtZQUpqQixPQUFFLEdBQUYsRUFBRSxDQUFZO1lBSzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQU0sRUFBRSxHQUFHLENBRTFCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUcsSUFBSSxFQUFHLElBQUksQ0FBRSxDQUVqQyxJQUFJLEVBQUUsQ0FB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