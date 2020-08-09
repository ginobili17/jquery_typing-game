$(function() {

  const txts = [
    '赤パジャマ青パジャマ黄パジャマ',
    '生麦生米生卵',
    '赤巻紙青巻紙黄巻紙',
    'バスガス爆発',
    '裏庭には二羽にわとりがいる',
    '坊主が屏風に上手に坊主の絵を書いた',
    '貨客船の旅客と旅客機の旅客',
    '東京特許許可局長',
    '青は藍より出でて藍より青し',
  ];

  const timeLimit = 3 * 1000;
  let startTime;

  let isPlaying = false;
  let count = 0;
  let miss = 0;
  let txt;


    // 時間制限についての処理
    function updateTimer() {
      let timeLeft = startTime + timeLimit - Date.now();
      $("#timer").text((timeLeft / 1000).toFixed(2));
  
      let timeoutId = setTimeout(() => {
        updateTimer()
      }, 10);
  
      if (count > 4) {
        clearTimeout(timeoutId);
        $("#timer").text(0.00);
        isPlaying = false;
      } 
      
      if (timeLeft < 0) {
        count++; 
        let txtNum = $("#sentence").text().length
        miss += txtNum;
        nextTxt(timeoutId); 
      }
    }
  
      function nextTxt(timeoutId) {
      txt = txts[Math.floor(Math.random() * txts.length)];
      $("#sentence").text(txt);
      $("#answer").focus();
      $("#answer").val("");
      startTime = Date.now();
      updateTimer();
  
      if (count > 4) {
        clearTimeout(timeoutId);
        $("#timer").text(0.00);
        isPlaying = false;
        result(); 
      }
    }

    // okボタンを押した時
    $("#btnok").click(function() {
      if (isPlaying !== true) {
        return;
      }
  
      count++;
  
      checkAnswer();
      
      
      if (count > 4) {
        isPlaying = false;
  
        setTimeout(() => {
          result();
        }, 100);
  
      } else {
        nextTxt();
      }
  
  
    })
  
    function checkAnswer() {
      // 早口言葉の文字数
      let txtNum = $("#sentence").text().length
      
  
      for (var i = 0; i < txtNum; i++) {
        // 早口言葉を1文字づつ取得
        let txt1 = $("#sentence").text().charAt(i);
        // 入力された文字を1文字づつ取得
        let answer1 = $("#answer").val().charAt(i);
        if (txt1 !== answer1) {
          miss++;
        }
      }
  
    }
  
    // 結果表示
    function result() {
      isPlaying = false;
      // sentence.textContent = 'replay';
  
      if (miss === 0) {
        return alert('完璧！');
      } else if (1 <= miss && miss <= 3 ) {
        return alert('おしい！');
      } else if (4 <= miss && miss <= 8) {
        return alert('まだまだです。');
      } else if (9 <= miss) {
        return alert('頑張りましょう。');
      }
    }

  // クリックしてスタートする時
  $("#sentence").click(function() {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    
    $("#answer").focus();

    startTime = Date.now();
    updateTimer();

    
    // 早口言葉をランダムに取得
    let randomText = txts[Math.floor(Math.random() * txts.length)];

    $("#sentence").text(randomText)

  });

});