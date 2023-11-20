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
            partdef != null && flagdef.push(partdef);
            index++;
        }
        parts = new LiteralParts(nodet, flagdef, index); // 
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
class FuncParts extends Parts {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQkU7QUFJRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsTUFBTTtBQUVOLE1BQU0sT0FBZ0IsS0FBSztJQUVuQixNQUFNLENBQUMsTUFBTSxDQUFFLEtBQWUsRUFBRSxHQUFnQjtRQUV0RCxPQUFPLFdBQVcsQ0FBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBRSxDQUFDO0lBQ3JDLENBQUM7SUFFbUIsVUFBVSxHQUFHLElBQUksS0FBaUIsQ0FBQztJQUdoRCxJQUFJLENBQVc7Q0FFdEI7QUFFRCxNQUFNO0FBRU4sTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUUsS0FBZSxFQUFFLEdBQWdCLEVBQUUsS0FBYyxFQUFXLEVBQUU7SUFFMUYsSUFBSSxLQUFhLENBQUM7SUFFbEIsZ0RBQWdEO0lBRS9DLGFBQWE7SUFFZCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7SUFDN0IsSUFBSSxPQUFPLFlBQVksSUFBSSxDQUFDLFVBQVUsRUFDdEM7UUFDQyxLQUFLLEVBQUcsQ0FBQztRQUNULEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLENBQUM7S0FDeEM7SUFFQSxhQUFhO1NBR2Q7UUFDQywyQ0FBMkM7UUFFM0MsTUFBTSxPQUFPLEdBQWlCLEVBQUUsQ0FBQztRQUVqQyxPQUFPLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUN6QjtZQUNDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztZQUM3QixJQUFJLE9BQU8sWUFBWSxJQUFJLENBQUMsVUFBVTtnQkFBRyxNQUFNO1lBQy9DLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBRSxPQUFPLENBQUUsQ0FBQztZQUMzQyxLQUFLLEVBQUcsQ0FBQztTQUNUO1FBRUQsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLENBQUMsQ0FBQyxHQUFHO0tBQ3REO0lBRUQsa0JBQWtCO0lBRWxCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUc7UUFDeEIsS0FBSyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUUsQ0FBQztLQUM5QztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBR0YsTUFBTSxZQUFhLFNBQVEsS0FBSztJQUVWO0lBQXJCLFlBQXFCLEtBQWUsRUFBRSxHQUFrQixFQUFFLEtBQWM7UUFFdkUsS0FBSyxFQUFFLENBQUM7UUFGWSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBR25DLEdBQUcsQ0FBQyxPQUFPLENBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFFLEdBQUcsQ0FBRSxDQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUMsQ0FBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxlQUFlLENBQUUsR0FBZTtRQUUvQixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBRW5CLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQUVPLFdBQVcsQ0FBYTtJQUVoQyxNQUFNO1FBRUwsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0Q7QUFHRCxNQUFNLFNBQVUsU0FBUSxLQUFLO0lBRUw7SUFBdUM7SUFBOUQsWUFBdUIsR0FBNkIsRUFBVSxLQUFlO1FBRTVFLEtBQUssRUFBRSxDQUFDO1FBRmMsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBSTVFLElBQUksR0FBRyxDQUFDLE1BQU0sWUFBWSxJQUFJO1lBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFFLENBQUM7O1lBQ25ELElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELHNCQUFzQjtJQUV0QixHQUFHLENBQUUsS0FBYyxFQUFFLEtBQWM7UUFFbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFFLENBQUM7UUFDakUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxLQUFLLENBQUUsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7UUFDeEUsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FFNUIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLFNBQVMsRUFBRSxRQUFRLENBQUUsQ0FDbkQsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBSSxNQUFNLENBQUUsQ0FBQztJQUNoRCxDQUFDO0lBR0QsTUFBTSxDQUFFLEtBQWMsRUFBRSxLQUFjO1FBRXJDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsQ0FBQztRQUNuRCxHQUFHLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU07SUFFSSxVQUFVLENBQUUsS0FBVyxFQUFFLFFBQWlCO1FBRW5ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFJLFNBQVM7UUFFWixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO0lBQ3BGLENBQUM7SUFFTSxNQUFNO1FBRVosSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0QifQ==