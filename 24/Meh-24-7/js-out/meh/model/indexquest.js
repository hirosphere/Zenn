import { Exist, Leaf, ef, root } from "../index.js";
const log = console.log;
/*
    class Marker

    任意のExistとMarkを関連付けて管理。

    Existオブジェクトを selected : number や order : number などの属性で修飾する。

    Markインスタンスのライフを把握し、marks Mapオブジェクトに反映する。

*/
class Marker extends Exist {
    marks = new Map;
    get_mark(source, init_v) {
        const mark = this.marks.get(source) ?? new Mark(this, init_v ?? this.default_state, source);
        this.marks.set(source, mark);
        return mark;
    }
    new_mark(source, init_v) {
        return new Mark(this, init_v, source);
    }
}
/*
    class Mark

    Leafを基底クラスとし、source プロパティーにてsourceをvalue値で修飾するクラス。

    class Marker を存在コンテナとし、生去をコンテナに通知。

    インスタンスのライフは、sourceに同期。

*/
class Mark extends Leaf {
    source;
    constructor(con, init_v, source) {
        super(con, init_v);
        this.source = source;
    }
}
class Selector extends Marker {
    current = new Leaf(this, null, (n, o) => this.curchange(n, o));
    curchange(n, o) {
        o?.set(false);
        n?.set(true);
    }
    default_state = false;
}
var um;
(function (um) {
    class App extends Exist {
        // list;
        station_sel = new Selector(this);
        station_hov = new Selector(this);
        constructor() {
            super(root);
            // this.list = new Renn < Leaf < string > > ();
            // this.list.new_items( Leaf.from_values( [ "錦糸町", "亀戸", "平井" ] ) );
        }
    }
    um.App = App;
    class Station extends Exist {
        name = new Leaf.String(this, "");
    }
    um.Station = Station;
})(um || (um = {}));
var ui;
(function (ui) {
    ui.Item = (app, station) => {
        const selected = app.station_sel.get_mark(station);
        const hovered = app.station_hov.get_mark(station);
        return ef.section({
            class: ["station", { selected, hovered }],
            acts: {
                mouseover: () => hovered.value = true,
                mouseout: () => hovered.value = false,
            },
        }, ef.h1(station.name), ef.button({ acts: { click() { selected.value = true; } } }, "選択"));
    };
})(ui || (ui = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvaW5kZXhxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFTLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTNELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEI7Ozs7Ozs7OztFQVNFO0FBRUYsTUFBZSxNQUF1QyxTQUFRLEtBQUs7SUFFeEQsS0FBSyxHQUFHLElBQUksR0FBc0MsQ0FBQztJQUV0RCxRQUFRLENBQUUsTUFBZSxFQUFFLE1BQWdCO1FBRWpELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFxQixJQUFJLEVBQUUsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFFLENBQUM7UUFDbkgsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsTUFBTSxFQUFFLElBQUksQ0FBRSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVTLFFBQVEsQ0FBRSxNQUFlLEVBQUUsTUFBYztRQUVsRCxPQUFPLElBQUksSUFBSSxDQUFxQixJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0lBQzVELENBQUM7Q0FHRDtBQUdEOzs7Ozs7Ozs7RUFTRTtBQUVGLE1BQU0sSUFBcUMsU0FBUSxJQUFjO0lBRU47SUFBMUQsWUFBYSxHQUFXLEVBQUUsTUFBYyxFQUFrQixNQUFlO1FBRXhFLEtBQUssQ0FBRSxHQUFHLEVBQUUsTUFBTSxDQUFFLENBQUM7UUFGb0MsV0FBTSxHQUFOLE1BQU0sQ0FBUztJQUd6RSxDQUFDO0NBQ0Q7QUFFRCxNQUFNLFFBQWdHLFNBQVEsTUFBMEI7SUFFdkgsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFnQixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztJQUV6RixTQUFTLENBQUUsQ0FBWSxFQUFFLENBQWM7UUFFaEQsQ0FBQyxFQUFFLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztRQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFFLElBQUksQ0FBRSxDQUFDO0lBQ2hCLENBQUM7SUFFa0IsYUFBYSxHQUFHLEtBQUssQ0FBQztDQUN6QztBQUdELElBQVUsRUFBRSxDQXNCWDtBQXRCRCxXQUFVLEVBQUU7SUFHWCxNQUFhLEdBQUksU0FBUSxLQUFLO1FBRTdCLFFBQVE7UUFFRCxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQWUsSUFBSSxDQUFFLENBQUM7UUFDaEQsV0FBVyxHQUFHLElBQUksUUFBUSxDQUFlLElBQUksQ0FBRSxDQUFDO1FBRXZEO1lBRUMsS0FBSyxDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2QsK0NBQStDO1lBQy9DLG9FQUFvRTtRQUNyRSxDQUFDO0tBQ0Q7SUFiWSxNQUFHLE1BYWYsQ0FBQTtJQUVELE1BQWEsT0FBUSxTQUFRLEtBQUs7UUFFakMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsRUFBRSxDQUFFLENBQUM7S0FDbkM7SUFIWSxVQUFPLFVBR25CLENBQUE7QUFDRixDQUFDLEVBdEJTLEVBQUUsS0FBRixFQUFFLFFBc0JYO0FBRUQsSUFBVSxFQUFFLENBcUJYO0FBckJELFdBQVUsRUFBRTtJQUVFLE9BQUksR0FBRyxDQUFFLEdBQVksRUFBRSxPQUFvQixFQUFHLEVBQUU7UUFFNUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUUsT0FBTyxDQUFFLENBQUM7UUFDckQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUUsT0FBTyxDQUFFLENBQUM7UUFFcEQsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQjtZQUNDLEtBQUssRUFBRSxDQUFFLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBRTtZQUMzQyxJQUFJLEVBQ0o7Z0JBQ0MsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSTtnQkFDckMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSzthQUNyQztTQUNELEVBQ0QsRUFBRSxDQUFDLEVBQUUsQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUFFLEVBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEtBQUssUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBRSxDQUNsRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxFQXJCUyxFQUFFLEtBQUYsRUFBRSxRQXFCWCJ9