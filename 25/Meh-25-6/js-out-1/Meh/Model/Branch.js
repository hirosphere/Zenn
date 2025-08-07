import { State, Leaf } from "./State.js";
import { getValue, setValue, notify, updateComposite } from "./Symbol.js";
const log = console.log;
export function Branch() {
    return Branch.Imp;
}
(function (Branch) {
    class Imp extends State {
        constructor(newV, composite) {
            super(composite);
            for (const [prop, value] of Object.entries(newV)) {
                if (this[prop] !== undefined)
                    continue;
                this[prop] =
                    (typeof value == "object" ?
                        new Imp(value, this) :
                        new Leaf(value, this));
            }
        }
        /* 非公開 */
        [getValue]() {
            return Object.fromEntries(Object.entries(this).map(([prop, state]) => [prop, state.$]));
        }
        [setValue](newV) {
            for (const [prop, state] of Object.entries(this)) {
                state instanceof State && state[setValue](newV[prop], true);
            }
            this[updateComposite]();
        }
        [updateComposite]() {
            this[notify]();
        }
    }
    Branch.Imp = Imp;
})(Branch || (Branch = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJhbmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL01laC9Nb2RlbC9CcmFuY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRyxJQUFJLEVBQUUsTUFBTSxZQUFZLENBQUU7QUFFM0MsT0FBTyxFQUFtQixRQUFRLEVBQUcsUUFBUSxFQUFHLE1BQU0sRUFBRyxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUU7QUFDL0YsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBRTtBQWN6QixNQUFNLFVBQVUsTUFBTTtJQUVyQixPQUFPLE1BQU0sQ0FBQyxHQUFVLENBQUU7QUFDM0IsQ0FBQztBQUdELFdBQWlCLE1BQU07SUFPdEIsTUFBYSxHQUF5QixTQUFRLEtBQVc7UUFFeEQsWUFBYyxJQUFRLEVBQUcsU0FBdUI7WUFFL0MsS0FBSyxDQUFHLFNBQVMsQ0FBRSxDQUFFO1lBRXJCLEtBQU0sTUFBTSxDQUFFLElBQUksRUFBRyxLQUFLLENBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxFQUN0RCxDQUFDO2dCQUNBLElBQU8sSUFBYSxDQUFHLElBQUksQ0FBRSxLQUFLLFNBQVM7b0JBQUcsU0FBVTtnQkFFdEQsSUFBYSxDQUFHLElBQUksQ0FBRTtvQkFDeEIsQ0FDQyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQzt3QkFDekIsSUFBSSxHQUFHLENBQUcsS0FBSyxFQUFHLElBQUksQ0FBRSxDQUFDLENBQUM7d0JBQzFCLElBQUksSUFBSSxDQUFHLEtBQUssRUFBRyxJQUFJLENBQUUsQ0FDMUIsQ0FBRTtZQUNKLENBQUM7UUFDRixDQUFDO1FBR0QsU0FBUztRQUVPLENBQUUsUUFBUSxDQUFFO1lBRTNCLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FFeEIsTUFBTSxDQUFDLE9BQU8sQ0FBRyxJQUFJLENBQUUsQ0FBQyxHQUFHLENBRTFCLENBQUUsQ0FBRSxJQUFJLEVBQUcsS0FBSyxDQUFFLEVBQUcsRUFBRSxDQUFDLENBQUUsSUFBSSxFQUFHLEtBQUssQ0FBQyxDQUFDLENBQUUsQ0FDMUMsQ0FDSSxDQUFFO1FBQ1QsQ0FBQztRQUVlLENBQUUsUUFBUSxDQUFFLENBQUcsSUFBUTtZQUV0QyxLQUFNLE1BQU0sQ0FBRSxJQUFJLEVBQUcsS0FBSyxDQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBRyxJQUFJLENBQUUsRUFDdkQsQ0FBQztnQkFDQSxLQUFLLFlBQVksS0FBSyxJQUFJLEtBQUssQ0FBRyxRQUFRLENBQUUsQ0FFekMsSUFBYSxDQUFHLElBQUksQ0FBRSxFQUN4QixJQUFJLENBQ0osQ0FBRTtZQUNKLENBQUM7WUFFRCxJQUFJLENBQUcsZUFBZSxDQUFFLEVBQUcsQ0FBRTtRQUM5QixDQUFDO1FBRUQsQ0FBRSxlQUFlLENBQUU7WUFFbEIsSUFBSSxDQUFHLE1BQU0sQ0FBRSxFQUFHLENBQUU7UUFDckIsQ0FBQztLQUNEO0lBbkRZLFVBQUcsTUFtRGYsQ0FBQTtBQUNGLENBQUMsRUEzRGdCLE1BQU0sS0FBTixNQUFNLFFBMkR0QiJ9