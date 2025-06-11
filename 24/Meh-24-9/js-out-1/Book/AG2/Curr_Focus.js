import { ksel, ef, pl } from "../../meh/index.js";
var VM;
(function (VM) {
    class Applet {
        listsel_1 = new FocusList(["秋葉原", "浅草橋", "両国", "錦糸町", "亀戸", "平井", "新小岩", "小岩", "市川", "本八幡"]);
        listsel_2 = new FocusList(["上中里", "田端", "西日暮里", "日暮里", "鶯谷", "上野", "御徒町", "秋葉原", "神田", "東京"]);
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
		padding : 1ex ;
		align-items : center ;
	}

	.UNITS
	{
		max-width : 1000px ;
		width : 100% ;
		padding : 1ex ;
		border : 2px solid gray ;
		display : flex ;
		flex-direction : column ;
		align-items : center ;
		gap : 1ex ;
	}

	.UNIT
	{
		width : 100% ;
		border : 2px solid oklch( 60%  0%  0 ) ;
		border-radius : 1ex ;

		display : flex ;
		flex-direction : column ;
		padding : 1ex ;
		gap : 1ex ;
		align-items : center ;
	}

	.LIST
	{
		background : oklch( 70%  0%  150 ) ;

		width : 100% ;
		display : flex ;
		justify-content : center ;

		padding : 3px ;
	}

	.LIST .ITEMS
	{
		display : flex ;
		overflow : auto ;
		padding : 0.75ex ;
		gap : 0.3ex ;
	}
	
	button
	{
		height : 3em ;
		padding : 0 1em ;
		white-space : nowrap ;
		font-size : 16px ;
	}

	button:focus
	{
		outline : solid 2px oklch( 75%  60%  55 ) ;
	}

	.SELECTED
	{
		background : oklch( 20%  0%  270 ) ;
		color : oklch( 100%  0%  0 ) ;
	}

	.CONTENT
	{
		width : 100% ;
		background : oklch( 100%  0%  0 ) ;

		overflow : auto ;
		padding : 1em ;
		text-align : center ;
		font-size : 36px ;
	}

	`;
    VC.Applet = (vm = new VM.Applet) => {
        return ef.main({ class: "BS PXX", shadow: { css } }, ef.h1("Curr Focus"), ef.section({ class: "UNITS" }, Unit(vm.listsel_1), Unit(vm.listsel_2)));
    };
    /* */
    const Unit = (vm) => ef.section({ class: "UNIT" }, List(vm), ContentSwitch(vm));
    const List = (vm) => ef.section({ class: "LIST" }, ef.section({ class: "ITEMS" }, ...vm.items.map(item_vm => Item(item_vm))));
    const Item = (vm) => {
        const keydown = (ev) => {
            // log ( vm.target , ev.code ) ;
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
            action: { click() { vm.selected.select(); } },
            aa: { keydown }
        }, vm.target ?? "..");
    };
    const ContentSwitch = (vm) => {
        return ef.section({ class: "CONTENT BH" }, pl.switch(vm.selection.current, item => item?.target ? ef.span(item.target) : undefined));
    };
})(VC || (VC = {}));
export const Curr_Focus = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3Vycl9Gb2N1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMi9DdXJyX0ZvY3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsSUFBSSxFQUFVLEVBQUUsRUFBRyxFQUFFLEVBQXFCLE1BQU0sb0JBQW9CLENBQUU7QUFFN0YsSUFBVSxFQUFFLENBaURYO0FBakRELFdBQVUsRUFBRTtJQUVYLE1BQWEsTUFBTTtRQUVsQixTQUFTLEdBQUcsSUFBSSxTQUFTLENBRXhCLENBQUUsS0FBSyxFQUFHLEtBQUssRUFBRyxJQUFJLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxJQUFJLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxJQUFJLEVBQUcsS0FBSyxDQUFFLENBQzVFLENBQUU7UUFFSCxTQUFTLEdBQUcsSUFBSSxTQUFTLENBRXhCLENBQUUsS0FBSyxFQUFHLElBQUksRUFBRyxNQUFNLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxJQUFJLEVBQUcsS0FBSyxFQUFHLEtBQUssRUFBRyxJQUFJLEVBQUcsSUFBSSxDQUFFLENBQzdFLENBQUU7S0FDSDtJQVhZLFNBQU0sU0FXbEIsQ0FBQTtJQUVELE1BQWEsU0FBUztRQUVyQixLQUFLLENBQWlCO1FBQ3RCLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQWlCLENBQUU7UUFDaEQsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBaUIsQ0FBRTtRQUU1QyxZQUFjLE1BQWtDO1lBRS9DLElBQUksSUFBZ0IsQ0FBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUcsSUFBSSxFQUFHLEtBQUssRUFBRyxJQUFJLENBQUUsQ0FBRSxDQUFFO1lBRW5GLElBQUksQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFHLEVB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