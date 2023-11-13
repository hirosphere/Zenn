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
    constructor(buttons, container) {
        this.buttons = buttons;
        if (!container)
            return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvZ3JhemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE1BQU0sT0FBTyxNQUFNO0lBRUs7SUFBdkIsWUFBdUIsSUFBVztRQUFYLFNBQUksR0FBSixJQUFJLENBQU87UUFFakMsQ0FBQztJQUNGLENBQUM7SUFFTSxLQUFLO1FBRVgsQ0FBQztJQUNGLENBQUM7SUFFTSxJQUFJLENBQUUsTUFBZTtRQUUzQixPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7Q0FDRDtBQUVELE1BQU0sT0FBTyxZQUFZO0lBRUQ7SUFBdkIsWUFBdUIsT0FBZ0IsRUFBRSxTQUF5QjtRQUEzQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBRXRDLElBQUksQ0FBRSxTQUFTO1lBQUksT0FBTztRQUUxQixTQUFTLENBQUMsZ0JBQWdCLENBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUN2RCxTQUFTLENBQUMsZ0JBQWdCLENBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUNyRCxTQUFTLENBQUMsZ0JBQWdCLENBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQztRQUN0RCxTQUFTLENBQUMsZ0JBQWdCLENBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRVMsS0FBSyxDQUFFLEVBQWUsSUFDL0IsQ0FBQztJQUVRLElBQUksQ0FBRSxFQUFlO1FBRTlCLElBQUksQ0FBQyxRQUFRLENBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBRSxDQUFDO0lBQ2xDLENBQUM7SUFFUyxHQUFHLENBQUUsRUFBZSxJQUM3QixDQUFDO0lBRVEsUUFBUSxDQUFFLElBQWEsRUFBRSxFQUFlO1FBRWpELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFHLE9BQU8sSUFBSSxDQUFDO1FBRXpDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFFLEtBQUs7WUFBSSxPQUFPO1FBRXRCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUUsQ0FBQztRQUVwRSxDQUFDLEVBQUUsYUFBYSxDQUFFLElBQUksVUFBVSxDQUFFLElBQUksRUFDdEM7WUFDQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUcsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixHQUFJLEtBQUs7U0FDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRCJ9