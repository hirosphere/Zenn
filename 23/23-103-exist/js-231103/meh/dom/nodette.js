import { Leaf, ToString } from "../model/leaf.js";
import { Parts as Parts } from "./parts.js";
const log = console.log;
class Refs extends Set {
}
//
export class Nodette {
    node;
    element = null;
    parts;
    refs = new Refs;
    constructor(def, ce, nextNode) {
        if (typeof def == "object" && "isElement" in def)
            this.createElement(def, ce, nextNode);
        else
            this.createText(def, ce, nextNode);
    }
    createElement(def, ce, nextNode) {
        const { type, class: className, props, attrs, style, acts, actActs, optActs, parts } = def;
        const e = document.createElement(type);
        this.node = this.element = e;
        if (className)
            this.bindClass(e, className);
        if (props)
            this.bindProps(e, props);
        if (attrs)
            this.bindAttrs(e, attrs);
        if (style)
            this.bindStyle(e, style);
        if (acts)
            this.bindActs(e, acts);
        if (actActs)
            this.bindActs(e, actActs, { passive: false });
        if (optActs)
            this.bindOptActs(e, optActs);
        if (def.parts)
            this.parts = Parts.create(this, def.parts);
        if (ce)
            ce.insertBefore(e, nextNode || null);
        return e;
    }
    createText(def, ce, nextNode) {
        const node = document.createTextNode("");
        bindText(node, "nodeValue", def, this.refs);
        if (ce)
            ce.insertBefore(node, nextNode || null);
        this.node = node;
        return node;
    }
    // bind opers //
    bindClass(e, def) {
        if (def instanceof Array) {
            for (const subdef of def)
                this.bindClass(e, subdef);
            return;
        }
        if (typeof def == "string" || def instanceof Leaf) {
            bindText(e, "className", def, this.refs);
        }
        else if (typeof def == "object") {
            for (const [name, value] of Object.entries(def)) {
                bindClass(e, name, value, this.refs);
            }
        }
    }
    bindProps(e, def) {
        for (const [name, value] of Object.entries(def)) {
            bindText(e, name, value, this.refs);
        }
    }
    bindAttrs(e, def) {
        for (const [name, value] of Object.entries(def)) {
            bindAttr(e, name, value, this.refs);
        }
    }
    bindStyle(e, def) {
        for (const [name, value] of Object.entries(def)) {
            bindText(e.style, name, value || "", this.refs);
        }
    }
    bindActs(e, def, opt) {
        for (const [name, act] of Object.entries(def)) {
            e.addEventListener(name, act, opt);
        }
    }
    bindOptActs(e, def) {
        for (const [name, actdef] of Object.entries(def)) {
            const [act, opt] = actdef;
            e.addEventListener(name, act, opt);
        }
    }
    //  //
    delete() {
        this.node?.parentElement?.removeChild(this.node);
        this.parts?.delete();
        this.refs.forEach(ref => ref.release());
        this.refs.clear();
    }
}
// binds //
const bindClass = (e, name, value, refs) => {
    if (value instanceof Leaf) {
        refs.add(value.ref((value) => e.classList.toggle(name, value)));
    }
    else
        e.classList.toggle(name, value);
};
const bindAttr = (e, name, value, refs) => {
    if (value instanceof Leaf) {
        refs.add(value.ref(() => setAttr(e, name, value.get())));
    }
    else if (value instanceof ToString) {
        refs.add(value.ref(() => setAttr(e, name, value.toString())));
    }
    else
        setAttr(e, name, value);
};
const setAttr = (e, name, value) => {
    if (typeof value == "boolean") {
        value ? e.setAttribute(name, "") : e.removeAttribute(name);
    }
    else {
        e.setAttribute(name, String(value));
    }
};
export const bindText = (target, name, text, refs) => {
    if (text instanceof ToString) {
        refs.add(text.ref(() => { target[name] = text.toString(); }));
    }
    else
        target[name] = text;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXR0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL25vZGV0dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBWSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRXhCLE1BQU0sSUFBSyxTQUFRLEdBQVc7Q0FBRztBQUVqQyxFQUFFO0FBRUYsTUFBTSxPQUFPLE9BQU87SUFFWixJQUFJLENBQVU7SUFDZCxPQUFPLEdBQW9CLElBQUksQ0FBQztJQUMvQixLQUFLLENBQVc7SUFDaEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDO0lBRXhCLFlBQWEsR0FBZSxFQUFFLEVBQW1CLEVBQUUsUUFBaUI7UUFFbkUsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLElBQUksV0FBVyxJQUFJLEdBQUc7WUFBSSxJQUFJLENBQUMsYUFBYSxDQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFFLENBQUM7O1lBQ3RGLElBQUksQ0FBQyxVQUFVLENBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRU8sYUFBYSxDQUFFLEdBQWtCLEVBQUUsRUFBbUIsRUFBRSxRQUFpQjtRQUVoRixNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUksR0FBRyxDQUFDO1FBRTVGLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENB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