export * from "./Posts.js";
export * from "./OKLCH.js";
import { EQListApp } from "./EQ_List.js";
import { UUID_Clock } from "./UUID_Clock.js";
//export * from "./Rectia.js" ;
//export * as 物流 from "./Logistic/index.js" ;
import { EkiIndex } from "./Eki/EkiIndex.js";
import { CSSOM_Quest } from "./CSS_Qst.js";
import { OKLCH } from "./OKLCH.js";
import * as 製造 from "./製造管理/製造Index.js";
/*

"AG1" : AG1.Index ,
"AG1.Posts" : AG1.Posts ,
"uig-oklch" : AG1.OKLCH ,
"EQ_LIST" : AG1.EQListApp ,
"UUID_CLOCK" : AG1.UUID_Clock ,
"Rectia" : AG1.Rectia ,
"AG1.物流.看板" : AG1.物流.看板

*/
export const index_def = {
    name: "AG1",
    parts: [
        { name: "CSSOM", page: () => CSSOM_Quest() },
        { type: "AG1.Posts", name: "Posts" },
        { name: "OKLCH", page: () => OKLCH() },
        { name: "Rectia", type: "Rectia" },
        { name: "UUID_Clock", page: () => UUID_Clock() },
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
        製造.index,
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQUcxX0luZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUcxL0FHMV9JbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxjQUFjLFlBQVksQ0FBRTtBQUM1QixjQUFjLFlBQVksQ0FBRTtBQUM1QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBRTtBQUM5QywrQkFBK0I7QUFDL0IsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBRTtBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBQzVDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBRTtBQUV6Qzs7Ozs7Ozs7OztFQVVFO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUN0QjtJQUNDLElBQUksRUFBRyxLQUFLO0lBQ1osS0FBSyxFQUNMO1FBQ0MsRUFBRSxJQUFJLEVBQUcsT0FBTyxFQUFHLElBQUksRUFBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUcsRUFBRTtRQUNoRCxFQUFFLElBQUksRUFBRyxXQUFXLEVBQUcsSUFBSSxFQUFHLE9BQU8sRUFBRTtRQUN2QyxFQUFFLElBQUksRUFBRyxPQUFPLEVBQUcsSUFBSSxFQUFHLEdBQUcsRUFBRSxDQUFFLEtBQUssRUFBRyxFQUFFO1FBQzNDLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRyxJQUFJLEVBQUcsUUFBUSxFQUFFO1FBQ3JDLEVBQUUsSUFBSSxFQUFHLFlBQVksRUFBRyxJQUFJLEVBQUcsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFHLEVBQUU7UUFDcEQsRUFBRSxJQUFJLEVBQUcsU0FBUyxFQUFHLElBQUksRUFBRyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUcsRUFBRTtRQUNoRCxRQUFRO1FBQ1IsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEtBQUssRUFBRyxRQUFRLEVBQUcsS0FBSyxFQUN2QztnQkFDQyxFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7Z0JBQ2pCLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRTtnQkFDbkIsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFO2dCQUNqQixFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7Z0JBQ2pCLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxJQUFJLEVBQUcsV0FBVyxFQUFFO2FBQ3BDO1NBQ0Q7UUFDRCxFQUFFLENBQUMsS0FBSztLQUNSO0NBQ0QsQ0FBQSJ9