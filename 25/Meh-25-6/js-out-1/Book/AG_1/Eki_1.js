import { ef } from "../../Meh/Meh.js";
import { Eki } from "../../API/Eki.js";
export var VM;
(function (VM) {
    function root_index(datapath) {
        const areas = Eki.area_prefs;
        const area_ents = Object.keys(areas).map(area => [
            area,
            { title: area, parts: () => prefs(areas[area]) }
        ]);
        const rt = {
            type: "EKI_1",
            title: "Eki.jp",
            cont: "Root",
            parts: Object.fromEntries(area_ents)
        };
        return rt;
        /* */
        async function prefs(list) {
            const ents = [];
            for (const name of list) {
                ents.push([name, pref(name)]);
            }
            return Object.fromEntries(ents);
        }
        function pref(title) {
            return {
                type: "EKI_1",
                title,
                parts: () => lines(title)
            };
        }
        async function lines(pref) {
            const r = await Eki.make(datapath);
            const pref_cd = Eki.pref_cd[pref];
            const lines = r.pref_line.items(pref_cd);
            const ents = [];
            for (const r of lines) {
                ents.push([r.line_name, line(r)]);
            }
            return Object.fromEntries(ents);
        }
        function line(line) {
            return {
                type: "EKI_1",
                title: line.line_name,
                parts: () => stations(line.stations)
            };
        }
        async function stations(list) {
            const ents = [];
            for (const rec of list) {
                ents.push([rec.station_name, station(rec)]);
            }
            return Object.fromEntries(ents);
        }
        function station(r) {
            return {
                type: "EKI_1",
                title: r.station_name,
                cont: r.station_cd
            };
        }
    }
    VM.root_index = root_index;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    /* CSS */
    const css = /* css */ `
	
	* {  box-sizing : border-box ;  margin : 0 ;  padding : 0 ;  line-height : 1 ;  }

	:host
	{
		height : 100% ;
		background : white ;
		overflow : auto ;
	}
	
	
	h1 { padding :  0.5ex  1ex ;  text-align : center ; }

	.FR { display : flex ; }
	.FC { display : flex ;  flex-direction : column ; }
	
	.PM { padding : 1em ; }
	.PX { padding : 1ex ; }

	.GX { padding : 1ex ; }
	.JC { justify-content : center ; }
	.AC { align-items : center ; }

	main { height : 100% ; }
	p { line-height : 1.3 ; }
	
	`;
    /* Conponents */
    function App(index) {
        return ef.div({ shadow: css }, ef.main({ class: "FC  PM GX JC AC" }, ef.h1(index.title), ef.p(index.type), ef.p(index.cont)));
    }
    VC.App = App;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpXzEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BR18xL0VraV8xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBTyxFQUFFLEVBQWEsTUFBTSxrQkFBa0IsQ0FBRTtBQUV2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFTeEMsTUFBTSxLQUFXLEVBQUUsQ0F3RmxCO0FBeEZELFdBQWlCLEVBQUU7SUFFbEIsU0FBZ0IsVUFBVSxDQUFHLFFBQWlCO1FBRTdDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUU7UUFFOUIsTUFBTSxTQUFTLEdBQUksTUFBTSxDQUFDLElBQUksQ0FBRyxLQUFLLENBQUUsQ0FBRSxHQUFHLENBRTVDLElBQUksQ0FBQyxFQUFFLENBQ1A7WUFDQyxJQUFJO1lBQ0osRUFBRSxLQUFLLEVBQUcsSUFBSSxFQUFHLEtBQUssRUFBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUcsS0FBSyxDQUFHLElBQUksQ0FBRSxDQUFFLEVBQUU7U0FDekQsQ0FDRCxDQUFFO1FBRUgsTUFBTSxFQUFFLEdBQ1I7WUFDQyxJQUFJLEVBQUcsT0FBTztZQUNkLEtBQUssRUFBRyxRQUFRO1lBQ2hCLElBQUksRUFBRyxNQUFNO1lBQ2IsS0FBSyxFQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUcsU0FBUyxDQUFFO1NBQ3hDLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBRTtRQUVYLEtBQUs7UUFFTCxLQUFLLFVBQVUsS0FBSyxDQUFHLElBQWdCO1lBRXRDLE1BQU0sSUFBSSxHQUFpQyxFQUFFLENBQUU7WUFDL0MsS0FBTSxNQUFNLElBQUksSUFBSSxJQUFJLEVBQ3hCLENBQUM7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFFLElBQUksRUFBRyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUUsQ0FBRSxDQUFFO1lBQ3pDLENBQUM7WUFDRCxPQUFPLE1BQU0s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