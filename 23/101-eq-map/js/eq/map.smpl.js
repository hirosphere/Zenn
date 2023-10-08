import { Leaf, leaf, ef } from "../meh/index.js";
import { sitepub } from "./sitepub_all_utf8.js";
import { Range } from "../range.js";
const log = console.log;
const clip = (value, min, max) => Math.max(min, Math.min(max, value));
const pxRatio = 100;
// Model //
class VO {
    constructor(value, rel) { }
}
class Branch {
    constructor() {
        this.update();
    }
    update() { }
}
class HSL extends Branch {
    hue = new VO(0, this);
    sat = new VO(0, this);
    lgh = new VO(0, this);
    css = new VO("");
    update() {
        return `hsl( ${this.hue}, ${this.sat}%, ${this.lgh}% )`;
    }
}
var Model;
(function (Model) {
    class Map {
        // パラメータ //
        current = new Leaf(null);
        zoom;
        center;
        // 導出値 //
        hover = new Leaf(null);
        hoverInfo = new Leaf.String("");
        scrollCSS = leaf.string("");
        zoomCSS = leaf.string("");
        // 固定値 //
        lat = { max: 45.5132, min: 24.3413 };
        long = { max: 145.8026, min: 123.7798 };
        //  //
        constructor() {
            const rel = () => this.update();
            this.zoom = new Leaf.Number(5, { rel });
            this.center = new Leaf({ lat: 36.0, long: 139.0 }, { rel });
            this.current.ref((newItem, oldItem) => this.updateCurrent(newItem, oldItem));
            rel();
            this.hover.ref((site) => this.hoverInfo.value = site ? `${site.code} ${site.name} ${site.nameR}` : "");
        }
        update() {
            const scale = this.zoomScale;
            const tlx = -this.longToPx(this.center.value.long) + "px";
            const tly = -this.latToPx(this.center.value.lat) + "px";
            this.scrollCSS.value = `translate( ${tlx}, ${tly} )`;
            this.zoomCSS.value = `scale( ${scale}, ${scale} )`;
        }
        updateCurrent(newItem, oldItem) {
            log({ new: newItem?.code, old: oldItem?.code });
            oldItem && (oldItem.selected.value = false);
            newItem && (newItem.selected.value = true);
        }
        cssPos(site) {
            const left = this.longToPx(site.long) + "px";
            const top = this.latToPx(site.lat) + "px";
            return { left, top };
        }
        latToPx(lat) { return (this.lat.max - lat) * pxRatio; }
        longToPx(long) { return (long - this.long.min) * pxRatio; }
        get zoomScale() { return 0.1 * Math.pow(10, this.zoom.value / 5); }
    }
    Model.Map = Map;
    //
    class Site {
        src;
        selected = leaf.boolean(false);
        constructor(src) {
            this.src = src.split(",");
        }
        get code() { return this.src[0]; }
        get name() { return this.src[1]; }
        get nameR() { return this.src[2]; }
        get lat() { return Number(this.src[3]); }
        get long() { return Number(this.src[4]); }
        get elev() { return Number(this.src[5]); }
        get depth() { return Number(this.src[6]); }
        static list = sitepub.split("\n").map(csv => new Site(csv));
    }
    Model.Site = Site;
    ;
    log("sitecount", Site.list.length);
})(Model || (Model = {}));
// UI //
var UI;
(function (UI) {
    const { div, h2, h3, } = ef;
    const Site = (site, map) => {
        const { left, top } = map.cssPos(site);
        const props = {
            class: ["map-site", { selected: site.selected }],
            style: { left, top },
            onmouseover(ev) {
                map.hover.value = site;
            },
            onclick() {
                map.current.value = site;
            },
        };
        return div(props);
    };
    //
    class ZoomWork {
        map;
        wheelMon = new Leaf.String("", { rel: () => this.zoom() });
        wheelZoom;
        touchMon = new Leaf.String("");
        constructor(map) {
            this.map = map;
            this.wheelZoom = map.zoom.value;
        }
        putWheelEvent(ev) {
            if (!ev.cancelable)
                return;
            const mode = (ev.deltaY % 1 ? "zoom" : "scroll");
            this.wheelMon.value = `${mode} ${ev.deltaX} ${ev.deltaY}`;
            if (mode == "zoom") {
                const zoom = this.wheelZoom + ev.deltaY * -0.1;
                this.wheelZoom = Math.min(10, Math.max(0, zoom));
                this.map.zoom.value = Math.round(this.wheelZoom);
            }
            else // mode == "scroll"
                this.scroll(ev.deltaX, ev.deltaY);
            ev.preventDefault();
        }
        putTouchEvent(ev) {
            const t0 = ev.touches[0];
            this.touchMon.value = `${ev.touches.length} ${t0.clientX} ${t0.clientY}, ${ev.target?.constructor.name} }`;
            if (ev.cancelable)
                ev.preventDefault();
        }
        scroll(deltaX, deltaY) {
            const center = this.map.center.value;
            const scale = 0.01 / this.map.zoomScale;
            const long = clip(center.long + deltaX * scale, this.map.long.min, this.map.long.max);
            const lat = clip(center.lat - deltaY * scale, this.map.lat.min, this.map.lat.max);
            this.map.center.value = { lat, long };
        }
        zoom() {
            ;
        }
    }
    const MapFrame = (model, zoom_wk) => {
        const onwheel = (ev) => zoom_wk.putWheelEvent(ev);
        const ontouchmove = (ev) => zoom_wk.putTouchEvent(ev);
        const content = div({
            class: "map-content",
            style: { transform: model.scrollCSS }
        }, ...Model.Site.list.map(siteInfo => Site(siteInfo, model)));
        const zoomFrame = div({
            class: "map-zoom",
            style: { transform: model.zoomCSS }
        }, content);
        return div({ class: "map-frame", onwheel, ontouchmove }, div(), div(), div(), zoomFrame);
    };
    UI.Map = () => {
        const model = new Model.Map;
        const zoom_wk = new ZoomWork(model);
        const curtext = model.current.tostr(site => site && `${site.code} ${site.name} ${site.nameR}` || "");
        return div({ class: "map applet" }, h2("EQ Site Map"), div({ class: "map-cur-site" }, curtext), MapFrame(model, zoom_wk), div({ class: "hover-info" }, model.hoverInfo), div(Range.UI({ title: "拡大", value: model.zoom, max: 10 })), div("Wheel", " ", zoom_wk.wheelMon), div("Touch", " ", zoom_wk.touchMon));
    };
})(UI || (UI = {}));
export const Map = UI.Map;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNtcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvZXEvbWFwLnNtcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV4QixNQUFNLElBQUksR0FBRyxDQUFFLEtBQWMsRUFBRSxHQUFZLEVBQUUsR0FBWSxFQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxLQUFLLENBQUUsQ0FBRSxDQUFDO0FBR3ZHLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUVwQixXQUFXO0FBRVgsTUFBTSxFQUFFO0lBRVAsWUFBYSxLQUFTLEVBQUUsR0FBZSxJQUFHLENBQUM7Q0FDM0M7QUFFRCxNQUFNLE1BQU07SUFFWDtRQUVDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNkLENBQUM7SUFFRCxNQUFNLEtBQUksQ0FBQztDQUNYO0FBSUQsTUFBTSxHQUFJLFNBQVEsTUFBTTtJQUV2QixHQUFHLEdBQUcsSUFBSSxFQUFFLENBQWMsQ0FBQyxFQUFFLElBQUksQ0FBRSxDQUFDO0lBQ3BDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBYyxDQUFDLEVBQUUsSUFBSSxDQUFFLENBQUM7SUFDcEMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFjLENBQUMsRUFBRSxJQUFJLENBQUUsQ0FBQztJQUVwQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQWMsRUFBRSxDQUFFLENBQUM7SUFFL0IsTUFBTTtRQUVMLE9BQU8sUUFBUyxJQUFJ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