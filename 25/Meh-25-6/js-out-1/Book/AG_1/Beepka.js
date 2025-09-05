export class Beepka {
    constructor() {
        ;
    }
    /* */
    beep() {
        ;
    }
    /* */
    #_ac;
    get ac() {
        if (this.#_ac)
            return this.#_ac;
        return this.#_ac ??= new AudioContext();
    }
}
class Voix {
    ac;
    constructor(ac) {
        this.ac = ac;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVlcGthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svQUdfMS9CZWVwa2EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxPQUFPLE1BQU07SUFFbEI7UUFFQyxDQUFDO0lBQ0YsQ0FBQztJQUVELEtBQUs7SUFFRSxJQUFJO1FBRVYsQ0FBQztJQUNGLENBQUM7SUFHRCxLQUFLO0lBRUwsSUFBSSxDQUFtQjtJQUV2QixJQUFjLEVBQUU7UUFFZixJQUFLLElBQUksQ0FBQyxJQUFJO1lBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFFO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLFlBQVksRUFBRyxDQUFFO0lBQzNDLENBQUM7Q0FDRDtBQUVELE1BQU0sSUFBSTtJQUVlO0lBQXhCLFlBQXdCLEVBQWlCO1FBQWpCLE9BQUUsR0FBRixFQUFFLENBQWU7SUFDeEMsQ0FBQztDQUNGIn0=