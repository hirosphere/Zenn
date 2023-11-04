/*
    DOMエレメント1層分のchildNodesを管理。
    
    「LiteralParts」は 実地のparts定義データ(def)をそのまま生成。
    
    「ArrayParts」は def として与えられた定義 { アレイモデル, 関数 } から、ノード定義を生成。
    アレイモデルがLianであった場合は、その構造変化を動的に反映。

    それぞれのPartsは正確には「PartsFragment 要素連の断片」で、next値で後方へ連結。

    これにより
        実値パーツフラグメントと関数パーツフラグメントの同居
        ArrayPartsが動的に要素を追加する時に必要な、後方ノードオブジェクトの提供
        先頭Partsのdelete()ですべてのchildNodesを破棄・解放
    などを実現する。
*/
import { defs } from "./defs.js";
import { Nodette } from "./nodette.js";
import { Lian } from "../model/lian.js";
const log = console.log;
//  //
export class Parts {
    static create(nodet, def) {
        return createParts(nodet, def, 0);
    }
    partNodets = new Array;
    next;
}
//  //
export const createParts = (nodet, def, index) => {
    let parts;
    //	partdef の内容により 動的フラグメント / 静的フラグメントのいずれかを作成し、 
    //	動的フラグメント作成
    const partdef = def[index];
    if (partdef instanceof defs.ArrayParts) {
        index++;
        parts = new ArrayParts(partdef, nodet);
    }
    //	静的フラグメント作成
    else {
        // 静的パート(Element|Text)定義の連続をflagdefとして分離。
        const flagdef = [];
        while (index < def.length) {
            const partdef = def[index];
            if (partdef instanceof defs.ArrayParts)
                break;
            flagdef.push(partdef);
            index++;
        }
        parts = new LiteralParts(nodet, flagdef, index);
    }
    // .  後方フラグメントを作成。
    if (index < def.length) {
        parts.next = createParts(nodet, def, index);
    }
    return parts;
};
class LiteralParts extends Parts {
    nodet;
    constructor(nodet, def, index) {
        super();
        this.nodet = nodet;
        def.forEach(def => this.createPartNodet(def));
        this._firstnodet = this.partNodets[0];
    }
    createPartNodet(def) {
        const part = new Nodette(def, this.nodet.element);
        this.partNodets.push(part);
    }
    get firstnode() {
        return this._firstnodet?.node || this.next?.firstnode;
    }
    _firstnodet;
    delete() {
        this.next?.delete();
    }
}
class ArrayParts extends Parts {
    def;
    nodet;
    constructor(def, nodet) {
        super();
        this.def = def;
        this.nodet = nodet;
        if (def.source instanceof Lian)
            def.source.ref(this);
        else
            this.add(0, def.source.length);
    }
    // Lian Ref オペレーション //
    add(start, count) {
        const next = start + count;
        const partmodels = this.def.source.slice(start, next);
        const nextnode = this.partNodets[start]?.node || this.next?.firstnode;
        const nodets = partmodels.map(partmodel => this.createPart(partmodel, nextnode));
        this.partNodets.splice(start, 0, ...nodets);
    }
    remove(start, count) {
        const rem = this.partNodets.splice(start, count);
        rem.forEach(nodet => nodet.delete());
    }
    //  //
    createPart(model, nextNode) {
        const partdef = this.def.create(model);
        return new Nodette(partdef, this.nodet.element, nextNode);
    }
    get firstnode() {
        return this.partNodets.length && this.partNodets[0].node || this.next?.firstnode;
    }
    delete() {
        this.next?.delete();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7QUFJRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQVksTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsTUFBTTtBQUVOLE1BQU0sT0FBZ0IsS0FBSztJQUVuQixNQUFNLENBQUMsTUFBTSxDQUFFLEtBQWUsRUFBRSxHQUFnQjtRQUV0RCxPQUFPLFdBQVcsQ0FBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBRSxDQUFDO0lBQ3JDLENBQUM7SUFFbUIsVUFBVSxHQUFHLElBQUksS0FBaUIsQ0FBQztJQUdoRCxJQUFJLENBQVc7Q0FFdEI7QUFFRCxNQUFNO0FBRU4sTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUUsS0FBZSxFQUFFLEdBQWdCLEVBQUUsS0FBYyxFQUFXLEVBQUU7SUFFMUYsSUFBSSxLQUFhLENBQUM7SUFFbEIsZ0RBQWdEO0lBRS9DLGFBQWE7SUFFZCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7SUFDN0IsSUFBSSxPQUFPLFlBQVksSUFBSSxDQUFDLFVBQVUsRUFDdEM7UUFDQyxLQUFLLEVBQUcsQ0FBQztRQUNULEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLENBQUM7S0FDekM7SUFFQSxhQUFhO1NBR2Q7UUFDQyx5Q0FBeUM7UUFDekMsTUFBTSxPQUFPLEdBQWlCLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUN6QjtZQUND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