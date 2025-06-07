import { leaf, Renn, ef, pl } from "../../meh/index.js";
var VM;
(function (VM) {
    ;
    [
        "TreeType キーボードでツリー構造・値編集",
        "Jectia 任意のデータタイプとモデル・ビュー分離なExcel"
    ];
    [
        "キハ35 6両",
        "メトロ10000系 6両",
        "80系 7両",
        "E231系 山手線 7両",
        "メトロ16000系 6両",
        "国鉄101系 中央線 6両",
        "国鉄485系 8両 , 2両",
        "飯田線 2両",
        "E233系 京浜東北線 6両",
        "国鉄103系 総武線 6両",
        "国鉄101系 総武線 10両",
        "E231系 湘南新宿ライン 10両",
        "国鉄115系 湘南色 11両",
        "国鉄165系 12両",
        "国鉄583系 13両",
        "国鉄415系 8両",
        "国鉄455系 7両",
        "キハ58 ときわ 6両",
        "国鉄14系 さくら 7両",
        "国鉄20系 11両",
        "国鉄旧客 21両",
        "東急5050系4000番台 6両",
        "営団地下鉄6000系 10両",
        "東武50070系 10両",
        "東武8000系 4+2+4両",
        "クモハユニ64 2両",
        "クモユニ74 2両"
    ];
})(VM || (VM = {}));
var DM;
(function (DM) {
    class PostApp {
        trees = new Renn;
        constructor() { }
        async load(perm_id) {
            const i = {
                title: "ツリーポスト",
                root: {
                    title: "ルートにござる",
                    text: ""
                }
            };
            const tree = new PostTree(i);
            this.trees.new([tree]);
        }
    }
    DM.PostApp = PostApp;
    class PostTree {
        title = leaf("");
        root;
        constructor(i) {
            this.value = i;
            this.root = new PostItem(i.root);
        }
        set value(v) {
            this.title.$ = v.title;
        }
    }
    DM.PostTree = PostTree;
    class PostItem {
        title;
        text;
        constructor(i) {
            this.title = leaf(i.title);
            this.text = leaf(i.text);
        }
    }
    DM.PostItem = PostItem;
})(DM || (DM = {}));
(function (VM) {
    class App {
        doc = new DM.PostApp;
        constructor() {
            this.doc.load("1");
        }
    }
    VM.App = App;
})(VM || (VM = {}));
var VC;
(function (VC) {
    const css = 
    /* css */ `


* { box-sizing : border-box ; }

h1 , h2 , h3 { margin : 0 ; text-align : center ; }

h1 { background :  oklch( 0%  0%  0 / 14% ); }

.TREES
{
	display : flex ;
	justify-content : center ;
	flex-wrap : wrap ;
	gap : 1.36em ;
}

.TREE
{
	flex-grow : 1 ;

	border-radius : 0.8em ;
	background-color : oklch( 100%  0%  0 / 40% ) ;

	width : 400px ;
	min-height : 350px ;

	padding : 1em 1.4em ;
}

.TITLE
{
	border : none ;
	background : none ;
	text-align : center ;
	font-size : 2rem ;
}

.TITLE:focus
{
	background : white ;
}


` /*css*/;
    VC.Applet = () => {
        const vm = new VM.App;
        return ef.main({
            class: "FV PXX ",
            shadow: { css }
        }, 
        // ef.h1 ( "Posts" ) ,
        ef.section({ class: "TREES" }, pl.each(vm.doc.trees, o => Tree(o.target))));
    };
    const Tree = (dm) => {
        return ef.article({ class: "TREE" }, ef.h2(ef.input({ class: "TITLE", binds: { value_input: dm.title } })), ef.section({}, Item(dm.root)));
    };
    const Item = (dm) => {
        return ef.section(ef.span({}, dm.title));
    };
})(VC || (VC = {}));
export const Posts = VC.Applet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BRzEvUG9zdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQUcsRUFBRSxFQUFHLEVBQUUsRUFBcUIsTUFBTSxvQkFBb0IsQ0FBRTtBQUUvRSxJQUFVLEVBQUUsQ0FnRFg7QUFoREQsV0FBVSxFQUFFO0lBRVgsQ0FBQztJQUVEO1FBQ0MsMEJBQTBCO1FBQzFCLGtDQUFrQztLQUNsQyxDQUFFO0lBRUg7UUFDQyxTQUFTO1FBQ1QsY0FBYztRQUNkLFFBQVE7UUFDUixjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFFaEIsUUFBUTtRQUNSLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsZ0JBQWdCO1FBRWhCLG1CQUFtQjtRQUVuQixnQkFBZ0I7UUFDaEIsWUFBWTtRQUVaLFlBQVk7UUFFWixXQUFXO1FBQ1gsV0FBVztRQUVYLGFBQWE7UUFFYixjQUFjO1FBQ2QsV0FBVztRQUNYLFVBQVU7UUFFVixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBRWhCLGNBQWM7UUFDZCxnQkFBZ0I7UUFFaEIsWUFBWTtRQUNaLFdBQVc7S0FDWCxDQUFBO0FBQ0YsQ0FBQyxFQWhEUyxFQUFFLEtBQUYsRUFBRSxRQWdEWDtBQUVELElBQVUsRUFBRSxDQW1FWDtBQW5FRCxXQUFVLEVBQUU7SUFFWCxNQUFhLE9BQU87UUFFbkIsS0FBSyxHQUFHLElBQUksSUFBaUIsQ0FBRTtRQUUvQixnQkFDQyxDQUFDO1FBRUYsS0FBSyxDQUFDLElBQUksQ0FBRyxPQUFnQjtZQUU1QixNQUFNLENBQUMsR0FDUDtnQkFDQyxLQUFLLEVBQUcsUUFBUTtnQkFDaEIsSUFBSSxFQUNKO29CQUNDLEtBQUssRUFBRyxTQUFTO29CQUNqQixJQUFJLEVBQUcsRUFBRTtpQkFDVDthQUNELENBQUE7WUFFRCxNQUFNLElBQUksR0FBRyxJQUFJ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