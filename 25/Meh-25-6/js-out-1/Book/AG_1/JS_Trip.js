"use strict";
var Live;
(function (Live) {
    class Entity {
        #_value;
        constructor(value) {
            this.#_value = value;
        }
        get $() {
            return this.#_value;
        }
    }
    Live.Entity = Entity;
    class Number extends Entity {
    }
    Live.Number = Number;
    {
    }
    Live.Branch = (ctors) => {
        return class Branch {
            get $() { return {}; }
        };
    };
})(Live || (Live = {}));
class ExNumber extends Live.Number {
}
class XY extends Live.Branch({ x: ExNumber }) {
    op() {
        this.$;
    }
}
/*

    * Object
        * フィールド存在の担保


 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlNfVHJpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzEvSlNfVHJpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsSUFBVSxJQUFJLENBdUNiO0FBdkNELFdBQVUsSUFBSTtJQUViLE1BQWEsTUFBTTtRQUVsQixPQUFPLENBQU07UUFFYixZQUFjLEtBQVM7WUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUU7UUFDdkIsQ0FBQztRQUVELElBQVcsQ0FBQztZQUVYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBRTtRQUN0QixDQUFDO0tBQ0Q7SUFiWSxXQUFNLFNBYWxCLENBQUE7SUFFRCxNQUFhLE1BQU8sU0FBUSxNQUFpQjtLQUMzQztJQURXLFdBQU0sU0FDakIsQ0FBQTtJQUdGLENBQUM7SUFDRCxDQUFDO0lBRVksV0FBTSxHQUFHLENBQXVCLEtBQXVCLEVBQTRCLEVBQUU7UUFFakcsT0FBTyxNQUFNLE1BQU07WUFFbEIsSUFBVyxDQUFDLEtBQVUsT0FBTyxFQUFPLENBQUUsQ0FBQyxDQUFDO1NBQ3hDLENBQUE7SUFDRixDQUFDLENBQUE7QUFTRixDQUFDLEVBdkNTLElBQUksS0FBSixJQUFJLFFBdUNiO0FBRUQsTUFBTSxRQUFTLFNBQVEsSUFBSSxDQUFDLE1BQU07Q0FBRztBQUdyQyxNQUFNLEVBQUcsU0FBUSxJQUFJLENBQUMsTUFBTSxDQUFVLEVBQUUsQ0FBQyxFQUFHLFFBQVEsRUFBRSxDQUFFO0lBRXZELEVBQUU7UUFFRCxJQUFJLENBQUMsQ0FBQyxDQUFFO0lBQ1QsQ0FBQztDQUNEO0FBVUQ7Ozs7OztHQU1HIn0=