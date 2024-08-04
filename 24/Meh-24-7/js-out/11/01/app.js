import { Exist, Leaf, dom, ef, Browser, root, util } from "../../meh/index.js";
import { Eval } from "./eval.js";
const browser = new Browser(root, { title: "24-11-01 ." });
const ClockView = (com) => {
    const self = new Exist(com);
    const label = new Leaf.String(com, "---");
    new Clock(self, (now) => {
        label.value = util.df1("{YYYY}-{MM}-{DD} ({B}) {hh}:{mm}:{ss}", now);
    });
    return ef.main({
        style: {
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
        }
    }, ef.h1({ style: {} }, label), Eval(self));
};
class Clock extends Exist {
    update;
    timeout = 0;
    constructor(com, update) {
        super(com);
        this.update = update;
        this.next();
    }
    next() {
        if (this.timeout)
            return;
        const now = new Date();
        const msec = now.getTime() % 1000;
        const next = 1000 - msec;
        this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.timeout = 0;
            this.next();
        }, next);
        this.update(now);
        // log( "Clock", this.timeout, msec, next );
    }
    terminate() {
        if (this.timeout)
            clearTimeout(this.timeout);
        super.terminate();
    }
}
dom.create(root, ClockView(root), "body");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjLzExLzAxL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFPLE1BQU0sb0JBQW9CLENBQUM7QUFDcEYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUUsQ0FBQztBQUU3RCxNQUFNLFNBQVMsR0FBRyxDQUFFLEdBQVcsRUFBRyxFQUFFO0lBRW5DLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBRTlCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxHQUFHLEVBQUUsS0FBSyxDQUFFLENBQUM7SUFFNUMsSUFBSSxLQUFLLENBRVIsSUFBSSxFQUNKLENBQUUsR0FBRyxFQUFHLEVBQUU7UUFFVCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsdUNBQXVDLEVBQUUsR0FBRyxDQUFFLENBQUM7SUFDeEUsQ0FBQyxDQUNELENBQUM7SUFFRixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBRWI7UUFDQyxLQUFLLEVBQ0w7WUFDQyxPQUFPLEVBQUUsTUFBTTtZQUNmLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFVBQVUsRUFBRSxRQUFRO1NBQ3BCO0tBQ0QsRUFFRCxFQUFFLENBQUMsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUksRUFBRSxFQUFDLEtBQUssQ0FBRSxFQUM5QixJQUFJLENBQUUsSUFBSSxDQUFFLENBQ1osQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sS0FBTSxTQUFRLEtBQUs7SUFJWTtJQUYxQixPQUFPLEdBQVksQ0FBQyxDQUFDO0lBRS9CLFlBQWEsR0FBVyxFQUFZLE1BQStCO1FBRWxFLEtBQUssQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUZzQixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUdsRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRVMsSUFBSTtRQUViLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRyxPQUFPO1FBRTFCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUV4QixHQUFHLEVBQUU7WUFFSixZQUFZLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNiLENBQUMsRUFDRCxJQUFJLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7UUFFbkIsNENBQTRDO0lBQzdDLENBQUM7SUFFZSxTQUFTO1FBRXhCLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRyxZQUFZLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQ2hELEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0Q7QUFFRCxHQUFHLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxTQUFTLENBQUUsSUFBSSxDQUFFLEVBQUUsTUFBTSxDQUFFLENBQUMifQ==