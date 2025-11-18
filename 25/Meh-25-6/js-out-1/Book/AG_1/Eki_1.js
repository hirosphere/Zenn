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

	.STATION
	{
		font-size : min( 1.2em , 0.3rem + 1vw ) ;
	}

	.STATION ._LINE_NAME
	{
		font-size : calc( 1.2vw + 1em ) ;
		font-weight : 200 ;
	}

	.STATION ._NAME
	{
		padding-block : 0.8em ;
		font-size : calc( 10vw ) ;
		white-space : nowrap ;
		font-weight : 760 ;
	}

	.STATION li
	{
		line-height : 1.25 ;
		font-weight : 210 ;
	}
	
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
        return ef.main({ class: "STATION  FC PM GX JC AC" }, ef.p({ class: "_LINE_NAME" }, rc.LineName), ef.p({ class: "_NAME", style: { ...trim(rc.StationName) } }, rc.StationName), ef.ul(ef.li("〒" + rc.post), ef.li(rc.PrefName + rc.address), ef.li("北緯 " + rc.lat), ef.li("東経 " + rc.lon)));
    }
    function trim(letter) {
        const len = letter.length;
        const [space = 0, sc_x = 1, sc_y = 1] = trim_table[len] ?? [];
        return {
            letterSpacing: space + "em",
            marginRight: -space + "em",
            transform: `scale( ${sc_x} , ${sc_y} )`,
        };
    }
    const trim_table = {
        1: [0, 1.24],
        2: [1.0, 1.14],
        3: [0.5, 1.1],
        4: [0.20, 1.05],
        5: [0.07, 1.05],
        6: [0.04, 1.05],
        7: [0.0, 1.0, 1.03],
        8: [-0.03, 0.90, 1.06],
        9: [-0.03, 0.80, 1.08],
        10: [-0.03, 0.75, 1.1],
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWtpXzEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BR18xL0VraV8xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBTyxFQUFFLEVBQVEsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFFdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBUXhDLE1BQU0sS0FBVyxFQUFFLENBd0dsQjtBQXhHRCxXQUFpQixFQUFFO0lBQUMsSUFBQSxLQUFLLENBd0d4QjtJQXhHbUIsV0FBQSxLQUFLO1FBS3hCLE1BQWEsSUFBSTtZQUVoQixJQUFJLEdBQUcsT0FBTyxDQUFFO1lBQ2hCLEtBQUssR0FBRyxTQUFTLENBQUU7WUFDbkIsS0FBSyxDQUFVO1lBRWYsWUFBYyxRQUFpQjtnQkFFOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUUsQ0FBRyxHQUFHLENBRXZELEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBRSxLQUFLLEVBQUcsSUFBSSxJQUFJLENBQUcsS0FBSyxFQUFHLFFBQVEsQ0FBRSxDQUFFLENBQ2xELENBQUU7Z0JBRUgsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFHLElBQUksQ0FBRSxDQUFFO1lBQzNDLENBQUM7U0FDRDtRQWZZLFVBQUksT0FlaEIsQ0FBQTtRQUVELE1BQU0sSUFBSTtZQUlZO1lBQXlCO1lBRjlDLElBQUksR0FBRyxPQUFPLENBQUU7WUFFaEIsWUFBcUIsS0FBYyxFQUFXLFFBQWlCO2dCQUExQyxVQUFLLEdBQUwsS0FBSyxDQUFTO2dCQUFXLGFBQVEsR0FBUixRQUFRLENBQVM7WUFDOUQsQ0FBQztZQUVGLEtBQUssR0FBRyxLQUFLLElBQXdCLEVBQUU7Z0JBRXRDLE1BQU0sSUFBSSxHQUFpQyxFQUFFLENBQUU7Z0JBRS9DLEtBQU0sTUFBTSxJQUFJLElBQUksR0FB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