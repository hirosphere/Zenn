import { Leaf, Renn, ef } from "../../Meh/Meh.js";
export var DM;
(function (DM) {
    /* */
    class NodeBase extends Leaf.Core.Entity {
        type;
        constructor(v) {
            super(v);
            this.type = v.type;
        }
        parts = new Renn;
    }
    DM.NodeBase = NodeBase;
    class Memo extends NodeBase {
        text;
        constructor(v) {
            super(v);
            this.text = Leaf(v.text);
        }
    }
    DM.Memo = Memo;
    class HSL extends NodeBase {
    }
    DM.HSL = HSL;
})(DM || (DM = {}));
export var VM;
(function (VM) {
    (s) => {
        switch (s.type) {
            case "memo":
                s.text.$ = "Waaai";
                break;
        }
    };
})(VM || (VM = {}));
export var VC;
(function (VC) {
    const css = /* css */ `

	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }
	
	:host
	{
		display : flex ;
		flex-direction : column ;
		padding : 5em ;
		align-items : center ;
		gap : 1ex ;

		color : hsl( 0  0%  10% ) ;
	}
	
	`;
    VC.Applet = () => {
        return ef.main({ shadow: css }, ef.h1("Extreem 2"));
    };
})(VC || (VC = {}));
export default VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbV8yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfMS9FeHRyZWVtXzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLElBQUksRUFBRyxJQUFJLEVBQWUsRUFBRSxFQUFhLE1BQU0sa0JBQWtCLENBQUU7QUFHbkYsTUFBTSxLQUFXLEVBQUUsQ0F5RGxCO0FBekRELFdBQWlCLEVBQUU7SUF5QmxCLEtBQUs7SUFFTCxNQUFhLFFBQTRCLFNBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFZO1FBRXRELElBQUksQ0FBVztRQUUvQixZQUFjLENBQUs7WUFFbEIsS0FBSyxDQUFHLENBQUMsQ0FBRSxDQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFFO1FBQ3JCLENBQUM7UUFFZSxLQUFLLEdBQUcsSUFBSSxJQUEyQixDQUFFO0tBQ3pEO0lBWFksV0FBUSxXQVdwQixDQUFBO0lBR0QsTUFBYSxJQUFLLFNBQVEsUUFBaUI7UUFFMUIsSUFBSSxDQUFvQjtRQUV4QyxZQUFjLENBQVE7WUFFckIsS0FBSyxDQUFHLENBQUMsQ0FBRSxDQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUcsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFFO1FBQzlCLENBQUM7S0FDRDtJQVRZLE9BQUksT0FTaEIsQ0FBQTtJQUVELE1BQWEsR0FBSSxTQUFRLFFBQWdCO0tBRXhDO0lBRlksTUFBRyxNQUVmLENBQUE7QUFHRixDQUFDLEVBekRnQixFQUFFLEtBQUYsRUFBRSxRQXlEbEI7QUFHRCxNQUFNLEtBQVcsRUFBRSxDQVdsQjtBQVhELFdBQWlCLEVBQUU7SUFFbEIsQ0FBRSxDQUFXLEVBQUcsRUFBRTtRQUVqQixRQUFTLENBQUMsQ0FBQyxJQUFJLEVBQ2YsQ0FBQztZQUNBLEtBQUssTUFBTTtnQkFDVixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUU7Z0JBQ3BCLE1BQU87UUFDVCxDQUFDO0lBQ0YsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQVhnQixFQUFFLEtBQUYsRUFBRSxRQVdsQjtBQUdELE1BQU0sS0FBVyxFQUFFLENBNEJsQjtBQTVCRCxXQUFpQixFQUFFO0lBRWxCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0VBZXJCLENBQUU7SUFHVSxTQUFNLEdBQUcsR0FBRyxFQUFFO1FBRTFCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FFYixFQUFFLE1BQU0sRUFBRyxHQUFHLEVBQUUsRUFDaEIsRUFBRSxDQUFDLEVBQUUsQ0FBRyxXQUFXLENBQUUsQ0FDckIsQ0FBRTtJQUNKLENBQUMsQ0FBQTtBQUNGLENBQUMsRUE1QmdCLEVBQUUsS0FBRixFQUFFLFFBNEJsQjtBQUVELGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBRSJ9