import { ToString } from "../model/leaf.js";
export var defs;
(function (defs) {
    const e = { isElement: true, type: "a" };
    class LianParts {
        source;
        create;
        constructor(source, create) {
            this.source = source;
            this.create = create;
        }
    }
    defs.LianParts = LianParts;
    defs.lp = (source, create) => {
        return new LianParts(source, create);
    };
    //  //
    defs.createElement = (type, first, ...rest) => {
        if (typeof first == "object") {
            if (!("isElement" in first || first instanceof ToString)) // ! isPart
             {
                return {
                    isElement: true,
                    type,
                    ...first,
                    parts: rest
                };
            }
        }
        return {
            isElement: true,
            type,
            parts: first ? [first, ...rest] : undefined
        };
    };
})(defs || (defs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFRLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2xELE1BQU0sS0FBVyxJQUFJLENBc0hwQjtBQXRIRCxXQUFpQixJQUFJO0lBNkJwQixNQUFNLENBQUMsR0FBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBOENuRCxNQUFhLFNBQVM7UUFJYjtRQUNBO1FBSFIsWUFFUSxNQUFzQixFQUN0QixNQUFtQztZQURuQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUN0QixXQUFNLEdBQU4sTUFBTSxDQUE2QjtRQUN6QyxDQUFDO0tBQ0g7SUFQWSxjQUFTLFlBT3JCLENBQUE7SUFFWSxPQUFFLEdBQUcsQ0FBaUIsTUFBc0IsRUFBRSxNQUFtQyxFQUFHLEVBQUU7UUFFbEcsT0FBTyxJQUFJLFNBQVMsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0lBT0YsTUFBTTtJQUVPLGtCQUFhLEdBQUcsQ0FBRSxJQUFhLEVBQUUsS0FBNEIsRUFBRSxHQUFJLElBQWMsRUFBYSxFQUFFO1FBRTVHLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUM1QjtZQUNDLElBQUksQ0FBRSxDQUFFLFdBQVcsSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZLFFBQVEsQ0FBRSxFQUFJLFdBQVc7YUFDMUU7Z0JBRUMsT0FBTztvQkFDTixTQUFTLEVBQUUsSUFBSTtvQkFDZixJQUFJO29CQUNKLEdBQUksS0FBSztvQkFDVCxLQUFLLEVBQUUsSUFBSTtpQkFDWCxDQUFDO2FBQ0Y7U0FDRDtRQUVELE9BQU87WUFDTixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUk7WUFDSixLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQzdDLENBQUM7SUFDSCxDQUFDLENBQUE7QUFDRixDQUFDLEVBdEhnQixJQUFJLEtBQUosSUFBSSxRQXNIcEIifQ==