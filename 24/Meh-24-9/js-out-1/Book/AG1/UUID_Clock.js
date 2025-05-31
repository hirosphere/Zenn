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
            translate = leaf("");
            width = leaf("");
            current = leaf(0);
            dir = "UP";
            station_list = [];
            constructor(line, phase) {
                this.phase = phase;
                this.init(line);
                setInterval(() => this.next(), 5000 + phase * 10);
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
                const name = stat?.name ?? "--";
                this.name.$ = name;
                const x = (stat?.x - 139.75) * 220;
                const y = (35.7 - stat?.y) * 220;
                this.translate.$ = `${x}ex  ${y}ex`;
                this.width.$ = Math.max(9, name.length) + "em";
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
            boxSizing: "content-box",
            boxShadow: "1em 1em 1em hsl( 0 0% 40% )",
            display: "grid",
            height: "80vh",
            minHeight: "30em",
            padding: "1ex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.7em",
            fontSize: "calc( ( 6px + 0.8vw ) * 1.6 )",
            lineHeight: "1em",
        }
    }, ...vm.items.map(vm => Line(vm)));
    const Line = (vm) => {
        const hue = 45 + vm.phase / 12 * 140;
        return ef.span({
            style: {
                gridArea: "1/1",
                translate: vm.translate,
                transition: "all 4s",
                width: vm.width,
                display: "flex",
                overflow: "hidden",
                padding: "0.5ex 1ex",
                whiteSpace: "nowrap",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "1",
                backgroundColor: `hsl( ${hue} 0%  0% / 60% )`,
                color: `hsl( ${hue}  0%  100% / 70% )`,
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