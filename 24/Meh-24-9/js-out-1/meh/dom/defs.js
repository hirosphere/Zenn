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
export class place {
    static each(source, create_node) {
        return new defs.Each(source, create_node);
    }
    static switch(sel, items, pre) {
        return new defs.Switch(sel, items, pre);
    }
}
export const pl = place;
export const each = place.each;
export const sw = place.switch;
export const free = () => new defs.Free();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxLQUFXLElBQUksQ0FxR3BCO0FBckdELFdBQWlCLElBQUk7SUEyRHBCLE1BQU07SUFFTixNQUFhLEtBQUs7UUFFakIsZ0JBQWMsQ0FBQztRQUVMLE9BQU8sR0FBWSxPQUFPLENBQUU7S0FDdEM7SUFMWSxVQUFLLFFBS2pCLENBQUE7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUV6QixNQUFhLElBQUssU0FBUSxLQUFLO1FBRTlCLElBQVcsT0FBTyxDQUFHLE9BQWMsSUFBSSxDQUFDO0tBQ3hDO0lBSFksU0FBSSxPQUdoQixDQUFBO0lBRUQsTUFBYSxNQUFhLFNBQVEsS0FBSztRQUlyQjtRQUNBO1FBQ0E7UUFKakIsWUFFaUIsUUFBMEIsRUFDMUIsS0FBNkUsRUFDN0UsR0FBWTtZQUczQixLQUFLLEVBQUUsQ0FBRTtZQUxNLGFBQVEsR0FBUixRQUFRLENBQWtCO1lBQzFCLFVBQUssR0FBTCxLQUFLLENBQXdFO1lBQzdFLFFBQUcsR0FBSCxHQUFHLENBQVM7UUFHbEIsQ0FBQztLQUNaO0lBVlksV0FBTSxTQVVsQixDQUFBO0lBRUQsTUFBYSxJQUFpQixTQUFRLEtBQUs7UUFJekI7UUFDQTtRQUhqQixZQUVpQixNQUFxQixFQUNyQixXQUE2QztZQUU1RCxLQUFLLEVBQUUsQ0FBQTtZQUhRLFdBQU0sR0FBTixNQUFNLENBQWU7WUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWtDO1FBRXBELENBQUM7S0FDWDtJQVJZLFNBQUksT0FRaEIsQ0FBQTtBQU1GLENBQUMsRUFyR2dCLElBQUksS0FBSixJQUFJLFFBcUdwQjtBQUdELE1BQU0sT0FBZ0IsS0FBSztJQUVuQixNQUFNLENBQUMsSUFBSSxDQUVqQixNQUFtQixFQUNuQixXQUFrRDtRQUlsRCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBRSxNQUFNLEVBQUUsV0FBVyxDQUFFLENBQUE7SUFDNUMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBRW5CLEdBQXFCLEVBQ3JCLEtBQTZFLEVBQzdFLEdBQVk7UUFHWixPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBUyxHQUFHLEVBQUcsS0FBSyxFQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQ3JELENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUU7QUFDekIsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUU7QUFDaEMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUU7QUFFaEMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIn0=