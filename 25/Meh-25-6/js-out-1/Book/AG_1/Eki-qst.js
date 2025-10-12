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
    class Index {
        dm;
        curr_part = new Key(Live(uned));
        parts;
        selected;
        constructor(dm, agg) {
            this.dm = dm;
            this.parts = dm.parts?.map(part => new Index(part, this)) ?? [];
            this.selected = agg?.curr_part.match(this);
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
		height : 100% ;
		overflow : auto ;
		color : hsl( 0  0%  10% ) ;
	}

	main
	{
		height : 100% ;
		background-color : hsl( 176  55%  65% ) ;
		padding : 1em ; gap : 5em ;
	}


	.Index
	{
		width : 100% ;
		border : 0.05ex  solid  hsl( 45  5%  90% ) ;
		border-radius : 1.0em ;

		display : none ;

		padding : 0.4em ;
		gap : 1ex ;

		background : hsl( 176  0%  100% / 25% ) ;
	}

	.Index.Selected { display : flex ; }

	.Index.Root { font-size: 1.00em ; }
	.Index > .Index { font-size : 1.00em ; }


	ul.Tabs
	{
		cursor : default ;

		max-height : 55vh ;
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

	footer { padding-block : 30vh ; color: #fff ; }
	
	`;
    VC.App = (dapapath) => {
        const index = Live(uned);
        DM.load(dapapath, eki => {
            index.$ = new VM.Index(eki.rootIndex);
        });
        return ef.div({ shadow: css }, ef.main({ class: "FC OA AC" }, ef.h1("Eki API"), pl.key(index, vm => vm ? Index(vm, true) : uned), 
        // pl.key ( index2 , vm => vm ? Index ( vm ) : uned ) ,
        // pl.key ( index3 , vm => vm ? Index ( vm ) : uned ) ,
        ef.footer("foot")));
    };
    const Index = (vm, isroot = false) => ef.section({ class: ["Index FC AC", { Selected: vm.selected ?? true, Root: isroot }] }, ef.h2(vm.dm.name), vm.parts.length ? Tabs(vm) : uned, pl.key(vm.curr_part.key, pvm => (pvm ? Index(pvm) : uned)));
    const Tabs = (index) => ef.ul({ class: "Tabs" }, ...index.parts.map(part => Tab(part)));
    const Tab = (index) => ef.li({
        class: ["Tab", { Selected: index.selected ?? false }],
        active: {
            click(ev) { index.selected?.select(); }
        }
    }, index.dm.name);
})(VC || (VC = {}));
export const EkiApp = VC.App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpLXFzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRWtpLXFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFVLEdBQUcsRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFjLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUV4QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUU7QUFLeEIsZUFBZTtBQUVmLElBQVUsRUFBRSxDQVNYO0FBVEQsV0FBVSxFQUFFO0lBRUosS0FBSyxVQUFVLElBQUksQ0FBRyxTQUFrQixFQUFHLE1BQThCO1FBRS9FLEdBQUcsQ0FBRyxTQUFTLENBQUUsQ0FBRTtRQUVuQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUcsU0FBUyxDQUFFLENBQUU7UUFDNUMsTUFBTSxDQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQ2pCLENBQUM7SUFOcUIsT0FBSSxPQU16QixDQUFBO0FBQ0YsQ0FBQyxFQVRTLEVBQUUsS0FBRixFQUFFLFFBU1g7QUFHRCxnQkFBZ0I7QUFFaEIsSUFBVSxFQUFFLENBMEJYO0FBMUJELFdBQVUsRUFBRTtJQUlYLE1BQWEsS0FBSztRQVNBO1FBUFYsU0FBUyxHQUFHLElBQUksR0FBRyxDQUFHLElBQUksQ0FBVyxJQUFJLENBQUUsQ0FBRSxDQUFFO1FBRS9DLEtBQUssQ0FBYTtRQUNULFFBQVEsQ0FBd0I7UUFFaEQsWUFFaUIsRUFBYyxFQUM5QixHQUFhO1lBREcsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUk5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFNLEVBQUUsR0FBRyxDQUUxQixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFHLElBQUksRUFBRyxJQUFJLENBQUUsQ0FFakMsSUFBSSxFQUFF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