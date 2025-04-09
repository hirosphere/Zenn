import { leaf, Renn, ef, pl } from "../meh/index.js";
import { fontsets } from "../meh/app/fontsets.js";
var VM;
(function (VM) {
    class App {
        current;
        items = new Renn(Array(8).fill(null).map((i, n) => new Item("Pad" + (n + 1))));
        constructor() {
            this.current = leaf(this.items.orders[0].target);
        }
        execute() {
            this.current.value.execute();
        }
    }
    VM.App = App;
    class Item {
        title;
        code = leaf(sample);
        output = leaf("");
        input = leaf("");
        e;
        timer = new Timer;
        constructor(title) {
            this.title = title;
        }
        execute() {
            const input = this.input.value;
            const e = this.e;
            const timer = this.timer;
            fontsets;
            try {
                this.output.value = eval(this.code.value);
            }
            catch (err) {
                this.output.value = String(err);
            }
        }
    }
    VM.Item = Item;
    class Timer {
        p_action;
        iid = 0;
        set action(action) {
            this.p_action = action;
            if (this.iid) {
                clearInterval(this.iid);
            }
            if (action)
                this.iid = setInterval(action, 1000);
        }
    }
    const arrnd = (ar) => ar[Math.floor(Math.random() * ar.length)];
    const fontFamilies = {
        "sans-serif": "Arial, Helvetica, Roboto, 'Noto Sans JP', sans-serif",
        "serif": "Times New Roman, Georgia, 'Yu Mincho', 'Noto Serif JP', serif",
        "monospace": "Courier New, Consolas, 'Source Code Pro', 'Noto Mono', monospace",
        "cursive": "Comic Sans MS, 'Brush Script', 'Lucida Handwriting', 'Noto Sans JP', cursive",
        "fantasy": "Impact, Papyrus, 'Copperplate', 'Noto Sans JP', fantasy"
    };
    [
        ["serif", "Times New Roman", "Georgia", "Droid Serif", "Liberation Serif"],
        ["sans-serif", "Arial", "Helvetica", "Roboto", "'Noto Sans JP'", "Segoe UI", "Ubuntu", "Open Sans"],
        ["monospace", "Courier New", "Menlo", "Droid Sans Mono", "Liberation Mono"],
        ["cursive", "Brush Script MT", "Apple Chancery", "Dancing Script", "Satisfy"],
        ["fantasy", "Comic Sans MS", "Papyrus", "Cursiva", "Impact"]
    ];
    const font_sets = [
        ["serif", "Times New Roman", "Georgia", "Droid Serif", "Liberation Serif"],
        ["serif", "Merriweather", "Times New Roman", "Georgia", "'Noto Serif'", "Liberation Serif"],
        ["serif", "'Merriweather'", "'Georgia'", "'Tisa'", "'Roboto Slab'"],
        ["serif", "'Times New Roman'", "'Georgia'", "'Palatino'", "'Liberation Serif'"],
        ["serif", "'Playfair Display'", "'Merriweather'", "'Lora'", "'Roboto Slab'"],
        ["sans-serif", "Arial", "Helvetica", "Roboto", "'Noto Sans JP'", "Segoe UI", "Ubuntu", "Open Sans"],
        ["sans-serif", "'Helvetica Neue'", "'Roboto'", "'Open Sans'", "'Inter'", "'Noto Sans'"],
        ["sans-serif", "'Roboto'", "'Lato'", "'Montserrat'", "'Source Sans Pro'", "'Poppins'"],
        ["sans-serif", "'Helvetica Neue'", "'Arial'", "'Segoe UI'", "'Ubuntu'", "'Nunito'"],
        ["sans-serif", "'Arial'", "'Verdana'", "'Tahoma'", "'Trebuchet MS'", "'Segoe UI'"],
        ["monospace", "Courier New", "Menlo", "Droid Sans Mono", "Liberation Mono"],
        ["monospace", "'Fira Code'", "'Source Code Pro'", "'Inconsolata'", "'Consolas'"],
        ["monospace", "'Courier New'", "'Consolas'", "'Ubuntu Mono'", "'DejaVu Sans Mono'"],
        ["monospace", "'Roboto Mono'", "'Space Mono'", "'IBM Plex Mono'", "'Source Code Pro'"],
        ["monospace", "Courier", "Monaco", "Lucida Console", "Consolas"],
        ["cursive", "Brush Script MT", "Apple Chancery", "Dancing Script", "Satisfy"],
        ["cursive", "'Dancing Script'", "'Pacifico'", "'Satisfy'", "'Allura'"],
        ["cursive", "'Great Vibes'", "'Pacifico'", "'Sacramento'", "'Dancing Script'"],
        ["cursive", "'Dancing Script'", "'Satisfy'", "'Sacramento'", "'Lobster'"],
        ["cursive", "Comic Sans MS", "Brush Script MT", "Zapfino", "Mistral"],
        ["fantasy", "Comic Sans MS", "Papyrus", "Cursiva", "Impact"],
        ["fantasy", "Papyrus", "Impact", "Charlemagne", "Rockwell"],
        ["fantasy", "Garamond", "Algerian", "Papyrus", "Rockwell Extra Bold"],
        ["fantasy", "'Caveat Brush'", "'Rock Salt'", "'Russo One'", "'Ultra'"],
        ["fantasy", "Comic Sans MS", "Impact", "Forte", "Blippo"]
    ];
})(VM || (VM = {}));
export const EvalPage = () => {
    const vm = new VM.App;
    return ef.main({ class: "EVAL_PAGE" }, ef.section({ class: "EVAL_PAGE_BAR" }, "Eval ", vm.current.value.title, ef.button({ acts: { click: () => vm.execute() } }, "Eval")), pl.switch(vm.current, cur => Eval(cur)));
};
const Eval = (vm) => {
    return ef.section({ class: "EVAL" }, ef.section({ class: "EVAL_EDIT" }, ef.textarea({ class: "EVAL_CODE", binds: { value_input: vm.code } }), ef.textarea({ class: "EVAL_OUTPUT", binds: { value_input: vm.output } }), ef.textarea({ class: "EVAL_INPUT", binds: { value_input: vm.input } })), ef.section({ class: "EVAL_DISPLAY", hook: { init(el) { vm.e = el; } } }));
};
const sample = `const fn = () =>
{
	const color = e.style.color = \`hsl( 0 , 0% , 0% , \${ 70 - Math.random() * 40 }% )\` ;
	const ff = e.style.fontFamily = arrnd ( fontsets ) ;
	const sz = e.style.fontSize = \`\${ 30 + Math.random() * 40 }px\` ;
	const uuid = e.innerHTML = crypto.randomUUID () ;

	return [ ff , sz , uuid ] ;
}

fn() .join( "\\n" ) ;
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbFBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9FdmFsUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFjLE1BQU0saUJBQWlCLENBQUU7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFFO0FBR25ELElBQVUsRUFBRSxDQThIWDtBQTlIRCxXQUFVLEVBQUU7SUFFWCxNQUFhLEdBQUc7UUFFZixPQUFPLENBQW1CO1FBQzFCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FFZixLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUUsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFLEdBQUcsQ0FBRyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLEtBQUssR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFLENBQzlFLENBQUU7UUFFSDtZQUVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxLQUFLLENBQUUsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFLE1BQU0sQ0FBRSxDQUFFO1FBQzVELENBQUM7UUFFRCxPQUFPO1lBRU4sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFHLENBQUU7UUFDaEMsQ0FBQztLQUNEO0lBakJZLE1BQUcsTUFpQmYsQ0FBQTtJQUVELE1BQWEsSUFBSTtRQVNLO1FBUHJCLElBQUksR0FBRyxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDeEIsTUFBTSxHQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUN0QixLQUFLLEdBQUcsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFFO1FBQ3JCLENBQUMsQ0FBYztRQUVmLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBRTtRQUVuQixZQUFxQixLQUFjO1lBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUNsQyxDQUFDO1FBRUYsT0FBTztZQUVOLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFO1lBQ2hDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUU7WUFDbEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRTtZQUMxQixRQUFRLENBQUU7WUFFVixJQUNBO2dCQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFFO2FBQzlDO1lBQ0QsT0FBUSxHQUFHLEVBQ1g7Z0JBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFHLEdBQUcsQ0FBRSxDQUFFO2FBQ3BDO1FBQ0YsQ0FBQztLQUNEO0lBNUJZLE9BQUksT0E0QmhCLENBQUE7SUFFRCxNQUFNLEtBQUs7UUFFVixRQUFRLENBQTJCO1FBQ25DLEdBQUcsR0FBRyxDQUFDLENBQUU7UUFFVCxJQUFJLE1BQU0sQ0FBRyxNQUF5QztZQUVyRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBRTtZQUV4QixJQUFLLElBQUksQ0FBQyxHQUFHLEVBQ2I7Z0JBQ0MsYUFBYSxDQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBRTthQUM1QjtZQUVELElBQUssTUFBTTtnQkFBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBRyxNQUFNLEVBQUcsSUFBSSxDQUFFLENBQUU7UUFDekQsQ0FBQztLQUNEO0lBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBRSxFQUFrQixFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLENBQUMsTUFBTSxFQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBRSxDQUFFLENBQUU7SUFFMUYsTUFBTSxZQUFZLEdBQ2xCO1FBQ0MsWUFBWSxFQUFFLHNEQUFzRDtRQUNwRSxPQUFPLEVBQUUsK0RBQStEO1FBQ3hFLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsU0FBUyxFQUFFLDhFQUE4RTtRQUN6RixTQUFTLEVBQUUseURBQXlEO0tBQ3BFLENBQUM7SUFFRjtRQUNDLENBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLENBQUU7UUFDNUUsQ0FBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUU7UUFDckcsQ0FBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBRTtRQUM3RSxDQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUU7UUFDL0UsQ0FBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFFO0tBQzlELENBQUU7SUFHSCxNQUFNLFNBQVMsR0FDZjtRQUNDLENBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLENBQUU7UUFDNUUsQ0FBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUU7UUFDN0YsQ0FBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUU7UUFDckUsQ0FBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsQ0FBRTtRQUNqRixDQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFFO1FBRzlFLENBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFFO1FBQ3JHLENBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBRTtRQUN6RixDQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxXQUFXLENBQUU7UUFDeEYsQ0FBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFFO1FBQ3JGLENBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFlBQVksQ0FBRTtRQUdwRixDQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFFO1FBQzdFLENBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFFO1FBQ2xGLENBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixDQUFFO1FBQ3JGLENBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUU7UUFDeEYsQ0FBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUU7UUFHbEUsQ0FBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFFO1FBQy9FLENBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFFO1FBQ3hFLENBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixDQUFFO1FBQ2hGLENBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFFO1FBQzNFLENBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFFO1FBR3ZFLENBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBRTtRQUM5RCxDQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUU7UUFDN0QsQ0FBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUscUJBQXFCLENBQUU7UUFDdkUsQ0FBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUU7UUFDeEUsQ0FBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFFO0tBQzNELENBQUU7QUFFSixDQUFDLEVBOUhTLEVBQUUsS0FBRixFQUFFLFFBOEhYO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUU1QixNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUU7SUFFdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViLEVBQUUsS0FBSyxFQUFHLFdBQVcsRUFBRSxFQUN2QixFQUFFLENBQUMsT0FBTyxDQUVULEVBQUUsS0FBSyxFQUFHLGVBQWUsRUFBRSxFQUMzQixPQUFPLEVBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBRSxLQUFLLENBQUUsS0FBSyxFQUNsQyxFQUFFLENBQUMsTUFBTSxDQUVSLEVBQUUsSUFBSSxFQUFHLEVBQUUsS0FBSyxFQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUcsRUFBRSxFQUFFLEVBQzFDLE1BQU0sQ0FDTixDQUNELEVBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FFUixFQUFFLENBQUMsT0FBTyxFQUNWLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLEdBQUcsQ0FBRSxDQUNuQixDQUNELENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxNQUFNLElBQUksR0FBRyxDQUFFLEVBQVksRUFBRyxFQUFFO0lBRS9CLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FFaEIsRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLEVBQ2xCLEVBQUUsQ0FBQyxPQUFPLENBRVQsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxRQUFRLENBQUcsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFHLEtBQUssRUFBRyxFQUFFLFdBQVcsRUFBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBRSxFQUMzRSxFQUFFLENBQUMsUUFBUSxDQUFHLEVBQUUsS0FBSyxFQUFHLGFBQWEsRUFBRyxLQUFLLEVBQUcsRUFBRSxXQUFXLEVBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUUsRUFDL0UsRUFBRSxDQUFDLFFBQVEsQ0FBRyxFQUFFLEtBQUssRUFBRyxZQUFZLEVBQUcsS0FBSyxFQUFHLEVBQUUsV0FBVyxFQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRyxDQUFFLENBQzlFLEVBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBRyxFQUFFLEtBQUssRUFBRyxjQUFjLEVBQUcsSUFBSSxFQUFHLEVBQUUsSUFBSSxDQUFHLEVBQUUsSUFBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUUsQ0FDbEYsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELE1BQU0sTUFBTSxHQUNaOzs7Ozs7Ozs7OztDQVdDLENBQUMifQ==