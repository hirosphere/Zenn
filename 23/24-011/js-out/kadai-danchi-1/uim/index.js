export * as navi from "./navi.js";
export * from "./page.js";
import { Exist, log } from "../../meh/index.js";
import * as navi from "./navi.js";
import mapsrc from "../map/danchi.js";
export class App extends Exist {
    constructor(con) {
        super(con);
        const danchi = new navi.Danchi(this, mapsrc);
        const index = this.make_index(danchi);
        navi.browser.index.value = index;
    }
    make_index(danchi) {
        const params = new URLSearchParams(location.search);
        const roompath = params.get("room") ?? "";
        const room = danchi.rooms[roompath];
        log("room", roompath, room?.title.v);
        return room ?? danchi;
    }
    ;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMva2FkYWktZGFuY2hpLTEvdWltL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLGNBQWMsV0FBVyxDQUFDO0FBRTFCLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxLQUFLLElBQUksTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxNQUFNLE1BQU0sa0JBQWtCLENBQUM7QUFFdEMsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLO0lBRTdCLFlBQWEsR0FBcUI7UUFFakMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRWIsTUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxNQUFNLENBQUUsQ0FBQztRQUUvQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVELFVBQVUsQ0FBRSxNQUFvQjtRQUUvQixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBRSxRQUFRLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFdEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUUsSUFBSSxFQUFFLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBRSxRQUFRLENBQUUsQ0FBQztRQUV0QyxHQUFHLENBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBRSxDQUFDO1FBRXZDLE9BQU8sSUFBSSxJQUFJLE1BQU0sQ0FBRTtJQUd4QixDQUFDO0lBQUEsQ0FBQztDQUNGIn0=