import { ef } from "../../meh/index.js";
export const Block = (m) => {
    return ef.section({ class: "block" }, ef.h2(m.title), ef.ul(...m.parts.map(i => ef.li(i.title))));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9zdXJmL2luZGV4L2xpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLEVBQUUsRUFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRSxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBRSxDQUFZLEVBQUcsRUFBRTtJQUV2QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsS0FBSyxFQUFHLE9BQU8sRUFBRSxFQUNuQixFQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQyxLQUFLLENBQUUsRUFDaEIsRUFBRSxDQUFDLEVBQUUsQ0FFSixHQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUUsQ0FDekMsQ0FDRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=