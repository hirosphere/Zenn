export var defs;
(function (defs) {
    /** Text */
    /**  Part */
    class Each {
        source;
        create;
        constructor(source, create) {
            this.source = source;
            this.create = create;
        }
    }
    defs.Each = Each;
    /** エレメント定義 */
    class Element {
        ns;
        type;
        chars;
        parts;
        constructor(ns, type, chars, parts) {
            this.ns = ns;
            this.type = type;
            this.chars = chars;
            this.parts = parts;
        }
    }
    defs.Element = Element;
})(defs || (defs = {}));
export const each = (source, create) => new defs.Each(source, create);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBLE1BQU0sS0FBVyxJQUFJLENBc0VwQjtBQXRFRCxXQUFpQixJQUFJO0lBRXBCLFdBQVc7SUFJWCxZQUFZO0lBRVosTUFBYSxJQUFJO1FBSVI7UUFDQTtRQUhSLFlBRVEsTUFBb0IsRUFDcEIsTUFBOEI7WUFEOUIsV0FBTSxHQUFOLE1BQU0sQ0FBYztZQUNwQixXQUFNLEdBQU4sTUFBTSxDQUF3QjtRQUNwQyxDQUFDO0tBQ0g7SUFQWSxTQUFJLE9BT2hCLENBQUE7SUF1Q0QsY0FBYztJQUVkLE1BQWEsT0FBTztRQUlYO1FBQ0E7UUFDQTtRQUNBO1FBTFIsWUFFUSxFQUFXLEVBQ1gsSUFBYSxFQUNiLEtBQXFCLEVBQ3JCLEtBQWlCO1lBSGpCLE9BQUUsR0FBRixFQUFFLENBQVM7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFTO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7WUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUN0QixDQUFDO0tBQ0o7SUFUWSxZQUFPLFVBU25CLENBQUE7QUFLRixDQUFDLEVBdEVnQixJQUFJLEtBQUosSUFBSSxRQXNFcEI7QUFFRCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FFbkIsTUFBb0IsRUFDcEIsTUFBbUMsRUFFbEMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBUyxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUMifQ==