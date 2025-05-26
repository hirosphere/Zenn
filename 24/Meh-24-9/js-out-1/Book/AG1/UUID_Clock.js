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
                this.items = lines.map((name, i) => new Item(name, i));
            }
        }
        Eki.App = App;
        class Item {
            phase;
            name = leaf("");
            tranlate = leaf("");
            current = leaf(0);
            station_list = [];
            constructor(line, phase) {
                this.phase = phase;
                this.init(line);
                setInterval(() => this.next(), 4000 + phase * 1);
            }
            async init(line) {
                this.station_list = await HeartRails.get_stations(line);
                this.update();
            }
            next() {
                const next = this.current.$ + 1;
                this.current.$ = next < this.station_list.length ? next : 0;
                this.update();
            }
            update() {
                const stat = this.station_list[this.current.$];
                this.name.$ = stat?.name ?? "--";
                const x = (stat?.x - 139.7) * 220;
                const y = (35.7 - stat?.y) * 220;
                this.tranlate.$ = `${x}ex  ${y}ex`;
            }
        }
        Eki.Item = Item;
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
        return ef.main({ class: "FV AS PMM" }, Item(vm.clock), Item(vm.uuid), ef.section({
            style: {
                display: "grid",
                height: "80vh",
                padding: "1ex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.7em",
                fontSize: "calc( 16px )",
                lineHeight: "1em",
            }
        }, ...vm.eki.items.map(vm => Eki(vm))));
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
    const Eki = (vm) => {
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
                backgroundColor: `hsl( ${hue} 0%  0% / 40% )`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVVJRF9DbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMS9VVUlEX0Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBZSxNQUFNLG9CQUFvQixDQUFFO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBRTtBQUd2RCxJQUFVLEdBQUcsQ0FnQlo7QUFoQkQsV0FBVSxHQUFHO0lBRVosTUFBTSxPQUFPLEdBQ2I7UUFDQyxLQUFLO1FBQ0wsS0FBSztRQUNMLE1BQU07UUFDTixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7S0FDSSxDQUFFO0lBSVosTUFBTSxFQUFFLEdBQWdCLENBQUUsS0FBSyxFQUFHLE1BQU0sRUFBRyxLQUFLLENBQUUsQ0FBRTtBQUVyRCxDQUFDLEVBaEJTLEdBQUcsS0FBSCxHQUFHLFFBZ0JaO0FBRUQsSUFBVSxFQUFFLENBa0NYO0FBbENELFdBQVUsRUFBRTtJQUVYLE1BQWEsTUFBTTtRQUVsQixJQUFJLEdBQVUsRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFHLFVBQVUsRUFBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFHLEVBQUUsQ0FBRTtRQUU5RSxLQUFLLEdBQVUsRUFBRSxVQUFVLEVBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFHLHNCQUFzQixDQUFFLEVBQUUsQ0FBQTtRQUVuRSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDbkI7WUFDQSxVQUFVO1lBQ1YsV0FBVztZQUNYLFdBQVc7WUFDWCxVQUFVO1lBQ1YsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFdBQVc7WUFDWCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxRQUFRO1lBQ1IsWUFBWTtZQUNaLFVBQVU7WUFDVixPQUFPO1NB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