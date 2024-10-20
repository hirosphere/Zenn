import { Leaf, Renn, ef, each, dom, log } from "../meh/index.js";
export var vm;
(function (vm) {
    class App {
        title;
        items;
        editor;
        constructor(v) {
            this.title = Leaf.str.new(v.title);
            this.items = new Items(v.items);
            this.editor = new Editor(this.items);
            this.items.rand_check();
            document.title = v.title;
        }
    }
    vm.App = App;
    class Editor {
        items;
        text = new Leaf.Entity("なにする？");
        constructor(items) {
            this.items = items;
        }
        post() {
            const item = new Item({ text: this.text.value });
            this.items.new([item], 0);
            this.text.value = "";
        }
    }
    vm.Editor = Editor;
    class Items extends Renn {
        constructor(v) {
            super();
            this.value = v;
        }
        set value(v) {
            this.clear();
            const s = v.map(v => new Item(v));
            this.new(s);
        }
        clear_completed() {
            const list = this.orders.filter(o => o.src.completed.value);
            list.forEach(o => o.remove());
        }
        rand_check() {
            this.orders.forEach(o => o.src.completed.value = bool_rand());
        }
    }
    vm.Items = Items;
    class Item {
        text;
        completed;
        constructor(v) {
            this.text = Leaf.str.new(v.text);
            this.completed = new Leaf.Entity(false);
            log(v.text);
        }
    }
    vm.Item = Item;
    const bool_rand = (r = 0.5) => Math.random() < r;
})(vm || (vm = {}));
export var vc;
(function (vc) {
    vc.App = (m) => {
        return ef.article({ class: "fc" }, ef.h1(m.title), Post(m.editor), ef.section({ class: "bar" }, command("Random", () => m.items.rand_check()), command("削除", () => m.items.clear_completed())), ef.ul({ class: "todo-list" }, each(m.items, o => Item(o))));
    };
    const Post = (m) => {
        return ef.form({
            class: "post",
            acts: {
                submit(ev) {
                    ev.preventDefault();
                    m.post();
                    log("post", m.text.value);
                }
            }
        }, ef.input({
            class: "text",
            props: {
                value: m.text
            },
            acts: {
                input(ev) {
                    if (!(ev.target instanceof HTMLInputElement))
                        return;
                    m.text.value = ev.target.value;
                }
            }
        }), ef.input({
            class: "submit",
            props: { type: "submit", value: "作成" }
        }));
    };
    const Item = (o) => {
        const m = o.src;
        return ef.li({ class: ["todo-item", { completed: m.completed }] }, ef.span(o.count), ef.span(m.text), checkbox(m.completed));
    };
    const command = (label, act) => {
        return ef.button({ acts: { click: act } }, label);
    };
    const checkbox = (state) => {
        return ef.input({
            attrs: { type: "checkbox" },
            props: { checked: state },
            acts: {
                change(ev) {
                    if (ev.target instanceof HTMLInputElement) {
                        state.value = ev.target.checked;
                    }
                }
            }
        });
    };
})(vc || (vc = {}));
const main = () => {
    const v = {
        title: "ToDo 日本史",
        items: [
            { text: "矢じりを作る" },
            { text: "稲作を教える" },
            { text: "製鉄を教える" },
            { text: "民族を移動する" },
            { text: "都を作る" },
            { text: "都を移す" },
            { text: "半島を統一する" },
            { text: "アヘンを売る" },
            { text: "ロシアに勝つ" },
            { text: "阪急電鉄を興す" },
            { text: "箱根土地を始める" },
            { text: "英米を倒す" },
            { text: "ハイチュウを買う" },
            { text: "たけのこの里を分譲" },
        ]
    };
    dom.add(vc.App(new vm.App(v)), "body");
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicS10b2RvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL3ExL3EtdG9kby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFPLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQVMsTUFBTSxpQkFBaUIsQ0FBRTtBQWlCOUUsTUFBTSxLQUFXLEVBQUUsQ0FrRmxCO0FBbEZELFdBQWlCLEVBQUU7SUFFbEIsTUFBYSxHQUFHO1FBRUMsS0FBSyxDQUFFO1FBQ1AsS0FBSyxDQUFFO1FBQ1AsTUFBTSxDQUFFO1FBR3hCLFlBQWEsQ0FBVTtZQUV0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBRTtZQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBRTtZQUV4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBRTtRQUMzQixDQUFDO0tBQ0Q7SUFoQlksTUFBRyxNQWdCZixDQUFBO0lBRUQsTUFBYSxNQUFNO1FBSUs7UUFGUCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFHLE9BQU8sQ0FBRSxDQUFFO1FBRXBELFlBQXVCLEtBQWE7WUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBRXBDLENBQUM7UUFFTSxJQUFJO1lBRVYsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUUsRUFBRSxJQUFJLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBRSxDQUFFO1lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLENBQUUsSUFBSSxDQUFFLEVBQUcsQ0FBQyxDQUFFLENBQUE7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7S0FDRDtJQWRZLFNBQU0sU0FjbEIsQ0FBQTtJQUVELE1BQWEsS0FBTSxTQUFRLElBQWE7UUFFdkMsWUFBYSxDQUFjO1lBRTFCLEtBQUssRUFBRyxDQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUU7UUFDakIsQ0FBQztRQUVELElBQVcsS0FBSyxDQUFHLENBQWM7WUFFaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFFO1lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFHLENBQUMsQ0FBRSxDQUFFLENBQUE7WUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUUsQ0FBRTtRQUNqQixDQUFDO1FBRU0sZUFBZTtZQUVyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBRSxDQUFDO1lBRTlELElBQUksQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFHLENBQUUsQ0FBRTtRQUNwQyxDQUFDO1FBRU0sVUFBVTtZQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FFbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxFQUFFLENBQ3hDLENBQUM7UUFDSCxDQUFDO0tBQ0Q7SUE3QlksUUFBSyxRQTZCakIsQ0FBQTtJQUVELE1BQWEsSUFBSTtRQUVBLElBQUksQ0FBRTtRQUNOLFNBQVMsQ0FBRTtRQUUzQixZQUFhLENBQVc7WUFFdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUU7WUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUcsS0FBSyxDQUFFLENBQUU7WUFFNUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUNmLENBQUM7S0FDRDtJQVpZLE9BQUksT0FZaEIsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLENBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBRTtBQUNyRCxDQUFDLEVBbEZnQixFQUFFLEtBQUYsRUFBRSxRQWtGbEI7QUFFRCxNQUFNLEtBQVcsRUFBRSxDQTBIbEI7QUExSEQsV0FBaUIsRUFBRTtJQUVMLE1BQUcsR0FBRyxDQUFFLENBQVUsRUFBbUIsRUFBRTtRQUVuRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsS0FBSyxFQUFHLElBQUksRUFBRSxFQUVoQixFQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQyxLQUFLLENBQUUsRUFFaEIsSUFBSSxDQUFFLENBQUMsQ0FBQyxNQUFNLENBQUUsRUFFaEIsRUFBRSxDQUFDLE9BQU8sQ0FDVCxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsRUFDakIsT0FBTyxDQUVOLFFBQVEsRUFDUixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUMxQixFQUNELE9BQU8sQ0FFTixJQUFJLEVBQ0osR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUcsQ0FDaEMsQ0FDRCxFQUVELEVBQUUsQ0FBQyxFQUFFLENBQ0osRUFBRSxLQUFLLEVBQUcsV0FBVyxFQUFFLEVBQ3ZCLElBQUksQ0FDSCxDQUFDLENBQUMsS0FBSyxFQUNQLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUNkLENBQ0QsQ0FDRCxDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBRSxDQUFhLEVBQUcsRUFBRTtRQUVoQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBRWI7WUFDQyxLQUFLLEVBQUcsTUFBTTtZQUNkLElBQUksRUFDSjtnQkFDQyxNQUFNLENBQUUsRUFBRTtvQkFFVCxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUU7b0JBQ3JCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBRTtvQkFDVixHQUFHLENBQUUsTUFBTSxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7Z0JBQzlCLENBQUM7YUFDRDtTQUNELEVBQ0QsRUFBRSxDQUFDLEtBQUssQ0FFUDtZQUNDLEtBQUssRUFBRyxNQUFNO1lBQ2QsS0FBSyxFQUNMO2dCQUNDLEtBQUssRUFBRyxDQUFDLENBQUMsSUFBSTthQUNkO1lBQ0QsSUFBSSxFQUNKO2dCQUNDLEtBQUssQ0FBRSxFQUFFO29CQUVSLElBQUksQ0FBRSxDQUFFLEVBQUUsQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLENBQUU7d0JBQUksT0FBUTtvQkFFM0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2hDLENBQUM7YUFDRDtTQUNELENBQ0QsRUFDRCxFQUFFLENBQUMsS0FBSyxDQUVQO1lBQ0MsS0FBSyxFQUFHLFFBQVE7WUFDaEIsS0FBSyxFQUFHLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRyxLQUFLLEVBQUcsSUFBSSxFQUFFO1NBQzFDLENBQ0QsQ0FDRCxDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBRSxDQUFxQixFQUFHLEVBQUU7UUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRTtRQUNqQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBRVgsRUFBRSxLQUFLLEVBQUcsQ0FBRSxXQUFXLEVBQUcsRUFBRSxTQUFTLEVBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFFLEVBQUUsRUFDekQsRUFBRSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsS0FBSyxDQUFFLEVBQ2xCLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBRSxFQUNqQixRQUFRLENBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBRSxDQUN2QixDQUFBO0lBQ0YsQ0FBQyxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBRSxLQUFjLEVBQUcsR0FBZ0IsRUFBRyxFQUFFO1FBRXZELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FFZixFQUFFLElBQUksRUFBRyxFQUFFLEtBQUssRUFBRyxHQUFHLEVBQUUsRUFBRSxFQUMxQixLQUFLLENBQ0wsQ0FBQztJQUNILENBQUMsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLENBQUUsS0FBaUIsRUFBRyxFQUFFO1FBRXhDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FFZDtZQUNDLEtBQUssRUFBRyxFQUFFLElBQUksRUFBRyxVQUFVLEVBQUU7WUFDN0IsS0FBSyxFQUFHLEVBQUUsT0FBTyxFQUFHLEtBQUssRUFBRTtZQUMzQixJQUFJLEVBQ0o7Z0JBQ0MsTUFBTSxDQUFHLEVBQUU7b0JBRVYsSUFBSSxFQUFFLENBQUMsTUFBTSxZQUFZLGdCQUFnQixFQUN6QyxDQUFDO3dCQUNBLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUU7b0JBQ2xDLENBQUM7Z0JBQ0YsQ0FBQzthQUNEO1NBQ0QsQ0FDRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxFQTFIZ0IsRUFBRSxLQUFGLEVBQUUsUUEwSGxCO0FBR0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0lBRWpCLE1BQU0sQ0FBQyxHQUNQO1FBQ0MsS0FBSyxFQUFHLFVBQVU7UUFDbEIsS0FBSyxFQUNMO1lBQ0MsRUFBRSxJQUFJLEVBQUcsUUFBUSxFQUFFO1lBQ25CLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRTtZQUNuQixFQUFFLElBQUksRUFBRyxRQUFRLEVBQUU7WUFDbkIsRUFBRSxJQUFJLEVBQUcsU0FBUyxFQUFFO1lBQ3BCLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRTtZQUNqQixFQUFFLElBQUksRUFBRyxNQUFNLEVBQUU7WUFDakIsRUFBRSxJQUFJLEVBQUcsU0FBUyxFQUFFO1lBQ3BCLEVBQUUsSUFBSSxFQUFHLFFBQVEsRUFBRTtZQUNuQixFQUFFLElBQUksRUFBRyxRQUFRLEVBQUU7WUFDbkIsRUFBRSxJQUFJLEVBQUcsU0FBUyxFQUFFO1lBQ3BCLEVBQUUsSUFBSSxFQUFHLFVBQVUsRUFBRTtZQUNyQixFQUFFLElBQUksRUFBRyxPQUFPLEVBQUU7WUFDbEIsRUFBRSxJQUFJLEVBQUcsVUFBVSxFQUFFO1lBQ3JCLEVBQUUsSUFBSSxFQUFHLFdBQVcsRUFBRTtTQUN0QjtLQUNELENBQUM7SUFFRixHQUFHLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBRSxDQUFFLEVBQUcsTUFBTSxDQUFFLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBRUYsSUFBSSxFQUFFLENBQUUifQ==