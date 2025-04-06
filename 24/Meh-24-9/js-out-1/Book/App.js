import { navi, ef, pl, dom, log } from "../meh/index.js";
import { EvalPage } from "./EvalPage.js";
import { Clock } from "./Clock.js";
import { OKLCH } from "./UIG/OKLCH.js";
var VM;
(function (VM) {
    const make_part_tree = (level, com_title = "") => {
        // log ( com_title ) ;
        const rt = [];
        if (level <= 0)
            return rt;
        for (let i = 1; i <= 10; i++) {
            const title = com_title + i;
            rt.push({
                name: i.toString(),
                title: `Item ${title}`,
                parts: make_part_tree(level - 1, title + "-")
            });
        }
        return rt;
    };
    const book_def = {
        name: "", title: "Meh Root",
        parts: [
            { type: "links", name: "Links", },
            { type: "eval", name: "Eval", title: "Eval" },
            { type: "clock", name: "Clock" },
            { name: "Labo", parts: [
                    { name: "Font" },
                    { name: "Book-Props" },
                    { name: "Rail-Data" },
                    { name: "Bosai" },
                ]
            },
            { type: "ui-g", name: "UI", title: "UI ギャラリー",
                parts: [
                    { name: "Slide" },
                    { name: "HSL" },
                    { name: "OKLCH", type: "uig-oklch" },
                    { name: "Tabs" },
                ]
            },
            { type: "rail", name: "Rail", title: "列車運転" },
            { name: "Tree", title: "ツリーテスト", parts: make_part_tree(3) },
            { type: "駅", name: "駅", title: "駅名表示",
                parts: [
                    { name: "全国", parts: [
                            { name: "" },
                        ]
                    },
                    { name: "北海道・東北", parts: [
                            { name: "" },
                        ] },
                    { name: "関東", parts: [
                            { name: "" },
                        ]
                    },
                    { name: "中部", parts: [
                            { name: "" },
                        ]
                    },
                    { name: "近畿", parts: [
                            { name: "滋賀県" },
                            { name: "京都府" },
                            { name: "奈良県" },
                            { name: "大阪府" },
                            { name: "兵庫県" },
                            { name: "和歌山県" },
                        ]
                    },
                    { name: "中国", parts: [
                            { name: "島根県" },
                            { name: "鳥取県" },
                            { name: "岡山県" },
                            { name: "広島県" },
                            { name: "山口県" },
                        ]
                    },
                    { name: "四国", parts: [
                            { name: "香川県" },
                            { name: "愛媛県" },
                            { name: "徳島県" },
                            { name: "高知県" },
                        ]
                    },
                    { name: "九州・沖縄", parts: [
                            { name: "福岡県" },
                            { name: "佐賀県" },
                            { name: "長崎県" },
                            { name: "熊本県" },
                            { name: "大分県" },
                            { name: "宮崎県" },
                            { name: "鹿児島県" },
                            { name: "沖縄県" },
                        ]
                    },
                ]
            },
        ],
    };
    const navi_def = {
        title: "Book",
        create_root_index: (app) => new navi.Index(app, undefined, book_def),
        index_to_url(index) {
            return `?PAGE=${index.url_path.splice(1).join("/")}`;
        },
        url_to_path_array({ root, params }) {
            const page_path = params.get("PAGE")?.split("/") ?? [];
            log("PAGE", page_path);
            return page_path;
        },
    };
    class App {
        navi;
        constructor() {
            this.navi = navi(navi_def);
            this.navi.init();
        }
    }
    VM.App = App;
})(VM || (VM = {}));
var VC;
(function (VC) {
    VC.App = () => {
        const vm = new VM.App;
        return ef.div({ class: "APP" }, ef.nav({ class: "APP_NAVI" }, ef.ul({ class: "APP_NAVI_PATH" }, pl.each(vm.navi.path, o => ef.li(PageLink(o.target))))), pl.switch(vm.navi.current_index, index => Content(index)), ef.nav({ class: "APP_NAVI" }, ListSwitch(vm.navi.current_com_index, "APP_NAVI_ISOS")));
    };
    // navi 
    const ListSwitch = (key, class_name) => {
        return pl.switch(key, index => index && PartList(index, class_name) || ef.p("???"));
    };
    const PartList = (index, classname) => {
        return ef.ul({ class: classname }, pl.each(index.parts, o => ef.li(PageLink(o.target))));
    };
    const PageLink = (index) => {
        const link = navi.link({
            index,
            class: ["APP_NAVI_LINK", { SELECTED: index.sel_item }],
        });
        return link;
    };
    // content
    const content_classes = {
        "eval": EvalPage,
        "clock": Clock,
        "uig-oklch": OKLCH
    };
    const Content = (index) => {
        if (!index)
            return undefined;
        const c = content_classes[index.type];
        return c && c(index) ||
            (ef.main({ class: "APP_CONTENT" }, ef.h1(index.title), ef.p(index.path.map(i => i.name.value).join("/")), PartList(index, "APP_NAVI_PARTS")));
    };
})(VC || (VC = {}));
export const main = () => {
    dom.add(VC.App(), document.documentElement);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL0Jvb2svQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxHQUFHLEVBQUcsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUU7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBRTtBQUMxQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFFO0FBQ3BDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBRTtBQUV4QyxJQUFVLEVBQUUsQ0FpSlg7QUFqSkQsV0FBVSxFQUFFO0lBRVgsTUFBTSxjQUFjLEdBQUcsQ0FBRSxLQUFjLEVBQUcsWUFBcUIsRUFBRSxFQUFLLEVBQUU7UUFFdkUsc0JBQXNCO1FBRXRCLE1BQU0sRUFBRSxHQUFxQixFQUFFLENBQUU7UUFDakMsSUFBSyxLQUFLLElBQUksQ0FBQztZQUFHLE9BQU8sRUFBRSxDQUFFO1FBRTdCLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsSUFBSSxFQUFFLEVBQUcsQ0FBQyxFQUFHLEVBQ2hDO1lBQ0MsTUFBTSxLQUFLLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBRTtZQUM3QixFQUFFLENBQUMsSUFBSSxDQUVOO2dCQUNDLElBQUksRUFBRyxDQUFDLENBQUMsUUFBUSxFQUFHO2dCQUNwQixLQUFLLEVBQUcsUUFBUyxLQUFNLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRyxjQUFjLENBQUcsS0FBSyxHQUFHLENBQUMsRUFBRyxLQUFLLEdBQUcsR0FBRyxDQUFFO2FBQ2xELENBQ0QsQ0FBRTtTQUNIO1FBRUQsT0FBTyxFQUFFLENBQUU7SUFDWixDQUFDLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FDZDtRQUNDLElBQUksRUFBRyxFQUFFLEVBQUcsS0FBSyxFQUFHLFVBQVU7UUFDOUIsS0FBSyxFQUNMO1lBQ0MsRUFBRSxJQUFJLEVBQUcsT0FBTyxFQUFHLElBQUksRUFBRyxPQUFPLEdBQUs7WUFDdEMsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFHLElBQUksRUFBRyxNQUFNLEVBQUcsS0FBSyxFQUFHLE1BQU0sRUFBRTtZQUNsRCxFQUFFLElBQUksRUFBRyxPQUFPLEVBQUcsSUFBSSxFQUFHLE9BQU8sRUFBRTtZQUNuQyxFQUFFLElBQUksRUFBRyxNQUFNLEVBQUcsS0FBSyxFQUN0QjtvQkFDQyxFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7b0JBQ2pCLEVBQUUsSUFBSSxFQUFHLFlBQVksRUFBRTtvQkFDdkIsRUFBRSxJQUFJLEVBQUcsV0FBVyxFQUFFO29CQUN0QixFQUFFLElBQUksRUFBRyxPQUFPLEVBQUU7aUJBQ2xCO2FBQ0Q7WUFDRCxFQUFFLElBQUksRUFBRyxNQUFNLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxLQUFLLEVBQUcsVUFBVTtnQkFDakQsS0FBSyxFQUNMO29CQUNDLEVBQUUsSUFBSSxFQUFHLE9BQU8sRUFBRTtvQkFDbEIsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFO29CQUNoQixFQUFFLElBQUksRUFBRyxPQUFPLEVBQUcsSUFBSSxFQUFHLFdBQVcsRUFBRTtvQkFDdkMsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFO2lCQUNqQjthQUNEO1lBQ0QsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFHLElBQUksRUFBRyxNQUFNLEVBQUcsS0FBSyxFQUFHLE1BQU0sRUFBRTtZQUNsRCxFQUFFLElBQUksRUFBRyxNQUFNLEVBQUcsS0FBSyxFQUFHLFFBQVEsRUFBRyxLQUFLLEVBQUcsY0FBYyxDQUFHLENBQUMsQ0FBRSxFQUFFO1lBQ25FLEVBQUUsSUFBSSxFQUFHLEdBQUcsRUFBRyxJQUFJLEVBQUcsR0FBRyxFQUFHLEtBQUssRUFBRyxNQUFNO2dCQUN6QyxLQUFLLEVBQ0w7b0JBQ0MsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEtBQUssRUFDcEI7NEJBQ0MsRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFFO3lCQUNiO3FCQUNEO29CQUNELEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRyxLQUFLLEVBQ3hCOzRCQUNDLEVBQUUsSUFBSSxFQUFHLEVBQUUsRUFBRTt5QkFDYixFQUFFO29CQUNKLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxLQUFLLEVBQ3BCOzRCQUNDLEVBQUUsSUFBSSxFQUFHLEVBQUUsRUFBRTt5QkFDYjtxQkFDRDtvQkFDRCxFQUFFLElBQUksRUFBRyxJQUFJLEVBQUcsS0FBSyxFQUNwQjs0QkFDQyxFQUFFLElBQUksRUFBRyxFQUFFLEVBQUU7eUJBQ2I7cUJBQ0Q7b0JBQ0QsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEtBQUssRUFDcEI7NEJBQ0MsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7NEJBQ2hCLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRTs0QkFDaEIsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7NEJBQ2hCLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTt5QkFDakI7cUJBQ0Q7b0JBQ0QsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEtBQUssRUFDcEI7NEJBQ0MsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7NEJBQ2hCLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRTs0QkFDaEIsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7eUJBQ2hCO3FCQUNEO29CQUNELEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxLQUFLLEVBQ3BCOzRCQUNDLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRTs0QkFDaEIsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7NEJBQ2hCLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRTt5QkFDaEI7cUJBQ0Q7b0JBQ0QsRUFBRSxJQUFJLEVBQUcsT0FBTyxFQUFHLEtBQUssRUFDdkI7NEJBQ0MsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7NEJBQ2hCLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRTs0QkFDaEIsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFFOzRCQUNoQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7NEJBQ2hCLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRTs0QkFDaEIsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFOzRCQUNqQixFQUFFLElBQUksRUFBRyxLQUFLLEVBQUU7eUJBQ2hCO3FCQUNBO2lCQUNGO2FBQ0Q7U0FDRDtLQUNELENBQUU7SUFFSCxNQUFNLFFBQVEsR0FDZDtRQUNDLEtBQUssRUFBRyxNQUFNO1FBQ2QsaUJBQWlCLEVBQUcsQ0FBRSxHQUFHLEVBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRyxHQUFHLEVBQUcsU0FBUyxFQUFHLFFBQVEsQ0FBRTtRQUM1RSxZQUFZLENBQUcsS0FBSztZQUVuQixPQUFPLFNBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBRSxNQUFNLENBQUcsQ0FBQyxDQUFFLENBQUUsSUFBSSxDQUFHLEdBQUcsQ0FBRyxFQUFFLENBQUU7UUFDakUsQ0FBQztRQUVELGlCQUFpQixDQUFHLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTtZQUVwQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFHLE1BQU0sQ0FBRyxFQUFFLEtBQUssQ0FBRyxHQUFHLENBQUUsSUFBSSxFQUFFLENBQUU7WUFDL0QsR0FBRyxDQUFHLE1BQU0sRUFBRyxTQUFTLENBQUUsQ0FBRTtZQUM1QixPQUFPLFNBQVMsQ0FBRTtRQUNuQixDQUFDO0tBQ0QsQ0FBQTtJQUVELE1BQWEsR0FBRztRQUVmLElBQUksQ0FBRTtRQUVOO1lBRUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUcsUUFBUSxDQUFFLENBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUcsQ0FBRTtRQUNwQixDQUFDO0tBQ0Q7SUFUWSxNQUFHLE1BU2YsQ0FBQTtBQUNGLENBQUMsRUFqSlMsRUFBRSxLQUFGLEVBQUUsUUFpSlg7QUFFRCxJQUFVLEVBQUUsQ0FtR1g7QUFuR0QsV0FBVSxFQUFFO0lBRUUsTUFBRyxHQUFHLEdBQUcsRUFBRTtRQUV2QixNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUU7UUFFdkIsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsS0FBSyxFQUFHLEtBQUssRUFBRSxFQUNqQixFQUFFLENBQUMsR0FBRyxDQUVMLEVBQUUsS0FBSyxFQUFHLFVBQVUsRUFBRSxFQUN0QixFQUFFLENBQUMsRUFBRSxDQUVKLEVBQUUsS0FBSyxFQUFHLGVBQWUsRUFBRSxFQUMzQixFQUFFLENBQUMsSUFBSSxDQUVOLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRyxRQUFRLENBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBRSxDQUFFLENBQ3BDLENBQ0QsQ0FDRCxFQUNELEVBQUUsQ0FBQyxNQUFNLENBRVIsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQ3JCLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFHLEtBQUssQ0FBRSxDQUMxQixFQUNELEVBQUUsQ0FBQyxHQUFHLENBRUwsRUFBRSxLQUFLLEVBQUcsVUFBVSxFQUFFLEVBQ3RCLFVBQVUsQ0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFHLGVBQWUsQ0FBRSxDQUUxRCxDQUNELENBQUU7SUFDSixDQUFDLENBQUE7SUFFRCxRQUFRO0lBRVIsTUFBTSxVQUFVLEdBQUcsQ0FBRSxHQUFpQyxFQUFHLFVBQW1CLEVBQUcsRUFBRTtRQUVoRixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBRWYsR0FBRyxFQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFNLFFBQVEsQ0FBRyxLQUFLLEVBQUcsVUFBVSxDQUFFLElBQU0sRUFBRSxDQUFDLENBQUMsQ0FBRyxLQUFLLENBQUUsQ0FDdkUsQ0FBRTtJQUNKLENBQUMsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLENBQUUsS0FBa0IsRUFBRyxTQUFrQixFQUFHLEVBQUU7UUFFOUQsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUVYLEVBQUUsS0FBSyxFQUFHLFNBQVMsRUFBRSxFQUNyQixFQUFFLENBQUMsSUFBSSxDQUVOLEtBQUssQ0FBQyxLQUFLLEVBQ1gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFHLFFBQVEsQ0FBRyxDQUFDLENBQUMsTUFBTSxDQUFFLENBQUUsQ0FDcEMsQ0FDRCxDQUFFO0lBQ0osQ0FBQyxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBRSxLQUFrQixFQUFHLEVBQUU7UUFFekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FFckI7WUFDQyxLQUFLO1lBQ0wsS0FBSyxFQUFHLENBQUUsZUFBZSxFQUFHLEVBQUUsUUFBUSxFQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBRTtTQUMzRCxDQUNELENBQUU7UUFFSCxPQUFPLElBQUksQ0FBRTtJQUNkLENBQUMsQ0FBQTtJQUVELFVBQVU7SUFFVixNQUFNLGVBQWUsR0FDckI7UUFDQyxNQUFNLEVBQUcsUUFBUTtRQUNqQixPQUFPLEVBQUcsS0FBSztRQUNmLFdBQVcsRUFBRyxLQUFLO0tBQ25CLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxDQUFFLEtBQThCLEVBQUcsRUFBRTtRQUVwRCxJQUFLLENBQUUsS0FBSztZQUFJLE9BQVEsU0FBUyxDQUFFO1FBRW5DLE1BQU0sQ0FBQyxHQUFHLGVBQWUsQ0FBRyxLQUFLLENBQUMsSUFBSSxDQUFFLENBQUU7UUFFMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFHLEtBQUssQ0FBRTtZQUN2QixDQUNDLEVBQUUsQ0FBQyxJQUFJLENBRU4sRUFBRSxLQUFLLEVBQUcsYUFBYSxFQUFFLEVBQ3pCLEVBQUUsQ0FBQyxFQUFFLENBQUcsS0FBSyxDQUFDLEtBQUssQ0FBRSxFQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBRSxJQUFJLENBQUcsR0FBRyxDQUFFLENBQUUsRUFDM0QsUUFBUSxDQUFHLEtBQUssRUFBRyxnQkFBZ0IsQ0FBRSxDQUNyQyxDQUNELENBQUU7SUFDSixDQUFDLENBQUE7QUFDRixDQUFDLEVBbkdTLEVBQUUsS0FBRixFQUFFLFFBbUdYO0FBRUQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUV4QixHQUFHLENBQUMsR0FBRyxDQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUcsRUFBRyxRQUFRLENBQUMsZUFBZSxDQUFFLENBQUU7QUFDbkQsQ0FBQyxDQUFBIn0=