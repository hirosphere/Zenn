import { Leaf, Live, ef, pl, DOM } from "../../Meh/Meh.js";
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
        root = Live(sample);
        ct = Leaf(0);
        constructor() {
            VM.testTree(this.root);
        }
    }
    VM.Applet = Applet;
    VM.newPart = (node) => {
        node.parts.insert([{ title: "Node", parts: [] }]);
    };
    VM.testTree = (node) => {
        node.parts.renn.clear();
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
			height : 2.2em ;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRXh0cmVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsSUFBSSxFQUFrQixJQUFJLEVBQVEsRUFBRSxFQUFHLEVBQUUsRUFBRyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUMzRixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFFO0FBbUJ6QixNQUFNLEtBQVcsRUFBRSxDQXFFbEI7QUFyRUQsV0FBaUIsRUFBRTtJQUVsQixNQUFNLE1BQU0sR0FDWjtRQUNDLEtBQUssRUFBRyxTQUFTO1FBQ2pCLEtBQUssRUFDTDtRQUNBLHVDQUF1QztRQUN2Qyx5Q0FBeUM7UUFDekMsd0NBQXdDO1NBQ3ZDO0tBQ0QsQ0FBQTtJQUVELE1BQWEsTUFBTTtRQUVGLElBQUksR0FBRyxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDeEIsRUFBRSxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUVqQztZQUVDLEdBQUEsUUFBUSxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBRTtRQUN6QixDQUFDO0tBQ0Q7SUFUWSxTQUFNLFNBU2xCLENBQUE7SUFFWSxVQUFPLEdBQUcsQ0FBRSxJQUFjLEVBQVUsRUFBRTtRQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRyxDQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUFFO0lBQzVELENBQUMsQ0FBQTtJQUVZLFdBQVEsR0FBRyxDQUFFLElBQWMsRUFBWSxFQUFFO1FBRXJELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRyxDQUFFO1FBRTFCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVYLE1BQU0sTUFBTSxHQUFHLENBQUUsS0FBYyxFQUFHLE9BQW1CLEVB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