import { ValueLian, ef, ap, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
const each = ap;
const { div, h2, h3, ul, li, span, button } = ef;
export const EachSample = () => {
    const line = eki.lines["山手線"];
    const stations = ValueLian.create(line.stations);
    return div({ class: "applet" }, h2("each() サンプル"), h3(line.name), ul(each(stations, station => li(station.v.name, " ", delbutton(station)))));
};
const delbutton = (station) => button({ acts: { click() { station.remove(); log(station.v.name, station.v.lat, station.v.long); } } }, station.v.postal);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXAtZWFjaC1zYW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvYXBwbGV0cy9hcC1lYWNoLXNhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVEsU0FBUyxFQUFjLEVBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEtBQUssR0FBRyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRWhCLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFakQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUU5QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztJQUVwRSxPQUFPLEdBQUcsQ0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFFL0IsRUFBRSxDQUFFLGFBQWEsQ0FBRSxFQUNuQixFQUFFLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxFQUNmLEVBQUUsQ0FDRCxJQUFJLENBQ0gsUUFBUSxFQUNSLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUUsT0FBTyxDQUFFLENBQUUsQ0FDMUQsQ0FDRCxDQUNELENBQUM7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLFNBQVMsR0FBRyxDQUFFLE9BQW9DLEVBQUcsRUFBRSxDQUFDLE1BQU0sQ0FFbkUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEtBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUNoRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDaEIsQ0FBQyJ9