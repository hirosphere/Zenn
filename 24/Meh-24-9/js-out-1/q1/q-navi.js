import { ef, navi } from "../meh/index.js";
export const NaviApp = () => {
    const m = new ms.App();
    return ef.article(ef.h2("Navi"), ef.p("Navi"));
};
var ms;
(function (ms) {
    const sitetree = {
        name: "",
        title: "通勤電車",
        parts: [
            {
                name: "jb",
                title: "常磐線",
                parts: [
                    { name: "kita-senju", title: "北千住" },
                    { name: "matsudo", title: "松戸" },
                    { name: "kashiwa", title: "柏" },
                    { name: "abiko", title: "我孫子" },
                ]
            }
        ]
    };
    class App {
        browser = new navi.Browser();
        root = new navi.Index(sitetree);
    }
    ms.App = App;
})(ms || (ms = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicS1uYXZpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL3ExL3EtbmF2aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsRUFBRSxFQUFTLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTlELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7SUFFM0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFFLENBQUMsRUFBRSxDQUFFLE1BQU0sQ0FBRSxFQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUUsTUFBTSxDQUFFLENBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLElBQVUsRUFBRSxDQTJCWDtBQTNCRCxXQUFVLEVBQUU7SUFFWCxNQUFNLFFBQVEsR0FDZDtRQUNDLElBQUksRUFBRyxFQUFFO1FBQ1QsS0FBSyxFQUFHLE1BQU07UUFDZCxLQUFLLEVBQ0w7WUFDQztnQkFDQyxJQUFJLEVBQUcsSUFBSTtnQkFDWCxLQUFLLEVBQUcsS0FBSztnQkFDYixLQUFLLEVBQ0w7b0JBQ0MsRUFBRSxJQUFJLEVBQUcsWUFBWSxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUU7b0JBQ3RDLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRSxLQUFLLEVBQUcsSUFBSSxFQUFFO29CQUNsQyxFQUFFLElBQUksRUFBRyxTQUFTLEVBQUUsS0FBSyxFQUFHLEdBQUcsRUFBRTtvQkFDakMsRUFBRSxJQUFJLEVBQUcsT0FBTyxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUU7aUJBQ2pDO2FBQ0Q7U0FDRDtLQUNELENBQUM7SUFFRixNQUFhLEdBQUc7UUFFQyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRSxRQUFRLENBQUUsQ0FBQztLQUNsRDtJQUpZLE1BQUcsTUFJZixDQUFBO0FBQ0YsQ0FBQyxFQTNCUyxFQUFFLEtBQUYsRUFBRSxRQTJCWCJ9