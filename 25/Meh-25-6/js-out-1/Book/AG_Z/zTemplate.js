import { Live, Ease, ef, Store } from "../../Meh/Meh.js";
const uned = undefined;
/*
    KV Store
*/
export var DM;
(function (DM) {
    function Node(i) {
        return Ease.fromPartial(i, node);
    }
    DM.Node = Node;
    class node {
        type = "node";
        title;
        parts;
        constructor(i) {
            this.title = i?.title ?? "";
            this.parts = i?.parts?.map(p => part(p ?? {})) ?? [];
        }
    }
    DM.node = node;
    class todo extends node {
        type = "todo";
        completed;
        constructor(i) {
            super(i);
            this.completed = i.completed ?? false;
        }
    }
    DM.todo = todo;
    class hsl extends node {
        type = "hsl";
        hue;
        sat;
        light;
        constructor(i) {
            super(i);
            this.hue = i.hue ?? 0;
            this.sat = i.sat ?? 0;
            this.light = i.light ?? 0;
        }
    }
    DM.hsl = hsl;
    function part(i) {
        switch (i.type) {
            case "todo": return new todo(i);
            case "hsl": return new hsl(i);
            default: return new node(i);
        }
    }
})(DM || (DM = {}));
export var VM;
(function (VM) {
    class App {
        available = Live(false);
        root = DM.Node({ title: "Han Node" });
        kv = new Store.KVS("MB_2511_TEMPLATE");
    }
    VM.App = App;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    /* CSS */
    const css = /* css */ `

	:host { height : 100% ; }
	
	* { box-sizing : border-box ;  margin : 0 ; }
	
	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }

	.OA { overflow : auto ; }
	
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }
	.GM { gap : 1em ; }
	.GX { gap : 1ex ; }

	main
	{
		height : 100% ;
		overflow : auto ;
		color : hsl( 0  0%  20% ) ;
	}

	h1 { text-align : center ; }

	input
	{
		padding : 0.6ex  1.0ex ;
		font-size : 1.2em ;
	}
	
	`;
    /* Components */
    function App() {
        const vm = new VM.App;
        return ef.div({ shadow: css }, ef.main({ class: "FC  PM  GM  AC" }, ef.h1("App Template"), ef.section(Node(vm.root))));
    }
    VC.App = App;
    const Node = (dm) => {
        return ef.section({ class: "NODE" }, ef.input({ biBind: { vInp: dm.title } }));
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoielRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfWi96VGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQTJCLEVBQUUsRUFBYSxLQUFLLEVBQVEsTUFBTSxrQkFBa0IsQ0FBRTtBQUtyRyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUU7QUFFeEI7O0VBRUU7QUFFRixNQUFNLEtBQVcsRUFBRSxDQWlFbEI7QUFqRUQsV0FBaUIsRUFBRTtJQU1sQixTQUFnQixJQUFJLENBQUcsQ0FBb0I7UUFFMUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFHLENBQUMsRUFBRyxJQUFJLENBQUUsQ0FBRTtJQUN2QyxDQUFDO0lBSGUsT0FBSSxPQUduQixDQUFBO0lBRUQsTUFBYSxJQUFJO1FBRWhCLElBQUksR0FBRyxNQUFNLENBQUU7UUFDZixLQUFLLENBQVc7UUFDaEIsS0FBSyxDQUFZO1FBRWpCLFlBQWMsQ0FBc0I7WUFFbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUUsRUFBRSxLQUFNLEVBQUUsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBRSxJQUFJLEVBQUUsQ0FBRTtRQUMvRCxDQUFDO0tBQ0Q7SUFYWSxPQUFJLE9BV2hCLENBQUE7SUFFRCxNQUFhLElBQUssU0FBUSxJQUFJO1FBRXBCLElBQUksR0FBRyxNQUFNLENBQUU7UUFDeEIsU0FBUyxDQUFZO1FBRXJCLFlBQWMsQ0FBb0I7WUFFakMsS0FBSyxDQUFHLENBQUMsQ0FBRSxDQUFFO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBRTtRQUN4QyxDQUFDO0tBQ0Q7SUFW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