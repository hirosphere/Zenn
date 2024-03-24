import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
import { _ls } from "../ls.js";
const ls = _ls.dom.parts;
const log = console.log;
/** createParts */
export const createParts = (nodet, ce, def) => {
    return new Reader(nodet, ce, def).next();
};
/** 定義リーダー defs.Part[]型の定義からPartFragmentを作成  */
class Reader {
    nodet;
    ce;
    def;
    pos = 0;
    constructor(nodet, ce, def) {
        this.nodet = nodet;
        this.ce = ce;
        this.def = def;
    }
    next() {
        const start_pos = this.pos;
        return this.next_literal() || this.next_each();
    }
    next_literal() {
        const def = [];
        for (; this.pos < this.def.length; this.pos++) {
            if (this.cur instanceof defs.Each)
                break;
            if (this.cur != null)
                def.push(this.cur);
        }
        return def.length && new LiteralPF(def, this) || undefined;
    }
    next_each() {
        const cur = this.cur;
        if (cur instanceof defs.Each) {
            ls.reader.s && log(`pf.reader ${this.nodet.runiq} next_each`);
            this.pos++;
            return new EachPF(cur, this);
        }
        ;
    }
    get cur() { return this.def[this.pos]; }
}
/** class PartFragment */
export class PartFragment {
    reader;
    constructor(reader) {
        this.reader = reader;
    }
    next;
    get firstnode() { return; }
    create_part(def) {
        new Nodet(this.reader.nodet, def, this.reader.ce || null);
    }
    pf_term() {
        this.next?.pf_term();
    }
}
class LiteralPF extends PartFragment {
    def;
    constructor(def, reader) {
        super(reader);
        this.def = def;
        def.forEach(pdef => this.create_part(pdef));
        this.next = reader.next();
    }
}
class EachPF extends PartFragment {
    def;
    constructor(def, reader) {
        super(reader);
        this.def = def;
        ls.each.s && log("Each PF");
        def.force = (value) => {
            ls.each.s && log("force", def?.create);
            const pdef = def.create?.(value);
            pdef && this.create_part(pdef);
        };
        if (def.source instanceof Array) {
            def.source.forEach(value => this.create_part(def.create?.(value) ?? value));
        }
        this.next = reader.next();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUN6QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBS3hCLGtCQUFrQjtBQUVsQixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQ3hCLENBQ0MsS0FBYSxFQUNiLEVBQVksRUFDWixHQUFrQixFQUVVLEVBQUU7SUFFOUIsT0FBTyxJQUFJLE1BQU0sQ0FBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUdGLCtDQUErQztBQUUvQyxNQUFNLE1BQU07SUFNSDtJQUNBO0lBQ0c7SUFORCxHQUFHLEdBQVksQ0FBQyxDQUFBO0lBRTFCLFlBRVEsS0FBYSxFQUNiLEVBQVksRUFDVCxHQUFpQjtRQUZwQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsT0FBRSxHQUFGLEVBQUUsQ0FBVTtRQUNULFFBQUcsR0FBSCxHQUFHLENBQWM7SUFDekIsQ0FBQztJQUVHLElBQUk7UUFFVixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRVMsWUFBWTtRQUVyQixNQUFNLEdBQUcsR0FBaUIsRUFBRSxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJ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