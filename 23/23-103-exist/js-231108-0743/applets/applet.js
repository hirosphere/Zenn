import { ef } from "../meh/index.js";
const { div, h2 } = ef;
export const Applet = ({ title, content }) => {
    return div({ class: "applet" }, h2(title), div({ class: "applet-body" }, ...content));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvYXBwbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUV2QixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQWlELEVBQUcsRUFBRTtJQUU3RixPQUFPLEdBQUcsQ0FBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDOUIsRUFBRSxDQUFFLEtBQUssQ0FBRSxFQUNYLEdBQUcsQ0FBRSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxHQUFJLE9BQU8sQ0FBRSxDQUM1QyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=