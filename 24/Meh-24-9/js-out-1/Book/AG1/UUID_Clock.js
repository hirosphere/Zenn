import { leaf, df, ef } from "../../meh/index.js";
import { HeartRails } from "../data-api/hr-ekimei.js";
var VM;
(function (VM) {
    class Applet {
        uuid = { interval: 10000, make_label: () => crypto.randomUUID() };
        clock = { make_label: () => df("Y.MM.DD (B) hh:mm:ss") };
        eki = new VM.Eki.App([
            "JR上野東京ライン",
            "JR山手線",
            "JR総武線",
            "JR京浜東北線",
            "JR中央線",
            "京成本線",
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
                setInterval(() => this.next(), 1000 + phase * 10);
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
                const x = (stat?.x - 139.70) * 220;
                const y = (35.8 - stat?.y) * 220;
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
        return ef.main({ class: "FV AS PPP" }, Item(vm.clock), Item(vm.uuid), Lines(vm.eki));
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
            flexGrow: "1",
            minHeight: "30em",
            overflow: "auto",
            padding: "1ex",
            justifyContent: "stretch",
            alignItems: "center",
            fontSize: "calc( ( 6px + 0.8vw ) * 1.6 )",
            lineHeight: "1em",
        }
    }, ef.div({
        style: {
            width: "4000px",
            height: "4000px",
            position: "relative",
        }
    }, ...vm.items.map(vm => Line(vm))));
    const Line = (vm) => {
        const hue = 45 + vm.phase / 12 * 140;
        return ef.span({
            style: {
                margin: "auto",
            }
        }, ef.span({
            style: {
                boxSizing: "content-box",
                boxShadow: "1ex 1ex 0.8ex hsl( 0  0%  0% / 60% )",
                width: vm.width,
                display: "inline-block",
                // translate : vm.translate ,
                transition: "all 1.4s",
                overflow: "hidden",
                padding: "0.5ex 1ex",
                whiteSpace: "nowrap",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "1",
                backgroundColor: `hsl( ${hue} 0%  0% / 60% )`,
                color: `hsl( ${hue}  0%  100% / 70% )`,
                fontFamily: "Noto Sans JP , Meiryo , sans serif",
            }
        }, vm.name));
    };
})(VC || (VC = {}));
export const UUID_Clock = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVVJRF9DbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMS9VVUlEX0Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBZ0IsTUFBTSxvQkFBb0IsQ0FBRTtBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUU7QUFHdkQsSUFBVSxFQUFFLENBMENYO0FBMUNELFdBQVUsRUFBRTtJQUVYLE1BQWEsTUFBTTtRQUVsQixJQUFJLEdBQVUsRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFHLFVBQVUsRUFBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFHLEVBQUUsQ0FBRTtRQUU5RSxLQUFLLEdBQVUsRUFBRSxVQUFVLEVBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFHLHNCQUFzQixDQUFFLEVBQUUsQ0FBQTtRQUVuRSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDbkI7WUFDQSxXQUFXO1lBQ1gsT0FBTztZQUNQLE9BQU87WUFDUCxTQUFTO1lBQ1QsT0FBTztZQUVQLE1BQU07WUFFTixVQUFVO1lBQ1YsV0FBVztZQUNYLFdBQVc7WUFDWCxVQUFVO1lBQ1YsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFdBQVc7WUFDWCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxRQUFRO1lBQ1IsWUFBWTtZQUNaLFVBQVU7WUFDVixPQUFPO1NBQ1AsQ0FBQyxDQUFFO0tBQ0o7SUFqQ1ksU0FBTSxTQWlDbEIsQ0FBQTtBQU9GLENBQUMsRUExQ1MsRUFBRSxLQUFGLEVBQUUsUUEwQ1g7QUFFRCxXQUFVLEVBQUU7SUFBQyxJQUFBLEdBQUcsQ0FvRmY7SUFwRlksV0FBQSxHQUFHO1FBRWYsTUFBYSxHQUFHO1lBRWYsS0FBSyxDQUFZO1lBRWpC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