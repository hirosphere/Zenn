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
        hue;
        sat;
        light;
        constructor(v) {
            super(v);
            this.hue = Leaf(v.hue);
            this.sat = Leaf(v.sat);
            this.light = Leaf(v.light);
        }
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
	
	main
	{
		display : flex ;
		flex-direction : column ;
		padding : 1ex 1em ;
		align-items : center ;
		gap : 1ex ;

		color : hsl( 0  0%  10% ) ;
	}

	h1
	{
		margin : 0em ;
		border-radius : 2% / 50% ;
		background : hsl( 90  55%  55% ) ; width : 100% ;
		padding-inline : 1ex ;
	}
	
	`;
    VC.Applet = () => {
        return ef.div({ shadow: css }, ef.main({}, ef.h1("Extreem 2 ..")));
    };
})(VC || (VC = {}));
export default VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmVlbV8yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfMS9FeHRyZWVtXzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLElBQUksRUFBRyxJQUFJLEVBQWUsRUFBRSxFQUFhLE1BQU0sa0JBQWtCLENBQUU7QUFHbkYsTUFBTSxLQUFXLEVBQUUsQ0FxRWxCO0FBckVELFdBQWlCLEVBQUU7SUF5QmxCLEtBQUs7SUFFTCxNQUFhLFFBQTRCLFNBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFZO1FBRXRELElBQUksQ0FBVztRQUUvQixZQUFjLENBQUs7WUFFbEIsS0FBSyxDQUFHLENBQUMsQ0FBRSxDQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFFO1FBQ3JCLENBQUM7UUFFZSxLQUFLLEdBQUcsSUFBSSxJQUEyQixDQUFFO0tBQ3pEO0lBWFksV0FBUSxXQVdwQixDQUFBO0lBR0QsTUFBYSxJQUFLLFNBQVEsUUFBaUI7UUFFMUIsSUFBSSxDQUFvQjtRQUV4QyxZQUFjLENBQVE7WUFFckIsS0FBSyxDQUFHLENBQUMsQ0FBRSxDQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUcsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFFO1FBQzlCLENBQUM7S0FDRDtJQVRZLE9BQUksT0FTaEIsQ0FBQTtJQUVELE1BQWEsR0FBSSxTQUFRLFFBQWdCO1FBRXhCLEdBQUcsQ0FBb0I7UUFDdkIsR0FBRyxDQUFvQjtRQUN2QixLQUFLLENBQW9CO1FBRXpDLFlBQWMsQ0FBTztZQUVwQixLQUFLLENBQUcsQ0FBQyxDQUFFLENBQUU7WUFFYixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUU7WUFDM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBRTtRQUNoQyxDQUFDO0tBQ0Q7SUFkWSxNQUFHLE1BY2YsQ0FBQTtBQUdGLENBQUMsRUFyRWdCLEVBQUUsS0FBRixFQUFFLFFBcUVsQjtBQUdELE1BQU0sS0FBVyxFQUFFLENBV2xCO0FBWEQsV0FBaUIsRUFBRTtJQUVsQixDQUFFLENBQVcsRUFBRyxFQUFFO1FBRWpCLFFBQVMsQ0FBQyxDQUFDLElBQUksRUFDZixDQUFDO1lBQ0EsS0FBSyxNQUFNO2dCQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBRTtnQkFDcEIsTUFBTztRQUNULENBQUM7SUFDRixDQUFDLENBQUE7QUFDRixDQUFDLEVBWGdCLEVBQUUsS0FBRixFQUFFLFFBV2xCO0FBR0QsTUFBTSxLQUFXLEVBQUUsQ0F3Q2xCO0FBeENELFdBQWlCLEVBQUU7SUFFbEIsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXVCckIsQ0FBRTtJQUdVLFNBQU0sR0FBRyxHQUFHLEVBQUU7UUFFMUIsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsTUFBTSxFQUFHLEdBQUcsRUFBRSxFQUNoQixFQUFFLENBQUMsSUFBSSxDQUVOLEVBQUksRUFDSixFQUFFLENBQUMsRUFBRSxDQUFHLGNBQWMsQ0FBRSxDQUN4QixDQUNELENBQUU7SUFDSixDQUFDLENBQUE7QUFDRixDQUFDLEVBeENnQixFQUFFLEtBQUYsRUFBRSxRQXdDbEI7QUFFRCxlQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUUifQ==