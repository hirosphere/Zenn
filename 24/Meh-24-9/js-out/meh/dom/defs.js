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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxLQUFXLElBQUksQ0FpRXBCO0FBakVELFdBQWlCLElBQUk7SUFzQ3BCLE1BQWEsS0FBSztRQUVqQixnQkFBYyxDQUFDO1FBRUwsT0FBTyxHQUFvQixPQUFPLENBQUE7S0FDNUM7SUFMWSxVQUFLLFFBS2pCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUV6QixNQUFhLElBQUssU0FBUSxLQUFLO1FBRTlCLElBQVcsT0FBTyxDQUFHLE9BQWMsSUFBSSxDQUFDO0tBQ3hDO0lBSFksU0FBSSxPQUdoQixDQUFBO0lBRUQsTUFBYSxJQUFpQixTQUFRLEtBQUs7UUFJekI7UUFDQTtRQUhqQixZQUVpQixNQUFxQixFQUNyQixXQUE2QztZQUU1RCxLQUFLLEVBQUUsQ0FBQTtZQUhRLFdBQU0sR0FBTixNQUFNLENBQWU7WUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWtDO1FBRXBELENBQUM7S0FDWDtJQVJZLFNBQUksT0FRaEIsQ0FBQTtBQUtGLENBQUMsRUFqRWdCLElBQUksS0FBSixJQUFJLFFBaUVwQjtBQUVELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUVuQixNQUFtQixFQUNuQixXQUFrRCxFQUVoQyxFQUFFLENBQ3JCLENBQ0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFFLE1BQU0sRUFBRSxXQUFXLENBQUUsQ0FDcEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyJ9