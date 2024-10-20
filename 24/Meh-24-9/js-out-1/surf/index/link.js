import { ef } from "../../meh/index.js";
export const Block = (m) => {
    return ef.section({ class: "block" }, ef.h2(m.title), ef.ul(...m.parts.map(i => Item(i))));
};
// const Item = ( m : ms.item ) => <li><a target="blank" href="{ m.url }">{ m.title }</a></li>
const Item = (m) => {
    return ef.li(ef.a({
        attrs: {
            href: m.url,
            target: "_blank",
        }
    }, m.title));
};
const { li, a } = ef;
const Item2 = (m) => li(a({ attrs: { href: m.url, target: "_blank" } }), m.title);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9zdXJmL2luZGV4L2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLEVBQUUsRUFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRSxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBRSxDQUFZLEVBQUcsRUFBRTtJQUV2QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsS0FBSyxFQUFHLE9BQU8sRUFBRSxFQUNuQixFQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQyxLQUFLLENBQUUsRUFDaEIsRUFBRSxDQUFDLEVBQUUsQ0FFSixHQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQ2xDLENBQ0QsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLDhGQUE4RjtBQUU5RixNQUFNLElBQUksR0FBRyxDQUFFLENBQVcsRUFBRyxFQUFFO0lBRTlCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FFWCxFQUFFLENBQUMsQ0FBQyxDQUVIO1FBQ0MsS0FBSyxFQUNMO1lBQ0MsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHO1lBQ1gsTUFBTSxFQUFFLFFBQVE7U0FDaEI7S0FDRCxFQUNELENBQUMsQ0FBQyxLQUFLLENBQ1AsQ0FDRCxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUU7QUFFdEIsTUFBTSxLQUFLLEdBQUcsQ0FBRSxDQUFXLEVBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQyJ9