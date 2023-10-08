export class Lian extends Array {
    splice(start, deleteCount, ...items) {
        return super.splice(start, deleteCount, ...items);
    }
}
(function (Lian) {
    class Ref {
        source;
        constructor(source) {
            this.source = source;
        }
        add(start, count) { }
        ;
        remove(start, count) { }
    }
    Lian.Ref = Ref;
})(Lian || (Lian = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2b3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL21laC9tb2RlbC9saXZvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxPQUFPLElBQVcsU0FBUSxLQUFXO0lBRTFDLE1BQU0sQ0FBRSxLQUFhLEVBQUUsV0FBbUIsRUFBRSxHQUFHLEtBQVU7UUFFeEQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBSSxLQUFLLENBQUUsQ0FBQztJQUN0RCxDQUFDO0NBRUQ7QUFFRCxXQUFpQixJQUFJO0lBRXBCLE1BQXNCLEdBQUc7UUFFRDtRQUF2QixZQUF1QixNQUFtQjtZQUFuQixXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQUksQ0FBQztRQUMvQyxHQUFHLENBQUUsS0FBYyxFQUFFLEtBQWMsSUFBVyxDQUFDO1FBQUEsQ0FBQztRQUNoRCxNQUFNLENBQUUsS0FBYyxFQUFFLEtBQWMsSUFBVyxDQUFDO0tBQ2xEO0lBTHFCLFFBQUcsTUFLeEIsQ0FBQTtBQUNGLENBQUMsRUFSZ0IsSUFBSSxLQUFKLElBQUksUUFRcEIifQ==