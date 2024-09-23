import { ef } from "../../meh/index.js";
export const App = (model) => {
    return ef.main(ef.h1("Poke Search V-1.1"), InputBox(model.search), PokeList(model));
};
const InputBox = (search) => {
    return ef.div({
        class: "searchbox wrapper"
    }, ef.input({
        class: "input",
        props: {
            value: search
        },
        acts: {
            input(ev) {
                if (!(ev.target instanceof HTMLInputElement))
                    return;
                search.value = ev.target.value;
            }
        }
    }));
};
const PokeList = (app) => {
    return ef.div({ class: "pokemonList" }, ...Array.from(app.items, (model) => Item(model)));
};
const Item = (model) => {
    return ef.div({ class: "item" }, ef.div({ class: "id" }, model.id), ef.div(ef.span(model.一致前, ef.mark(model.一致), model.一致後)), ef.div(model.ja));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy8xMS9wb2tlLXNlYXJjaC92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUSxFQUFFLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFJL0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUUsS0FBa0IsRUFBRyxFQUFFO0lBRTNDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FFYixFQUFFLENBQUMsRUFBRSxDQUFFLG1CQUFtQixDQUFFLEVBQzVCLFFBQVEsQ0FBRSxLQUFLLENBQUMsTUFBTSxDQUFFLEVBQ3hCLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FDakIsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLENBQUUsTUFBb0IsRUFBRSxFQUFFO0lBRTFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FFWjtRQUNDLEtBQUssRUFBRSxtQkFBbUI7S0FDMUIsRUFDRCxFQUFFLENBQUMsS0FBSyxDQUVQO1FBQ0MsS0FBSyxFQUFFLE9BQU87UUFDZCxLQUFLLEVBQ0w7WUFDQyxLQUFLLEVBQUUsTUFBTTtTQUNiO1FBQ0QsSUFBSSxFQUNKO1lBQ0MsS0FBSyxDQUFFLEVBQVU7Z0JBRWhCLElBQUksQ0FBRSxDQUFFLEVBQUUsQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLENBQUU7b0JBQUcsT0FBTztnQkFDekQsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxDQUFDO1NBQ0Q7S0FDRCxDQUNELENBQ0QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHLENBQUUsR0FBZ0IsRUFBRyxFQUFFO0lBRXZDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FFWixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDeEIsR0FBSSxLQUFLLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUcsRUFBRSxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBRSxDQUN2RCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUcsQ0FBRSxLQUFrQixFQUFHLEVBQUU7SUFFckMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUVaLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUVqQixFQUFFLENBQUMsR0FBRyxDQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUUsRUFDbkMsRUFBRSxDQUFDLEdBQUcsQ0FFTCxFQUFFLENBQUMsSUFBSSxDQUVOLEtBQUssQ0FBQyxHQUFHLEVBQ1QsRUFBRSxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUMsRUFBRSxDQUFFLEVBQ25CLEtBQUssQ0FBQyxHQUFHLENBQ1QsQ0FDRCxFQUNELEVBQUUsQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBRSxDQUVsQixDQUFBO0FBQ0YsQ0FBQyxDQUFDIn0=