import { ef, log } from "../../Meh/Meh.js";
import { Eki as EkiAPI } from "../../API/Eki.js";
var DM;
(function (DM) {
    async function load(data_path) {
        log(data_path);
        const eki = await EkiAPI.create(data_path);
        eki.rootIndex.areas.forEach(area => log(area));
    }
    DM.load = load;
})(DM || (DM = {}));
var VC;
(function (VC) {
    const css = /* css */ `
	
	* { box-sizing : border-box ; margin : 0 ; padding : 0 ; }
	
	.FC { display : flex ; flex-direction : column ; }
	.FR { display : flex ; flex-direction : row ; }
	.PGMM { padding : 1em ; gap : 1em ; }
	.PGMX { padding : 1em ; gap : 1ex ; }
	.OA { overflow : auto ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }
	
	`;
    VC.App = (dapapath) => {
        DM.load(dapapath);
        return ef.div({ shadow: css }, ef.main({ class: "FC PGMX OA AC" }, ef.h1("Eki API"), ef.p("駅データ.jp API")));
    };
})(VC || (VC = {}));
export const Eki = VC.App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfMS9Fa2kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBbUIsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFDN0QsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUVsRCxJQUFVLEVBQUUsQ0FVWDtBQVZELFdBQVUsRUFBRTtJQUVKLEtBQUssVUFBVSxJQUFJLENBQUcsU0FBa0I7UUFFOUMsR0FBRyxDQUFHLFNBQVMsQ0FBRSxDQUFFO1FBRW5CLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBRyxTQUFTLENBQUUsQ0FBRTtRQUUvQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUcsSUFBSSxDQUFFLENBQUUsQ0FBRTtJQUN2RCxDQUFDO0lBUHFCLE9BQUksT0FPekIsQ0FBQTtBQUNGLENBQUMsRUFWUyxFQUFFLEtBQUYsRUFBRSxRQVVYO0FBTUQsSUFBVSxFQUFFLENBaUNYO0FBakNELFdBQVUsRUFBRTtJQUVYLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7O0VBWXJCLENBQUU7SUFFVSxNQUFHLEdBQUcsQ0FBRSxRQUFpQixFQUFjLEVBQUU7UUFFckQsRUFBRSxDQUFDLElBQUksQ0FBRyxRQUFRLENBQUUsQ0FBRTtRQUl0QixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBRVosRUFBRSxNQUFNLEVBQUcsR0FBRyxFQUFFLEVBQ2hCLEVBQUUsQ0FBQyxJQUFJLENBRU4sRUFBRSxLQUFLLEVBQUcsZUFBZSxFQUFFLEVBQzNCLEVBQUUsQ0FBQyxFQUFFLENBQUcsU0FBUyxDQUFFLEVBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUcsYUFBYSxDQUFFLENBQ3RCLENBQ0QsQ0FBRTtJQUNKLENBQUMsQ0FBQTtBQUNGLENBQUMsRUFqQ1MsRUFBRSxLQUFGLEVBQUUsUUFpQ1g7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBRSJ9