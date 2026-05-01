export default async function handler(req, res) {
    const { station } = req.query;
    // Vercel 환경 변수에서 키를 가져오거나, 문자열로 직접 입력합니다.
    const API_KEY = process.env.DATA_GO_KR_API_KEY || "여기에_공공데이터_일반인증키_입력";
    
    const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=1&stationName=${encodeURIComponent(station)}&dataTerm=DAILY&ver=1.3`;

    try {
        const response = await fetch(url);
        const text = await response.text(); 
        
        try {
            // 정상이면 JSON 파싱 후 프론트엔드로 전달
            const json = JSON.parse(text);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(json);
        } catch(e) {
            // 에러가 나서 XML이 반환된 경우 (인증키 미등록 등)
            res.status(500).json({ error: "Public API XML Error", details: text });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Air Quality data" });
    }
}
