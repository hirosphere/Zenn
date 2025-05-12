import { leaf, df, ef } from "../../meh/index.js";
import { HeartRails } from "../data-api/hr-ekimei.js";
var VM;
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
(function (VM) {
    var UUID;
    (function (UUID) {
        class App {
            datetime = leaf.str("");
            constructor() {
                this.update();
                setInterval(() => this.update(), 1000);
            }
            update() {
                this.datetime.$ = df("MMDDhhmmss", new Date);
            }
        }
        UUID.App = App;
        class Item {
            constructor(datetime, digit) {
                datetime.conv(t => t[digit]);
            }
        }
        UUID.Item = Item;
    })(UUID = VM.UUID || (VM.UUID = {}));
})(VM || (VM = {}));
var VC;
(function (VC) {
    VC.Applet = () => {
        const vm = {
            uuid: new VM.UUID.App(),
            eki: new VM.Eki.App([
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
            ])
        };
        return ef.main({ class: "FV PXX AC" }, ef.h1("UUID_CLOCK"), ef.p({
            style: {
                fontSize: "4.0vw",
                textAlign: "center",
                fontFamily: "serif",
                color: "oklch( 0.5  0  0 )",
            }
        }, vm.uuid.datetime), ef.p({
            class: "FH WRAP JC",
            style: {
                gap: "1em",
                fontSize: "calc( 30px + 2vw )",
                lineHeight: "1em",
            }
        }, ...vm.eki.items.map(vm => Eki(vm))));
    };
    const Eki = (vm) => {
        return ef.span({
            style: {
                minWidth: "5em",
                fontFamily: "sans serif",
                textAlign: "center",
                color: `hsl( ${40 + vm.phase * 360 / 20} 80% 40% )`,
            }
        }, vm.name);
    };
})(VC || (VC = {}));
export const UUID_Clock = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVVJRF9DbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMS9VVUlEX0Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBUSxNQUFNLG9CQUFvQixDQUFFO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBRTtBQUV2RCxJQUFVLEVBQUUsQ0EyQ1g7QUEzQ0QsV0FBVSxFQUFFO0lBQUMsSUFBQSxHQUFHLENBMkNmO0lBM0NZLFdBQUEsR0FBRztRQUVmLE1BQWEsR0FBRztZQUVmLEtBQUssQ0FBWTtZQUVqQixZQUFjLEtBQWlCO2dCQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUcsQ0FBRSxJQUFJLEVBQUcsQ0FBQyxFQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBRyxJQUFJLEVBQUcsQ0FBQyxDQUFFLENBQUUsQ0FBRTtZQUNuRSxDQUFDO1NBQ0Q7UUFSWSxPQUFHLE1BUWYsQ0FBQTtRQUVELE1BQWEsSUFBSTtZQU84QjtZQUw5QyxJQUFJLEdBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO1lBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUcsQ0FBQyxDQUFFLENBQUU7WUFFdEIsWUFBWSxHQUEyQixFQUFFLENBQUU7WUFFM0MsWUFBYyxJQUFhLEVBQW1CLEtBQWM7Z0JBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztnQkFFM0QsSUFBSSxDQUFDLElBQUksQ0FBRyxJQUFJLENBQUUsQ0FBRTtnQkFDcEIsV0FBVyxDQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUcsRUFBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBRSxDQUFFO1lBQ3pELENBQUM7WUFFUyxLQUFLLENBQUMsSUFBSSxDQUFHLElBQWE7Z0JBRW5DLElBQUksQ0FBQyxZQUFZLEdB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