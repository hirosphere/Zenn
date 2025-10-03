export var pl;
(function (pl) {
    pl.flush = (key, createNode) => new PartsPlace.Flush(key, createNode);
    pl.each = (model, createNode) => new PartsPlace.Each(model, createNode);
})(pl || (pl = {}));
export class PartsPlace {
    #_typetag = plTag;
}
const plTag = Symbol();
(function (PartsPlace) {
    class Flush extends PartsPlace {
        key;
        createNode;
        constructor(key, createNode) {
            super();
            this.key = key;
            this.createNode = createNode;
        }
    }
    PartsPlace.Flush = Flush;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvTWVoL0RPTS9ERC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1RkEsTUFBTSxLQUFXLEVBQUUsQ0FlbEI7QUFmRCxXQUFpQixFQUFFO0lBRUwsUUFBSyxHQUFHLENBRXBCLEdBQWdCLEVBQ2hCLFVBQTRDLEVBRTNDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUcsR0FBRyxFQUFHLFVBQVUsQ0FBRSxDQUFBO0lBRWpDLE9BQUksR0FBRyxDQUVuQixLQUFrQixFQUNsQixVQUFnRCxFQUUvQyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFHLEtBQUssRUFBRyxVQUFVLENBQUUsQ0FBRTtBQUNsRCxDQUFDLEVBZmdCLEVBQUUsS0FBRixFQUFFLFFBZWxCO0FBRUQsTUFBTSxPQUFnQixVQUFVO0lBRS9CLFNBQVMsR0FBRyxLQUFLLENBQUU7Q0FDbkI7QUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUcsQ0FBRTtBQUV6QixXQUFpQixVQUFVO0lBRTFCLE1BQWEsS0FBWSxTQUFRLFVBQVU7UUFJekI7UUFDQTtRQUhqQixZQUVpQixHQUFnQixFQUNoQixVQUE0QztZQUUzRCxLQUFLLEVBQUcsQ0FBRTtZQUhLLFFBQUcsR0FBSCxHQUFHLENBQWE7WUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBa0M7UUFFaEQsQ0FBQztLQUNkO0lBUlksZ0JBQUssUUFRakIsQ0FBQTtJQUVELE1BQWEsSUFBVyxTQUFRLFVBQVU7UUFJeEI7UUFDQTtRQUhqQixZQUVpQixLQUFrQixFQUNsQixVQUF1RDtZQUV0RSxLQUFLLEVBQUcsQ0FBRTtZQUhLLFVBQUssR0FBTCxLQUFLLENBQWE7WUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBNkM7UUFFM0QsQ0FBQztLQUNkO0lBUlksZUFBSSxPQVFoQixDQUFBO0FBQ0YsQ0FBQyxFQXJCZ0IsVUFBVSxLQUFWLFVBQVUsUUFxQjFCIn0=