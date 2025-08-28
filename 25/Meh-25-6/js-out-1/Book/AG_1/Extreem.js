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
            return each(r(4, 5), i => {
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
			width : clamp( 300px , 28em , 100% ) ;

			font-size : 2.0rem ;
		}

		.NODES:not(:empty)
		{
			display : flex ;
			flex-direction : column ;
			padding : 0.3ex 1.1ex 1.1ex 2em ;
			gap : 0.5ex ;

			font-size : 80% ;
		}
	
		.NODE
		{
			border : 0.1ex  solid  hsl( 0  0%  80% ) ;
			border-radius: 2.5ex ;
			list-style : none ;
			cursor : default ;
			overflow : hidden ;

			transition : background-color 0.1s ,  border-color 0.1s ;
		}

		.NODE:hover
		{
			border-color : hsl( 185  50%  50% ) ;
			background : hsl( 185  100%  45% / 14% ) ;
		}

		.NODE .HEAD
		{
			display : grid ;
			height : 2em ;
			grid-template-columns : 1fr auto  auto ;
			padding-inline : 1.0em 1em ;
			white-space : nowrap ;
			align-items : center ;
			gap : 0.8ex ;
		}

		.NODE > .HEAD > .TITLE
		{
			border-radius : 0.8ex ;
			padding-inline : 1ex ;

			transition : background-color 0.1s ;
		}

		.NODE:hover > .HEAD > .TITLE
		{
			background : hsl( 0  0%  0% / 60% ) ;
			color : hsl( 0  0%  90% ) ;
		}

		.NODE .COMMAND
		{
			border : none ;  background : none ;  font-size : 70% ;
		}

		a { text-decoration : none ; color : hsl( 0  0%  37% ) ; }
	
	`;
    VC.Applet = () => {
        const vm = new VM.Applet;
        return ef.main({ class: "FC AC PGXX TEST", shadow: [rootCSS, css] }, ef.h1("Extreem"), ef.section({ class: "TREE" }, Node(vm, vm.root)), ef.footer(ef.a({ attrs: { href: "./zz-index.html" } }, "index")));
    };
    const Nodes = (appVM, dm) => {
        return ef.ul({ class: "NODES" }, pl.each(dm.renn, (o) => Node(appVM, o.target)));
    };
    const Node = (appVM, dm) => {
        return ef.li({ class: "NODE AC" }, ef.span({ class: "HEAD" }, ef.span({ class: "TITLE" }, dm.title), Command("T", () => appVM.ct.$ = VM.testTree(dm)), Command("NP", () => VM.newPart(dm))), Nodes(appVM, dm.parts));
    };
    const Command = (title, oper) => ef.button({
        class: "COMMAND",
        passive: { click(ev) { oper(); } }
    }, title);
    VC.main = () => {
        DOM.add(ef.body({ shadow: rootCSS }, VC.Applet()), "html");
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvRXh0cmVlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsSUFBSSxFQUFrQixJQUFJLEVBQVEsRUFBRSxFQUFHLEVBQUUsRUFBRyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUMzRixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFFO0FBbUJ6QixNQUFNLEtBQVcsRUFBRSxDQW9FbEI7QUFwRUQsV0FBaUIsRUFBRTtJQUVsQixNQUFNLE1BQU0sR0FDWjtRQUNDLEtBQUssRUFBRyxTQUFTO1FBQ2pCLEtBQUssRUFDTDtRQUNBLHVDQUF1QztRQUN2Qyx5Q0FBeUM7UUFDekMsd0NBQXdDO1NBQ3ZDO0tBQ0QsQ0FBQTtJQUVELE1BQWEsTUFBTTtRQUVGLElBQUksR0FBRyxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDeEIsRUFBRSxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUVqQztZQUVDLEdBQUEsUUFBUSxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBRTtRQUN6QixDQUFDO0tBQ0Q7SUFUWSxTQUFNLFNBU2xCLENBQUE7SUFFWSxVQUFPLEdBQUcsQ0FBRSxJQUFjLEVBQVUsRUFBRTtRQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRyxDQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUFFO0lBQzVELENBQUMsQ0FBQTtJQUVZLFdBQVEsR0FBRyxDQUFFLElBQWMsRUFBWSxFQUFFO1FBRXJELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRyxDQUFFO1FBRTFCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVYLE1BQU0sTUFBTSxHQUFHLENBQUUsS0FBYyxFQUFHLE9BQW1CLEVB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