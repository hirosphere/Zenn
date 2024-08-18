import Express from "express";
import ip from "ip";
var HTTPServer;
(function (HTTPServer) {
    const app = Express();
    //import( "./zz-index/zz-index.js" ).then( mo => app.use( "", mo.zindex ) );
    HTTPServer.init = (i) => {
        app.get("/welcome/*", (req, res) => res.send(`${req.ip} から ${decodeURIComponent(req.url)} へ、ようこそ。\n${ip.address()}`));
        app.use(Express.static(i.doc_root));
        app.use("/api/v", api_v);
        // app.get( "", zindex );
        app.use("", mw1);
        app.listen(i.port, () => console.log(`アドレス ${ip.address()}\nポート ${i.port}\nにてHTTPサービス開始。`));
    };
    const api_v = (req, res) => {
        res.json(process.versions);
    };
    const mw1 = (req, res) => {
        res.send(decodeURIComponent(req.url) + " なにもsend");
    };
})(HTTPServer || (HTTPServer = {}));
/**  **/
console.log("Node", process.versions.node);
process.stdin.setEncoding("utf-8");
process.stdin.setRawMode(true);
const ondata = (data) => {
    if (data.match(/^q/)) {
        console.log("潔く終了。");
        process.exit();
    }
};
process.stdin.on("data", ondata);
HTTPServer.init({ doc_root: "C:\\W", port: 31111 });
