import { Ease, LS, ef, pl, DOM } from "../../Meh/Meh.js";
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
        root = Ease(sample);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRXh0cmVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLEVBQUUsRUFBdUIsRUFBRSxFQUFHLEVBQUUsRUFBRyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUNsRixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFFO0FBaUJ6QixNQUFNLEtBQVcsRUFBRSxDQXFFbEI7QUFyRUQsV0FBaUIsRUFBRTtJQUVsQixNQUFNLE1BQU0sR0FDWjtRQUNDLEtBQUssRUFBRyxTQUFTO1FBQ2pCLEtBQUssRUFDTDtRQUNBLHVDQUF1QztRQUN2Qyx5Q0FBeUM7UUFDekMsd0NBQXdDO1NBQ3ZDO0tBQ0QsQ0FBQTtJQUVELE1BQWEsTUFBTTtRQUVGLElBQUksR0FBYSxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDbEMsRUFBRSxHQUFHLEVBQUUsQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUUvQjtZQUVDLEdBQUEsUUFBUSxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBRTtRQUN6QixDQUFDO0tBQ0Q7SUFUWSxTQUFNLFNBU2xCLENBQUE7SUFFWSxVQUFPLEdBQUcsQ0FBRSxJQUFjLEVBQVUsRUFBRTtRQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRyxDQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUFFO0lBQzVELENBQUMsQ0FBQTtJQUVZLFdBQVEsR0FBRyxDQUFFLElBQWMsRUFBWSxFQUFFO1FBRXJELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUU7UUFFckIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVgsTUFBTSxNQUFNLEdBQUcsQ0FBRSxLQUFjLEVBQUcsT0FBbUIsRUFBRSxFQUFnQixF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