import { ksel, ef, pl, log } from "../../meh/index.js";
var VM;
(function (VM) {
    class Applet {
        listsel_1 = new FocusList([undefined, "秋葉原", "浅草橋", "両国", "錦糸町", "亀戸", "平井", "新小岩", "小岩", "市川", "本八幡"]);
        listsel_2 = new FocusList([undefined, "上中里", "田端", "西日暮里", "日暮里", "鶯谷", "上野", "御徒町", "秋葉原", "神田", "東京"]);
    }
    VM.Applet = Applet;
    class FocusList {
        items;
        selection = new ksel.Selector();
        focus = new ksel.Selector();
        constructor(titles) {
            let prev;
            this.items = titles.map(title => prev = new FocusItem(this, title, prev));
            this.items[0]?.selected.select();
            this.items[0]?.focuced.select();
        }
    }
    VM.FocusList = FocusList;
    ;
    class FocusItem {
        target;
        prev;
        selected;
        focuced;
        next;
        constructor(list, target, prev) {
            this.target = target;
            this.prev = prev;
            this.selected = list.selection.make_item(this);
            this.focuced = list.focus.make_item(this);
            prev && (prev.next = this);
        }
    }
    VM.FocusItem = FocusItem;
})(VM || (VM = {}));
var VC;
(function (VC) {
    const css = /* css */ `

	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }

	:host
	{
		display : flex ;
		flex-direction : column ;
		align-items : center ;
	}

	button
	{
		height : 3em ;
		padding : 0 1em ;
		white-space : nowrap ;
		font-size : 16px ;
	}

	.UNITS
	{
		display : flex ;
		flex-direction : column ;
		align-items : stretch ;
		gap : 1ex ;
	}

	.UNIT
	{
		width : 600px ;

		border : 2px solid oklch( 60%  0%  0 ) ;
		border-radius : 1ex ;

		display : flex ;
		flex-direction : column ;
		padding : 1ex ;
		gap : 1ex ;
		align-items : stretch ;
	}

	.SELECTOR
	{
		background : oklch( 90%  0%  150 ) ;
		padding : 1em ;

		display : flex ;
		gap : 0.1ex ;
		overflow : auto ;
	}
	
	.SELECTED
	{
		background : oklch( 50%  0%  0 ) ;
		color : oklch( 100%  0%  0 ) ;
	}

	.CONTENT
	{
		background : oklch( 100%  0%  0 ) ;

		padding : 1em ;
		text-align : center ;
		font-size : 36px ;
	}

	`;
    VC.Applet = (vm = new VM.Applet) => {
        return ef.main({ class: "BS", shadow: { css } }, ef.h1("Curr Focus"), ef.section({ class: "UNITS" }, Unit(vm.listsel_1), Unit(vm.listsel_2)));
    };
    /* */
    const Unit = (vm) => ef.section({ class: "UNIT" }, List(vm), ContentSwitch(vm));
    const List = (vm) => ef.section({}, ef.section({ class: "SELECTOR" }, ...vm.items.map(item_vm => Item(item_vm))));
    const Item = (vm) => {
        const keydown = (ev) => {
            log(vm.target, ev.code);
            switch (ev.code) {
                case "ArrowRight":
                    vm.next?.focuced.select();
                    break;
                case "ArrowLeft":
                    vm.prev?.focuced.select();
                    break;
                default: return;
            }
            ev.preventDefault();
        };
        return ef.button({
            class: { SELECTED: vm.selected },
            focus: { state: vm.focuced },
            action: { click() { log(vm.target, "click"); vm.selected.select(); } },
            aa: { keydown }
        }, vm.target ?? "..");
    };
    const ContentSwitch = (vm) => {
        return ef.section({ class: "CONTENT" }, pl.switch(vm.selection.current, item => item?.target ? ef.span(item.target) : undefined));
    };
})(VC || (VC = {}));
export const Curr_Focus = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vycl9Gb2N1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMi9DdXJyX0ZvY3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsSUFBSSxFQUFVLEVBQUUsRUFBRyxFQUFFLEVBQWdCLEdBQUcsRUFBRSxNQUFNLG9CQUFvQixDQUFFO0FBRTdGLElBQVUsRUFBRSxDQWlEWDtBQWpERCxXQUFVLEVBQUU7SUFFWCxNQUFhLE1BQU07UUFFbEIsU0FBUyxHQUFHLElBQUksU0FBUyxDQUV4QixDQUFFLFNBQVMsRUFBRyxLQUFLLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxLQUFLLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxLQUFLLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxLQUFLLENBQUUsQ0FDeEYsQ0FBRTtRQUVILFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FFeEIsQ0FBRSxTQUFTLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxNQUFNLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxJQUFJLEVBQUcsS0FBSyxFQUFHLEtBQUssRUFBRyxJQUFJLEVBQUcsSUFBSSxDQUFFLENBQ3pGLENBQUU7S0FDSDtJQVhZLFNBQU0sU0FXbEIsQ0FBQTtJQUVELE1BQWEsU0FBUztRQUVyQixLQUFLLENBQWlCO1FBQ3RCLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQWlCLENBQUU7UUFDaEQsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBaUIsQ0FBRTtRQUU1QyxZQUFjLE1BQWtDO1lBRS9DLElBQUksSUFBZ0IsQ0FBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUcsSUFBSSxFQUFHLEtBQUssRUFBRyxJQUFJLENBQUUsQ0FBRSxDQUFFO1lBRW5GLElB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