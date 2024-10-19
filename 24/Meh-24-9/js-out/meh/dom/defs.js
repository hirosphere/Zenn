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
export const each = (source, create_node) => (new defs.Each(source, create_node));
export const free = () => new defs.Free();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxLQUFXLElBQUksQ0FvRXBCO0FBcEVELFdBQWlCLElBQUk7SUF5Q3BCLE1BQWEsS0FBSztRQUVqQixnQkFBYyxDQUFDO1FBRUwsT0FBTyxHQUFZLE9BQU8sQ0FBQTtLQUNwQztJQUxZLFVBQUssUUFLakIsQ0FBQTtJQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBRXpCLE1BQWEsSUFBSyxTQUFRLEtBQUs7UUFFOUIsSUFBVyxPQUFPLENBQUcsT0FBYyxJQUFJLENBQUM7S0FDeEM7SUFIWSxTQUFJLE9BR2hCLENBQUE7SUFFRCxNQUFhLElBQWlCLFNBQVEsS0FBSztRQUl6QjtRQUNBO1FBSGpCLFlBRWlCLE1BQXFCLEVBQ3JCLFdBQTZDO1lBRTVELEtBQUssRUFBRSxDQUFBO1lBSFEsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0M7UUFFcEQsQ0FBQztLQUNYO0lBUlksU0FBSSxPQVFoQixDQUFBO0FBS0YsQ0FBQyxFQXBFZ0IsSUFBSSxLQUFKLElBQUksUUFvRXBCO0FBRUQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBRW5CLE1BQW1CLEVBQ25CLFdBQWtELEVBRWhDLEVBQUUsQ0FDckIsQ0FDQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBRSxDQUNwQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIn0=