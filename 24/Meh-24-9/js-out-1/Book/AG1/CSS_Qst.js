import { leaf, ef, log } from "../../meh/index.js";
var Qst;
(function (Qst) {
    Qst.css1 = () => {
        const ss = new CSSStyleSheet();
        ss.replace(`:host { background : hsl( 0  0%  40% ) ; }
h1 { color : oklch( 90%  0%  0 ) ; }
`);
        log("css1");
        return ss;
    };
})(Qst || (Qst = {}));
var VC;
(function (VC) {
    VC.Applet = () => {
        const qstr = leaf("CSSOM Quest");
        return ef.main({
            class: "FV AC",
            hook: {
                init(el) {
                    //const shadow = el.attachShadow ( { mode : "closed" } ) ;
                    //shadow.adoptedStyleSheets.push ( Qst.css1 () ) ;
                }
            },
            shadow: { mode: "open" }
        }, ef.h1("CSSOM Quest"), ef.p(qstr), ef.style(":host { color : blue } p { color : red }"));
    };
})(VC || (VC = {}));
export const CSSOM_Quest = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1NTX1FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHMS9DU1NfUXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsRUFBRSxFQUFTLEdBQUcsRUFBRSxNQUFNLG9CQUFvQixDQUFFO0FBRTVELElBQVUsR0FBRyxDQWlCWjtBQWpCRCxXQUFVLEdBQUc7SUFFQyxRQUFJLEdBQUcsR0FBbUIsRUFBRTtRQUV4QyxNQUFNLEVBQUUsR0FBRyxJQUFJLGFBQWEsRUFBRyxDQUFFO1FBRWpDLEVBQUUsQ0FBQyxPQUFPLENBRVo7O0NBRUMsQ0FDRSxDQUFFO1FBRUgsR0FBRyxDQUFHLE1BQU0sQ0FBRSxDQUFBO1FBRWQsT0FBTyxFQUFFLENBQUU7SUFDWixDQUFDLENBQUE7QUFDRixDQUFDLEVBakJTLEdBQUcsS0FBSCxHQUFHLFFBaUJaO0FBRUQsSUFBVSxFQUFFLENBNkJYO0FBN0JELFdBQVUsRUFBRTtJQUVFLFNBQU0sR0FBRyxHQUFvQixFQUFFO1FBRTNDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBRyxhQUFhLENBQUUsQ0FBRTtRQUVyQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBRWI7WUFDQyxLQUFLLEVBQUcsT0FBTztZQUNmLElBQUksRUFDSjtnQkFDQyxJQUFJLENBQUcsRUFBRTtvQkFFUiwwREFBMEQ7b0JBQzFELGtEQUFrRDtnQkFDbkQsQ0FBQzthQUNEO1lBQ0QsTUFBTSxFQUFHLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTtTQUMxQixFQUVELEVBQUUsQ0FBQyxFQUFFLENBQUcsYUFBYSxDQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUcsSUFBSSxDQUFFLEVBQ2IsRUFBRSxDQUFDLEtBQUssQ0FFUCwwQ0FBMEMsQ0FDMUMsQ0FDRCxDQUFFO0lBQ0osQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQTdCUyxFQUFFLEtBQUYsRUFBRSxRQTZCWDtBQUVELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFFIn0=