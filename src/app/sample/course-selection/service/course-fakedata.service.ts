import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseFakedataService {

  fakeData = [
    {
      "id": "C001",
      "code": "1023",
      "name": "微積分（一）",
      "type": "必修",
      "time": [[1, 1], [1, 2], [3, 1], [3, 2]],
      "teacher": "王建宏",
      "description": "極限、導數與基本應用，搭配大量練習題。",
      "credits": 4,
      "location": "理工大樓 201"
    },
    {
      "id": "C002",
      "code": "2841",
      "name": "普通物理（一）",
      "type": "必修",
      "time": [[2, 3], [2, 4], [4, 3], [4, 4]],
      "teacher": "林怡君",
      "description": "力學基礎與向量運算，含小考與作業。",
      "credits": 4,
      "location": "理工大樓 305"
    },
    {
      "id": "C003",
      "code": "7306",
      "name": "程式設計入門",
      "type": "必修",
      "time": [[1, 6], [1, 7], [3, 6]],
      "teacher": "陳柏宇",
      "description": "基礎語法、流程控制、陣列與函式；有上機作業。",
      "credits": 3,
      "location": "資訊館 B102"
    },
    {
      "id": "C004",
      "code": "4198",
      "name": "英文（一）",
      "type": "必修",
      "time": [[5, 1], [5, 2]],
      "teacher": "Emily Carter",
      "description": "閱讀與寫作訓練，含口說活動與小組討論。",
      "credits": 2,
      "location": "人文大樓 108"
    },
    {
      "id": "C005",
      "code": "5602",
      "name": "線性代數",
      "type": "必修",
      "time": [[2, 1], [2, 2], [4, 1]],
      "teacher": "張凱翔",
      "description": "矩陣、向量空間、特徵值與線性變換。",
      "credits": 3,
      "location": "理工大樓 210"
    },
    {
      "id": "C006",
      "code": "9137",
      "name": "資料結構",
      "type": "必修",
      "time": [[2, 6], [2, 7], [4, 6]],
      "teacher": "黃冠霖",
      "description": "Stack/Queue/Tree/Graph 與時間複雜度分析。",
      "credits": 3,
      "location": "資訊館 A205"
    },
    {
      "id": "C007",
      "code": "3479",
      "name": "網頁前端概論",
      "type": "選修",
      "time": [[3, 3], [3, 4]],
      "teacher": "許雅婷",
      "description": "HTML/CSS/JS 基礎，含響應式版面練習。",
      "credits": 2,
      "location": "資訊館 B201"
    },
    {
      "id": "C008",
      "code": "2250",
      "name": "資料庫系統",
      "type": "必修",
      "time": [[1, 3], [1, 4], [3, 3]],
      "teacher": "周明哲",
      "description": "關聯式模型、SQL、正規化與交易概念。",
      "credits": 3,
      "location": "資訊館 A101"
    },
    {
      "id": "C009",
      "code": "6084",
      "name": "作業系統",
      "type": "必修",
      "time": [[2, 8], [2, 9], [4, 8]],
      "teacher": "謝承恩",
      "description": "行程管理、排程、記憶體與檔案系統。",
      "credits": 3,
      "location": "資訊館 A303"
    },
    {
      "id": "C010",
      "code": "7712",
      "name": "計算機概論",
      "type": "必修",
      "time": [[5, 6], [5, 7]],
      "teacher": "羅詠翔",
      "description": "計算機基本架構、二進位、網路與資安概念。",
      "credits": 2,
      "location": "資訊館 A001"
    },
    {
      "id": "C011",
      "code": "1407",
      "name": "人工智慧導論",
      "type": "選修",
      "time": [[3, 8], [3, 9]],
      "teacher": "郭佩珊",
      "description": "搜尋、推論與基礎機器學習概念。",
      "credits": 2,
      "location": "資訊館 C401"
    },
    {
      "id": "C012",
      "code": "9965",
      "name": "機率與統計",
      "type": "必修",
      "time": [[1, 8], [1, 9], [3, 8]],
      "teacher": "吳家豪",
      "description": "離散/連續分配、期望、估計與假設檢定。",
      "credits": 3,
      "location": "理工大樓 117"
    },
    {
      "id": "C013",
      "code": "5321",
      "name": "資訊安全概論",
      "type": "選修",
      "time": [[4, 4], [4, 5]],
      "teacher": "鄭宇軒",
      "description": "密碼學入門、常見攻擊手法與防護觀念。",
      "credits": 2,
      "location": "資訊館 C210"
    },
    {
      "id": "C014",
      "code": "8840",
      "name": "專題實作（一）",
      "type": "必修",
      "time": [[5, 8], [5, 9], [6, 3]],
      "teacher": "蔡宜蓁",
      "description": "分組專題規劃、需求分析與里程碑管理。",
      "credits": 3,
      "location": "資訊館 專題教室 2"
    },
    {
      "id": "C015",
      "code": "2756",
      "name": "軟體工程",
      "type": "必修",
      "time": [[2, 4], [2, 5], [4, 4]],
      "teacher": "林俊廷",
      "description": "需求、設計、測試與版本控制流程。",
      "credits": 3,
      "location": "管理大樓 402"
    },
    {
      "id": "C016",
      "code": "3904",
      "name": "電路學",
      "type": "選修",
      "time": [[1, 5], [3, 5]],
      "teacher": "許志豪",
      "description": "基本電路元件與分析方法，搭配習題演練。",
      "credits": 2,
      "location": "理工大樓 410"
    },
    {
      "id": "C017",
      "code": "6119",
      "name": "行動應用開發",
      "type": "選修",
      "time": [[4, 1], [4, 2], [6, 1]],
      "teacher": "劉芸萱",
      "description": "App 架構、UI 與 API 串接，含期末作品。",
      "credits": 3,
      "location": "資訊館 B305"
    },
    {
      "id": "C018",
      "code": "4573",
      "name": "資料視覺化",
      "type": "選修",
      "time": [[5, 3], [5, 4]],
      "teacher": "邱子涵",
      "description": "圖表設計原則與資料敘事，含小專題。",
      "credits": 2,
      "location": "資訊館 C102"
    },
    {
      "id": "C019",
      "code": "7088",
      "name": "雲端基礎與部署",
      "type": "選修",
      "time": [[3, 1], [3, 2], [6, 6]],
      "teacher": "楊承翰",
      "description": "容器化、CI/CD 概念與基礎部署流程。",
      "credits": 3,
      "location": "資訊館 C305"
    },
    {
      "id": "C020",
      "code": "1635",
      "name": "通識：心理學入門",
      "type": "選修",
      "time": [[2, 2], [2, 3]],
      "teacher": "張雅雯",
      "description": "心理學基本概念與日常案例討論。",
      "credits": 2,
      "location": "人文大樓 205"
    }
  ]

  fakeDataS = signal<any>(this.fakeData)


  constructor() { }
}
