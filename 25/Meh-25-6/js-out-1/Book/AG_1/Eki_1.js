import { ef, log } from "../../Meh/Meh.js";
import { Eki } from "../../API/Eki.js";
export var VM;
(function (VM) {
    var index;
    (function (index) {
        class root {
            type = "Eki1";
            title = "Eki.js {}";
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
	li { line-height : 1.14 ; }
	
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
        return ef.main({ class: "FC  PM GX JC AC" }, ef.h1(rc.StationName), ef.ul(...ps.map(e => ef.li("" + rc[e]))));
    }
    function flist(v) {
        const rt = [];
        if (typeof v != "object")
            return rt;
        Object.keys(v).map(name => rt.push(`${name}`));
        return rt;
    }
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpXzEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BR18xL0VraV8xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBTyxFQUFFLEVBQVEsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFFdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBUXhDLE1BQU0sS0FBVyxFQUFFLENBd0dsQjtBQXhHRCxXQUFpQixFQUFFO0lBQUMsSUFBQSxLQUFLLENBd0d4QjtJQXhHbUIsV0FBQSxLQUFLO1FBS3hCLE1BQWEsSUFBSTtZQUVoQixJQUFJLEdBQUcsTUFBTSxDQUFFO1lBQ2YsS0FBSyxHQUFHLFdBQVcsQ0FBRTtZQUNyQixLQUFLLENBQVU7WUFFZixZQUFjLFFBQWlCO2dCQUU5QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBRSxDQUFHLEdBQUcsQ0FFdkQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFFLEtBQUssRUFBRyxJQUFJLElBQUksQ0FBRyxLQUFLLEVBQUcsUUFBUSxDQUFFLENBQUUsQ0FDbEQsQ0FBRTtnQkFFSCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUcsSUFBSSxDQUFFLENBQUU7WUFDM0MsQ0FBQztTQUNEO1FBZlksVUFBSSxPQWVoQixDQUFBO1FBRUQsTUFBTSxJQUFJO1lBSVk7WUFBeUI7WUFGOUMsSUFBSSxHQUFHLE9BQU8sQ0FBRTtZQUVoQixZQUFxQixLQUFjLEVBQVcsUUFBaUI7Z0JBQTFDLFVBQUssR0FBTCxLQUFLLENBQVM7Z0JBQVcsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUM5RCxDQUFDO1lBRUYsS0FBSyxHQUFHLEtBQUssSUFBd0IsRUFBRTtnQkFFdEMsTUFBTSxJQUFJLEdBQWlDLEVBQUUsQ0FBRTtnQkFFL0MsS0FBTSxNQUFNLElBQUksSUFBSSxHQUFH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