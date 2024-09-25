import * as nodet from "./nodet.js";
export class PartsColl {
    constructor(ce, df, def, start = 0) {
        this.expand(ce, df, def);
    }
    expand(ce, df, def) {
        for (const part of def) {
            if (part instanceof nodet.Nodet) {
                part.node && df.appendChild(part.node);
            }
            else if (part instanceof Node) {
                df.appendChild(part);
            }
            else {
                const n = new nodet.Text(part);
                n.node && df.appendChild(n.node);
            }
        }
    }
    destruct() {
        ;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUVwQyxNQUFNLE9BQU8sU0FBUztJQUVyQixZQUVDLEVBQVksRUFDWixFQUFxQixFQUNyQixHQUFrQixFQUNsQixRQUFpQixDQUFDO1FBR2xCLElBQUksQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUUsQ0FBQztJQUM1QixDQUFDO0lBRVMsTUFBTSxDQUVmLEVBQXdCLEVBQ3hCLEVBQXFCLEVBQ3JCLEdBQWtCO1FBR2xCLEtBQUssTUFBTSxJQUFJLElBQUksR0FBRyxFQUN0QjtZQUNDLElBQUksSUFBSSxZQUFZLEtBQUssQ0FBQyxLQUFLLEVBQy9CO2dCQUNDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7YUFDekM7aUJBRUksSUFBSSxJQUFJLFlBQVksSUFBSSxFQUM3QjtnQkFDQyxFQUFFLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBRSxDQUFDO2FBQ3ZCO2lCQUdEO2dCQUNDLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQzthQUNuQztTQUNEO0lBQ0YsQ0FBQztJQUVNLFFBQVE7UUFFZCxDQUFDO0lBQ0YsQ0FBQztDQUNEIn0=