import { ef, log } from "../../Meh/Meh.js";
import { Eki } from "../../API/Eki.js";
export var VM;
(function (VM) {
    var index;
    (function (index) {
        class root {
            type = "eki.1";
            title = "駅データ.jp";
            parts;
            constructor(datapath) {
                const ents = Object.keys(Eki.AreaName_PrefList).map(title => [title, new area(title, datapath)]);
                this.parts = Object.fromEntries(ents);
            }
        }
        index.root = root;
        class area {
            title;
            datapath;
            type = "eki.1";
            constructor(title, datapath) {
                this.title = title;
                this.datapath = datapath;
            }
            parts = async () => {
                const ents = [];
                for (const name of Eki.AreaName_PrefList[this.title]) {
                    ents.push([name, new pref(name, this.datapath)]);
                }
                return Object.fromEntries(ents);
            };
        }
        class pref {
            title;
            datapath;
            type = "eki.1";
            constructor(title, datapath) {
                this.title = title;
                this.datapath = datapath;
            }
            parts = async () => {
                const eki = await Eki.make(this.datapath);
                const lines = eki.pref_line.items(Eki.pref_cd[this.title]);
                const ents = [];
                for (const rc of lines) {
                    ents.push([rc.line_name, new line(rc)]);
                }
                return Object.fromEntries(ents);
            };
        }
        class line {
            line;
            type = "eki.1";
            title;
            cont;
            constructor(line) {
                this.line = line;
                this.title = line.line_name;
                this.cont = line;
            }
            parts = async () => {
                const ents = [];
                for (const rec of this.line.Stations) {
                    ents.push([rec.StationName, new station(rec)]);
                }
                return Object.fromEntries(ents);
            };
        }
        class station {
            type = "eki.1";
            title;
            cont;
            constructor(rec) {
                this.title = rec.StationName;
                this.cont = rec;
            }
        }
    })(index = VM.index || (VM.index = {}));
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
	h1 { line-height : 1.5 ; }
	p { line-height : 1.3 ; }

	ul { list-style : none ;  text-align : center ; }
	li { line-height : 1.2 ; }
	
	`;
    /* Conponents */
    function App(index) {
        log("App index type", index.cont?.type);
        return ef.div({ shadow: css }, (index.cont?.type == "Line") ? Line(index.cont) :
            (index.cont?.type == "Station") ? Station(index.cont) :
                ef.main({ class: "FC  PM GX JC AC" }, ef.h1(index.title), "...."));
    }
    VC.App = App;
    function Line(rc) {
        const ps = ["company_cd", "line_type", "lat", "lon"];
        return ef.main({ class: "FC  PM GX JC AC" }, ef.h1(rc.line_name), ef.ul(...ps.map(prop => ef.li(`${String(prop)} : ${rc[prop]}`))));
    }
    function Station(rc) {
        const ps = ["post", "PrefName", "address", "LineName", "lat", "lon"];
        return ef.main({ class: "FC  PM GX JC AC" }, ef.p(rc.LineName), ef.h1(rc.StationName), ef.ul(ef.li("〒" + rc.post), ef.li(rc.PrefName + rc.address), ef.li("北緯 " + rc.lat), ef.li("東経 " + rc.lon)));
    }
    function flist(v) {
        const rt = [];
        if (typeof v != "object")
            return rt;
        Object.keys(v).map(name => rt.push(`${name}`));
        return rt;
    }
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpXzEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BR18xL0VraV8xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBTyxFQUFFLEVBQVEsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFFdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBUXhDLE1BQU0sS0FBVyxFQUFFLENBd0dsQjtBQXhHRCxXQUFpQixFQUFFO0lBQUMsSUFBQSxLQUFLLENBd0d4QjtJQXhHbUIsV0FBQSxLQUFLO1FBS3hCLE1BQWEsSUFBSTtZQUVoQixJQUFJLEdBQUcsT0FBTyxDQUFFO1lBQ2hCLEtBQUssR0FBRyxTQUFTLENBQUU7WUFDbkIsS0FBSyxDQUFVO1lBRWYsWUFBYyxRQUFpQjtnQkFFOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUUsQ0FBRyxHQUFHLENBRXZELEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBRSxLQUFLLEVBQUcsSUFBSSxJQUFJLENBQUcsS0FBSyxFQUFHLFFBQVEsQ0FBRSxDQUFFLENBQ2xELENBQUU7Z0JBRUgsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFHLElBQUksQ0FBRSxDQUFFO1lBQzNDLENBQUM7U0FDRDtRQWZZLFVBQUksT0FlaEIsQ0FBQTtRQUVELE1BQU0sSUFBSTtZQUlZO1lBQXlCO1lBRjlDLElBQUksR0FBRyxPQUFPLENBQUU7WUFFaEIsWUFBcUIsS0FBYyxFQUFXLFFBQWlCO2dCQUExQyxVQUFLLEdBQUwsS0FBSyxDQUFTO2dCQUFXLGFBQVEsR0FBUixRQUFRLENBQVM7WUFDOUQsQ0FBQztZQUVGLEtBQUssR0FBRyxLQUFLLElBQXdCLEVBQUU7Z0JBRXRDLE1BQU0sSUFBSSxHQUFpQyxFQUFFLENBQUU7Z0JBRS9DLEtBQU0sTUFBTSxJQUFJLElBQUksR0FB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