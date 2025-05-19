import { leaf, df, ef } from "../../meh/index.js";
import { HeartRails } from "../data-api/hr-ekimei.js";
var VM;
(function (VM) {
    class Applet {
        uuid = { make_label: () => crypto.randomUUID() };
        clock = { make_label: () => df("YY.MM.DD (B) hh:mm:ss") };
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
            name = leaf("えき");
            current = leaf(0);
            station_list = [];
            constructor(line, phase) {
                this.phase = phase;
                this.init(line);
                setInterval(() => this.next(), 1200 + phase * 10);
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
                this.name.$ = this.station_list[this.current.$]?.name ?? "--";
            }
        }
        Eki.Item = Item;
    })(Eki = VM.Eki || (VM.Eki = {}));
})(VM || (VM = {}));
var VC;
(function (VC) {
    VC.Applet = () => {
        const vm = new VM.Applet;
        return ef.main({ class: "FV PXX AC" }, ef.h1("UUID_CLOCK"), Item(vm.clock), Item(vm.uuid), ef.p({
            class: "FH WRAP JC",
            style: {
                gap: "1em",
                fontSize: "calc( 36px )",
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
        return ef.span({
            style: {
                fontSize: "20px",
            }
        }, label);
    };
    const Eki = (vm) => {
        const hue = 45 + vm.phase / 12 * 140;
        return ef.span({
            style: {
                width: "8em",
                display: "flex",
                overflow: "hidden",
                padding: "0.6ex 1.0ex",
                fontFamily: "sans serif",
                textAlign: "center",
                whiteSpace: "nowrap",
                backgroundColor: `hsl( ${hue} 0% 0% )`,
                color: `hsl( ${hue}  2%  80% )`,
            }
        }, vm.name);
    };
})(VC || (VC = {}));
export const UUID_Clock = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVVJRF9DbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMS9VVUlEX0Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBZSxNQUFNLG9CQUFvQixDQUFFO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBRTtBQUV2RCxJQUFVLEVBQUUsQ0FrQ1g7QUFsQ0QsV0FBVSxFQUFFO0lBRVgsTUFBYSxNQUFNO1FBRWxCLElBQUksR0FBVSxFQUFFLFVBQVUsRUFBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFHLEVBQUUsQ0FBRTtRQUUzRCxLQUFLLEdBQVUsRUFBRSxVQUFVLEVBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFHLHVCQUF1QixDQUFFLEVBQUUsQ0FBQTtRQUVwRSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDbkI7WUFDQSxVQUFVO1lBQ1YsV0FBVztZQUNYLFdBQVc7WUFDWCxVQUFVO1lBQ1YsV0FBVztZQUNYLFdBQVc7WUFDWCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFdBQVc7WUFDWCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxRQUFRO1lBQ1IsWUFBWTtZQUNaLFVBQVU7WUFDVixPQUFPO1NBQ1AsQ0FBQyxDQUFFO0tBQ0o7SUF6QlksU0FBTSxTQXlCbEIsQ0FBQTtBQU9GLENBQUMsRUFsQ1MsRUFBRSxLQUFGLEVBQUUsUUFrQ1g7QUFFRCxXQUFVLEVBQUU7SUFBQyxJQUFBLEdBQUcsQ0EyQ2Y7SUEzQ1ksV0FBQSxHQUFHO1FBRWYsTUFBYSxHQUFHO1lBRWYsS0FBSyxDQUFZO1lBRWpCLFlBQWMsS0FBaUI7Z0JBRTlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBRyxDQUFFLElBQUksRUFBRyxDQUFDLEVBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLElBQUksRUFBRyxDQUFDLENBQUUsQ0FBRSxDQUFFO1lBQ25FLENBQUM7U0FDRDtRQVJZLE9BQUcsTUFRZixDQUFBO1FBRUQsTUFBYSxJQUFJO1lBTzhCO1lBTDlDLElBQUksR0FBRyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUU7WUFDdEIsT0FBTyxHQUFHLElBQUksQ0FBRyxDQUFDLENBQUUsQ0FBRTtZQUV0QixZQUFZLEdBQTJCLEVBQUUsQ0FBRTtZQUUzQyxZQUFjLElBQWEsRUFBbUIsS0FBYztnQkFBZCxVQUFLLEdBQUwsS0FBSyxDQUFTO2dCQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO2dCQUNwQixXQUFXLENBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRyxFQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFFLENBQUU7WUFDekQsQ0FBQztZQUVTLEtBQUssQ0FBQyxJQUFJLENBQUcsSUFBYTtnQkFFbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUcsSUFBSSxDQUFFLENBQUU7Z0JBQzVELElBQUksQ0FBQyxNQUFNLEVBQUcsQ0FBRTtZQUNqQixDQUFDO1lBRUQsSUFBSTtnQkFFSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUU7Z0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUU7Z0JBQzdELElBQUksQ0FBQyxNQUFNLEVBQUcsQ0FBRTtZQUNqQixDQUFDO1lBRVMsTUFBTTtnQkFFZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFFLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBRTtZQUNsRSxDQUFDO1NBQ0Q7UUE5QlksUUFBSSxPQThCaEIsQ0FBQTtJQUNGLENBQUMsRUEzQ1ksR0FBRyxHQUFILE1BQUcsS0FBSCxNQUFHLFFBMkNmO0FBQUQsQ0FBQyxFQTNDUyxFQUFFLEtBQUYsRUFBRSxRQTJDWDtBQUVELElBQVUsRUFBRSxDQThFWDtBQTlFRCxXQUFVLEVBQUU7SUFFRSxTQUFNLEdBQUcsR0FBRyxFQUFFO1FBRTFCLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBRTtRQUUxQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBRWIsRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFFLEVBRXZCLEVBQUUsQ0FBQyxFQUFFLENBQUcsWUFBWSxDQUFFLEVBRXRCLElBQUksQ0FBRyxFQUFFLENBQUMsS0FBSyxDQUFFLEVBQ2pCLElBQUksQ0FBRyxFQUFFLENBQUMsSUFBSSxDQUFFLEVBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBRUg7WUFDQyxLQUFLLEVBQUcsWUFBWTtZQUNwQixLQUFLLEVBQ0w7Z0JBQ0MsR0FBRyxFQUFHLEtBQUs7Z0JBQ1gsUUFBUSxFQUFHLGNBQWM7Z0JBQ3pCLFVBQVUsRUFBRyxLQUFLO2FBQ2xCO1NBQ0QsRUFDRCxHQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBRyxFQUFFLENBQUUsQ0FBRSxDQUN6QyxDQUNELENBQUU7SUFDSixDQUFDLENBQUE7SUFFRCxNQUFNLElBQUksR0FBRyxDQUFFLEVBQVksRUFBb0IsRUFBRTtRQUVoRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFM0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBRW5CLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFFO1FBQ3JDLENBQUMsQ0FBQTtRQUVELE1BQU0sRUFBRyxDQUFFO1FBRVgsV0FBVyxDQUFHLE1BQU0sRUFBRyxFQUFFLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBRSxDQUFFO1FBRTlDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FFYjtZQUNDLEtBQUssRUFDTDtnQkFDQyxRQUFRLEVBQUcsTUFBTTthQUNqQjtTQUNELEVBQ0QsS0FBSyxDQUNMLENBQUU7SUFDSixDQUFDLENBQUE7SUFFRCxNQUFNLEdBQUcsR0FBRyxDQUFFLEVBQWdCLEVBQUcsRUFBRTtRQUVsQyxNQUFNLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFFO1FBRXRDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FFYjtZQUNDLEtBQUssRUFDTDtnQkFDQyxLQUFLLEVBQUcsS0FBSztnQkFDYixPQUFPLEVBQUcsTUFBTTtnQkFDaEIsUUFBUSxFQUFHLFFBQVE7Z0JBQ25CLE9BQU8sRUFBRyxhQUFhO2dCQUN2QixVQUFVLEVBQUcsWUFBWTtnQkFDekIsU0FBUyxFQUFHLFFBQVE7Z0JBQ3BCLFVBQVUsRUFBRyxRQUFRO2dCQUNyQixlQUFlLEVBQUcsUUFBUyxHQUFJLFVBQVU7Z0JBQ3pDLEtBQUssRUFBRyxRQUFTLEdBQUksYUFBYTthQUNsQztTQUNELEVBQ0QsRUFBRSxDQUFDLElBQUksQ0FDUCxDQUFFO0lBQ0osQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQTlFUyxFQUFFLEtBQUYsRUFBRSxRQThFWDtBQUVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFFIn0=