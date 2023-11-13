export class Grazer {
    args;
    constructor(args) {
        this.args = args;
        ;
    }
    start() {
        ;
    }
    move(option) {
        return false;
    }
}
export class TouchToMouse {
    buttons;
    constructor(container, buttons) {
        this.buttons = buttons;
        container.addEventListener("touchstart", this.start);
        container.addEventListener("touchmove", this.move);
        container.addEventListener("touchcancel", this.end);
        container.addEventListener("touchend", this.end);
    }
    start(ev) { }
    move(ev) {
        this.dispatch("mousemove", ev);
    }
    end(ev) { }
    dispatch(type, ev) {
        if (ev.touches.length != 1)
            return null;
        const touch = ev.touches[0];
        if (!touch)
            return;
        const e = document.elementFromPoint(touch.clientX, touch.clientY);
        e?.dispatchEvent(new MouseEvent(type, {
            cancelable: true,
            bubbles: true,
            buttons: this.buttons,
            ...touch
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvZ3JhemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE1BQU0sT0FBTyxNQUFNO0lBRUs7SUFBdkIsWUFBdUIsSUFBVztRQUFYLFNBQUksR0FBSixJQUFJLENBQU87UUFFakMsQ0FBQztJQUNGLENBQUM7SUFFTSxLQUFLO1FBRVgsQ0FBQztJQUNGLENBQUM7SUFFTSxJQUFJLENBQUUsTUFBZTtRQUUzQixPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7Q0FDRDtBQUVELE1BQU0sT0FBTyxZQUFZO0lBRXdCO0lBQWhELFlBQWEsU0FBdUIsRUFBWSxPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBRS9ELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBQ3ZELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQ3JELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQ3RELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO0lBQ3BELENBQUM7SUFFUyxLQUFLLENBQUUsRUFBZSxJQUMvQixDQUFDO0lBRVEsSUFBSSxDQUFFLEVBQWU7UUFFOUIsSUFBSSxDQUFDLFFBQVEsQ0FBRSxXQUFXLEVBQUUsRUFBRSxDQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVTLEdBQUcsQ0FBRSxFQUFlLElBQzdCLENBQUM7SUFFUSxRQUFRLENBQUUsSUFBYSxFQUFFLEVBQWU7UUFFakQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUcsT0FBTyxJQUFJLENBQUM7UUFFekMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUM5QixJQUFJLENBQUUsS0FBSztZQUFJLE9BQU87UUFFdEIsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBRXBFLENBQUMsRUFBRSxhQUFhLENBQUUsSUFBSSxVQUFVLENBQUUsSUFBSSxFQUN0QztZQUNDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRyxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEdBQUksS0FBSztTQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNEIn0=