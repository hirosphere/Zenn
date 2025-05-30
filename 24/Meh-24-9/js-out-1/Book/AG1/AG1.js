export * from "./Posts.js";
export * from "./OKLCH.js";
import { EQListApp } from "./EQ_List.js";
//export * from "./UUID_Clock.js" ;
//export * from "./Rectia.js" ;
//export * as 物流 from "./Logistic/index.js" ;
import { EkiIndex } from "./Eki/EkiIndex.js";
import { CSSOM_Quest } from "./CSS_Qst.js";
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
        { name: "OKLCH", type: "uig-oklch" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUcxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUcxL0FHMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxjQUFjLFlBQVksQ0FBRTtBQUM1QixjQUFjLFlBQVksQ0FBRTtBQUM1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBQzFDLG1DQUFtQztBQUNuQywrQkFBK0I7QUFDL0IsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBRTtBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBRTVDOzs7Ozs7Ozs7O0VBVUU7QUFFRixNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUcsS0FBSyxFQUFHLElBQUksRUFBRyxLQUFLO0lBQ2pELEtBQUssRUFDTDtRQUNDLEVBQUUsSUFBSSxFQUFHLE9BQU8sRUFBRyxJQUFJLEVBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFHLEVBQUU7UUFDaEQsRUFBRSxJQUFJLEVBQUcsV0FBVyxFQUFHLElBQUksRUFBRyxPQUFPLEVBQUU7UUFDdkMsRUFBRSxJQUFJLEVBQUcsT0FBTyxFQUFHLElBQUksRUFBRyxXQUFXLEVBQUU7UUFDdkMsRUFBRSxJQUFJLEVBQUcsUUFBUSxFQUFHLElBQUksRUFBRyxRQUFRLEVBQUU7UUFDckMsRUFBRSxJQUFJLEVBQUcsWUFBWSxFQUFHLElBQUksRUFBRyxZQUFZLEVBQUU7UUFDN0MsRUFBRSxJQUFJLEVBQUcsU0FBUyxFQUFHLElBQUksRUFBRyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUcsRUFBRTtRQUNoRCxRQUFRO1FBQ1IsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEtBQUssRUFBRyxRQUFRLEVBQUcsS0FBSyxFQUN2QztnQkFDQyxFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7Z0JBQ2pCLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRTtnQkFDbkIsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFO2dCQUNqQixFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7Z0JBQ2pCLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxJQUFJLEVBQUcsV0FBVyxFQUFFO2FBQ3BDO1NBQ0Q7UUFDRCxFQUFFLElBQUksRUFBRyxRQUFRLEVBQUcsS0FBSyxFQUN4QjtnQkFDQyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQUU7Z0JBQ2YsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFO2dCQUNqQixFQUFFLElBQUksRUFBRyxVQUFVLEVBQUU7Z0JBQ3JCLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTthQUNqQjtTQUNEO0tBQ0Q7Q0FDRCxDQUFBIn0=