export * from "./Posts.js";
export * from "./OKLCH.js";
import { EQListApp } from "./EQ_List.js";
//export * from "./UUID_Clock.js" ;
//export * from "./Rectia.js" ;
//export * as 物流 from "./Logistic/index.js" ;
import { EkiIndex } from "./Eki/EkiIndex.js";
import { CSSOM_Quest } from "./CSS_Qst.js";
import { OKLCH } from "./OKLCH.js";
/*

"AG1" : AG1.Index ,
"AG1.Posts" : AG1.Posts ,
"uig-oklch" : AG1.OKLCH ,
"EQ_LIST" : AG1.EQListApp ,
"UUID_CLOCK" : AG1.UUID_Clock ,
"Rectia" : AG1.Rectia ,
"AG1.物流.看板" : AG1.物流.看板

*/
export const index = { name: "AG1", type: "AG1",
    parts: [
        { name: "CSSOM", page: () => CSSOM_Quest() },
        { type: "AG1.Posts", name: "Posts" },
        { name: "OKLCH", page: () => OKLCH() },
        { name: "Rectia", type: "Rectia" },
        { name: "UUID_Clock", type: "UUID_CLOCK" },
        { name: "EQ_List", page: () => EQListApp() },
        EkiIndex,
        { name: "物流", title: "物流進捗管理", parts: [
                { name: "全体進捗" },
                { name: "グループ進捗" },
                { name: "製品情報" },
                { name: "店舗情報" },
                { name: "看板", type: "AG1.物流.看板" }
            ]
        },
        { name: "製造進捗管理", parts: [
                { name: "進捗" },
                { name: "実績記録" },
                { name: "プロジェクト情報" },
                { name: "工程情報" },
            ]
        }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUcxX0luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUcxL0FHMV9JbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxjQUFjLFlBQVksQ0FBRTtBQUM1QixjQUFjLFlBQVksQ0FBRTtBQUM1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBQzFDLG1DQUFtQztBQUNuQywrQkFBK0I7QUFDL0IsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBRTtBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBQzVDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkM7Ozs7Ozs7Ozs7RUFVRTtBQUVGLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRyxLQUFLLEVBQUcsSUFBSSxFQUFHLEtBQUs7SUFDakQsS0FBSyxFQUNMO1FBQ0MsRUFBRSxJQUFJLEVBQUcsT0FBTyxFQUFHLElBQUksRUFBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUcsRUFBRTtRQUNoRCxFQUFFLElBQUksRUFBRyxXQUFXLEVBQUcsSUFBSSxFQUFHLE9BQU8sRUFBRTtRQUN2QyxFQUFFLElBQUksRUFBRyxPQUFPLEVBQUcsSUFBSSxFQUFHLEdBQUcsRUFBRSxDQUFFLEtBQUssRUFBRyxFQUFFO1FBQzNDLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRyxJQUFJLEVBQUcsUUFBUSxFQUFFO1FBQ3JDLEVBQUUsSUFBSSxFQUFHLFlBQVksRUFBRyxJQUFJLEVBQUcsWUFBWSxFQUFFO1FBQzdDLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFHLEVBQUU7UUFDaEQsUUFBUTtRQUNSLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxLQUFLLEVBQUcsUUFBUSxFQUFHLEtBQUssRUFDdkM7Z0JBQ0MsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFO2dCQUNqQixFQUFFLElBQUksRUFBRyxRQUFRLEVBQUU7Z0JBQ25CLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTtnQkFDakIsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFO2dCQUNqQixFQUFFLElBQUksRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFHLFdBQVcsRUFBRTthQUNwQztTQUNEO1FBQ0QsRUFBRSxJQUFJLEVBQUcsUUFBUSxFQUFHLEtBQUssRUFDeEI7Z0JBQ0MsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFFO2dCQUNmLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTtnQkFDakIsRUFBRSxJQUFJLEVBQUcsVUFBVSxFQUFFO2dCQUNyQixFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7YUFDakI7U0FDRDtLQUNEO0NBQ0QsQ0FBQSJ9