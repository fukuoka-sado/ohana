// 地図の初期設定（地球の緯度経度ではなく、シンプルな平面座標 [L.CRS.Simple] を使う）
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2 // どこまで小さくズームアウトできるか def:-2
});

// 校内マップ画像のサイズを設定（[縦のピクセル数, 横のピクセル数]）
const imageBounds = [[0, 0], [1600, 2000]]; 
const imageUrl = 'school-map.png'; // 用意した画像ファイル名

// 地図に校内マップ画像を貼り付ける
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// 画像全体が画面に収まるように表示する
map.fitBounds(imageBounds);

// 絵文字アイコンを作る命令
const createEmojiIcon = (emoji) => {
    return L.divIcon({
        className: 'flower-icon',
        // HTMLの中身に、受け取った絵文字（emoji）を埋め込む
        html: `<span style="font-size: 30px; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">${emoji}</span>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15] // 中心点を座標に合わせる
    });
};

//カラーコードで丸ピンを作る命令
const createColorIcon = (color) => {
    return L.divIcon({
        className: 'custom-pin',
        html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

// ピンを追加する
// L.marker([縦の座標, 横の座標]) で位置を指定
//L.marker([,],{icon: createColorIcon('カラーコード')})　でピンの色指定
//L.marker([,],{icon: createEmojiIcon('絵文字')}) でアイコンを変える
const flowers = {
    azisai01:{//アジサイ
        name: "アジサイ",
        season: "spring",
        marker: L.marker([628, 715]).bindPopup("<b>アジサイ</b><br>6月開花")
    },azisai02:{//アジサイ
        name: "アジサイ",
        season: "spring",
        marker: L.marker([1386, 563]).bindPopup("<b>アジサイ</b><br>6月開花")
    },tubaki01:{//ツバキ
        name: "ツバキ",
        season: "winter",
        marker: L.marker([626, 1100]).bindPopup("<b>ツバキ</b><br>2月開花")
    },tubaki02:{//ツバキ
        name: "ツバキ",
        season: "winter",
        marker: L.marker([845, 903]).bindPopup("<b>ツバキ</b><br>早めに咲く1月下旬開花")
    },tubaki03:{//ツバキ
        name: "ツバキ",
        season: "winter",
        marker: L.marker([1233, 1538]).bindPopup("<b>ツバキ</b><br>2月開花")
    },tubaki04:{//ツバキ
        name: "ツバキ",
        season: "winter",
        marker: L.marker([1503, 624]).bindPopup("<b>ツバキ</b><br>2月開花")
    },gibousi01:{//ギボウシ
        name: "ギボウシ",
        season: "summer",
        marker: L.marker([1201, 677]).bindPopup("<b>ギボウシ</b><br>6~9月")
    },gibousi02:{//ギボウシ
        name: "ギボウシ",
        season: "summer",
        marker: L.marker([1326, 740]).bindPopup("<b>ギボウシ</b><br>6~9月")
    },kanzou01:{//カンゾウ
        name: "カンゾウ",
        season: "spring",
        marker: L.marker([1278, 690]).bindPopup("<b>カンゾウ</b><br>5~6月")
    },kanzou02:{//カンゾウ
        name: "カンゾウ",
        season: "spring",
        marker: L.marker([1234, 957]).bindPopup("<b>カンゾウ</b><br>5~6月")
    },azammi01:{//アザミ
        name: "アザミ",
        season: "spring",
        marker: L.marker([1296, 542]).bindPopup("<b>アザミ</b><br>4~6月")
    },katabami01:{//カタバミ
        name: "カタバミ",
        season: "autumn",
        marker: L.marker([744, 1067]).bindPopup("<b>カタバミ</b><br>5~10月")
    },kunnsiran01:{//クンシラン白
        name: "クンシラン",
        season: "summer",
        marker: L.marker([1491.5, 545]).bindPopup("<b>クンシラン白</b><br>7~8月")
    },kunnsirann02:{//クンシラン紫
        name: "クンシラン",
        season: "spring",
        marker: L.marker([1271, 678]).bindPopup("<b>クンシラン紫</b><br>5~6月")
    },haruzion01:{//ハルジオン
        name: "ハルジオン",
        season: "spring",
        marker: L.marker([1293, 578]).bindPopup("<b>ハルジオン</b><br>4~7月")
    },simotuki01:{//シモツケ
        name: "シモツケ",
        season: "spring",
        marker: L.marker([1297, 562]).bindPopup("<b>シモツケ</b><br>5~8月")
    },yaburann01:{//ヤブラン
        name: "ヤブラン",
        season: "summer",
        marker: L.marker([393, 936]).bindPopup("<b>ヤブラン</b><br>8~10月")
    },yaburann02:{//ヤブラン
        name: "ヤブラン",
        season: "summer",
        marker: L.marker([1460, 553]).bindPopup("<b>ヤブラン</b><br>8~10月")
    },butana01:{//ブタナ
        name: "ブタナ",
        season: "summer",
        marker: L.marker([1010, 1049]).bindPopup("<b>ブタナ</b><br>6~9月")
    },
}


// HTMLの要素を取得
const seasonSelect = document.getElementById('season-select');
const flowerSelect = document.getElementById('flower-select');


//「花を選ぶ」メニューの選択肢を生成する関数
flowerSelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value; // 変数名を selectedValue に変更

    // 各花のピンを表示するか隠すかを判定
    Object.keys(flowers).forEach(key => {
        const flower = flowers[key];

        // 値が空文字("")、'all'、または花の名前と一致する場合に表示
        if (selectedValue === '' || selectedValue === 'all' || flower.name === selectedValue) {
            if (!map.hasLayer(flower.marker)) {
                flower.marker.addTo(map);
            }
        } else {
            if (map.hasLayer(flower.marker)) {
                map.removeLayer(flower.marker);
            }
        }
    });
    // 全体表示に戻す
    map.fitBounds(imageBounds);
});

// 季節が変更されたときの処理
seasonSelect.addEventListener('change', (e) => {
    const selectedSeason = e.target.value;

    // ピンを表示するか隠すかを判定
    Object.keys(flowers).forEach(key => {
        const flower = flowers[key];

        if (selectedSeason === 'all' || flower.season === selectedSeason) {
            // 表示する
            if (!map.hasLayer(flower.marker)) {
                flower.marker.addTo(map);
            }
        } else {
            // 隠す
            if (map.hasLayer(flower.marker)) {
                map.removeLayer(flower.marker);
            }
        }
    });
    // 全体表示に戻す
    map.fitBounds(imageBounds);
});

// 初期化：最初にすべてのピンを地図に追加し、プルダウンを作る
Object.keys(flowers).forEach(key => flowers[key].marker.addTo(map));

// 画像上のどこにピンを置けばいいか（座標）を調べるためのデバッグコード
// 地図の上をクリックすると、ブラウザの「検証（f12）」のコンソールに座標が表示される。
map.on('click', function(e) {
    console.log("クリックした場所の座標: [" + e.latlng.lat + ", " + e.latlng.lng + "]");
});

