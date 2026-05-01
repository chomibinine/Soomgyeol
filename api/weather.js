export default async function handler(req, res) {
    const { nx, ny, base_date, base_time } = req.query;
    const API_KEY = process.env.DATA_GO_KR_API_KEY || "여기에_공공데이터_일반인증키_입력";
    
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        
        try {
            const json = JSON.parse(text);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(json);
        } catch(e) {
            res.status(500).json({ error: "KMA API XML Error", details: text });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Weather data" });
    }
}
