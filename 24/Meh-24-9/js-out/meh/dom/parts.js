import { defs } from "./defs.js";
import * as nodet from "./nodet.js";
export const create_place = (ce, df, def) => (next_place(ce, df, def, 0));
const next_place = (ce, df, def, pos) => {
    const cur = def[pos];
    if (cur instanceof defs.Place) {
        pos++;
        if (cur instanceof defs.Each) {
            return new EachPlace(ce, df, cur, def, pos);
        }
        return;
    }
    if (cur !== undefined) {
        return new StaticPlace(ce, df, def, pos);
    }
};
/* */
export class Place {
    next;
    make_part(df, pdef) {
        let is_period = false;
        if (pdef instanceof nodet.Nodet) {
            pdef.node && df.appendChild(pdef.node);
        }
        else if (pdef instanceof Node) {
            df.appendChild(pdef);
        }
        else if (!(pdef instanceof defs.Place)) {
            const n = new nodet.Text(pdef);
            n.node && df.appendChild(n.node);
        }
        else
            is_period = true;
        return is_period;
    }
    destruct() { }
}
class StaticPlace extends Place {
    constructor(ce, df, def, pos) {
        super();
        while (pos < def.length) {
            const pdef = def[pos];
            if (this.make_part(df, pdef)) {
                break;
            }
            pos++;
        }
        this.next = next_place(ce, df, def, pos);
    }
}
class EachPlace extends Place {
    constructor(ce, df, edef, def, pos) {
        super();
        edef.source.orders.forEach(order => this.make_part(df, edef.create_node(order)));
        this.next = next_place(ce, df, def, pos);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FDekIsQ0FDQyxFQUFZLEVBQ1osRUFBcUIsRUFDckIsR0FBZ0IsRUFFRyxFQUFFLENBQ3RCLENBQ0MsVUFBVSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBRSxDQUM1QixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQ2hCLENBQ0MsRUFBWSxFQUNaLEVBQXFCLEVBQ3JCLEdBQWdCLEVBQ2hCLEdBQVksRUFFTyxFQUFFO0lBRXJCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUV2QixJQUFJLEdBQUcsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUM3QjtRQUNDLEdBQUcsRUFBRyxDQUFFO1FBRVIsSUFBSSxHQUFHLFlBQVksSUFBSSxDQUFDLElBQUksRUFDNUI7WUFDQyxPQUFPLElBQUksU0FBUyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQztTQUM5QztRQUVELE9BQVE7S0FDUjtJQUVELElBQUksR0FBRyxLQUFLLFNBQVMsRUFDckI7UUFDQyxPQUFPLElBQUksV0FBVyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBRSxDQUFDO0tBQzNDO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsS0FBSztBQUdMLE1BQU0sT0FBTyxLQUFLO0lBRVAsSUFBSSxDQUFZO0lBRWhCLFNBQVMsQ0FFbEIsRUFBcUIsRUFDckIsSUFBZ0I7UUFJaEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFBO1FBRXJCLElBQUksSUFBSSxZQUFZLEtBQUssQ0FBQyxLQUFLLEVBQy9CO1lBQ0MsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQztTQUN6QzthQUVJLElBQUksSUFBSSxZQUFZLElBQUksRUFDN0I7WUFDQyxFQUFFLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBRSxDQUFDO1NBQ3ZCO2FBRUksSUFBSSxDQUFFLENBQUUsSUFBSSxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUUsRUFDekM7WUFDQyxNQUFNLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUU7WUFDbEMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBRTtTQUNwQzs7WUFFSSxTQUFTLEdBQUcsSUFBSSxDQUFFO1FBRXZCLE9BQU8sU0FBUyxDQUFFO0lBQ25CLENBQUM7SUFFTSxRQUFRLEtBQ2QsQ0FBQztDQUNGO0FBSUQsTUFBTSxXQUFZLFNBQVEsS0FBSztJQUU5QixZQUVDLEVBQVksRUFDWixFQUFxQixFQUNyQixHQUFnQixFQUNoQixHQUFZO1FBSVosS0FBSyxFQUFFLENBQUM7UUFFUixPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUN2QjtZQUNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBRTtZQUV6QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUUsRUFBRSxFQUFFLElBQUksQ0FBRSxFQUM5QjtnQkFDQyxNQUFPO2FBQ1A7WUFFRCxHQUFHLEVBQUcsQ0FBRTtTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFFLENBQUM7SUFDNUMsQ0FBQztDQUNEO0FBR0QsTUFBTSxTQUFVLFNBQVEsS0FBSztJQUU1QixZQUVDLEVBQVksRUFDWixFQUFxQixFQUNyQixJQUFnQixFQUNoQixHQUFnQixFQUNoQixHQUFZO1FBR1osS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBRXpCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FFdEIsRUFBRSxFQUNGLElBQUksQ0FBQyxXQUFXLENBQUUsS0FBSyxDQUFFLENBQ3pCLENBQ0QsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQzVDLENBQUM7Q0FDRCJ9