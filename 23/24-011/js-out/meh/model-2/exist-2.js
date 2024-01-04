class Container {
}
class Exist {
    container;
    constructor(container) {
        this.container = container;
    }
}
class Lian extends Container {
    terminate() {
        ;
    }
}
class Branch extends Container {
    terminate() {
    }
}
class Leaf extends Exist {
    constructor(container) {
        super(container);
    }
    terminate() {
        ;
    }
}
export const root = new Lian();
/** 応用例 */
{
    const lian = new Lian();
    class HSLColor extends Branch {
        hue;
        constructor() {
            super();
            this.hue = new Leaf(this);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3QtMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwtMi9leGlzdC0yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQWUsU0FBUztDQUd2QjtBQUVELE1BQWUsS0FBSztJQUVVO0lBQTdCLFlBQTZCLFNBQXFCO1FBQXJCLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDakQsQ0FBQztDQUdGO0FBRUQsTUFBTSxJQUFLLFNBQVEsU0FBUztJQUVsQixTQUFTO1FBRWpCLENBQUM7SUFDRixDQUFDO0NBQ0Q7QUFFRCxNQUFNLE1BQU8sU0FBUSxTQUFTO0lBRXBCLFNBQVM7SUFHbEIsQ0FBQztDQUNEO0FBRUQsTUFBTSxJQUFXLFNBQVEsS0FBSztJQUU3QixZQUFhLFNBQXFCO1FBRWpDLEtBQUssQ0FBRSxTQUFTLENBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVEsU0FBUztRQUVqQixDQUFDO0lBQ0YsQ0FBQztDQUNEO0FBRUQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFFL0IsVUFBVTtBQUVWO0lBQ0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUV4QixNQUFNLFFBQVMsU0FBUSxNQUFNO1FBRVosR0FBRyxDQUFFO1FBRXJCO1lBRUMsS0FBSyxFQUFFLENBQUM7WUFFUixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUssSUFBSSxDQUFjLElBQUksQ0FBRSxDQUFDO1FBQzFDLENBQUM7S0FDRDtDQUNEIn0=