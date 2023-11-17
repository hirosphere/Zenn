import { models as Mehm, Leaf, ef, } from "../meh/index.js";
import { Tabs, Switch } from "../gui/tabs.js";
const log = console.log;
//const log = ( ... any : any ) => {};
const { div, span, p, ul, li, select, option } = ef;
//  //
export const TabSwitchApp = () => {
    const labels = ["Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn"];
    const sel = Mehm.Select.fromLabels(labels, "Nuulll");
    sel.root?.parts[7].select();
    return ef.article({ class: "applet" }, ef.h2("TabSwitch"), ef.section({ class: "col-2" }, div(ef.button({ acts: { click() { sel.default?.select(); } } }, "Null")), Switch(sel.root.parts, option => Content(option)), Tabs(sel.root.parts), ef.section(ef.input({ attrs: { value: sel.current.cv(o => `${o?.value}`) } }))));
};
const Content = (option) => ef.section({}, ef.h2(option.title), ef.p("ご存知、", option.title.toString(), " でございマス。"));
export const SelectApp = () => {
    return ef.article({ class: "applet" }, ef.h2("SelectApp"));
};
//  models  //
var mo;
(function (mo) {
    class Page {
        name;
        constructor(name) {
            this.name = new Leaf.String(name);
        }
    }
    mo.Page = Page;
    class Option extends Mehm.Option {
    }
    mo.Option = Option;
})(mo || (mo = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvdGFic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksSUFBSSxFQUFVLElBQUksRUFBRSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFPLGdCQUFnQixDQUFDO0FBQy9DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDeEIsc0NBQXNDO0FBRXRDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFcEQsTUFBTTtBQUVOLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFFaEMsTUFBTSxNQUFNLEdBQUcsQ0FBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztJQUNyRyxNQUFNLEdBQUcsR0FBNEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ2hGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTlCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFFcEMsRUFBRSxDQUFDLEVBQUUsQ0FBRSxXQUFXLENBQUUsRUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFFN0IsR0FBRyxDQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFFLENBQUUsRUFFNUUsTUFBTSxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFFLE1BQU0sQ0FBRSxDQUFFLEVBRXJELElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxFQUV0QixFQUFFLENBQUMsT0FBTyxDQUVULEVBQUUsQ0FBQyxLQUFLLENBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFJLENBQUMsRUFBRSxLQUFNLEVBQUUsQ0FBRSxFQUFFLEVBQUUsQ0FBRSxDQUN4RSxDQUNELENBQ0QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFHLENBQUUsTUFBMEIsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FDM0QsRUFBRSxFQUNGLEVBQUUsQ0FBQyxFQUFFLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBRSxFQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBRSxDQUNuRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUU3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ3JDLEVBQUUsQ0FBQyxFQUFFLENBQUUsV0FBVyxDQUFHLENBQ3JCLENBQUM7QUFDSCxDQUFDLENBQUE7QUFFRCxjQUFjO0FBRWQsSUFBVSxFQUFFLENBWVg7QUFaRCxXQUFVLEVBQUU7SUFFWCxNQUFhLElBQUk7UUFFUCxJQUFJLENBQUM7UUFDZCxZQUFhLElBQWE7WUFFekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDckMsQ0FBQztLQUNEO0lBUFksT0FBSSxPQU9oQixDQUFBO0lBRUQsTUFBYSxNQUFPLFNBQVEsSUFBSSxDQUFDLE1BQWU7S0FBRztJQUF0QyxTQUFNLFNBQWdDLENBQUE7QUFDcEQsQ0FBQyxFQVpTLEVBQUUsS0FBRixFQUFFLFFBWVgifQ==