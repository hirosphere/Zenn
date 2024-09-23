import { Exist, Leafr } from "./index.js";
export class Selection extends Exist {
}
(function (Selection) {
    class Single extends Selection {
        current_item = new Leafr(this, null);
    }
    Selection.Single = Single;
    class Multiple extends Selection {
        current_items = new Set;
    }
    Selection.Multiple = Multiple;
})(Selection || (Selection = {}));
(function (Selection) {
    class Index extends Exist {
        p_states = new Map;
        states(selection, initv) {
            if (!this.p_states.has(selection)) {
                this.p_states.set(selection, new Leafr.Boolean(this, initv ?? false));
            }
            return this.p_states.get(selection);
        }
    }
    Selection.Index = Index;
})(Selection || (Selection = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFRLE1BQU0sWUFBWSxDQUFDO0FBR2hELE1BQU0sT0FBZ0IsU0FBVSxTQUFRLEtBQUs7Q0FBRztBQUVoRCxXQUFpQixTQUFTO0lBRXpCLE1BQWEsTUFBa0IsU0FBUSxTQUFTO1FBRTVCLFlBQVksR0FBRyxJQUFJLEtBQUssQ0FBK0IsSUFBSSxFQUFFLElBQUksQ0FBRSxDQUFDO0tBQ3ZGO0lBSFksZ0JBQU0sU0FHbEIsQ0FBQTtJQUVELE1BQWEsUUFBb0IsU0FBUSxTQUFTO1FBRTlCLGFBQWEsR0FBRyxJQUFJLEdBQXdCLENBQUM7S0FDaEU7SUFIWSxrQkFBUSxXQUdwQixDQUFBO0FBQ0YsQ0FBQyxFQVhnQixTQUFTLEtBQVQsU0FBUyxRQVd6QjtBQUVELFdBQWlCLFNBQVM7SUFFekIsTUFBYSxLQUFpQixTQUFRLEtBQUs7UUFFaEMsUUFBUSxHQUFHLElBQUksR0FBZ0MsQ0FBRTtRQUVwRCxNQUFNLENBQUUsU0FBcUIsRUFBRSxLQUFpQjtZQUV0RCxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLEVBQ3BDO2dCQUNDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLFNBQVMsRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUUsSUFBSSxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUUsQ0FBRSxDQUFDO2FBQzFFO1lBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxTQUFTLENBQUUsQ0FBQztRQUN2QyxDQUFDO0tBQ0Q7SUFiWSxlQUFLLFFBYWpCLENBQUE7QUFDRixDQUFDLEVBaEJnQixTQUFTLEtBQVQsU0FBUyxRQWdCekIifQ==