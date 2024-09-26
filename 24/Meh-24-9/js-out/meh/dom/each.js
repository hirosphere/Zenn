export const each = (model, create_node) => {
    ;
};
export class Each {
    model;
    create_node;
    constructor(model, create_node) {
        this.model = model;
        this.create_node = create_node;
        if (model instanceof Array) {
            model.forEach(value => create_node(value));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2VhY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBRW5CLEtBQWtCLEVBQ2xCLFdBQXdDLEVBQ3ZDLEVBQUU7SUFFSCxDQUFDO0FBQ0YsQ0FBQyxDQUFBO0FBRUQsTUFBTSxPQUFPLElBQUk7SUFJTDtJQUNBO0lBSFgsWUFFVyxLQUFtQixFQUNuQixXQUF3QztRQUR4QyxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQUdsRCxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQzFCO1lBQ0MsS0FBSyxDQUFDLE9BQU8sQ0FFWixLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBRSxLQUFLLENBQUUsQ0FDN0IsQ0FBQztTQUNGO0lBQ0YsQ0FBQztDQUNEIn0=