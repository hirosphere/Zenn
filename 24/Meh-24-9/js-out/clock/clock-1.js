import { dom, ef, Leaf } from "../meh/index.js";
const App = () => {
    const m = new ms.App;
    return ef.main({
        style: {
            "backgroundColor": m.tones.background,
            "color": "white",
        }
    }, ef.h1(m.clock.timestr), ef.p({ class: [{}, ""] }));
};
var ms;
(function (ms) {
    class App {
        clock = new Clock();
        tones = new Tones();
    }
    ms.App = App;
    class Clock {
        timestr = new Leaf.str("");
        tid = 0;
        constructor() {
            this.update();
        }
        update() {
            this.timestr.value =
                (new Date().toLocaleString());
            this.tid = setTimeout(() => this.update(), 1000 -
                (new Date().getTime() % 1000));
        }
    }
    class Tones {
        background = new Leaf.str("hsl");
        constructor() {
            this.update();
        }
        update() {
            const bg = `hsl( 337.5, 45%, 45% )`;
            this.background.value = bg;
        }
    }
    ms.Tones = Tones;
    class HSL {
        hue;
        sat;
        light;
        constructor(v) {
            this.hue = new Leaf.num(v.hue);
            this.sat = new Leaf.num(v.sat);
            this.light = new Leaf.num(v.light);
        }
    }
    ms.HSL = HSL;
})(ms || (ms = {}));
dom.add(App(), "body");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2stMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9jbG9jay9jbG9jay0xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBTyxNQUFNLGlCQUFpQixDQUFDO0FBRXJELE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRTtJQUVoQixNQUFNLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUU7SUFFdEIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViO1FBQ0MsS0FBSyxFQUNMO1lBQ0MsaUJBQWlCLEVBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQ3RDLE9BQU8sRUFBRyxPQUFPO1NBQ2pCO0tBQ0QsRUFFRCxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFFLEVBRXhCLEVBQUUsQ0FBQyxDQUFDLENBQUUsRUFBRSxLQUFLLEVBQUcsQ0FBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLEVBQUUsQ0FBSSxDQUNoQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBVSxFQUFFLENBNkVYO0FBN0VELFdBQVUsRUFBRTtJQUVYLE1BQWEsR0FBRztRQUVDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFFO1FBQ3JCLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFFO0tBQ3JDO0lBSlksTUFBRyxNQUlmLENBQUE7SUFFRCxNQUFNLEtBQUs7UUFFSCxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQzFCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFbEI7WUFFQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDO1FBRVMsTUFBTTtZQUVmLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFDbEIsQ0FDQyxJQUFJLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUMzQixDQUFDO1lBRUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBRXBCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFFbkIsSUFBSTtnQkFDSixDQUNDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUM1QixDQUNELENBQUM7UUFDSCxDQUFDO0tBQ0Q7SUFFRCxNQUFhLEtBQUs7UUFFRCxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBRW5EO1lBRUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFFO1FBQ2hCLENBQUM7UUFFUyxNQUFNO1lBRWYsTUFBTSxFQUFFLEdBQUcsd0JBQXdCLENBQUM7WUFFcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFFO1FBQzdCLENBQUM7S0FDRDtJQWZZLFFBQUssUUFlakIsQ0FBQTtJQUVELE1BQWEsR0FBRztRQUVDLEdBQUcsQ0FBRTtRQUNMLEdBQUcsQ0FBRTtRQUNMLEtBQUssQ0FBRTtRQUV2QixZQUFhLENBQWE7WUFFekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUM7UUFDdEMsQ0FBQztLQUNEO0lBWlksTUFBRyxNQVlmLENBQUE7QUFXRixDQUFDLEVBN0VTLEVBQUUsS0FBRixFQUFFLFFBNkVYO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUUsQ0FBQyJ9