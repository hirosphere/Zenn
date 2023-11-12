import { ef, ap, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
const each = ap;
const { div, h2, h3, ul, li, span, button } = ef;
export const EachSample = () => {
    const line = eki.lines["山手線"];
    return div({ class: "applet" }, h2("each() サンプル"), h3(line.name), ul(each(line.stations, station => li(station.name, " ", delbutton(station)))));
};
const delbutton = (station) => button({ acts: { click() { station.remove(); log(station.name, station.lat, station.long); } } }, station.postal);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXAtZWFjaC1zYW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvYXBwbGV0cy9hcC1lYWNoLXNhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sS0FBSyxHQUFHLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFFaEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO0lBRTlCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFFLENBQUM7SUFFaEMsT0FBTyxHQUFHLENBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBRS9CLEVBQUUsQ0FBRSxhQUFhLENBQUUsRUFDbkIsRUFBRSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsRUFDZixFQUFFLENBQ0QsSUFBSSxDQUNILElBQUksQ0FBQyxRQUFRLEVBQ2IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFFLE9BQU8sQ0FBRSxDQUFFLENBQ3hELENBQ0QsQ0FDRCxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxTQUFTLEdBQUcsQ0FBRSxPQUFxQixFQUFHLEVBQUUsQ0FBQyxNQUFNLENBRXBELEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxLQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBRSxDQUFBLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFDMUYsT0FBTyxDQUFDLE1BQU0sQ0FDZCxDQUFDIn0=