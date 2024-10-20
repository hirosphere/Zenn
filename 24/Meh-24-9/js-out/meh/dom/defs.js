import { Leafr } from "../model/index.js";
export var defs;
(function (defs) {
    class Place {
        constructor() { }
        isplace = isplace;
    }
    defs.Place = Place;
    const isplace = Symbol();
    class Free extends Place {
        set content(content) { }
    }
    defs.Free = Free;
    class Each extends Place {
        source;
        create_node;
        constructor(source, create_node) {
            super();
            this.source = source;
            this.create_node = create_node;
        }
    }
    defs.Each = Each;
})(defs || (defs = {}));
const x = Leafr.bool.new(true);
export const each = (source, create_node) => (new defs.Each(source, create_node));
export const free = () => new defs.Free();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEtBQUssRUFBcUIsTUFBTSxtQkFBbUIsQ0FBQztBQUc3RCxNQUFNLEtBQVcsSUFBSSxDQXVFcEI7QUF2RUQsV0FBaUIsSUFBSTtJQTRDcEIsTUFBYSxLQUFLO1FBRWpCLGdCQUFjLENBQUM7UUFFTCxPQUFPLEdBQVksT0FBTyxDQUFBO0tBQ3BDO0lBTFksVUFBSyxRQUtqQixDQUFBO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFFekIsTUFBYSxJQUFLLFNBQVEsS0FBSztRQUU5QixJQUFXLE9BQU8sQ0FBRyxPQUFjLElBQUksQ0FBQztLQUN4QztJQUhZLFNBQUksT0FHaEIsQ0FBQTtJQUVELE1BQWEsSUFBaUIsU0FBUSxLQUFLO1FBSXpCO1FBQ0E7UUFIakIsWUFFaUIsTUFBcUIsRUFDckIsV0FBNkM7WUFFNUQsS0FBSyxFQUFFLENBQUE7WUFIUSxXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQztRQUVwRCxDQUFDO0tBQ1g7SUFSWSxTQUFJLE9BUWhCLENBQUE7QUFLRixDQUFDLEVBdkVnQixJQUFJLEtBQUosSUFBSSxRQXVFcEI7QUFFRCxNQUFNLENBQUMsR0FBZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsSUFBSSxDQUFFLENBQUM7QUFFL0MsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBRW5CLE1BQW1CLEVBQ25CLFdBQWtELEVBRWhDLEVBQUUsQ0FDckIsQ0FDQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBRSxDQUNwQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIn0=