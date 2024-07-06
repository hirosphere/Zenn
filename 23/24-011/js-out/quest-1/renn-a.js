import { Exist, Leaf, Renn, ef, each, log } from "../meh/index.js";
export function RennA(um) {
    return ef.article({}, ef.h1("Renn A"), ef.section(
    //	ef.button( { acts: { click: () => um.renn.new_orders( [ "平井" ] ) } }, "追加" ),
    //	ef.button( { acts: { click: () => ins( mo.renn , [ "新小岩", "小岩" ] ) } }, "追加" ),
    //	ef.button( { acts: { click: () => ins( mo.renn, [ "水道橋", "御茶ノ水" ], 0 ) } }, "追加" ),
    //	ef.button( { acts: { click: () => ins( mo.renn, [ "西船橋", "津田沼" ], 10 ) } }, "追加" ),
    //	ef.button( { acts: { click: () => mo.renn.clear() } }, "消去" ),
    ), ef.section(ef.ul({
        style: { overflowX: "auto" }
    }, ",,,", each(um.renn, o => RennA.Item(o)), " ... ")));
}
(function (RennA) {
    const sources = (com) => [
        "秋葉原", "浅草橋", "両国", "錦糸町", "亀戸",
    ]
        .map(v => new Leaf.String(com, v));
    class Model extends Exist {
        renn = new Renn(this, sources(this));
    }
    RennA.Model = Model;
    function Item(um) {
        return ef.li({ style: { display: "grid", gap: "1ex", gridTemplateColumns: "12em 3fr" } }, ef.span(
        // um.conv( v => v + 1 ), " - ", um.source,
        um, " ", ef.sub(um.runiq), " - ", um.source), Ctrl(um));
    }
    RennA.Item = Item;
    function Ctrl(um) {
        function keydown(ev) {
            log(ev.key);
            switch (ev.key) {
                case "x":
                    um.delete();
                    break;
            }
        }
        return ef.a({
            attrs: {
                href: "javascript: void(0)",
            },
            style: {
                cursor: "default",
                display: "flex",
                padding: "0 1ex",
                gap: "1ex",
                border: "0px solid hsl( 45, 3%, 50% )"
            },
            acts: {
                keydown
            }
        }, Cmd("p", () => 0), Cmd("n", () => um.move(um.value - 1)), Cmd("x", () => um.delete()));
    }
    function Cmd(ch, act) {
        return ef.span({
            acts: { click: act },
        }, ch);
    }
})(RennA || (RennA = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVubi1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL3F1ZXN0LTEvcmVubi1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSTFFLE1BQU0sVUFBVSxLQUFLLENBQUUsRUFBZ0I7SUFFdEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFJLEVBRUosRUFBRSxDQUFDLEVBQUUsQ0FBRSxRQUFRLENBQUUsRUFDakIsRUFBRSxDQUFDLE9BQU87SUFFVixnRkFBZ0Y7SUFDaEYsa0ZBQWtGO0lBQ2xGLHNGQUFzRjtJQUN0RixzRkFBc0Y7SUFDdEYsaUVBQWlFO0tBQ2hFLEVBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FFVCxFQUFFLENBQUMsRUFBRSxDQUVKO1FBQ0MsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtLQUM1QixFQUNELEtBQUssRUFBRSxJQUFJLENBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUUsRUFBRSxPQUFPLENBQ3JELENBQ0QsQ0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELFdBQWlCLEtBQUs7SUFFckIsTUFBTSxPQUFPLEdBQUcsQ0FBRSxHQUFXLEVBQUcsRUFBRSxDQUNsQztRQUNDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJO0tBQy9CO1NBQ0EsR0FBRyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLEdBQUcsRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO0lBRXZDLE1BQWEsS0FBTSxTQUFRLEtBQUs7UUFHL0IsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFtQixJQUFJLEVBQUUsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFFLENBQUM7S0FDMUQ7SUFKWSxXQUFLLFFBSWpCLENBQUE7SUFFRCxTQUFnQixJQUFJLENBQUUsRUFBMEI7UUFFL0MsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUVYLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQzNFLEVBQUUsQ0FBQyxJQUFJO1FBRU4sMkNBQTJDO1FBQzNDLEVBQUUsRUFBRSxHQUFHLEVBQ1AsRUFBRSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUMsS0FBSyxDQUFFLEVBQUUsS0FBSyxFQUN6QixFQUFFLENBQUMsTUFBTSxDQUNULEVBQ0QsSUFBSSxDQUFFLEVBQUUsQ0FBRSxDQUNWLENBQUM7SUFDSCxDQUFDO0lBZGUsVUFBSSxPQWNuQixDQUFBO0lBRUQsU0FBUyxJQUFJLENBQUUsRUFBMEI7UUFFeEMsU0FBUyxPQUFPLENBQUUsRUFBa0I7WUFFbkMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUUsQ0FBQztZQUNkLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFDZDtnQkFDQyxLQUFLLEdBQUc7b0JBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFFO29CQUFFLE1BQU87YUFDaEM7UUFDRixDQUFDO1FBRUQsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUVWO1lBQ0MsS0FBSyxFQUNMO2dCQUNDLElBQUksRUFBRSxxQkFBcUI7YUFDM0I7WUFFRCxLQUFLLEVBQ0w7Z0JBQ0MsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixHQUFHLEVBQUUsS0FBSztnQkFDVixNQUFNLEVBQUUsOEJBQThCO2FBQ3RDO1lBRUQsSUFBSSxFQUNKO2dCQUNDLE9BQU87YUFDUDtTQUNELEVBQ0QsR0FBRyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUUsRUFDbkIsR0FBRyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLENBQUUsRUFDekMsR0FBRyxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FDN0IsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLEdBQUcsQ0FBRSxFQUFXLEVBQUUsR0FBZ0I7UUFFMUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViO1lBQ0MsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtTQUNwQixFQUNELEVBQUUsQ0FDRixDQUFDO0lBQ0gsQ0FBQztBQUNGLENBQUMsRUEvRWdCLEtBQUssS0FBTCxLQUFLLFFBK0VyQiJ9