export var pl;
(function (pl) {
    pl.free = () => new PartsPlace.Free();
    pl.each = (model, createNode) => new PartsPlace.Each(model, createNode);
})(pl || (pl = {}));
export class PartsPlace {
    #_typetag = plTag;
}
const plTag = Symbol();
(function (PartsPlace) {
    class Free extends PartsPlace {
        set contents(contents) {
            ;
        }
    }
    PartsPlace.Free = Free;
    class Each extends PartsPlace {
        model;
        createNode;
        constructor(model, createNode) {
            super();
            this.model = model;
            this.createNode = createNode;
        }
    }
    PartsPlace.Each = Each;
})(PartsPlace || (PartsPlace = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvTWVoL0RPTS9ERC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1RkEsTUFBTSxLQUFXLEVBQUUsQ0FTbEI7QUFURCxXQUFpQixFQUFFO0lBRUwsT0FBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRyxDQUFFO0lBQ3JDLE9BQUksR0FBRyxDQUVuQixLQUFtQixFQUNuQixVQUF5QyxFQUV4QyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFHLEtBQUssRUFBRyxVQUFVLENBQUUsQ0FBRTtBQUNsRCxDQUFDLEVBVGdCLEVBQUUsS0FBRixFQUFFLFFBU2xCO0FBRUQsTUFBTSxPQUFnQixVQUFVO0lBRS9CLFNBQVMsR0FBRyxLQUFLLENBQUU7Q0FDbkI7QUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUcsQ0FBRTtBQUV6QixXQUFpQixVQUFVO0lBRTFCLE1BQWEsSUFBTSxTQUFRLFVBQVU7UUFFcEMsSUFBSSxRQUFRLENBQUcsUUFBeUI7WUFFdkMsQ0FBQztRQUNGLENBQUM7S0FDRDtJQU5ZLGVBQUksT0FNaEIsQ0FBQTtJQUVELE1BQWEsSUFBWSxTQUFRLFVBQVU7UUFJekI7UUFDQTtRQUhqQixZQUVpQixLQUFtQixFQUNuQixVQUF5QztZQUV4RCxLQUFLLEVBQUcsQ0FBRTtZQUhLLFVBQUssR0FBTCxLQUFLLENBQWM7WUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBK0I7UUFFN0MsQ0FBQztLQUNkO0lBUlksZUFBSSxPQVFoQixDQUFBO0FBQ0YsQ0FBQyxFQW5CZ0IsVUFBVSxLQUFWLFVBQVUsUUFtQjFCIn0=