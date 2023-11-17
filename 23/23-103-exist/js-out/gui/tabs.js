import { ef, each, newhook } from "../meh/index.js";
import { Grazer } from "./grazer.js";
const log = console.log;
//const log = ( ... any : any ) => {};
const { div, span, p, ul, li, select, option } = ef;
// Tab|Tab|Tab //
export const Tabs = (opts) => {
    const gr = new Grazer({ buttons: 1 });
    const hook = newhook();
    hook.init = () => hook.e && gr.initTouchContainer(hook.e);
    return ul({
        class: "tabs",
        actActs: {
            mousedown(ev) { gr.mousedown(ev); }
        },
        hook
    }, each(opts || [], opt => Tab(opt, gr)));
};
const Tab = (opt, gr) => {
    return li({
        class: ["tab", { selected: opt.selected }],
        actActs: {
            mousedown(ev) { gr.mousedown(ev) && opt.select(); },
            mouseenter(ev) { gr.mouseenter(ev) && opt.select(); },
        }
    }, opt.title);
};
//  //
export const Switch = (options, content) => {
    return ef.div({ class: "switch" }, each(options, option => SwitchItem(option, content(option))));
};
const SwitchItem = (option, content) => {
    return ef.div({ class: ["switch-item", { active: option.selected }] }, content);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9ndWkvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3hCLHNDQUFzQztBQUV0QyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBRXBELGlCQUFpQjtBQUVqQixNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBdUIsSUFBYSxFQUFHLEVBQUU7SUFFNUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztJQUN4QyxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQztJQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQztJQUU1RCxPQUFPLEVBQUUsQ0FBRTtRQUNULEtBQUssRUFBRSxNQUFNO1FBQ2IsT0FBTyxFQUFFO1lBQ1IsU0FBUyxDQUFFLEVBQUUsSUFBSyxFQUFFLENBQUMsU0FBUyxDQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUk7S0FDSixFQUNELElBQUksQ0FBRSxJQUFJLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUFHLENBQUM7QUFDL0MsQ0FBQyxDQUFBO0FBRUQsTUFBTSxHQUFHLEdBQUcsQ0FBdUIsR0FBTyxFQUFFLEVBQVcsRUFBRyxFQUFFO0lBRTNELE9BQU8sRUFBRSxDQUFFO1FBQ1QsS0FBSyxFQUFFLENBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBRTtRQUM1QyxPQUFPLEVBQUU7WUFDUixTQUFTLENBQUUsRUFBRSxJQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUUsRUFBRSxDQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxVQUFVLENBQUUsRUFBRSxJQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUUsRUFBRSxDQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RDtLQUNELEVBQ0QsR0FBRyxDQUFDLEtBQUssQ0FDVCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTTtBQUVOLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUF1QixPQUFhLEVBQUUsT0FBdUIsRUFBRyxFQUFFO0lBRXZGLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDakMsSUFBSSxDQUNILE9BQU8sRUFDUCxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBRSxNQUFNLEVBQUUsT0FBTyxDQUFFLE1BQU0sQ0FBRSxDQUFFLENBQ2pELENBQ0QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLENBQUUsTUFBZSxFQUFFLE9BQW1CLEVBQUcsRUFBRTtJQUU3RCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBRSxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFFLEVBQUUsRUFDdkUsT0FBTyxDQUNQLENBQUM7QUFDSCxDQUFDLENBQUEifQ==