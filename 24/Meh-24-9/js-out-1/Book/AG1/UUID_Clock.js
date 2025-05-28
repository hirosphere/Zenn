import { leaf, df, ef } from "../../meh/index.js";
import { HeartRails } from "../data-api/hr-ekimei.js";
var Qst;
(function (Qst) {
    const symbols = [
        "FLH",
        "FLV",
        "FLWR",
        "BGS",
        "BGH",
        "PGX"
    ];
    const ss = ["FLH", "FLWR", "PGX"];
})(Qst || (Qst = {}));
var VM;
(function (VM) {
    class Applet {
        uuid = { interval: 10000, make_label: () => crypto.randomUUID() };
        clock = { make_label: () => df("Y.MM.DD (B) hh:mm:ss") };
        eki = new VM.Eki.App([
            "東京メトロ銀座線",
            "東京メトロ丸ノ内線",
            "東京メトロ日比谷線",
            "東京メトロ東西線",
            "東京メトロ千代田線",
            "東京メトロ有楽町線",
            "東京メトロ半蔵門線",
            "東京メトロ南北線",
            "東京メトロ副都心線",
            "都営浅草線",
            "都営三田線",
            "都営新宿線",
            "都営大江戸線",
            "日暮里・舎人ライナー",
            "新交通ゆりかもめ",
            "都電荒川線",
        ]);
    }
    VM.Applet = Applet;
})(VM || (VM = {}));
(function (VM) {
    var Eki;
    (function (Eki) {
        class App {
            items;
            constructor(lines) {
                this.items = lines.map((name, i) => new Line(name, i));
            }
        }
        Eki.App = App;
        class Line {
            phase;
            name = leaf("");
            tranlate = leaf("");
            current = leaf(0);
            dir = "UP";
            station_list = [];
            constructor(line, phase) {
                this.phase = phase;
                this.init(line);
                setInterval(() => this.next(), 250 + phase * 1);
            }
            async init(line) {
                this.station_list = await HeartRails.get_stations(line);
                this.update();
            }
            next() {
                let cur = this.current.$;
                const end = this.station_list.length - 1;
                switch (this.dir) {
                    case "UP":
                        if (cur == end)
                            this.dir = "DOWN";
                        else
                            cur++;
                        break;
                    case "DOWN":
                        if (cur == 0)
                            this.dir = "UP";
                        else
                            cur--;
                        break;
                }
                this.current.$ = cur;
                this.update();
            }
            update() {
                const stat = this.station_list[this.current.$];
                this.name.$ = stat?.name ?? "--";
                const x = (stat?.x - 139.75) * 220;
                const y = (35.7 - stat?.y) * 220;
                this.tranlate.$ = `${x}ex  ${y}ex`;
            }
        }
        Eki.Line = Line;
        class Spacer {
            widthEm;
            css;
            constructor(widthEm) {
                this.widthEm = widthEm;
                const space = 0;
                const shrink = 1;
                this.css =
                    {
                        letterSpacing: space + "em",
                        transform: `scale( ${shrink} , 1 )`,
                        marginRight: -space + "em"
                    };
            }
        }
    })(Eki = VM.Eki || (VM.Eki = {}));
})(VM || (VM = {}));
var VC;
(function (VC) {
    VC.Applet = () => {
        const vm = new VM.Applet;
        return ef.main({ class: "FV AS PPP OA" }, Item(vm.clock), Item(vm.uuid), Lines(vm.eki));
    };
    const Item = (vm) => {
        const label = leaf("");
        const update = () => {
            label.$ = vm.make_label?.() ?? "";
        };
        update();
        setInterval(update, vm.interval ?? 1000);
        return ef.div({
            style: {
                borderRadius: "0.08ex",
                background: "oklch( 100%  0%  0 / 50% )",
                padding: "0.03ex 0.8ex",
                textAlign: "center",
                fontFamily: "Noto Sans JP",
                fontSize: "36px",
                color: "oklch( 20%  0%  0 / 70% )",
            }
        }, label);
    };
    const Lines = (vm) => ef.section({
        style: {
            overflow: "hidden",
            display: "grid",
            height: "80vh",
            minHeight: "30em",
            padding: "1ex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.7em",
            fontSize: "calc( 6px + 0.8vw )",
            lineHeight: "1em",
        }
    }, ...vm.items.map(vm => Line(vm)));
    const Line = (vm) => {
        const hue = 45 + vm.phase / 12 * 140;
        return ef.span({
            style: {
                gridArea: "1/1",
                translate: vm.tranlate,
                width: "8em",
                display: "flex",
                overflow: "hidden",
                padding: "0.5ex 0.6ex 0.6ex",
                whiteSpace: "nowrap",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "1",
                backgroundColor: `hsl( ${hue} 0%  0% / 45% )`,
                color: `hsl( ${hue}  2%  80% )`,
            }
        }, ef.span({
            style: {
                fontFamily: "Noto Sans JP , Meiryo , sans serif",
            }
        }, vm.name));
    };
})(VC || (VC = {}));
export const UUID_Clock = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVVJRF9DbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMS9VVUlEX0Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBZ0IsTUFBTSxvQkFBb0IsQ0FBRTtBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUU7QUFHdkQsSUFBVSxHQUFHLENBZ0JaO0FBaEJELFdBQVUsR0FBRztJQUVaLE1BQU0sT0FBTyxHQUNiO1FBQ0MsS0FBSztRQUNMLEtBQUs7UUFDTCxNQUFNO1FBQ04sS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO0tBQ0ksQ0FBRTtJQUlaLE1BQU0sRUFBRSxHQUFnQixDQUFFLEtBQUssRUFBRyxNQUFNLEVBQUcsS0FBSyxDQUFFLENBQUU7QUFFckQsQ0FBQyxFQWhCUyxHQUFHLEtBQUgsR0FBRyxRQWdCWjtBQUVELElBQVUsRUFBRSxDQWtDWDtBQWxDRCxXQUFVLEVBQUU7SUFFWCxNQUFhLE1BQU07UUFFbEIsSUFBSSxHQUFVLEVBQUUsUUFBUSxFQUFHLEtBQUssRUFBRyxVQUFVLEVBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRyxFQUFFLENBQUU7UUFFOUUsS0FBSyxHQUFVLEVBQUUsVUFBVSxFQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBRyxzQkFBc0IsQ0FBRSxFQUFFLENBQUE7UUFFbkUsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ25CO1lBQ0EsVUFBVTtZQUNWLFdBQVc7WUFDWCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFdBQVc7WUFDWCxXQUFXO1lBQ1gsV0FBVztZQUNYLFVBQVU7WUFDVixXQUFXO1lBQ1gsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsUUFBUTtZQUNSLFlBQVk7WUFDWixVQUFVO1lBQ1YsT0FBTztT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