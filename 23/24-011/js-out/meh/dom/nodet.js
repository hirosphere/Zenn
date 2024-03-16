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
    refcon;
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
        if (acts) {
            for (const [name, act] of Object.entries(acts)) {
                this.act_bind(e, name, act);
            }
        }
        if (style) {
            for (const [name, lol] of Object.entries(style)) {
                // log( name, lol );
                this.bind_leafr(lol, value => e.style[name] = value);
            }
        }
        if (def.parts)
            this.parts = createParts(this, e, def.parts);
        if (exist) {
            this.refcon ??= new Exist.RefContainer();
            new Exist.Ref(this.refcon, { old_source: () => this.terminate() }).source = exist;
        }
        attrs = undefined;
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
            this.refcon ??= new Exist.RefContainer();
            new Leafr.Ref(this.refcon, { new_value: update }, text);
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
        this.refcon?.refs_term();
        super.terminate();
    }
}
const setattr = (e, name, value) => {
    e.setAttribute(name, String(value));
};
/** */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9ub2RldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLEtBQUssRUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBZ0IsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDekIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUl4Qjs7OztFQUlFO0FBRUYsTUFBTSxPQUFPLEtBQU0sU0FBUSxLQUFLO0lBRXJCLElBQUksQ0FBVztJQUNmLENBQUMsQ0FBYztJQUNmLElBQUksQ0FBdUM7SUFDM0MsS0FBSyxDQUFtQjtJQUN4QixNQUFNLENBQXlCO0lBRXpDLFlBRUMsU0FBMkIsRUFDM0IsR0FBc0IsRUFDdEIsRUFBMkIsRUFDM0IsR0FBaUI7UUFHakIsS0FBSyxDQUFFLFNBQVMsQ0FBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBRSxHQUFHLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUUsR0FBRyxDQUFFLENBQ3RCO1FBRUQsRUFBRSxFQUFFLFlBQVksQ0FBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsY0FBYztJQUVKLGFBQWEsQ0FBRSxHQUFrQjtR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