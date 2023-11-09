/*
    DOMエレメント1層分のchildNodesを管理。
    
    「LitParts」は リテラルなDOMノード定義データ( def : defs.Element | defs.Text )からDOMノードを生成。
    
    「FuncParts」は ( def : { source: Array, create: ( item ) => Element | Text } ) として与えられた定義から、DOMノード定義を生成。
    さらにアレイモデルがLianであった場合は、挿入・削除・移動などその構造変化を動的に反映。

    それぞれのPartsは正確には「PartsFragment 要素連の断片」で、next値で後方へ連結。

    これにより
        実値パーツフラグメントと関数パーツフラグメントの同居
        ArrayPartsが動的に要素を追加する時に必要な、後方ノードオブジェクトの提供
    などを実現。

    先頭Partsのdelete()ですべてのchildNodesを破棄・解放。

*/
import { defs } from "./defs.js";
import { Nodette } from "./nodette.js";
import { LianBase } from "../model/lian.js";
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
    //	partdef の内容により 即値フラグメント / 関数フラグメントのいずれかを作成し、 
    //	関数フラグメント作成
    const partdef = def[index];
    if (partdef instanceof defs.ArrayParts) {
        index++;
        parts = new FuncParts(partdef, nodet);
    }
    //	即値フラグメント作成
    else {
        // 即値パート(Element|Text)定義の連続をflagdefとして取り出す。
        const flagdef = [];
        while (index < def.length) {
            const partdef = def[index];
            if (partdef instanceof defs.ArrayParts)
                break;
            flagdef.push(partdef);
            index++;
        }
        parts = new LitParts(nodet, flagdef, index); // 
    }
    // .  後方フラグメントを作成。
    if (index < def.length) {
        parts.next = createParts(nodet, def, index);
    }
    return parts;
};
class LitParts extends Parts {
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
class FuncParts extends Parts {
    def;
    nodet;
    constructor(def, nodet) {
        super();
        this.def = def;
        this.nodet = nodet;
        if (def.source instanceof LianBase)
            def.source.ref(this);
        else
            this.add(0, def.source.length);
    }
    // Lian Ref オペレーション //
    add(start, count) {
        const partmodels = this.def.source.slice(start, start + count);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQkU7QUFJRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsTUFBTTtBQUVOLE1BQU0sT0FBZ0IsS0FBSztJQUVuQixNQUFNLENBQUMsTUFBTSxDQUFFLEtBQWUsRUFBRSxHQUFnQjtRQUV0RCxPQUFPLFdBQVcsQ0FBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBRSxDQUFDO0lBQ3JDLENBQUM7SUFFbUIsVUFBVSxHQUFHLElBQUksS0FBaUIsQ0FBQztJQUdoRCxJQUFJLENBQVc7Q0FFdEI7QUFFRCxNQUFNO0FBRU4sTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUUsS0FBZSxFQUFFLEdBQWdCLEVBQUUsS0FBYyxFQUFXLEVBQUU7SUFFMUYsSUFBSSxLQUFhLENBQUM7SUFFbEIsZ0RBQWdEO0lBRS9DLGFBQWE7SUFFZCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7SUFDN0IsSUFBSSxPQUFPLFlBQVksSUFBSSxDQUFDLFVBQVUsRUFDdEM7UUFDQyxLQUFLLEVBQUcsQ0FBQztRQUNULEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLENBQUM7S0FDeEM7SUFFQSxhQUFhO1NBR2Q7UUFDQywyQ0FBMkM7UUFFM0MsTUFBTSxPQUFPLEdBQWlCLEVBQUUsQ0FBQztRQUVqQyxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUN6QjtZ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