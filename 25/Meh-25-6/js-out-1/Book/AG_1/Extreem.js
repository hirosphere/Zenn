import { LS, ef, pl, DOM } from "../../Meh/Meh.js";
const log = console.log;
export var VM;
(function (VM) {
    const sample = {
        title: "Extreem",
        parts: [
        //	{ title : "人より 力持ち" , parts : [] } ,
        //	{ title : "ふるさと 後にして" , parts : [] } ,
        //	{ title : "みんなの 人気者" , parts : [] } ,
        ]
    };
    class Applet {
        root = new DM.Node(sample);
        ct = LS(0);
        constructor() {
            VM.testTree(this.root);
        }
    }
    VM.Applet = Applet;
    VM.newPart = (node) => {
        node.parts.insert([{ title: "Node", parts: [] }]);
    };
    VM.testTree = (node) => {
        node.parts.clear();
        let ct = 0;
        const create = (limit, path = []) => {
            if (limit <= 0)
                return [];
            return each(r(5, 5), i => {
                ct++;
                const ipath = [...path, i + 1];
                const rt = {
                    title: `Recursion ${ipath.join("-")}`,
                    parts: create(limit - 1, ipath)
                };
                return rt;
            });
        };
        node.parts.insert(create(4));
        log(ct);
        return ct;
    };
    const each = (length, fn) => {
        const rt = Array(length);
        for (let i = 0; i < length; i++)
            rt[i] = fn(i);
        return rt;
    };
    const r = (min, max) => Math.floor(min + Math.random() * ((max - min) + 1));
})(VM || (VM = {}));
export var VC;
(function (VC) {
    const rootCSS = /* CSS */ `

		* { margin : 0 ; padding : 0 ; box-sizing : border-box ; }

		.FR { display : flex ; }
		.FC { display : flex ; flex-direction : column ; }
		.JC { justify-content : center ; }
		.AC { align-items : center ; }
		.FWR { flex-wrap : wrap ; }
		.PGMM { padding : 1em ; gap : 1em ; }
		.PGMX { padding : 1em ; gap : 1ex ; }
		.PGXX { padding : 1ex ; gap : 1ex ; }
`;
    const css = /* css */ `

		:host {}

		h1 { padding : 1ex ; text-align : center ; }

		.TEST { background : aqua ; }

		.TREE
		{
			width : clamp( 300px , 33em , 100% ) ;
			background : hsl( 210  100%  45% / 5% ) ;

			font-size : 1.6rem ;
		}

		.NODES:not(:empty)
		{
			display : flex ;
			flex-direction : column ;

			padding-block : 1ex 1ex ;
			padding-inline : 3em 1ex ;

			gap : 0.8ex ;

			font-size : 0.7862em ;
		}
	
		.NODE
		{
			border : 0.4ex  solid  hsl( 0  0%  0% / 70% ) ;
			border-radius: 2.5ex ;

			background : hsl( 180  100%  45% / 5% ) ;

			list-style : none ;
			cursor : default ;
			overflow : hidden ;

			transition : background-color 0.2s ,  border-color 0.2s ;
		}

		/* .NODE:hover
		{
			border-color : hsl( 185  50%  50% ) ;
			background : hsl( 185  100%  100% ) ;
		} */

		.NODE > .HEAD
		{
			font-size : max( 1em , 0.5rem ) ;

			border-radius : 0.2ex ;
			background : hsl( 0  0%  0% / 7% ) ;

			display : grid ;
			height : 3.6em ;

			padding-inline : 1em ;

			grid-template-columns : auto 1fr auto  auto  auto ;
			align-items : center ;
			
			gap : 0.6ex ;
			white-space : nowrap ;
		}

		.NODE:hover > .HEAD
		{
			background : hsl( 0  0%  0% / 80% ) ;
			color : hsl( 0  0%  100% ) ;
		}

		.NODE > .HEAD > .TITLE
		{
			border-radius : 0.0ex ;
			padding-inline : 1ex ;
		}

		.NODE > .HEAD > .COMMAND
		{
			border : none ; border-radius : 1ex ;  background : none ;  font-size : 70% ;
			padding : 0.5ex 0.4ex ;
		}

		.NODE .COMMAND:hover
		{
			background : hsl( 28  10%  88% ) ;
		}

		a { text-decoration : none ; color : hsl( 0  0%  37% ) ; }
	
	`;
    VC.Applet = () => {
        const vm = new VM.Applet;
        return ef.main({ class: "FC AC PGXX TEST", shadow: [rootCSS, css] }, ef.h1("Extreem"), ef.section({ class: "TREE" }, Node(vm, vm.root)), ef.footer({ class: "FR PGMM" }, ef.a({ attrs: { href: "./zz-index.html" } }, "index"), ef.a({
            attrs: {
                href: "https://github.com/hirosphere/Zenn/blob/gh-pages/25/Meh-25-6/ts-src/Book/AG_1/Extreem.ts",
                target: "_blank"
            },
        }, "ts-src")));
    };
    const Nodes = (appVM, dm) => {
        return ef.ul({ class: "NODES" }, pl.each(dm.renn, (o) => Node(appVM, o.target)));
    };
    const Node = (appVM, node) => {
        return ef.li({ class: "NODE AC" }, ef.span({ class: "HEAD" }, Command("+", "", () => 0), ef.span({ class: "TITLE" }, node.title), Command("CLR", "Clear", () => node.parts.clear()), Command("TREE", "New Tree", () => appVM.ct.$ = VM.testTree(node)), Command("PART", "New Part", () => VM.newPart(node))), Nodes(appVM, node.parts));
    };
    const Command = (title, tip, oper) => ef.button({
        class: "COMMAND",
        attrs: { title: tip },
        passive: { click(ev) { oper(); } }
    }, title);
    VC.main = () => {
        DOM.add(ef.body({ shadow: rootCSS }, VC.Applet()), "html");
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRXh0cmVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsRUFBRSxFQUF1QixFQUFFLEVBQUcsRUFBRSxFQUFHLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBQ2xGLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUU7QUFrQnpCLE1BQU0sS0FBVyxFQUFFLENBcUVsQjtBQXJFRCxXQUFpQixFQUFFO0lBRWxCLE1BQU0sTUFBTSxHQUNaO1FBQ0MsS0FBSyxFQUFHLFNBQVM7UUFDakIsS0FBSyxFQUNMO1FBQ0EsdUNBQXVDO1FBQ3ZDLHlDQUF5QztRQUN6Qyx3Q0FBd0M7U0FDdkM7S0FDRCxDQUFBO0lBRUQsTUFBYSxNQUFNO1FBRUYsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRyxNQUFNLENBQUUsQ0FBRTtRQUMvQixFQUFFLEdBQUcsRUFBRSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBRS9CO1lBRUMsR0FBQSxRQUFRLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFFO1FBQ3pCLENBQUM7S0FDRDtJQVRZLFNBQU0sU0FTbEIsQ0FBQTtJQUVZLFVBQU8sR0FBRyxDQUFFLElBQWMsRUFBVSxFQUFFO1FBRWxELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFHLENBQUUsRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFHLEtBQUssRUFBRyxFQUFFLEVBQUUsQ0FBRSxDQUFFLENBQUU7SUFDNUQsQ0FBQyxDQUFBO0lBRVksV0FBUSxHQUFHLENBQUUsSUFBYyxFQUFZLEVBQUU7UUFFckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUcsQ0FBRTtRQUVyQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWCxNQUFNLE1BQU0sR0FBRyxDQUFFLEtBQWMsRUFBRyxPQUFtQixFQUFFLEVB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