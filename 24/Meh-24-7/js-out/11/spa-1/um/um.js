import { Exist, log } from "../../../meh/index.js";
import sampledata from "../m/sample-data.js";
export class Application extends Exist {
    constructor(com) {
        super(com);
        this.初期データを設定(sampledata);
    }
    車両注文リスト = [];
    初期データを設定(iv) {
        this.車両注文リスト = iv.map(iv => new 車両注文(this, iv));
    }
    号機工程情報を取得() {
        ;
    }
}
export class 車両注文 extends Exist {
    iv;
    constructor(com, iv) {
        super(com);
        this.iv = iv;
        log(iv);
    }
}
export class 号機ビュー extends Exist {
    app;
    号機Id;
    constructor(com, app, 号機Id) {
        super(com);
        this.app = app;
        this.号機Id = 号機Id;
    }
}
export class Tmpl extends Exist {
    constructor(com) {
        super(com);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvMTEvc3BhLTEvdW0vdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBYyxHQUFHLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUvRCxPQUFPLFVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8sV0FBWSxTQUFRLEtBQUs7SUFFckMsWUFFQyxHQUFXO1FBR1gsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBRSxVQUFVLENBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTyxHQUFhLEVBQUUsQ0FBQztJQUV2QixRQUFRLENBQUUsRUFBa0I7UUFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBRSxDQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELFNBQVM7UUFFUixDQUFDO0lBQ0YsQ0FBQztDQUNEO0FBR0QsTUFBTSxPQUFPLElBQUssU0FBUSxLQUFLO0lBS2I7SUFIakIsWUFFQyxHQUFXLEVBQ0ssRUFBZTtRQUcvQixLQUFLLENBQUUsR0FBRyxDQUFFLENBQUM7UUFIRyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBSS9CLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztJQUNYLENBQUM7Q0FDRDtBQUlELE1BQU0sT0FBTyxLQUFNLFNBQVEsS0FBSztJQUtYO0lBQ0g7SUFKakIsWUFFQyxHQUFXLEVBQ1EsR0FBaUIsRUFDcEIsSUFBaUI7UUFHakMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBSk0sUUFBRyxHQUFILEdBQUcsQ0FBYztRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBSWxDLENBQUM7Q0FDRDtBQUVELE1BQU0sT0FBTyxJQUFLLFNBQVEsS0FBSztJQUU5QixZQUVDLEdBQVc7UUFHWCxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0QifQ==