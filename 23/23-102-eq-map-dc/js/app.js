import { leaf, ef, dom } from "./meh/index.js";
import { Range } from "./range.js";
import { HSLApplet } from "./hsl.js";
import { Map } from "./eq/map.js";
const log = console.log;
//
const CompoA = () => {
    const { div, h2, h3, p, span, input, textarea, button, ul, li, hr } = ef;
    return div({ class: "applet" }, h2("Component A"), div({ class: "applet-body" }, h3("8つの浦和駅"), ul(li("北浦和"), li("浦和"), li("南浦和"), li("東浦和"), li("浦和美園"), li("西浦和"), li("中浦和"), li("武蔵浦和")), Range.UI({ title: "Range 2023", value: leaf.number(0.35), unit: "%", max: 1, step: 0.01, conv: v => String(Math.round(v * 100)) })));
};
const Applets = () => {
    const { div, h1 } = ef;
    return div({ class: "applets" }, h1("Applets"), Map(), HSLApplet(), CompoA());
};
dom.create(Applets(), "body");
//
export const appMain = () => {
    // log( "meh-small-app" );
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMtc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRXhCLEVBQUU7QUFFRixNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFFbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFekUsT0FBTyxHQUFHLENBRVQsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBRW5CLEVBQUUsQ0FBRSxhQUFhLENBQUUsRUFDbkIsR0FBRyxDQUVGLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUN4QixFQUFFLENBQUUsUUFBUSxDQUFFLEVBQ2QsRUFBRSxDQUVELEVBQUUsQ0FBRSxLQUFLLENBQUUsRUFDWCxFQUFFLENBQUUsSUFBSSxDQUFFLEVBQ1YsRUFBRSxDQUFFLEtBQUssQ0FBRSxFQUNYLEVBQUUsQ0FBRSxLQUFLLENBQUUsRUFDWCxFQUFFLENBQUUsTUFBTSxDQUFFLEVBQ1osRUFBRSxDQUFFLEtBQUssQ0FBRSxFQUNYLEVBQUUsQ0FBRSxLQUFLLENBQUUsRUFDWCxFQUFFLENBQUUsTUFBTSxDQUFFLENBQ1osRUFDRCxLQUFLLENBQUMsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLEdBQUcsR0FBRyxDQUFFLENBQUUsRUFBRSxDQUFFLENBQzFJLENBQ0QsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtJQUVwQixNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUV2QixPQUFPLEdBQUcsQ0FFVCxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFFcEIsRUFBRSxDQUFFLFNBQVMsQ0FBRSxFQUNmLEdBQUcsRUFBRSxFQUNMLFNBQVMsRUFBSSxFQUNiLE1BQU0sRUFBRSxDQUNSLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixHQUFHLENBQUMsTUFBTSxDQUFFLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0FBRWhDLEVBQUU7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO0lBRTNCLDBCQUEwQjtBQUMzQixDQUFDLENBQUMifQ==