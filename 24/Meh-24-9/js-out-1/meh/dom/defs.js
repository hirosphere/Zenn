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
        selector;
        items;
        pre;
        constructor(selector, items, pre) {
            super();
            this.selector = selector;
            this.items = items;
            this.pre = pre;
        }
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
class place {
    static each = (source, create_node) => (new defs.Each(source, create_node));
    static switch(sel, items, pre) {
        return new defs.Switch(sel, items, pre);
    }
}
export { place };
export const pl = place;
export const each = place.each;
export const free = () => new defs.Free();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxLQUFXLElBQUksQ0EwRnBCO0FBMUZELFdBQWlCLElBQUk7SUFnRHBCLE1BQU07SUFFTixNQUFhLEtBQUs7UUFFakIsZ0JBQWMsQ0FBQztRQUVMLE9BQU8sR0FBWSxPQUFPLENBQUE7S0FDcEM7SUFMWSxVQUFLLFFBS2pCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUV6QixNQUFhLElBQUssU0FBUSxLQUFLO1FBRTlCLElBQVcsT0FBTyxDQUFHLE9BQWMsSUFBSSxDQUFDO0tBQ3hDO0lBSFksU0FBSSxPQUdoQixDQUFBO0lBRUQsTUFBYSxNQUFhLFNBQVEsS0FBSztRQUlyQjtRQUNBO1FBQ0E7UUFKakIsWUFFaUIsUUFBMkMsRUFDM0MsS0FBaUUsRUFDakUsR0FBWTtZQUczQixLQUFLLEVBQUUsQ0FBRTtZQUxNLGFBQVEsR0FBUixRQUFRLENBQW1DO1lBQzNDLFVBQUssR0FBTCxLQUFLLENBQTREO1lBQ2pFLFFBQUcsR0FBSCxHQUFHLENBQVM7UUFHbEIsQ0FBQztLQUNaO0lBVlksV0FBTSxTQVVsQixDQUFBO0lBRUQsTUFBYSxJQUFpQixTQUFRLEtBQUs7UUFJekI7UUFDQTtRQUhqQixZQUVpQixNQUFxQixFQUNyQixXQUFnRDtZQUUvRCxLQUFLLEVBQUUsQ0FBQTtZQUhRLFdBQU0sR0FBTixNQUFNLENBQWU7WUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQXFDO1FBRXZELENBQUM7S0FDWDtJQVJZLFNBQUksT0FRaEIsQ0FBQTtBQU1GLENBQUMsRUExRmdCLElBQUksS0FBSixJQUFJLFFBMEZwQjtBQUVELE1BQXNCLEtBQUs7SUFFbkIsTUFBTSxDQUFDLElBQUksR0FBRyxDQUVwQixNQUFtQixFQUNuQixXQUFxRCxFQUVuQyxFQUFFLENBQ3JCLENBQ0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFFLE1BQU0sRUFBRSxXQUFXLENBQUUsQ0FDcEMsQ0FBQztJQUVLLE1BQU0sQ0FBQyxNQUFNLENBRW5CLEdBQXNDLEVBQ3RDLEtBQWlFLEVBQ2pFLEdBQVk7UUFHWixPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBUyxHQUFHLEVBQUcsS0FBSyxFQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQ3JELENBQUM7O1NBcEJvQixLQUFLO0FBdUIzQixNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFFO0FBQ3pCLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFFO0FBRWhDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyJ9