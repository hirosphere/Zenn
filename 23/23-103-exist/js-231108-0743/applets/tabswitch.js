import { models as Mehm, Leaf, ef, each, newhook } from "../meh/index.js";
import { Applet } from "./applet.js";
const log = console.log;
const { div, span, p, ul, li, select, option } = ef;
//  //
class PageContent {
    name;
    constructor(name) {
        this.name = new Leaf.String(name);
    }
}
//  //
export const TabSwitchApp = () => {
    const labels = ["Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn"];
    const sel = Mehm.Select.fromLabels(labels, "Nuuull");
    sel.root?.parts[3].select();
    return Applet({
        title: "TabSwitch",
        content: [
            div(ef.button({ acts: { click() { sel.default.select(); } } }, "Null")),
            Tabs(sel.root.parts),
            Tabs(sel.root.parts),
            Tabs(sel.root.parts),
            ef.input({ attrs: { value: sel.current.cv(o => `${o?.value}`) } })
        ]
    });
};
// Tab|Tab|Tab //
const Tabs = (opts) => {
    const hook = newhook();
    hook.init = () => {
        log("Tabs init()", hook.e);
    };
    const gr = new Grazer({ buttons: 1, hook });
    return ul({
        class: "tabs",
        actActs: {
            touchstart(ev) { gr.ctstart(ev); },
            touchmove(ev) { gr.ctmove(ev); },
            touchcancel(ev) { gr.ctend(ev); },
            touchend(ev) { gr.ctend(ev); }
        },
        hook,
    }, each(opts || [], opt => Tab(opt, gr)));
};
const Tab = (opt, gr) => {
    return li({
        class: ["tab", { selected: opt.selected }],
        actActs: {
            mousedown(ev) { gr.mousedown(ev) && opt.select(); },
            mouseenter(ev) { gr.mouseenter(ev) && opt.select(); },
        }
    }, opt.value);
};
//  //
const Contents = () => {
    ;
};
//  //
class Grazer {
    args;
    get isActive() { return this._isActive; }
    constructor(args) {
        this.args = args;
        document.addEventListener("mouseup", () => this._isActive = false);
    }
    _isActive = false;
    current = null;
    //  //
    mousedown(ev) {
        log("mouse down");
        if (ev.buttons != this.args.buttons)
            return false;
        this._isActive = true;
        ev.preventDefault();
        return true;
    }
    mouseenter(ev) {
        if (ev.buttons != this.args.buttons)
            this._isActive = false;
        log("mouse enter", ev.buttons, this.args.buttons, this.isActive);
        return this._isActive;
    }
    // container event handlers //
    ctstart(ev) {
        const e = this.postoel(ev);
        this._isActive = true;
        ev.touches.length == 1 && ev.preventDefault();
        log("ct start", e?.innerHTML);
        if (!e)
            return;
        this.current = e;
        this.dispatch("mousedown", e, ev.touches[0]);
    }
    ctmove(ev) {
        const e = this.postoel(ev);
        if (!e)
            return "";
        this.current = e;
        log("ct move", e?.innerHTML.slice(0, 12));
        this.dispatch("mouseenter", e, ev.touches[0]);
        return "";
    }
    ctend(ev) {
        log("ct end");
        this.current = null;
        this._isActive = false;
    }
    dispatch(type, e, touch) {
        if (!touch)
            return;
        e.dispatchEvent(new MouseEvent(type, {
            cancelable: true,
            bubbles: true,
            buttons: this.args.buttons,
            ...touch
        }));
    }
    postoel(ev) {
        if (ev.touches.length != 1)
            return null;
        const t = ev.touches[0];
        const e = document.elementFromPoint(t.clientX, t.clientY);
        if (e == this.current)
            return null;
        return e;
        //if( e && e.parentNode == this.args.hook.e ) return e;
        //return null; 
    }
}
class TouchToMouse {
    touchstart(ev) {
        ;
    }
    touchmove(ev) {
        ;
    }
    touchcancel(ev) {
        ;
    }
    touchend(ev) {
        ;
    }
    dispatch(type, target, touch) {
        ;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvdGFic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBRXBELE1BQU07QUFFTixNQUFNLFdBQVc7SUFFUCxJQUFJLENBQUM7SUFDZCxZQUFhLElBQWE7UUFFekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7SUFDckMsQ0FBQztDQUNEO0FBRUQsTUFBTTtBQUVOLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFFaEMsTUFBTSxNQUFNLEdBQUcsQ0FBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztJQUNyRyxNQUFNLEdBQUcsR0FBNEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ2hGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTlCLE9BQU8sTUFBTSxDQUFDO1FBQ2IsS0FBSyxFQUFFLFdBQVc7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