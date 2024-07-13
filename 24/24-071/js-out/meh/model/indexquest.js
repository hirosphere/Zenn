import { Exist, Leaf, ef, root } from "../../meh/index.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvaW5kZXhxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFTLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEUsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV4Qjs7Ozs7Ozs7O0VBU0U7QUFFRixNQUFlLE1BQXVDLFNBQVEsS0FBSztJQUV4RCxLQUFLLEdBQUcsSUFBSSxHQUFzQyxDQUFDO0lBRXRELFFBQVEsQ0FBRSxNQUFlLEVBQUUsTUFBZ0I7UUFFakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsTUFBTSxDQUFFLElBQUksSUFBSSxJQUFJLENBQXFCLElBQUksRUFBRSxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUUsQ0FBQztRQUNuSCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxNQUFNLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRVMsUUFBUSxDQUFFLE1BQWUsRUFBRSxNQUFjO1FBRWxELE9BQU8sSUFBSSxJQUFJLENBQXFCLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7SUFDNUQsQ0FBQztDQUdEO0FBR0Q7Ozs7Ozs7OztFQVNFO0FBRUYsTUFBTSxJQUFxQyxTQUFRLElBQWM7SUFFTjtJQUExRCxZQUFhLEdBQVcsRUFBRSxNQUFjLEVBQWtCLE1BQWU7UUFFeEUsS0FBSyxDQUFFLEdBQUcsRUFBRSxNQUFNLENBQUUsQ0FBQztRQUZvQyxXQUFNLEdBQU4sTUFBTSxDQUFTO0lBR3pFLENBQUM7Q0FDRDtBQUVELE1BQU0sUUFBZ0csU0FBUSxNQUEwQjtJQUV2SCxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQWdCLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO0lBRXpGLFNBQVMsQ0FBRSxDQUFZLEVBQUUsQ0FBYztRQUVoRCxDQUFDLEVBQUUsR0FBRyxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxHQUFHLENBQUUsSUFBSSxDQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVrQixhQUFhLEdBQUcsS0FBSyxDQUFDO0NBQ3pDO0FBR0QsSUFBVSxFQUFFLENBc0JYO0FBdEJELFdBQVUsRUFBRTtJQUdYLE1BQWEsR0FBSSxTQUFRLEtBQUs7UUFFN0IsUUFBUTtRQUVELFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBZSxJQUFJLENBQUUsQ0FBQztRQUNoRCxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQWUsSUFBSSxDQUFFLENBQUM7UUFFdkQ7WUFFQyxLQUFLLENBQUUsSUFBSSxDQUFFLENBQUM7WUFDZCwrQ0FBK0M7WUFDL0Msb0VBQW9FO1FBQ3JFLENBQUM7S0FDRDtJQWJZLE1BQUcsTUFhZixDQUFBO0lBRUQsTUFBYSxPQUFRLFNBQVEsS0FBSztRQUVqQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxFQUFFLENBQUUsQ0FBQztLQUNuQztJQUhZLFVBQU8sVUFHbkIsQ0FBQTtBQUNGLENBQUMsRUF0QlMsRUFBRSxLQUFGLEVBQUUsUUFzQlg7QUFFRCxJQUFVLEVBQUUsQ0FxQlg7QUFyQkQsV0FBVSxFQUFFO0lBRUUsT0FBSSxHQUFHLENBQUUsR0FBWSxFQUFFLE9BQW9CLEVBQUcsRUFBRTtRQUU1RCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBRSxPQUFPLENBQUUsQ0FBQztRQUNyRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBRSxPQUFPLENBQUUsQ0FBQztRQUVwRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCO1lBQ0MsS0FBSyxFQUFFLENBQUUsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFFO1lBQzNDLElBQUksRUFDSjtnQkFDQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLO2FBQ3JDO1NBQ0QsRUFDRCxFQUFFLENBQUMsRUFBRSxDQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUUsRUFDckIsRUFBRSxDQUFDLE1BQU0sQ0FBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssS0FBSyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFFLENBQ2xFLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBckJTLEVBQUUsS0FBRixFQUFFLFFBcUJYIn0=