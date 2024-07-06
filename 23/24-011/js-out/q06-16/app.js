import { Exist, navi, dom, ef, root } from "../meh/index.js";
const browser = new navi.Browser(root);
var models;
(function (models) {
    class App extends Exist {
        root = new navi.Index(this, browser, { title: "06-16 Audio" });
        constructor() {
            super(root);
            browser.index.value = this.root;
        }
    }
    models.App = App;
})(models || (models = {}));
var ui;
(function (ui) {
    ui.App = () => {
        const model = new models.App();
        return ef.main(ef.h1("24-06-16 Audio"), ef.p("オーディオコンポーネント開発"));
    };
})(ui || (ui = {}));
export const main = () => {
    dom.create(root, ui.App(), document.body);
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL3EwNi0xNi9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUVsRSxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFFLENBQUM7QUFFekMsSUFBVSxNQUFNLENBYWY7QUFiRCxXQUFVLE1BQU07SUFFZixNQUFhLEdBQUksU0FBUSxLQUFLO1FBRTdCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBRSxDQUFDO1FBRWpFO1lBRUMsS0FBSyxDQUFFLElBQUksQ0FBRSxDQUFDO1lBRWQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDO0tBQ0Q7SUFWWSxVQUFHLE1BVWYsQ0FBQTtBQUNGLENBQUMsRUFiUyxNQUFNLEtBQU4sTUFBTSxRQWFmO0FBRUQsSUFBVSxFQUFFLENBWVg7QUFaRCxXQUFVLEVBQUU7SUFFRSxNQUFHLEdBQUcsR0FBbUIsRUFBRTtRQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUUvQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBRWIsRUFBRSxDQUFDLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRSxFQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFFLGdCQUFnQixDQUFFLENBQ3hCLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBWlMsRUFBRSxLQUFGLEVBQUUsUUFZWDtBQUVELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFVLEVBQUU7SUFFL0IsR0FBRyxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBQztBQUM3QyxDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyJ9