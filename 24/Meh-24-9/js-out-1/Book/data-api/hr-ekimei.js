export var HeartRails;
(function (HeartRails) {
    //   areas      https://express.heartrails.com/api/json?method=getAreas
    //   prefs      https://express.heartrails.com/api/json?method=getPrefectures&area=関東
    //   lines      https://express.heartrails.com/api/json?method=getLines&prefecture=埼玉県
    //   stations   https://express.heartrails.com/api/json?method=getStations&line=東武伊勢崎線
    const url = "https://express.heartrails.com/api/json?";
    HeartRails.get_stations = async (name) => {
        const res = await fetch_data("getStations&line=" + encodeURIComponent(name));
        return res ? res.response.station : [];
    };
    const fetch_data = async (query) => {
        const url = "https://express.heartrails.com/api/json?method=" + query;
        const res = await fetch(url);
        if (res.ok) {
            return await (await res.json());
        }
    };
})(HeartRails || (HeartRails = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHItZWtpbWVpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL0Jvb2svZGF0YS1hcGkvaHItZWtpbWVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sS0FBVyxVQUFVLENBOEMxQjtBQTlDRCxXQUFpQixVQUFVO0lBRTFCLHVFQUF1RTtJQUN2RSxxRkFBcUY7SUFDckYsc0ZBQXNGO0lBQ3RGLHNGQUFzRjtJQUV0RixNQUFNLEdBQUcsR0FBRywwQ0FBMEMsQ0FBRTtJQUUzQyx1QkFBWSxHQUFHLEtBQUssRUFBRyxJQUFhLEVBQTRCLEVBQUU7UUFFOUUsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQTBCLG1CQUFtQixHQUFHLGtCQUFrQixDQUFHLElBQUksQ0FBRSxDQUFFLENBQUU7UUFFM0csT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUU7SUFDekMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFTLEtBQWMsRUFBK0IsRUFBRTtRQUUvRSxNQUFNLEdBQUcsR0FBRyxpREFBaUQsR0FBRyxLQUFLLENBQUU7UUFDdkUsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUcsR0FBRyxDQUFFLENBQUU7UUFDakMsSUFBSyxHQUFHLENBQUMsRUFBRSxFQUNYLENBQUM7WUFDQSxPQUFPLE1BQU0sQ0FBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUcsQ0FBTyxDQUFBO1FBQ3hDLENBQUM7SUFDRixDQUFDLENBQUE7QUFzQkYsQ0FBQyxFQTlDZ0IsVUFBVSxLQUFWLFVBQVUsUUE4QzFCIn0=