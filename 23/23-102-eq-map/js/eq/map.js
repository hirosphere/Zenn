import { Leaf, leaf, ef, Lian, defs } from "../meh/index.js";
import { sitepub } from "./sitepub_all_utf8.js";
import { Range } from "../range.js";
const log = console.log;
const clip = (value, min, max) => Math.max(min, Math.min(max, value));
const pxRatio = 100;
// Model //
var Model;
(function (Model) {
    class Map {
        // パラメータ //
        current = new Leaf(null);
        zoom;
        center;
        //  //
        hover = new Leaf(null);
        hoverInfo = new Leaf.String("");
        currentInfo = new Leaf.String("");
        hoverList = new Lian;
        currentList = new Lian;
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
            this.hover.ref(() => this.updateHover());
            this.current.ref((newItem, oldItem) => this.updateCurrent(newItem, oldItem));
            this.hoverList.add(Site.list[555]);
            this.hoverList.add(Site.list[777]);
            rel();
        }
        update() {
            const scale = this.zoomScale;
            const tlx = -this.longToPx(this.center.value.long) + "px";
            const tly = -this.latToPx(this.center.value.lat) + "px";
            this.scrollCSS.value = `translate( ${tlx}, ${tly} )`;
            this.zoomCSS.value = `scale( ${scale}, ${scale} )`;
        }
        updateHover() {
            const site = this.hover.value;
            this.hoverInfo.value = Site.info(site);
            site && this.hoverList.add(site);
        }
        updateCurrent(newItem, oldItem) {
            this.currentInfo.value = Site.info(newItem);
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
        static info(site) {
            return site && `${site.code} ${site.name} ${site.nameR}` || "-";
        }
        static list = sitepub.split("\n").map(csv => new Site(csv));
    }
    Model.Site = Site;
    ;
    log("sitecount", Site.list.length);
})(Model || (Model = {}));
// UI //
// . site . //
const { div, h2, h3, textarea, p, span } = ef;
const Site = (site, map) => {
    const { left, top } = map.cssPos(site);
    return div({
        class: ["map-site", { selected: site.selected }],
        style: { left, top },
        attrs: { selected: site.selected },
        acts: {
            mouseover() { map.hover.value = site; },
            mousedown() { map.current.value = site; },
        },
        actActs: {
            touchstart(ev) { map.current.value = site; ev.preventDefault(); }
        }
    });
};
class ScrollWork {
    map;
    // scroll //
    recx;
    recy;
    srcmode = "none";
    touchMon = new Leaf.String("");
    mousemon = new Leaf.String("");
    docmousemon = new Leaf.String("");
    constructor(map) {
        this.map = map;
        this.wheelzoom = map.zoom.value;
        document.addEventListener("mousemove", ev => {
            this.docmousemove(ev);
            this.docmousemon.value = `move ${ev.screenX} ${ev.screenY} ${ev.buttons}`;
        });
    }
    mon(name, x, y) {
        this.mousemon.value = `${name} ${x} ${y}`;
    }
    mousedown = (ev) => {
        if (ev.buttons & 1) {
            this.recpos(ev.screenX, ev.screenY, ev);
            this.srcmode = "mouse";
        }
        this.mon("down", ev.screenX, ev.screenY);
    };
    docmousemove = (ev) => {
        this.mon("move", ev.screenX, ev.screenY);
        if (!(ev.buttons & 1))
            this.srcmode = "none";
        if (this.srcmode == "mouse" && ev.buttons & 1)
            this.scroll(ev.screenX, ev.screenY, ev);
    };
    mouseup = (ev) => {
        this.mon("up  ", ev.screenX, ev.screenY);
    };
    touchstart = (ev) => {
        const t0 = ev.touches[0];
        this.recpos(t0.screenX, t0.screenY, ev);
        this.touchMon.value = `start ${ev.touches.length} ${t0.screenX} ${t0.screenY} }`;
    };
    touchmove = (ev) => {
        const t0 = ev.touches[0];
        this.scroll(t0.screenX, t0.screenY, ev);
        this.touchMon.value = `move  ${ev.touches.length} ${t0.screenX} ${t0.screenY} }`;
    };
    touchend = (ev) => {
        const t0 = ev.touches[0];
        this.touchMon.value = `end   ${ev.touches.length} }`;
    };
    //  //
    recpos(screenX, screenY, ev) {
        this.recx = screenX;
        this.recy = screenY;
        ev.preventDefault();
    }
    scroll(screenX, screenY, ev) {
        const center = this.map.center.value;
        const scale = 0.01 / this.map.zoomScale;
        const deltaX = this.delta(screenX, this.recx);
        const deltaY = this.delta(screenY, this.recy);
        this.recpos(screenX, screenY, ev);
        const long = clip(center.long - deltaX * scale, this.map.long.min, this.map.long.max);
        const lat = clip(center.lat + deltaY * scale, this.map.lat.min, this.map.lat.max);
        this.map.center.value = { lat, long };
    }
    delta(mouse, rec) {
        return rec != null ? (mouse - rec) : 0;
    }
    // zoom //
    wheelzoom;
    wheelMon = new Leaf.String("");
    wheel = (ev) => {
        this.wheelMon.value = `${ev.deltaX} ${ev.deltaY}`;
        const zoom = this.wheelzoom + ev.deltaY * -0.05;
        this.wheelzoom = Math.min(10, Math.max(0, zoom));
        this.map.zoom.value = Math.round(this.wheelzoom);
        ev.preventDefault();
    };
}
// .. ui .. //
const MapFrame = (model, scrzoom) => {
    const content = div({
        class: "map-content",
        style: { transform: model.scrollCSS }
    }, ...Model.Site.list.map(siteInfo => Site(siteInfo, model)));
    const zoomFrame = div({
        class: "map-zoom",
        style: { transform: model.zoomCSS }
    }, content);
    const { mousedown, mouseup, touchstart, touchmove, touchend, wheel } = scrzoom;
    return div({
        class: "map-frame",
        acts: { mouseup, touchmove, touchend },
        actActs: { wheel, mousedown, touchstart, },
    }, div(), div(), div(), zoomFrame);
};
// main ui //
export const Map = () => {
    const model = new Model.Map;
    const lianMon = new Leaf.String("");
    const scrzoom = new ScrollWork(model);
    model.hoverList.ref(() => {
        const lian = model.hoverList;
        const list = lian.slice(-130).map(site => `${site.name}`);
        lianMon.value = "" + lian.length + " " + list.join(" ");
    });
    return div({ class: "map applet" }, h2("EQ Site Map"), div(div({ class: "map-cur-site" }, model.currentInfo), MapFrame(model, scrzoom), div({ class: "hover-info" }, model.hoverInfo), div(Range.UI({ title: "拡大", value: model.zoom, max: 10 }))), div(div("d.mouse", " ", scrzoom.docmousemon), div("mouse", " ", scrzoom.mousemon), div("touch", " ", scrzoom.touchMon), div("wheel", " ", scrzoom.wheelMon)), div(h3("ホバー履歴"), div(
    //defs.ap( model.hoverList, item => { log( item.code ); return span( "span" ) } ),
    defs.ap(model.hoverList, item => item.name + " "), defs.ap([1, 2, 3], item => span(item))), textarea({ props: { value: lianMon }, style: { width: "100%", height: "20em", lineHeight: "1.4em" } })));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2VxL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsTUFBTSxJQUFJLEdBQUcsQ0FBRSxLQUFjLEVBQUUsR0FBWSxFQUFFLEdBQVksRUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUUsS0FBSyxDQUFFLENBQUUsQ0FBQztBQUd2RyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFFcEIsV0FBVztBQUVYLElBQVUsS0FBSyxDQWlIZDtBQWpIRCxXQUFVLEtBQUs7SUFFZCxNQUFhLEdBQUc7UUFFZixXQUFXO1FBRVgsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFtQixJQUFJLENBQUUsQ0FBQztRQUM1QyxJQUFJLENBQWU7UUFDbkIsTUFBTSxDQUFvQjtRQUUxQixNQUFNO1FBRU4sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFtQixJQUFJLENBQUUsQ0FBQztRQUMxQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBQ2xDLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUM7UUFFcEMsU0FBUyxHQUFHLElBQUksSUFBYSxDQUFFO1FBQy9CLFdBQVcsR0FBRyxJQUFJLElBQWEsQ0FBRTtRQUVqQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1B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LEdBQUcsQ0FBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUUsQ0FDckMsRUFFRCxHQUFHLENBRUYsRUFBRSxDQUFFLE9BQU8sQ0FBRSxFQUNiLEdBQUc7SUFFRixrRkFBa0Y7SUFDbEYsSUFBSSxDQUFDLEVBQUUsQ0FBRSxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUUsRUFDbkQsSUFBSSxDQUFDLEVBQUUsQ0FBRSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUUsQ0FDNUMsRUFDRCxRQUFRLENBRVAsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUM1RixDQUNELENBQ0QsQ0FBQztBQUNILENBQUMsQ0FBQSJ9