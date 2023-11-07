import { Leaf } from "./leaf.js";
// Selector //
export class Selector {
    current = new Leaf(null);
    constructor() {
        this.current.ref((newitem, olditem) => this.update(newitem, olditem));
    }
    update(newitem, olditem) {
        if (olditem)
            olditem.selected.value = false;
        if (newitem)
            newitem.selected.value = true;
    }
}
(function (Selector) {
    class ItemBase {
        _value;
        constructor(_value) {
            this._value = _value;
        }
        selected = new Leaf.Boolean(false);
        get value() { return this._value; }
    }
    Selector.ItemBase = ItemBase;
})(Selector || (Selector = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFakMsY0FBYztBQUVkLE1BQU0sT0FBTyxRQUFRO0lBRUQsT0FBTyxHQUFHLElBQUksSUFBSSxDQUEwQyxJQUFJLENBQUUsQ0FBQztJQUV0RjtRQUVDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxPQUFPLEVBQUUsT0FBTyxDQUFFLENBQUUsQ0FBQztJQUM3RSxDQUFDO0lBRVMsTUFBTSxDQUFFLE9BQTRDLEVBQUUsT0FBOEM7UUFFN0csSUFBSSxPQUFPO1lBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksT0FBTztZQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUM3QyxDQUFDO0NBQ0Q7QUFFRCxXQUFpQixRQUFRO0lBUXhCLE1BQWEsUUFBUTtRQUVTO1FBQTdCLFlBQTZCLE1BQWM7WUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQUksQ0FBQztRQUVoQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBQ3JELElBQUksS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDM0M7SUFOWSxpQkFBUSxXQU1wQixDQUFBO0FBQ0YsQ0FBQyxFQWZnQixRQUFRLEtBQVIsUUFBUSxRQWV4QiJ9