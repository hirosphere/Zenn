import { ksel } from "../../meh/index.js";
export class FocusDistributor {
    current = ksel(undefined);
}
export class Item {
    target;
    focus;
    defaultNode;
    constructor(target, focus, defaultNode) {
        this.target = target;
        this.focus = focus;
        this.defaultNode = defaultNode;
    }
    keypress = (ev) => {
        const next = this.target.next;
        if (!ev.shiftKey && !ev.ctrlKey && !ev.altKey) {
            switch (ev.code) {
                case "ArrowRight":
                    if (next)
                        this.focus.current.$ = next;
                    break;
                default: return;
            }
            if (ev.target instanceof Element)
                ev.target.scrollIntoView();
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvQm9vay9BRzIvZm9jdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFFO0FBR2xELE1BQU0sT0FBTyxnQkFBZ0I7SUFFckIsT0FBTyxHQUFHLElBQUksQ0FBc0IsU0FBUyxDQUFFLENBQUU7Q0FFeEQ7QUFFRCxNQUFNLE9BQU8sSUFBSTtJQUlSO0lBQ0c7SUFDQTtJQUpYLFlBRVEsTUFBVSxFQUNQLEtBQWtCLEVBQ2xCLFdBQWU7UUFGbEIsV0FBTSxHQUFOLE1BQU0sQ0FBSTtRQUNQLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDbEIsZ0JBQVcsR0FBWCxXQUFXLENBQUk7SUFFekIsQ0FBQztJQUVLLFFBQVEsR0FBRyxDQUFFLEVBQWtCLEVBQVUsRUFBRTtRQUVqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRTtRQUUvQixJQUFLLENBQUUsRUFBRSxDQUFDLFFBQVEsSUFBSSxDQUFFLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBRSxFQUFFLENBQUMsTUFBTSxFQUNqRCxDQUFDO1lBQ0EsUUFBUyxFQUFFLENBQUMsSUFBSSxFQUNoQixDQUFDO2dCQUNBLEtBQUssWUFBWTtvQkFDaEIsSUFBSyxJQUFJO3dCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUU7b0JBQ3pDLE1BQU87Z0JBRVIsT0FBUSxDQUFDLENBQUMsT0FBUTtZQUNuQixDQUFDO1lBRUQsSUFBSyxFQUFFLENBQUMsTUFBTSxZQUFZLE9BQU87Z0JBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUcsQ0FBRTtRQUNsRSxDQUFDO0lBQ0YsQ0FBQyxDQUFBO0NBQ0QifQ==