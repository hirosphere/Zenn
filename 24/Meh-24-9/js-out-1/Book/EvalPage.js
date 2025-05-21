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
    const arrand = (ar) => ar[Math.floor(Math.random() * ar.length)];
    const fixrand = (frac, max, min = 0) => (Math.random() * (max - min) + min).toFixed(frac);
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
    return ef.main({ class: "EVAL_PAGE BS" }, ef.section({ class: "EVAL_PAGE_BAR" }, "Eval ", vm.current.value.title, ef.button({ acts: { click: () => vm.execute() } }, "Eval")), pl.switch(vm.current, cur => Eval(cur)));
};
const Eval = (vm) => {
    return ef.section({ class: "EVAL" }, ef.section({ class: "EVAL_EDIT" }, ef.textarea({ class: "EVAL_CODE", binds: { value_input: vm.code } }), ef.textarea({ class: "EVAL_OUTPUT", binds: { value_input: vm.output } }), ef.textarea({ class: "EVAL_INPUT", binds: { value_input: vm.input } })), ef.section({
        class: "EVAL_DISPLAY",
        hook: { init(el) { vm.e = el; } }
    }));
};
const sample = `const fn = () =>
{
	const color = e.style.color = \`hsl( 0 , 0% , 0% , \${ fixrand ( 0 , 70 , 40 ) }% )\` ;
	const ff = e.style.fontFamily = arrand ( fontsets ) ;
	const sz = e.style.fontSize = \`\${ fixrand ( 0 , 72 , 9 ) }px\` ;
	const uuid = e.textContent = crypto.randomUUID () ;

	return { ff , sz , color , uuid } ;
}

JSON .stringify ( fn() , null , "\\t" ) ;
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbFBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvQm9vay9FdmFsUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxFQUFFLEVBQUcsRUFBRSxFQUFjLE1BQU0saUJBQWlCLENBQUU7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFFO0FBR25ELElBQVUsRUFBRSxDQWdJWDtBQWhJRCxXQUFVLEVBQUU7SUFFWCxNQUFhLEdBQUc7UUFFZixPQUFPLENBQW1CO1FBQzFCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FFZixLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUUsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFLEdBQUcsQ0FBRyxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLEtBQUssR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFLENBQzlFLENBQUU7UUFFSDtZQUVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxLQUFLLENBQUUsTUFBTSxDQUFHLENBQUMsQ0FBRSxDQUFFLE1BQU0sQ0FBRSxDQUFFO1FBQzVELENBQUM7UUFFRCxPQUFPO1lBRU4sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFHLENBQUU7UUFDaEMsQ0FBQztLQUNEO0lBakJZLE1BQUcsTUFpQmYsQ0FBQTtJQUVELE1BQWEsSUFBSTtRQVNLO1FBUHJCLElBQUksR0FBRyxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFDeEIsTUFBTSxHQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUN0QixLQUFLLEdBQUcsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFFO1FBQ3JCLENBQUMsQ0FBYztRQUVmLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBRTtRQUVu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