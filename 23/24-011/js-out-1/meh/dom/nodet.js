import { Exist } from "../model/exist.js";
import { Leafr } from "../model/leaf.js";
import { defs } from "./defs.js";
import { createParts } from "./parts.js";
import { _ls } from "../ls.js";
const ls = _ls.dom.nodet;
const log = console.log;
/** class Nodet
 *
 * DOMのElementのプロパティー(クラス名, 属性, スタイル)と要素、Textの値をリアクティブにする委譲クラス。
 *
*/
export class Nodet extends Exist {
    node;
    e;
    acts;
    parts;
    sources;
    constructor(container, def, ce, rel) {
        super(container);
        this.node = (def instanceof defs.Element) ?
            this.createElement(def) :
            this.createText(def);
        ce?.insertBefore(this.node, rel || null);
    }
    /** element */
    createElement(def) {
        const e = this.e = document.createElement(def.type);
        let { exist, attrs, props, acts, style } = def.echar || {};
        if (def.echar?.class) {
            this.class_bind(e, def.echar.class);
        }
        if (attrs) {
            for (const [name, lol] of Object.entries(attrs)) {
                this.bind_leafr(lol, value => setattr(e, name, value));
            }
        }
        if (props) {
            for (const [name, lol] of Object.entries(props)) {
                this.bind_leafr(lol, value => e[name] = value);
            }
        }
        if (style) {
            for (const [name, lol] of Object.entries(style)) {
                // log( name, lol );
                this.bind_leafr(lol, value => e.style[name] = value);
            }
        }
        if (acts) {
            for (const [name, act] of Object.entries(acts)) {
                this.act_bind(e, name, act);
            }
        }
        if (def.parts)
            this.parts = createParts(this, e, def.parts);
        if (exist) {
            this.sources ??= new Exist.Ref.Container();
            new Exist.Ref(this.sources, { old_source: () => this.terminate() }, exist);
        }
        exist = attrs = props = acts = style = undefined;
        return e;
    }
    class_bind(e, def) {
        if (typeof def == "string")
            e.className = def;
    }
    act_bind(e, name, act) {
        this.acts = this.acts || new Map;
        if (this.acts.has(name))
            this.acts.get(name)?.push(act);
        else
            this.acts.set(name, [act]);
        e.addEventListener(name, act);
    }
    /** text */
    createText(text) {
        const node = document.createTextNode("");
        this.bind_leafr(text, (lettr) => { node.nodeValue = lettr; });
        return node;
    }
    /** リアクティブ核心 */
    bind_leafr(text, update) {
        if (text instanceof Leafr) {
            this.sources ??= new Exist.Ref.Container();
            new Leafr.Ref(this.sources, { new_value: update }, text);
        }
        else
            update(text);
    }
    ;
    /** life */
    terminate() {
        if (this.e && this.acts) {
            for (let [name, acts] of this.acts) {
                ls.evh.s && log(name);
                acts.forEach(act => this.e?.removeEventListener(name, act));
            }
        }
        if (this.e) {
            this.e.remove();
            this.e = undefined;
        }
        this.node = undefined;
        this.parts?.pf_term();
        this.sources?.refs_term();
        super.terminate();
    }
}
const setattr = (e, name, value) => {
    e.setAttribute(name, String(value));
};
/** */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9ub2RldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFnQixXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUN6QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBSXhCOzs7O0VBSUU7QUFFRixNQUFNLE9BQU8sS0FBTSxTQUFRLEtBQUs7SUFFckIsSUFBSSxDQUFXO0lBQ2YsQ0FBQyxDQUFjO0lBQ2YsSUFBSSxDQUF1QztJQUMzQyxLQUFLLENBQW1CO0lBQ3hCLE9BQU8sQ0FBMEI7SUFFM0MsWUFFQyxTQUE0QixFQUM1QixHQUFzQixFQUN0QixFQUEyQixFQUMzQixHQUFpQjtRQUdqQixLQUFLLENBQUUsU0FBUyxDQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFFLEdBQUcsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBRSxHQUFHLENBQUUsQ0FDdEI7UUFFRCxFQUFFLEVBQUUsWUFBWSxDQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxjQUFjO0lBRUosYUFBYSxDQUFFLEdBQWtCO1FB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