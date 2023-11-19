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
        attrs: { tabindex: 0 },
        actActs: {
            mousedown(ev) { gr.mousedown(ev); }
        },
        hook
    }, each(opts || [], opt => Tab(opt, gr)));
};
const Tab = (opt, gr) => {
    return li({
        class: ["tab", { selected: opt.selected }],
        attrs: { tabIndex: 0, },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9ndWkvdGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3hCLHNDQUFzQztBQUV0QyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBRXBELGlCQUFpQjtBQUVqQixNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBdUIsSUFBYSxFQUFHLEVBQUU7SUFFNUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztJQUN4QyxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQztJQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQztJQUU1RCxPQUFPLEVBQUUsQ0FBRTtRQUNULEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRTtRQUN0QixPQUFPLEVBQUU7WUFDUixTQUFTLENBQUUsRUFBRSxJQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSTtLQUNKLEVBQ0QsSUFBSSxDQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBRSxDQUFFLENBQUcsQ0FBQztBQUMvQyxDQUFDLENBQUE7QUFFRCxNQUFNLEdBQUcsR0FBRyxDQUF1QixHQUFPLEVBQUUsRUFBVyxFQUFHLEVBQUU7SUFFM0QsT0FBTyxFQUFFLENBQUU7UUFDVCxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFFO1FBQzVDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUc7UUFDdkIsT0FBTyxFQUFFO1lBQ1IsU0FBUyxDQUFFLEVBQUUsSUFBSyxFQUFFLENBQUMsU0FBUyxDQUFFLEVBQUUsQ0FBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsVUFBVSxDQUFFLEVBQUUsSUFBSyxFQUFFLENBQUMsVUFBVSxDQUFFLEVBQUUsQ0FBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekQ7S0FDRCxFQUNELEdBQUcsQ0FBQyxLQUFLLENBQ1QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU07QUFFTixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBdUIsT0FBYSxFQUFFLE9BQXVCLEVBQUcsRUFBRTtJQUV2RixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ2pDLElBQUksQ0FDSCxPQUFPLEVBQ1AsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBRSxNQUFNLENBQUUsQ0FBRSxDQUNqRCxDQUNELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxDQUFFLE1BQWUsRUFBRSxPQUFtQixFQUFHLEVBQUU7SUFFN0QsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFFLEVBQUUsS0FBSyxFQUFFLENBQUUsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBRSxFQUFFLEVBQ3ZFLE9BQU8sQ0FDUCxDQUFDO0FBQ0gsQ0FBQyxDQUFBIn0=