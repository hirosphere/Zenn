import { Ease, Live, ef, pl, DOM } from "../../Meh/Meh.js";
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
        ct = Live(0);
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
            log(path.join("."));
            return each(r(3, 6), i => {
                ct++;
                const ipath = [...path, i + 1];
                const rt = {
                    title: `Recursion ${ipath.join("-")}`,
                    parts: create(limit - 1, ipath)
                };
                return rt;
            });
        };
        node.parts.insert(create(3));
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

			font-size : 1.0rem ;
		}

		.NODES:not(:empty)
		{
			display : flex ;
			flex-direction : column ;

			padding-block : 1ex 1ex ;
			padding-inline : 3em 1ex ;

			gap : 0.8ex ;

			font-size : 0.908em ;
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
			font-size : max( 1.2em , 0.5rem ) ;

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
			background : hsl( 0  0%  0% / 10% ) ;
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
        return ef.ul({ class: "NODES" }, pl.each(dm.renn, (p) => Node(appVM, p)));
    };
    const Node = (app, node) => {
        return ef.li({ class: "NODE AC" }, ef.span({ class: "HEAD" }, Command("+", "", () => 0), ef.span({ class: "TITLE" }, node.title), Command("CLR", "Clear", () => node.parts.clear()), Command("TREE", "New Tree", () => app.ct.$ = VM.testTree(node)), Command("PART", "New Part", () => VM.newPart(node))), Nodes(app, node.parts));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRXh0cmVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBdUIsRUFBRSxFQUFHLEVBQUUsRUFBRyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUNwRixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFFO0FBaUJ6QixNQUFNLEtBQVcsRUFBRSxDQXVFbEI7QUF2RUQsV0FBaUIsRUFBRTtJQUVsQixNQUFNLE1BQU0sR0FDWjtRQUNDLEtBQUssRUFBRyxTQUFTO1FBQ2pCLEtBQUssRUFDTDtRQUNBLHVDQUF1QztRQUN2Qyx5Q0FBeUM7UUFDekMsd0NBQXdDO1NBQ3ZDO0tBQ0QsQ0FBQTtJQUVELE1BQWEsTUFBTTtRQUVGLElBQUksR0FBYSxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDbEMsRUFBRSxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUVqQztZQUVDLEdBQUEsUUFBUSxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBRTtRQUN6QixDQUFDO0tBQ0Q7SUFUWSxTQUFNLFNBU2xCLENBQUE7SUFFWSxVQUFPLEdBQUcsQ0FBRSxJQUFjLEVBQVUsRUFBRTtRQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRyxDQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUFFO0lBQzVELENBQUMsQ0FBQTtJQUVZLFdBQVEsR0FBRyxDQUFFLElBQWMsRUFBWSxFQUFFO1FBRXJELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUU7UUFFckIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVgsTUFBTSxNQUFNLEdBQUcsQ0FBRSxLQUFjLEVBQUcsT0FBbUIsRUFBRSxFQUFnQixFQUFFO1lBRXhFLElBQUssS0FBSyxJQUFJLENBQUM7Z0JBQUksT0FBTyxFQUFFLENBQUU7WUFFOUIsR0FBRyxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUcsR0FBRyxDQUFFLENBQUUsQ0FBQTtZQUV6QixPQUFPLElBQUksQ0FFVixDQUFDLENBQUcsQ0FBQyxFQUFHLENBQUMsQ0FBRSxFQUNYLENBQUMsQ0FBQyxFQUFFO2dCQUVILEVBQUUsRUFBRyxDQUFFO2dCQUNQLE1BQU0sS0FBSyxHQUFHLENBQUUsR0FBSSxJQUFJLEVBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFFO2dCQUNwQyxNQUFNLEVBQUUsR0FDUjtvQkFDQyxLQUFLLEVBQUcsYUFBYyxLQUFLLENBQUMsSUFBSSxDQUFHLEdBQUcsQ0FBRyxFQUFFO29CQUMzQyxLQUFLLEVBQUcsTUFBTSxDQUFHLEtBQUssR0FBRyxDQUFDLEVBQUcsS0FBSyxDQUFFO2lCQUNwQyxDQUFBO2dCQUNELE9BQU8sRUFBRSxDQUFFO1lBQ1osQ0FBQyxDQUNELENBQUU7UUFDSixDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRyxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUUsQ0FBRTtRQUNwQyxHQUFHLENBQUcsRUFBRSxDQUFFLENBQUU7UUFDWixPQUFPLEVBQUUsQ0FBRTtJQUNaLENBQUMsQ0FBQTtJQUVELE1BQU0sSUFBSSxHQUFHLENBQVEsTUFBZSxFQUFHLEVBQXdCLEVBQVUsRUFBRTtRQUUxRSxNQUFNLEVBQUUsR0FBVSxLQUFLLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDcEMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRyxDQUFDLEVBQUc7WUFBSSxFQUFFLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxDQUFHLENBQUMsQ0FBRSxDQUFFO1FBQzVELE9BQU8sRUFBRSxDQUFFO0lBQ1osQ0FBQyxDQUFBO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBRSxHQUFZLEVBQUcsR0FBWSxFQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFHLEdBQUcsQ0FBRSxDQUFFLEdBQUcsR0FBRyxHQUFHLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFO0FBQzNHLENBQUMsRUF2RWdCLEVBQUUsS0FBRixFQUFFLFFBdUVsQjtBQUlELE1BQU0sS0FBVyxFQUFFLENBNkxsQjtBQTdMRCxXQUFpQixFQUFFO0lBRWxCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7O0NBWTFCLENBQUU7SUFFRixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEZyQixDQUFFO0lBRVUsU0FBTSxHQUFHLEdBQWEsRUFBRTtRQUVwQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUU7UUFFMUIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViLEVBQUUsS0FBSyxFQUFHLGlCQUFpQixFQUFHLE1BQU0sRUFBRyxDQUFFLE9BQU8sRUFBRyxHQUFHLENBQUUsRUFBRSxFQUMxRCxFQUFFLENBQUMsRUFBRSxDQUFHLFNBQVMsQ0FBRSxFQUNuQixFQUFFLENBQUMsT0FBTyxDQUVULEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRSxFQUNsQixJQUFJLENBQUcsRUFBRSxFQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FDckIsRUFDRCxFQUFFLENBQUMsTUFBTSxDQUVSLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRSxFQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFHLEVBQUUsS0FBSyxFQUFHLEVBQUUsSUFBSSxFQUFHLGlCQUFpQixFQUFFLEVBQUUsRUFBRyxPQUFPLENBQUUsRUFDM0QsRUFBRSxDQUFDLENBQUMsQ0FFSDtZQUNDLEtBQUssRUFDTDtnQkFDQyxJQUFJLEVBQUcsMEZBQTBGO2dCQUNqRyxNQUFNLEVBQUcsUUFBUTthQUNqQjtTQUNELEVBQ0QsUUFBUSxDQUNSLENBQ0QsQ0FDRCxDQUFFO0lBQ0osQ0FBQyxDQUFFO0lBRUgsTUFBTSxLQUFLLEdBQUcsQ0FBRSxLQUFpQixFQUFHLEVBQWEsRUFBYSxFQUFFO1FBRS9ELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FFWCxFQUFFLEtBQUssRUFBRyxPQUFPLEVBQUUsRUFDbkIsRUFBRSxDQUFDLElBQUksQ0FFTixFQUFFLENBQUMsSUFBSSxFQUNQLENBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUcsS0FBSyxFQUFHLENBQUMsQ0FBRSxDQUMzQixDQUNELENBQUU7SUFDSixDQUFDLENBQUE7SUFFRCxNQUFNLElBQUksR0FBRyxDQUFFLEdBQWUsRUFBRyxJQUFjLEVBQWEsRUFBRTtRQUU3RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBRVgsRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFFLEVBQ3JCLEVBQUUsQ0FBQyxJQUFJLENBRU4sRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLEVBQ2xCLE9BQU8sQ0FBRyxHQUFHLEVBQUcsRUFBRSxFQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBRyxFQUMvQixFQUFFLENBQUMsSUFBSSxDQUFHLEVBQUUsS0FBSyxFQUFHLE9BQU8sRUFBRSxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUUsRUFDNUMsT0FBTyxDQUFHLEtBQUssRUFBRyxPQUFPLEVBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUcsQ0FBRSxFQUN2RCxPQUFPLENBQUcsTUFBTSxFQUFHLFVBQVUsRUFBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFHLElBQUksQ0FBRSxDQUFFLEVBQ3ZFLE9BQU8sQ0FBRyxNQUFNLEVBQUcsVUFBVSxFQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUcsSUFBSSxDQUFFLENBQUUsQ0FDM0QsRUFDRCxLQUFLLENBQUcsR0FBRyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FDMUIsQ0FBRTtJQUNKLENBQUMsQ0FBQTtJQUVELE1BQU0sT0FBTyxHQUFHLENBQUUsS0FBYyxFQUFHLEdBQVksRUFBRyxJQUFpQixFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUVqRjtRQUNDLEtBQUssRUFBRyxTQUFTO1FBQ2pCLEtBQUssRUFBRyxFQUFFLEtBQUssRUFBRyxHQUFHLEVBQUU7UUFDdkIsT0FBTyxFQUFHLEVBQUUsS0FBSyxDQUFHLEVBQUUsSUFBSyxJQUFJLEVBQUcsQ0FBRSxDQUFDLENBQUMsRUFBRTtLQUN4QyxFQUNELEtBQUssQ0FDTCxDQUFFO0lBR1UsT0FBSSxHQUFHLEdBQUcsRUFBRTtRQUV4QixHQUFHLENBQUMsR0FBRyxDQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUcsRUFBRSxNQUFNLEVBQUcsT0FBTyxFQUFFLEVBQUcsR0FBQSxNQUFNLEVBQUcsQ0FBRSxFQUFHLE1BQU0sQ0FBRSxDQUFFO0lBQ3BFLENBQUMsQ0FBQTtBQUVGLENBQUMsRUE3TGdCLEVBQUUsS0FBRixFQUFFLFFBNkxsQiJ9