import { Nodet } from "./nodet.js";
export class Parts {
    constructor(def, df) {
        for (const part of def) {
            if (part instanceof Nodet) {
                part.node && df.appendChild(part.node);
            }
            else if (part instanceof Node) {
                df.appendChild(part);
            }
            else {
                const n = new Nodet({ text: part });
                n.node && df.appendChild(n.node);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9wYXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE1BQU0sT0FBTyxLQUFLO0lBRWpCLFlBQWEsR0FBa0IsRUFBRSxFQUFxQjtRQUVyRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEdBQUcsRUFDdEI7WUFDQyxJQUFJLElBQUksWUFBWSxLQUFLLEVBQ3pCO2dCQUNDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7YUFDekM7aUJBRUksSUFBSSxJQUFJLFlBQVksSUFBSSxFQUM3QjtnQkFDQyxFQUFFLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBRSxDQUFDO2FBQ3ZCO2lCQUdEO2dCQUNDLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUM7YUFDbkM7U0FDRDtJQUNGLENBQUM7Q0FDRCJ9