export var defs;
(function (defs) {
    //  //
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
    class Switch extends Place {
        constructor() { super(); }
    }
    defs.Switch = Switch;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxLQUFXLElBQUksQ0F1RnBCO0FBdkZELFdBQWlCLElBQUk7SUFtRHBCLE1BQU07SUFFTixNQUFhLEtBQUs7UUFFakIsZ0JBQWMsQ0FBQztRQUVMLE9BQU8sR0FBWSxPQUFPLENBQUE7S0FDcEM7SUFMWSxVQUFLLFFBS2pCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUV6QixNQUFhLElBQUssU0FBUSxLQUFLO1FBRTlCLElBQVcsT0FBTyxDQUFHLE9BQWMsSUFBSSxDQUFDO0tBQ3hDO0lBSFksU0FBSSxPQUdoQixDQUFBO0lBRUQsTUFBYSxNQUFPLFNBQVEsS0FBSztRQUVoQyxnQkFFRSxLQUFLLEVBQUUsQ0FBRSxDQUFDLENBQUM7S0FDYjtJQUxZLFdBQU0sU0FLbEIsQ0FBQTtJQUVELE1BQWEsSUFBaUIsU0FBUSxLQUFLO1FBSXpCO1FBQ0E7UUFIakIsWUFFaUIsTUFBcUIsRUFDckIsV0FBZ0Q7WUFFL0QsS0FBSyxFQUFFLENBQUE7WUFIUSxXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFxQztRQUV2RCxDQUFDO0tBQ1g7SUFSWSxTQUFJLE9BUWhCLENBQUE7QUFLRixDQUFDLEVBdkZnQixJQUFJLEtBQUosSUFBSSxRQXVGcEI7QUFFRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FFbkIsTUFBbUIsRUFDbkIsV0FBcUQsRUFFbkMsRUFBRSxDQUNyQixDQUNDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBRSxNQUFNLEVBQUUsV0FBVyxDQUFFLENBQ3BDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMifQ==