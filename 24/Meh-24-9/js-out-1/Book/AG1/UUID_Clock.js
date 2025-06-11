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