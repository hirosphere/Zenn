import { Ease, ef, pl, DOM } from "../Meh/Meh.js";
const log = console.log;
var VM;
(function (VM) {
    const sample = {
        title: "Node",
        parts: [
            { title: "おおみや", parts: [] },
            { title: "とろ", parts: [] },
            { title: "ひがしおおみや", parts: [] },
        ]
    };
    class App {
        root = Ease(sample);
        constructor() {
            this.root;
        }
    }
    VM.App = App;
})(VM || (VM = {}));
var VC;
(function (VC) {
    const css = /* CSS */ `
	
	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

	.FC { display : flex ; flex-direction : column ; }
	.FR { display : flex ; flex-direction : row ; }
	.OA { overflow : auto ; }
	.PGMM { padding : 1ex ; gap : 1em ; }
	.PGMX { padding : 1ex ; gap : 1ex ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }
	.TC { text-align : center ; }
	
	h1 { text-align : center ; }

	.Tree
	{
		width : min( 40em , 100% ) ;

		border : 0.2ex  solid  hsl( 50  2%  50% ) ;
		border-radius : 0.3ex ;

		overflow : auto ;
		padding : 1ex ;
	}

	ul.Nodes
	{
	}

	li.Node
	{
		list-style : none ;
	}
	
	
	`;
    VC.App = () => {
        const app = new VM.App;
        log(app.root.parts.renn.length.$);
        const main = ef.main({ class: "FC PGMX AC" }, ef.h1("PQ-1"), Tree(app.root));
        return ef.div({ shadow: css }, main);
    };
    const Node = (node) => ef.li({ class: "Node" }, node.title);
    const Nodes = (nodes) => ef.ul({ class: "Nodes" }, pl.each(nodes.renn, node => Node(node)));
    const Tree = (node) => ef.section({ class: "Tree" }, Node(node));
})(VC || (VC = {}));
DOM.add(VC.App(), "body");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUFEtMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9RLTEvUFEtMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLElBQUksRUFBa0IsRUFBRSxFQUFHLEVBQUUsRUFBRyxHQUFHLEVBQUUsTUFBTSxlQUFlLENBQUU7QUFFbkYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBRTtBQVV6QixJQUFVLEVBQUUsQ0FzQlg7QUF0QkQsV0FBVSxFQUFFO0lBRVgsTUFBTSxNQUFNLEdBQ1o7UUFDQyxLQUFLLEVBQUcsTUFBTTtRQUNkLEtBQUssRUFDTDtZQUNDLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFO1lBQy9CLEVBQUUsS0FBSyxFQUFHLElBQUksRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFO1lBQzdCLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRyxLQUFLLEVBQUcsRUFBRSxFQUFFO1NBQ2xDO0tBQ0QsQ0FBRTtJQUVILE1BQWEsR0FBRztRQUVmLElBQUksR0FBYSxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFFbEM7WUFFQyxJQUFJLENBQUMsSUFBSSxDQUFFO1FBQ1osQ0FBQztLQUNEO0lBUlksTUFBRyxNQVFmLENBQUE7QUFDRixDQUFDLEVBdEJTLEVBQUUsS0FBRixFQUFFLFFBc0JYO0FBRUQsSUFBVSxFQUFFLENBOEVYO0FBOUVELFdBQVUsRUFBRTtJQUVYLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0NyQixDQUFFO0lBRVUsTUFBRyxHQUFHLEdBQUcsRUFBRTtRQUV2QixNQUFNLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUU7UUFFeEIsR0FBRyxDQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLENBQUE7UUFFcEMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FFbkIsRUFBRSxLQUFLLEVBQUcsWUFBWSxFQUFFLEVBQ3hCLEVBQUUsQ0FBQyxFQUFFLENBQUcsTUFBTSxDQUFFLEVBQ2hCLElBQUksQ0FBRyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQ2pCLENBQUU7UUFFSCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUcsRUFBRSxNQUFNLEVBQUcsR0FBRyxFQUFFLEVBQUcsSUFBSSxDQUFFLENBQUU7SUFDNUMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBRSxJQUFjLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBRXZDLEVBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRSxFQUNsQixJQUFJLENBQUMsS0FBSyxDQUNWLENBQUU7SUFFSCxNQUFNLEtBQUssR0FBRyxDQUFFLEtBQWdCLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBRTFDLEVBQUUsS0FBSyxFQUFHLE9BQU8sRUFBRSxFQUNuQixFQUFFLENBQUMsSUFBSSxDQUVOLEtBQUssQ0FBQyxJQUFJLEVBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQ3JCLENBQ0QsQ0FBRTtJQUVILE1BQU0sSUFBSSxHQUFHLENBQUUsSUFBYyxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUU1QyxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUUsRUFDbEIsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUNiLENBQUU7QUFFSixDQUFDLEVBOUVTLEVBQUUsS0FBRixFQUFFLFFBOEVYO0FBR0QsR0FBRyxDQUFDLEdBQUcsQ0FBRyxFQUFFLENBQUMsR0FBRyxFQUFHLEVBQUcsTUFBTSxDQUFFLENBQUEifQ==