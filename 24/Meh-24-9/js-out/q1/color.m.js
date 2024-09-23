import { Leaf, log } from "../meh/index.js";
export class HSL {
    constructor(i) {
        this.hue = new Leaf(i.hue, this);
        this.sat = new Leaf(i.sat, this);
        this.light = new Leaf(i.light, this);
    }
    hue;
    sat;
    light;
    update() {
        log("HSL", this.value);
    }
    get value() {
        return null ||
            {
                hue: this.hue.value,
                sat: this.sat.value,
                light: this.light.value
            };
    }
    term() {
        ;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IubS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9xMS9jb2xvci5tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFNUMsTUFBTSxPQUFPLEdBQUc7SUFFZixZQUFhLENBQWE7UUFFekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVlLEdBQUcsQ0FBQztJQUNKLEdBQUcsQ0FBQztJQUNKLEtBQUssQ0FBQztJQUVmLE1BQU07UUFFWixHQUFHLENBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBRWYsT0FBTyxJQUFJO1lBQ1g7Z0JBQ0MsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSztnQkFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSztnQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzthQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUVNLElBQUk7UUFFVixDQUFDO0lBQ0YsQ0FBQztDQUNEIn0=