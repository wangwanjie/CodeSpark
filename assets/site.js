/* 编程小星球主页脚本：语言、主题、遥控器演示、关卡地图、星空画布 */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  var darkMQ = matchMedia('(prefers-color-scheme: dark)');
  var query = new URLSearchParams(location.search);

  function $(s, el) {
    return (el || doc).querySelector(s);
  }
  function $$(s, el) {
    return Array.prototype.slice.call((el || doc).querySelectorAll(s));
  }
  function store(k, v) {
    try {
      if (v === undefined) {
        return localStorage.getItem(k);
      }
      localStorage.setItem(k, v);
    } catch (e) {
      return null;
    }
    return null;
  }

  /* ---------------- 文案 ---------------- */
  // 简体文案直接取自页面 DOM，这里只维护英文与繁体
  var T = {
    en: {
      skip: 'Skip to content', brandAria: 'CodeSpark home', name: 'CodeSpark', sub: '编程小星球', navAria: 'Page sections',
      navMap: 'Level map', navInstall: 'Download', navParents: 'For parents', langAria: 'Language', themeAria: 'Theme',
      themeLight: 'Light', themeDark: 'Dark', themeAuto: 'Match system', ghAria: 'GitHub repository',
      kicker: 'A coding planet for the Android TV in your living room',
      h1: 'Little cards,<br>big adventures.',
      lede: 'Kids pick up the TV remote, line up arrow cards for Dot the robot, and watch it walk square by square to the goal. 36 lessons go from sequences, predictions and debugging to loops, conditions, reusable helpers and designing their own maps.',
      ctaDownload: 'Download APK', ctaHow: 'How to install on a TV',
      facts: 'Version 1.0.0, 9.5 MB, Android 6.0 or later, fully offline',
      demoAria: 'Coding demo: choose cards with arrow keys, press Enter to confirm',
      progAria: 'My program', padAria: 'Instruction cards',
      cR: 'Right', cD: 'Down', cL: 'Left', cU: 'Up', cLoop: 'Repeat all', cDel: 'Delete', cRun: 'Run', cReset: 'Clear',
      remoteAria: 'Remote control', kUp: 'Up', kLeft: 'Left', kOk: 'OK', kRight: 'Right', kDown: 'Down', kBack: 'Back',
      remoteTip: 'Click the TV screen, then use the arrow keys and Enter. Back (Esc) removes the last card.',
      flowH: 'How a lesson plays',
      s1h: 'Think first', s1: 'Trace the route with a finger, or guess where Dot will stop.',
      s2h: 'Line up cards', s2: 'Arrow keys pick a card, OK adds it to the program, up to six cards.',
      s3h: 'Watch it run', s3: 'Dot moves one square at a time while the current card lights up.',
      s4h: 'Fix it', s4: 'If Dot hits a rock, the app points to the exact card. Change it and try again; undo and restore are always there.',
      mapH: '36 lessons on 6 themed planets',
      mapP: 'Every lesson has an Explore and a Challenge setup, 72 in total. Kids can pick any lesson, skip ahead or replay. Select a level to see a parent reference solution, or move between levels with the arrow keys.',
      legend: 'Notation: ×2[…] repeats the whole chunk twice; ?[❀ | →] checks the current square for a flower, waters it if there is one, otherwise moves right; ❀ water; ◇ pick up the gift; ★ call the helper; A and B are answer choices in prediction lessons.',
      shotsH: 'What it looks like on TV', shotsP: 'Screenshots from the 1.0.0 acceptance run on an Android TV emulator at 1080p. The app interface is in Simplified Chinese.',
      shotsAria: 'App screenshots',
      aHome: 'Home screen with the Continue button and three lessons per page', fHome: 'Home: continue the adventure, three lessons per page',
      aProgram: 'Coding stage with the map on the left and the program queue and cards on the right', fProgram: 'Coding stage: map, program queue and cards',
      aPredict: 'Prediction lesson: read the program, then choose stop A or stop B', fPredict: 'Predict: read the program, then pick where it stops',
      aRepeat: 'Repeat card editor: choose the count and the chunk of actions', fRepeat: 'Repeat card: pick a count and a whole chunk',
      aCondition: 'If card editor: set actions for flower and no flower', fCondition: 'If card: what to do with or without a flower',
      aRoutine: 'Helper editor: name a chunk of actions as the helper', fRoutine: 'Helper: package a chunk and call it again and again',
      aMap: 'Map editor: place the start, finish, rocks and flowers', fMap: 'Map design: place start, finish, rocks and flowers',
      aSuccess: 'Success screen: another flower bloomed, tell us how you did it', fSuccess: 'After finishing, kids explain how they solved it',
      whoH: 'Three profiles, each with its own progress',
      p1h: 'Sprout: Explore', p1: 'Suggested from age 5. Shorter routes and fewer choices, starting from picture cards.',
      p2h: 'Star: Challenge', p2: 'Suggested from age 7. More steps, plus rocks and branching situations.',
      p3h: 'Play together', p3: 'Separate shared progress. Players take turns as planner and driver in each lesson.',
      whoNote: 'Age is only a starting point; choose the profile that fits your child. Each profile keeps its own progress, programs, helper and six creation maps.',
      parentsH: 'For parents',
      parentsP: 'Try two or three short lessons at a time: about 10–15 minutes for Explore, 15–20 for Challenge, and stop whenever your child is done. Questions that help while you play:',
      q1: 'Before running: "Where do you think it will stop?"', q2: 'After a mistake: "Which card is where it went differently?"',
      q3: 'Loops: "Is it repeating one card or a whole chunk?"', q4: 'Conditions: "Where was Dot standing when it checked for a flower?"',
      q5: 'Helpers: "Which actions does this name stand for?"', q6: 'After creating: ask your child to present the map, then invite family to try it.',
      privH: 'Privacy and offline use',
      priv: 'The APK requests no network permission; lessons, voice and images are all built in. No accounts, ads or analytics. Progress and creations stay on this TV: updates keep them, uninstalling deletes them.',
      limits: 'This version suggests session lengths; automatic time limits and a parent PIN are not included yet. The interface and voice guidance are in Simplified Chinese.',
      installH: 'Download and install on your TV',
      installP: 'CodeSpark is not in any app store, so it is installed by sideloading. Download the APK once and use any of the methods below to put it on a TV or TV box.',
      dlBtn: 'Download CodeSpark.apk', dtVer: 'Version', dtSize: 'Size', dtSys: 'System',
      ddSys: 'Android TV or TV box on Android 6.0 or later, landscape, a regular D-pad remote', dtArch: 'ABIs', dtTested: 'Tested',
      ddTested: 'Full curriculum tested on an Android TV API 34 emulator (1080p); not individually verified on every TV brand',
      allRel: 'All versions and release notes', tabsAria: 'Install methods', tUsb: 'USB drive', tLan: 'Local network', tAdb: 'adb',
      u1: 'Download CodeSpark.apk on a computer and copy it to a USB drive (FAT32 or exFAT).',
      u2: 'Plug the drive into the TV or TV box and find the APK with the built-in file manager.',
      u3: 'The first install asks about unknown sources. Follow the prompt and allow that file manager to install unknown apps. A common location is <b>Settings › Device Preferences › Security & restrictions › Unknown sources</b>; names vary by brand.',
      u4: 'Go back to the file manager, open the APK again and choose Install. Then find 编程小星球 (CodeSpark) in your apps.',
      l1: 'On the TV, open an app that can receive files over the local network. Many TVs include this in their file manager or app store, showing a web address or QR code.',
      l2: 'On a phone or computer on the same Wi-Fi, open that address and upload CodeSpark.apk.',
      l3: 'Open the received APK on the TV to install it. Allow that app to install unknown apps the first time.',
      l4: 'If the TV is online, a downloader app can fetch the APK directly from this address:',
      a1: 'Enable developer options on the TV: go to <b>Settings › Device Preferences › About</b> and press Build (or Android TV OS build) seven times.',
      a2: 'Turn on USB debugging or network debugging in developer options and note the TV\'s IP address. The computer needs Android SDK Platform Tools.',
      a3: 'With the TV and computer on the same network, run the commands below and allow the prompt on the TV. Use the port the TV shows; wireless debugging on Android 11+ may require adb pair first.',
      vSum: 'Verify the APK and update notes',
      v1: 'Release builds are signed with the release key (APK Signature Scheme v1 + v2), certificate subject CN=CodeSpark Family. Check the certificate fingerprint with apksigner verify --print-certs:',
      vCert: 'Certificate SHA-256', vApk: '1.0.0 APK SHA-256',
      v2: 'Future versions use the same key, so installing over the old version keeps progress and creations. INSTALL_FAILED_UPDATE_INCOMPATIBLE means a build with a different signature and the same package is installed; uninstall it first (this removes its data).',
      footAria: 'Footer links', more: 'More apps by VanJay', repo: 'GitHub repository', feedback: 'Send feedback'
    },
    tw: {
      skip: '跳到正文', brandAria: '編程小星球首頁', name: '編程小星球', navAria: '頁面導覽',
      navMap: '關卡地圖', navInstall: '下載安裝', navParents: '給家長', langAria: '語言', themeAria: '主題',
      themeLight: '淺色', themeDark: '深色', themeAuto: '跟隨系統', ghAria: 'GitHub 儲存庫',
      kicker: '給家裡的 Android TV 裝一顆程式設計星球',
      h1: '小小指令，<br>大大冒險。',
      lede: '孩子拿起遙控器，替機器人點點排好箭頭卡，看它一格一格走到目的地。36 個任務從順序、預測、除錯，一路走到迴圈、條件、動作包和自己設計地圖。',
      ctaDownload: '下載 APK', ctaHow: '怎麼裝到電視上',
      facts: '1.0.0 版，9.5 MB，Android 6.0 以上，全程離線',
      demoAria: '程式演示：用方向鍵選擇卡片，Enter 確認',
      progAria: '我的小程式', padAria: '指令卡',
      cR: '向右', cD: '向下', cL: '向左', cU: '向上', cLoop: '重複整段', cDel: '刪最後', cRun: '執行', cReset: '清空',
      remoteAria: '模擬遙控器', kUp: '上', kLeft: '左', kOk: '確認', kRight: '右', kDown: '下', kBack: '返回',
      remoteTip: '點一下電視畫面，再用鍵盤方向鍵和 Enter 操作；返回鍵（Esc）刪掉最後一張卡。',
      flowH: '一個任務這樣玩',
      s1h: '先想一想', s1: '用手指一指路線，或先猜點點會停在哪一格。',
      s2h: '排指令', s2: '方向鍵挑卡片，確認鍵放進程式，最多六張。',
      s3h: '看執行', s3: '點點一次走一格，目前的卡片和角色同時亮起。',
      s4h: '改一改', s4: '撞到石頭時會指出是第幾張卡，改完再試，復原和恢復原題隨時可用。',
      mapH: '36 個任務，6 顆主題星球',
      mapP: '每個任務都有「探索」和「挑戰」兩套設定，共 72 個。任務可以直接選擇、跨級和重玩。點一個關卡看家長參考解，也可以用方向鍵在關卡之間移動。',
      legend: '記號：×2[…] 把整段重複兩次；?[❀ | →] 檢查目前這格有沒有花，有就澆花，沒有就向右；❀ 澆花；◇ 拿禮物；★ 呼叫小幫手；A、B 是預測題的選項。',
      shotsH: '電視上的樣子', shotsP: '以下截圖來自 1.0.0 在 Android TV 模擬器（1080p）上的驗收，應用程式介面為簡體中文。',
      shotsAria: '應用程式截圖',
      aHome: '首頁：繼續探險按鈕和每頁三個任務', fHome: '首頁：繼續探險，每頁三個任務',
      aProgram: '程式舞台：左側地圖，右側程式佇列和動作卡', fProgram: '程式舞台：地圖、程式佇列和動作卡',
      aPredict: '預測任務：先讀程式，再選 A 站點或 B 站點', fPredict: '預測：先讀程式，再選會停在哪',
      aRepeat: '重複卡編輯器：選擇重複次數和這一段動作', fRepeat: '重複卡：選次數，放進一整段動作',
      aCondition: '條件卡編輯器：分別安排有花時和沒有花時的動作', fCondition: '條件卡：有花時、沒有花時各做什麼',
      aRoutine: '小幫手編輯器：把一段動作命名為小幫手', fRoutine: '小幫手：把一段動作打包，反覆呼叫',
      aMap: '地圖編輯器：放置起點、終點、石頭和小花', fMap: '設計地圖：放起點、終點、石頭和小花',
      aSuccess: '過關提示：又一朵小花開了，說一說你的想法', fSuccess: '完成後請孩子說一說自己的辦法',
      whoH: '三個檔案，各玩各的',
      p1h: '小芽：探索', p1: '建議 5 歲起步。路線更短、選擇更少，從圖形指令開始。',
      p2h: '小星：挑戰', p2: '建議 7 歲起步。步數更多，加入障礙和分支情境。',
      p3h: '一起玩', p3: '獨立的合作進度，每個任務輪流當規劃員和操作員。',
      whoNote: '年齡只是起點，家長可以依孩子的實際狀態選檔案。每個檔案分別儲存進度、程式、小幫手和六張創作地圖。',
      parentsH: '給家長',
      parentsP: '建議每次做兩三個小任務：探索檔案從 10–15 分鐘起步，挑戰檔案約 15–20 分鐘，看孩子狀態隨時收尾。陪著玩時可以這樣問：',
      q1: '執行前：「你猜它會停在哪？」', q2: '出錯後：「從哪一張開始不一樣？」',
      q3: '迴圈任務：「重複的是一張卡，還是一整段？」', q4: '條件任務：「點點是在什麼位置檢查小花的？」',
      q5: '小幫手任務：「這個名字代表哪一段動作？」', q6: '創作之後：請孩子介紹地圖，再邀請家人來挑戰。',
      privH: '隱私與離線',
      priv: '安裝包沒有申請網路權限，課程、語音和圖片全部內建。沒有帳號、廣告或統計。進度和作品只儲存在這台電視上：覆蓋升級會保留，解除安裝會一併刪除。',
      limits: '本版提供時長建議，暫未加入自動時長限制和家長密碼。介面與語音為簡體中文。',
      installH: '下載並裝到電視',
      installP: '編程小星球沒有上架應用程式商店，透過側載安裝。下載一次 APK，用下面任一種方式裝到電視或電視盒上。',
      dlBtn: '下載 CodeSpark.apk', dtVer: '版本', dtSize: '大小', dtSys: '系統',
      ddSys: 'Android 6.0 以上的 Android TV 或電視盒，橫向畫面，一般方向鍵遙控器即可', dtArch: '架構', dtTested: '驗收',
      ddTested: 'Android TV API 34 模擬器（1080p）完成完整課程測試；各品牌實機未逐一驗證',
      allRel: '全部版本與更新說明', tabsAria: '安裝方式', tUsb: 'USB 隨身碟', tLan: '區域網路傳輸', tAdb: 'adb 指令',
      u1: '在電腦上下載 CodeSpark.apk，複製到 USB 隨身碟（FAT32 或 exFAT 格式）。',
      u2: '把隨身碟插到電視或電視盒上，用內建的檔案管理員找到這個 APK。',
      u3: '第一次安裝會提示「不明來源」。依提示進入設定，為這個檔案管理員開啟「允許安裝不明應用程式」。常見位置：<b>設定 › 裝置偏好設定 › 安全性與限制 › 不明來源</b>，各品牌入口名稱略有不同。',
      u4: '回到檔案管理員，再次開啟 APK，選擇安裝。完成後在應用程式清單裡找到「编程小星球」。',
      l1: '在電視上開啟支援區域網路接收檔案的應用程式。不少電視的檔案管理員或應用程式商店內建「手機傳檔」「區域網路傳輸」功能，開啟後會顯示一個網址或 QR 碼。',
      l2: '手機或電腦連上同一個 Wi-Fi，開啟這個網址，把下載好的 CodeSpark.apk 上傳過去。',
      l3: '在電視上開啟收到的 APK 安裝。第一次同樣需要為該應用程式允許安裝不明應用程式。',
      l4: '電視能直接上網時，也可以用下載器類應用程式輸入下載網址，直接在電視上下載安裝。',
      a1: '在電視上開啟開發人員選項：進入 <b>設定 › 裝置偏好設定 › 關於</b>，連按「版本號碼」（或「Android TV OS 版本」）七次。',
      a2: '在開發人員選項裡開啟 USB 偵錯或網路偵錯，記下電視的 IP 位址。電腦上需要已安裝 Android SDK Platform Tools。',
      a3: '電視和電腦在同一個網路時執行下面的指令，電視上跳出授權框時選擇允許。連接埠以電視顯示為準，Android 11 以上的無線偵錯可能要先用 adb pair 配對。',
      vSum: '驗證安裝包與升級說明',
      v1: '正式版使用正式金鑰簽署（APK 簽章 v1 + v2），憑證主體 CN=CodeSpark Family。可以用 apksigner verify --print-certs 核對憑證指紋：',
      vCert: '憑證 SHA-256', vApk: '1.0.0 APK SHA-256',
      v2: '之後的新版本使用同一把金鑰簽署，直接覆蓋安裝即可保留進度和作品。安裝時出現 INSTALL_FAILED_UPDATE_INCOMPATIBLE，代表裝置上裝著另一個簽章的同套件名稱版本，需要先解除安裝（會清除該版本的記錄）。',
      footAria: '頁尾連結', more: 'VanJay 的更多作品', repo: 'GitHub 儲存庫', feedback: '回報問題'
    }
  };
  var META = {
    zh: ['编程小星球 CodeSpark：家庭 Android TV 亲子编程', '编程小星球是面向家庭 Android TV 的亲子编程应用：用遥控器给机器人点点排指令，36 个任务覆盖顺序、预测、调试、循环、条件、动作包和地图创作，离线使用。'],
    tw: ['編程小星球 CodeSpark：家庭 Android TV 親子程式設計', '編程小星球是給家庭 Android TV 的親子程式設計應用程式：用遙控器替機器人點點排指令，36 個任務涵蓋順序、預測、除錯、迴圈、條件、動作包和地圖創作，離線使用。'],
    en: ['CodeSpark: family coding for Android TV', 'CodeSpark (编程小星球) is a family coding app for Android TV: kids use the remote to line up cards for Dot the robot. 36 lessons cover sequences, prediction, debugging, loops, conditions, helpers and map design, fully offline.']
  };
  // 演示与关卡地图里的动态文案
  var M = {
    zh: { lv: '第 {n} 关', run: '运行中：第 {n} 步', win: '到啦！点点拿到了星星。', stone: '第 {n} 步遇到石头了，看看这一张。',
      out: '第 {n} 步走出地图了，换个方向试试。', short: '程序走完了，还没到星星。', empty: '先放一张卡片再运行。',
      full: '最多放六张卡片。', loop: '整段重复 {n} 次。', you: '轮到你了：排好卡片，选「运行」再按 OK。', next: '下一关来了。',
      modeAuto: '自动演示中', modeYou: '轮到你了', explore: '探索参考', challenge: '挑战参考', range: '任务 {a}–{b}', pick: '第 {n} 关：{t}' },
    tw: { lv: '第 {n} 關', run: '執行中：第 {n} 步', win: '到啦！點點拿到了星星。', stone: '第 {n} 步遇到石頭了，看看這一張。',
      out: '第 {n} 步走出地圖了，換個方向試試。', short: '程式走完了，還沒到星星。', empty: '先放一張卡片再執行。',
      full: '最多放六張卡片。', loop: '整段重複 {n} 次。', you: '輪到你了：排好卡片，選「執行」再按 OK。', next: '下一關來了。',
      modeAuto: '自動演示中', modeYou: '輪到你了', explore: '探索參考', challenge: '挑戰參考', range: '任務 {a}–{b}', pick: '第 {n} 關：{t}' },
    en: { lv: 'Level {n}', run: 'Running: step {n}', win: 'Made it! Dot reached the star.', stone: 'Step {n} hits a rock. Check that card.',
      out: 'Step {n} walks off the map. Try another direction.', short: 'The program ended before reaching the star.', empty: 'Add a card before running.',
      full: 'Up to six cards fit.', loop: 'Repeat the whole program {n} times.', you: 'Your turn: line up cards, choose Run, then press OK.', next: 'Here comes the next level.',
      modeAuto: 'Auto demo', modeYou: 'Your turn', explore: 'Explore', challenge: 'Challenge', range: 'Lessons {a}–{b}', pick: 'Lesson {n}: {t}' }
  };

  var lang = 'zh';
  function fmt(s, o) {
    return s.replace(/\{(\w+)\}/g, function (_, k) {
      return o && o[k] !== undefined ? o[k] : '';
    });
  }
  function m(key, o) {
    return fmt(M[lang][key], o);
  }

  // 记录简体原文
  var zh = {};
  $$('[data-i18n]').forEach(function (el) {
    zh[el.dataset.i18n] = el.textContent;
  });
  $$('[data-i18n-html]').forEach(function (el) {
    zh[el.dataset.i18nHtml] = el.innerHTML;
  });
  $$('[data-i18n-alt]').forEach(function (el) {
    zh[el.dataset.i18nAlt] = el.alt;
  });
  $$('[data-i18n-aria]').forEach(function (el) {
    zh[el.dataset.i18nAria] = el.getAttribute('aria-label');
  });
  T.zh = zh;

  function pickLang() {
    var q = query.get('lang');
    var saved = store('cs-lang');
    var cand = q || saved;
    if (cand === 'zh' || cand === 'tw' || cand === 'en') {
      return cand;
    }
    var list = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i]).toLowerCase();
      if (/^zh-(tw|hk|mo|hant)/.test(l) || l.indexOf('hant') > -1) {
        return 'tw';
      }
      if (l.indexOf('zh') === 0) {
        return 'zh';
      }
    }
    return 'en';
  }

  function applyLang(l) {
    lang = l;
    var d = T[l];
    root.lang = l === 'zh' ? 'zh-CN' : (l === 'tw' ? 'zh-TW' : 'en');
    $$('[data-i18n]').forEach(function (el) {
      var v = d[el.dataset.i18n];
      if (v !== undefined) {
        el.textContent = v;
      }
    });
    $$('[data-i18n-html]').forEach(function (el) {
      var v = d[el.dataset.i18nHtml];
      if (v !== undefined) {
        el.innerHTML = v;
      }
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      var v = d[el.dataset.i18nAlt];
      if (v !== undefined) {
        el.alt = v;
      }
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = d[el.dataset.i18nAria];
      if (v !== undefined) {
        el.setAttribute('aria-label', v);
      }
    });
    doc.title = META[l][0];
    $('meta[name="description"]').content = META[l][1];
    $('meta[property="og:title"]').content = META[l][0];
    $('meta[property="og:description"]').content = META[l][1];
    $$('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === l));
    });
    if (typeof onLang === 'function') {
      onLang();
    }
  }
  var onLang = null;

  $$('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      store('cs-lang', b.dataset.lang);
      applyLang(b.dataset.lang);
    });
  });

  /* ---------------- 主题 ---------------- */
  var themePref = root.dataset.themePref || 'auto';
  function applyTheme(pref) {
    themePref = pref;
    var dark = pref === 'dark' || (pref === 'auto' && darkMQ.matches);
    root.dataset.themePref = pref;
    root.dataset.theme = dark ? 'dark' : 'light';
    $('#meta-theme').content = dark ? '#12163A' : '#DDF1FF';
    $$('[data-theme-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.themeBtn === pref));
    });
    if (sky) {
      sky.redraw();
    }
  }
  $$('[data-theme-btn]').forEach(function (b) {
    b.addEventListener('click', function () {
      store('cs-theme', b.dataset.themeBtn);
      applyTheme(b.dataset.themeBtn);
    });
  });
  darkMQ.addEventListener('change', function () {
    if (themePref === 'auto') {
      applyTheme('auto');
    }
  });

  /* ---------------- 星空画布 ---------------- */
  var sky = (function () {
    var cv = $('#sky');
    if (!cv) {
      return null;
    }
    var ctx = cv.getContext('2d');
    var S = 4; // 每个像素块的屏幕尺寸
    var W = 0, H = 0, stars = [], clouds = [], running = false, visible = true, raf = 0, t0 = 0;
    function rnd(a, b) {
      return a + Math.random() * (b - a);
    }
    function resize() {
      var r = cv.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width / S));
      H = Math.max(1, Math.round(r.height / S));
      cv.width = W;
      cv.height = H;
      stars = [];
      var n = Math.round(W * H / 380);
      for (var i = 0; i < n; i++) {
        stars.push({ x: Math.floor(rnd(0, W)), y: Math.floor(rnd(0, H * 0.8)), p: rnd(0, 6.28), s: rnd(0.6, 1.8), big: Math.random() < 0.12 });
      }
      clouds = [];
      for (var j = 0; j < 5; j++) {
        clouds.push({ x: rnd(0, W), y: rnd(H * 0.05, H * 0.55), w: Math.floor(rnd(14, 28)), v: rnd(0.4, 1.1) });
      }
      draw(performance.now());
    }
    function cloud(c) {
      var x = Math.floor(c.x), y = Math.floor(c.y), w = c.w;
      ctx.fillRect(x, y + 3, w, 4);
      ctx.fillRect(x + 3, y + 1, Math.floor(w * 0.45), 3);
      ctx.fillRect(x + Math.floor(w * 0.4), y - 1, Math.floor(w * 0.35), 5);
    }
    function draw(t) {
      var dark = root.dataset.theme === 'dark';
      ctx.clearRect(0, 0, W, H);
      var sec = t / 1000;
      if (dark) {
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
          var a = 0.35 + 0.65 * Math.abs(Math.sin(s.p + sec * s.s));
          ctx.globalAlpha = a;
          ctx.fillStyle = s.big ? '#FFD84A' : '#E8E6FF';
          ctx.fillRect(s.x, s.y, 1, 1);
          if (s.big && a > 0.7) {
            ctx.fillRect(s.x - 1, s.y, 3, 1);
            ctx.fillRect(s.x, s.y - 1, 1, 3);
          }
        }
        // 一颗带环的小行星
        ctx.globalAlpha = 1;
        var px = Math.floor(W * 0.9), py = Math.floor(H * 0.1);
        ctx.fillStyle = '#A994FF';
        ctx.fillRect(px + 1, py, 4, 6);
        ctx.fillRect(px, py + 1, 6, 4);
        ctx.fillStyle = '#FF8A75';
        ctx.fillRect(px - 2, py + 3, 10, 1);
      } else {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#FFFFFF';
        for (var j = 0; j < clouds.length; j++) {
          var c = clouds[j];
          c.x = ((c.x0 === undefined ? (c.x0 = c.x) : c.x0) + sec * c.v) % (W + 40) - 20;
          cloud(c);
        }
        ctx.globalAlpha = 1;
        // 像素太阳
        var sx = Math.floor(W * 0.9), sy = Math.floor(H * 0.08);
        ctx.fillStyle = '#FFC83D';
        ctx.fillRect(sx + 2, sy, 6, 10);
        ctx.fillRect(sx, sy + 2, 10, 6);
        ctx.fillRect(sx + 1, sy + 1, 8, 8);
      }
      ctx.globalAlpha = 1;
    }
    function loop(t) {
      if (!running) {
        return;
      }
      if (t - t0 > 90) { // 约 11 帧每秒，像素风足够且省电
        t0 = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    }
    function update() {
      var should = visible && !doc.hidden && !reduceMQ.matches;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      update();
    }).observe(cv);
    doc.addEventListener('visibilitychange', update);
    reduceMQ.addEventListener('change', update);
    var rt = 0;
    addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(resize, 150);
    });
    resize();
    update();
    return { redraw: function () { draw(performance.now()); } };
  })();

  /* ---------------- 遥控器演示 ---------------- */
  var demo = (function () {
    var screen = $('#demo');
    var grid = $('#grid'), robot = $('#robot'), slotsEl = $('#slots'), loopEl = $('#loop-badge');
    var msgEl = $('#demo-msg'), modeEl = $('#mode-label'), lvEl = $('#lv-label');
    var pad = $$('#pad button');
    var COLS = 6, ROWS = 4;
    var DIRS = { R: [1, 0, '→'], D: [0, 1, '↓'], L: [-1, 0, '←'], U: [0, -1, '↑'] };
    var STAR = '<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#FFC83D" d="M4 0h2v3h4v2H8v1h1v4H7V9H3v1H1V6h1V5H0V3h4z"/><path fill="#E2603F" d="M4 4h2v2H4z" opacity=".5"/></svg>';
    // 三个演示关卡：坐标 [x, y]，auto 是自动演示要按的卡片
    var LEVELS = [
      { start: [0, 1], star: [4, 1], stones: [[2, 3], [5, 0]], auto: ['R', 'loop', 'loop', 'loop'] },
      { start: [0, 0], star: [3, 3], stones: [[2, 0], [0, 2], [4, 2]], auto: ['R', 'D', 'loop', 'loop'] },
      { start: [0, 2], star: [4, 2], stones: [[2, 2], [2, 3], [5, 1]], auto: ['U', 'R', 'R', 'R', 'R', 'D'] }
    ];
    var lvIndex = 0, prog = [], loopN = 1, pos = [0, 0], focusIdx = 0, busy = false, auto = !reduceMQ.matches, token = 0;
    var paused = false, cells = [];
    var lastMsg = null;

    function sleep(ms, tk) {
      return new Promise(function (res, rej) {
        function tick() {
          if (tk !== token) {
            rej('cancel');
            return;
          }
          if (paused) {
            setTimeout(tick, 200);
            return;
          }
          res();
        }
        setTimeout(tick, reduceMQ.matches ? Math.min(ms, 60) : ms);
      });
    }
    function say(key, o) {
      lastMsg = key ? [key, o] : null;
      msgEl.textContent = key ? m(key, o) : '';
    }
    function cellAt(x, y) {
      return cells[y * COLS + x];
    }
    function place() {
      robot.style.transform = 'translate(' + (pos[0] * 100) + '%,' + (pos[1] * 100) + '%)';
    }
    function build() {
      var L = LEVELS[lvIndex];
      $$('.cell', grid).forEach(function (c) {
        c.remove();
      });
      cells = [];
      grid.style.setProperty('--cols', COLS);
      grid.style.setProperty('--rows', ROWS);
      for (var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
          var c = doc.createElement('div');
          c.className = 'cell' + ((x + y) % 2 ? ' alt' : '');
          grid.insertBefore(c, robot);
          cells.push(c);
        }
      }
      L.stones.forEach(function (s) {
        cellAt(s[0], s[1]).classList.add('stone');
      });
      var st = cellAt(L.star[0], L.star[1]);
      st.classList.add('star');
      st.innerHTML = STAR;
      robot.style.transition = 'none';
      pos = L.start.slice();
      place();
      robot.offsetWidth; // 强制回流，避免出生位置也播放过渡
      robot.style.transition = '';
      prog = [];
      loopN = 1;
      renderProg();
      lvEl.textContent = m('lv', { n: lvIndex + 1 });
    }
    // 程序槽只创建一次，之后原地更新，避免每一步都重播入场动画
    var slotEls = [];
    for (var si = 0; si < 6; si++) {
      slotEls.push(slotsEl.appendChild(doc.createElement('li')));
    }
    function renderProg(now, bad) {
      slotEls.forEach(function (li, i) {
        var full = !!prog[i];
        if (full && !li.classList.contains('full')) {
          li.classList.add('new');
          setTimeout(function () {
            li.classList.remove('new');
          }, 260);
        }
        li.textContent = full ? DIRS[prog[i]][2] : '';
        li.classList.toggle('full', full);
        li.classList.toggle('now', full && i === now);
        li.classList.toggle('bad', full && i === bad);
      });
      loopEl.textContent = '×' + loopN;
      loopEl.classList.toggle('on', loopN > 1);
    }
    function setFocus(i) {
      focusIdx = i;
      pad.forEach(function (b, k) {
        b.classList.toggle('focus', k === i);
      });
    }
    function flashKey(key) {
      var k = $('.remote [data-key="' + key + '"]');
      if (k) {
        k.classList.add('hit');
        setTimeout(function () {
          k.classList.remove('hit');
        }, 160);
      }
    }
    function moveFocus(key) {
      var r = Math.floor(focusIdx / 4), c = focusIdx % 4;
      if (key === 'ArrowLeft') {
        c = (c + 3) % 4;
      } else if (key === 'ArrowRight') {
        c = (c + 1) % 4;
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        r = 1 - r;
      }
      setFocus(r * 4 + c);
    }
    function press(cmd) {
      var b = pad.filter(function (x) {
        return x.dataset.cmd === cmd;
      })[0];
      if (b) {
        b.classList.add('press');
        setTimeout(function () {
          b.classList.remove('press');
        }, 140);
      }
      if (busy) {
        return;
      }
      if (DIRS[cmd]) {
        if (prog.length >= 6) {
          say('full');
          return;
        }
        prog.push(cmd);
        renderProg();
        say(null);
      } else if (cmd === 'loop') {
        loopN = loopN % 4 + 1;
        renderProg();
        say('loop', { n: loopN });
      } else if (cmd === 'del') {
        prog.pop();
        renderProg();
        say(null);
      } else if (cmd === 'reset') {
        build();
        say(null);
      } else if (cmd === 'run') {
        return run();
      }
      return null;
    }
    async function run() {
      var L = LEVELS[lvIndex], tk = token;
      if (!prog.length) {
        say('empty');
        return;
      }
      busy = true;
      $$('.trail', grid).forEach(function (c) {
        c.classList.remove('trail');
      });
      pos = L.start.slice();
      place();
      var steps = [];
      for (var k = 0; k < loopN; k++) {
        for (var i = 0; i < prog.length; i++) {
          steps.push(i);
        }
      }
      try {
        await sleep(250, tk);
        for (var s = 0; s < steps.length; s++) {
          var d = DIRS[prog[steps[s]]];
          var nx = pos[0] + d[0], ny = pos[1] + d[1];
          renderProg(steps[s]);
          say('run', { n: s + 1 });
          var blocked = nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS;
          var stone = !blocked && cellAt(nx, ny).classList.contains('stone');
          if (blocked || stone) {
            robot.classList.remove('bump');
            robot.offsetWidth;
            robot.classList.add('bump');
            renderProg(-1, steps[s]);
            say(stone ? 'stone' : 'out', { n: s + 1 });
            busy = false;
            return false;
          }
          cellAt(pos[0], pos[1]).classList.add('trail');
          pos = [nx, ny];
          place();
          await sleep(430, tk);
        }
        renderProg();
        if (pos[0] === L.star[0] && pos[1] === L.star[1]) {
          cellAt(pos[0], pos[1]).classList.add('got');
          say('win');
          await sleep(1500, tk);
          lvIndex = (lvIndex + 1) % LEVELS.length;
          build();
          say(auto ? null : 'next');
          busy = false;
          return true;
        }
        say('short');
        busy = false;
        return false;
      } catch (e) {
        busy = false;
        return false;
      }
    }
    // 自动演示：焦点框沿遥控器方向移动到目标卡片，再按确认
    async function autoplay() {
      var tk = token;
      try {
        while (auto && tk === token) {
          var seq = LEVELS[lvIndex].auto.concat(['run']);
          await sleep(900, tk);
          for (var i = 0; i < seq.length; i++) {
            var target = pad.findIndex(function (b) {
              return b.dataset.cmd === seq[i];
            });
            while (focusIdx !== target) {
              var r = Math.floor(focusIdx / 4), tr = Math.floor(target / 4);
              var key = r !== tr ? (tr > r ? 'ArrowDown' : 'ArrowUp') : (target % 4 > focusIdx % 4 ? 'ArrowRight' : 'ArrowLeft');
              flashKey(key);
              moveFocus(key);
              await sleep(240, tk);
            }
            flashKey('Enter');
            var done = press(seq[i]);
            if (done) {
              await done;
            }
            await sleep(420, tk);
          }
        }
      } catch (e) {
        // 演示被用户打断
      }
    }
    function takeOver() {
      if (!auto) {
        return;
      }
      auto = false;
      token++;
      busy = false;
      build();
      modeEl.textContent = m('modeYou');
      say('you');
    }
    function handleKey(key) {
      takeOver();
      flashKey(key);
      if (key.indexOf('Arrow') === 0) {
        moveFocus(key);
      } else if (key === 'Enter' || key === ' ') {
        press(pad[focusIdx].dataset.cmd);
      } else if (key === 'Escape' || key === 'Backspace') {
        press('del');
      }
    }
    screen.addEventListener('keydown', function (e) {
      if (/^(Arrow(Up|Down|Left|Right)|Enter| |Escape|Backspace)$/.test(e.key)) {
        e.preventDefault();
        handleKey(e.key);
      }
    });
    pad.forEach(function (b, i) {
      b.addEventListener('click', function () {
        takeOver();
        setFocus(i);
        press(b.dataset.cmd);
        screen.focus({ preventScroll: true });
      });
    });
    $$('.remote [data-key]').forEach(function (b) {
      b.addEventListener('click', function () {
        handleKey(b.dataset.key);
      });
    });
    screen.addEventListener('pointerdown', function (e) {
      if (!e.target.closest('#pad')) {
        takeOver();
      }
    });
    // 首屏不可见或页面隐藏时暂停自动演示
    var heroVisible = true;
    function syncPause() {
      paused = doc.hidden || !heroVisible;
    }
    new IntersectionObserver(function (es) {
      heroVisible = es[0].isIntersecting;
      syncPause();
    }).observe(screen);
    doc.addEventListener('visibilitychange', syncPause);

    build();
    setFocus(0);
    if (auto) {
      autoplay();
    } else {
      modeEl.textContent = m('modeYou');
      say('you');
    }
    return {
      relabel: function () {
        lvEl.textContent = m('lv', { n: lvIndex + 1 });
        modeEl.textContent = auto ? m('modeAuto') : m('modeYou');
        if (lastMsg) {
          say(lastMsg[0], lastMsg[1]);
        }
      }
    };
  })();

  /* ---------------- 关卡地图 ---------------- */
  var THEMES = [
    { c: '#7FD36E', n: ['顺序花园', '順序花園', 'Sequence Garden'], d: ['给出明确指令、安排先后、绕过障碍。', '給出明確指令、安排先後、繞過障礙。', 'Give clear instructions, put steps in order, go around obstacles.'] },
    { c: '#6EC6FF', n: ['发现小侦探', '發現小偵探', 'Little Detective'], d: ['猜终点、比较程序，删除、补充、替换错误步骤。', '猜終點、比較程式，刪除、補充、替換錯誤步驟。', 'Guess the end, compare programs, delete, add or replace wrong steps.'] },
    { c: '#FFC83D', n: ['重复游乐场', '重複遊樂場', 'Repeat Playground'], d: ['同一动作重复、整段动作重复、组合循环。', '同一動作重複、整段動作重複、組合迴圈。', 'Repeat one move, repeat a whole chunk, combine loops.'] },
    { c: '#46C79A', n: ['如果森林', '如果森林', 'If Forest'], d: ['看当前格子的条件，安排两种情况，在循环里检查。', '看目前格子的條件，安排兩種情況，在迴圈裡檢查。', 'Check the current square, plan for two cases, check inside loops.'] },
    { c: '#FF9472', n: ['小帮手工坊', '小幫手工坊', 'Helper Workshop'], d: ['拆解任务、命名动作包、重复调用和组合。', '拆解任務、命名動作包、重複呼叫和組合。', 'Break tasks down, name a helper, call it again and combine.'] },
    { c: '#B59CFF', n: ['我的创作星球', '我的創作星球', 'My Creation Planet'], d: ['改地图、检查能否走通、保存作品并邀请家人挑战。', '改地圖、檢查能否走通、儲存作品並邀請家人挑戰。', 'Edit maps, check they can be solved, save and invite family to play.'] }
  ];
  // [简体标题, 繁体标题, 英文标题, 简体副标题, 繁体副标题, 英文副标题, 探索参考, 挑战参考]
  var LESSONS = [
    ['礼物就在前面', '禮物就在前面', 'The gift is just ahead', '认识指令 · 向右走', '認識指令 · 向右走', 'Meet the cards: go right', '→ →', '→ → →'],
    ['去找小树', '去找小樹', 'Find the little tree', '换个方向 · 向下走', '換個方向 · 向下走', 'A new direction: go down', '↓ ↓', '↓ ↓ ↓'],
    ['小屋在拐角', '小屋在轉角', 'The hut around the corner', '安排顺序 · 转个弯', '安排順序 · 轉個彎', 'Order the steps: turn a corner', '→ → ↓', '→ → → ↓ ↓'],
    ['沿着小路走', '沿著小路走', 'Follow the path', '比较顺序 · 绕过去', '比較順序 · 繞過去', 'Compare orders: go around', '↓ → →', '↓ ↓ → → →'],
    ['绕过石头', '繞過石頭', 'Around the rock', '规划路线 · 看全图', '規劃路線 · 看全圖', 'Plan a route: read the whole map', '→ → ↓ ↓', '→ → → ↓ ↓ ↓'],
    ['窄窄的花园', '窄窄的花園', 'The narrow garden', '组合顺序 · 找小路', '組合順序 · 找小路', 'Combine steps: find the path', '→ ↓ ↓ →', '→ ↓ ↓ ↓ → →'],
    ['它会停在哪', '它會停在哪', 'Where will it stop?', '先预测 · 再验证', '先預測 · 再驗證', 'Predict, then check', 'A ▸ → → ↓', 'A ▸ → → → ↓ ↓'],
    ['哪条路能到', '哪條路能到', 'Which route works?', '选程序 · 比较路线', '選程式 · 比較路線', 'Pick a program: compare routes', 'A ▸ ↓ ↓ →', 'A ▸ ↓ ↓ → ↓ →'],
    ['跟着指令想', '跟著指令想', 'Follow the cards in your head', '追踪执行 · 猜终点', '追蹤執行 · 猜終點', 'Trace it: guess the end', 'B ▸ → → → ↓', 'B ▸ ↓ → → → ↓ ↓'],
    ['多走了一步', '多走了一步', 'One step too many', '调试 · 删除', '除錯 · 刪除', 'Debug: delete', ['删掉末尾的 ↓，得到 → →', '刪掉末尾的 ↓，得到 → →', 'Delete the last ↓ to get → →'], ['删掉末尾的 ↓，得到 → → →', '刪掉末尾的 ↓，得到 → → →', 'Delete the last ↓ to get → → →']],
    ['还差一步呢', '還差一步呢', 'One step short', '调试 · 补充', '除錯 · 補充', 'Debug: add', ['原题 → ↓，补上 →', '原題 → ↓，補上 →', 'Given → ↓, add →'], ['原题 → → ↓，补上 ↓ →', '原題 → → ↓，補上 ↓ →', 'Given → → ↓, add ↓ →']],
    ['这一步撞石头', '這一步撞石頭', 'This step hits a rock', '调试 · 替换', '除錯 · 替換', 'Debug: replace', ['第 3 张换成 ↓：→ → ↓ ↓', '第 3 張換成 ↓：→ → ↓ ↓', 'Swap card 3 for ↓: → → ↓ ↓'], ['第 3 张换成 →：→ → → ↓ ↓', '第 3 張換成 →：→ → → ↓ ↓', 'Swap card 3 for →: → → → ↓ ↓']],
    ['一样的脚步', '一樣的腳步', 'Same steps', '循环 · 重复向右', '迴圈 · 重複向右', 'Loop: repeat right', '×2[→]', '×3[→]'],
    ['向下数一数', '向下數一數', 'Count going down', '循环 · 改变次数', '迴圈 · 改變次數', 'Loop: change the count', '×2[↓]', '×3[↓]'],
    ['两段小旅行', '兩段小旅行', 'Two short trips', '循环 · 组合', '迴圈 · 組合', 'Loop: combine', '×2[→] ×2[↓]', '×3[→] ×3[↓]'],
    ['楼梯舞步', '樓梯舞步', 'Staircase dance', '循环 · 重复片段', '迴圈 · 重複片段', 'Loop: repeat a chunk', '×2[→ ↓]', '×3[→ ↓]'],
    ['换个舞步', '換個舞步', 'A new dance step', '循环 · 顺序有用', '迴圈 · 順序有用', 'Loop: order matters', '×2[↓ →]', '×3[↓ →]'],
    ['浇一排小花', '澆一排小花', 'Water a row of flowers', '循环 · 动作与移动', '迴圈 · 動作與移動', 'Loop: actions and moves', '×2[❀ →]', '×3[❀ →]'],
    ['这里有花吗', '這裡有花嗎', 'Is there a flower here?', '条件 · 观察一次', '條件 · 觀察一次', 'If: check once', '?[❀] →', '→ ?[❀] →'],
    ['没有花的时候', '沒有花的時候', 'When there is no flower', '条件 · 否则', '條件 · 否則', 'If: otherwise', '×2[?[❀ | →]]', '×3[?[❀ | →]]'],
    ['照顾路边花', '照顧路邊花', 'Tend the roadside flowers', '条件 · 每次检查', '條件 · 每次檢查', 'If: check every time', '×2[?[❀] →]', '×3[?[❀] →]'],
    ['花朵指路牌', '花朵指路牌', 'Flower signposts', '分支 · 两种办法', '分支 · 兩種辦法', 'Branches: two ways', '×2[?[❀ ↓ | →]]', '×3[?[❀ ↓ | →]]'],
    ['帮条件卡找错', '幫條件卡找錯', 'Fix the if card', '条件调试 · 改分支', '條件除錯 · 改分支', 'Debug an if: change a branch', ['把有花分支改成 ❀：?[❀] →', '把有花分支改成 ❀：?[❀] →', 'Make the flower branch ❀: ?[❀] →'], ['把有花分支改成 ❀：→ ?[❀] →', '把有花分支改成 ❀：→ ?[❀] →', 'Make the flower branch ❀: → ?[❀] →']],
    ['森林巡游', '森林巡遊', 'Forest patrol', '组合 · 循环与条件', '組合 · 迴圈與條件', 'Combine: loops and ifs', '×2[?[❀] → ↓]', '×3[?[❀] → ↓]'],
    ['先拿，再送', '先拿，再送', 'Pick up, then deliver', '任务拆解 · 小帮手', '任務拆解 · 小幫手', 'Break it down: the helper', '★=[◇]  → ★ →', '★=[◇]  → ★ → →'],
    ['浇花小帮手', '澆花小幫手', 'Watering helper', '命名步骤 · 多次调用', '命名步驟 · 多次呼叫', 'Name steps: call many times', '★=[❀ →]  ★ ★', '★=[❀ →]  ★ ★ ★'],
    ['教会一个舞步', '教會一個舞步', 'Teach a dance step', '编辑动作包 · 复用', '編輯動作包 · 重複使用', 'Edit the helper: reuse', '★=[→ ↓]  ★ ★', '★=[→ ↓]  ★ ★ ★'],
    ['帮手也能循环', '幫手也能循環', 'Helpers can loop too', '循环调用 · 复用', '迴圈呼叫 · 重複使用', 'Call in a loop: reuse', '★=[?[❀] →]  ×2[★]', '★=[?[❀] →]  ×3[★]'],
    ['礼物配送队', '禮物配送隊', 'Gift delivery crew', '拆解 · 取货和送达', '拆解 · 取貨和送達', 'Break it down: pick up and deliver', '★=[◇ → ?[❀]]  ★ → ↓', '★=[◇ → ?[❀]]  ★ → → ↓ ↓'],
    ['花园总动员', '花園總動員', 'Garden all-hands', '综合任务 · 一起完成', '綜合任務 · 一起完成', 'Put it all together', '★=[?[❀] → ↓]  ×2[★] ◇', '★=[?[❀] → ↓]  ×3[★] ◇'],
    ['摆个新终点', '擺個新終點', 'Move the finish', '创作 · 保存与展示', '創作 · 儲存與展示', 'Create: save and show', ['移动终点，保存后自己排路线', '移動終點，儲存後自己排路線', 'Move the finish, save, then plan a route'], ['更远的初始目标，移动终点后重新规划', '更遠的初始目標，移動終點後重新規劃', 'A farther goal; move the finish and plan again']],
    ['换个起点', '換個起點', 'A new starting point', '创作 · 保存与展示', '創作 · 儲存與展示', 'Create: save and show', ['移动起点，保存后重新排路线', '移動起點，儲存後重新排路線', 'Move the start, save, then plan again'], ['移动起点并规划较长路线', '移動起點並規劃較長路線', 'Move the start and plan a longer route']],
    ['加一块石头', '加一塊石頭', 'Add a rock', '创作 · 保存与展示', '創作 · 儲存與展示', 'Create: save and show', ['添加至少一块石头并绕行', '加入至少一塊石頭並繞行', 'Add at least one rock and go around it'], ['在较长路线中安排障碍和绕行', '在較長路線中安排障礙和繞行', 'Place obstacles and detours on a longer route']],
    ['种一朵小花', '種一朵小花', 'Plant a flower', '创作 · 保存与展示', '創作 · 儲存與展示', 'Create: save and show', ['添加至少一朵花，先浇花再完成', '加入至少一朵花，先澆花再完成', 'Add at least one flower; water it, then finish'], ['较长路线中安排浇花和送达', '較長路線中安排澆花和送達', 'Plan watering and delivery on a longer route']],
    ['给伙伴出题', '給夥伴出題', 'A puzzle for a friend', '创作 · 保存与展示', '創作 · 儲存與展示', 'Create: save and show', ['至少修改一处地图，保存并测试', '至少修改一處地圖，儲存並測試', 'Change at least one thing, save and test'], ['调整地图，邀请伙伴测试另一种方案', '調整地圖，邀請夥伴測試另一種方案', 'Adjust the map and invite a friend to try another solution']],
    ['我的毕业作品', '我的畢業作品', 'My graduation project', '创作 · 保存与展示', '創作 · 儲存與展示', 'Create: save and show', ['同时放石头和小花，保存并完成', '同時放石頭和小花，儲存並完成', 'Place a rock and a flower, save and finish'], ['同时安排绕行、浇花和较远的终点', '同時安排繞行、澆花和較遠的終點', 'Combine a detour, watering and a farther finish']]
  ];
  var LI = { zh: 0, tw: 1, en: 2 };

  // 生成 13×13 的像素星球
  function orb(color, ring) {
    var r = '', R = 5.6;
    for (var y = 0; y < 13; y++) {
      for (var x = 0; x < 13; x++) {
        var dx = x - 6, dy = y - 6, dd = Math.sqrt(dx * dx + dy * dy);
        if (dd <= R) {
          var fill = color, op = '';
          if (dx + dy > 4) {
            op = ' opacity=".72"';
          } else if (dx + dy < -5) {
            fill = '#FFFFFF';
            op = ' opacity=".55"';
          }
          r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + fill + '"' + op + '/>';
        }
      }
    }
    var ringSvg = ring ? '<rect x="0" y="7" width="13" height="1" fill="#1F2A44" opacity=".8"/>' : '';
    return '<svg class="orb" viewBox="-1 -1 15 15" shape-rendering="crispEdges" aria-hidden="true">' + r + ringSvg + '</svg>';
  }

  var mapApi = (function () {
    var wrap = $('#planets'), detail = $('#detail');
    var tiles = [], sel = 0;
    function render() {
      var li = LI[lang];
      wrap.innerHTML = '';
      tiles = [];
      THEMES.forEach(function (th, t) {
        var art = doc.createElement('article');
        art.className = 'planet';
        art.style.setProperty('--c', th.c);
        art.innerHTML = '<header>' + orb(th.c, t % 2 === 1) + '<div><h3>' + th.n[li] + '</h3><span class="range">' +
          m('range', { a: pad2(t * 6 + 1), b: pad2(t * 6 + 6) }) + '</span></div></header><p>' + th.d[li] + '</p>';
        var path = doc.createElement('div');
        path.className = 'path';
        for (var k = 0; k < 6; k++) {
          var n = t * 6 + k;
          var b = doc.createElement('button');
          b.type = 'button';
          b.className = 'tile';
          b.textContent = pad2(n + 1);
          b.dataset.i = n;
          b.setAttribute('aria-label', m('pick', { n: n + 1, t: LESSONS[n][li] }));
          b.tabIndex = n === sel ? 0 : -1;
          path.appendChild(b);
          tiles[n] = b;
        }
        art.appendChild(path);
        wrap.appendChild(art);
      });
      select(sel, false);
    }
    function pad2(n) {
      return (n < 10 ? '0' : '') + n;
    }
    function ref(v, li) {
      return typeof v === 'string' ? v : v[li];
    }
    function select(n, focus) {
      sel = n;
      var li = LI[lang], L = LESSONS[n];
      tiles.forEach(function (b, i) {
        b.setAttribute('aria-pressed', String(i === n));
        b.tabIndex = i === n ? 0 : -1;
      });
      if (focus) {
        tiles[n].focus();
      }
      detail.innerHTML = '<span class="no">' + pad2(n + 1) + '</span><h3>' + L[li] + '</h3><span class="tag">' + L[3 + li] + '</span>' +
        '<div class="refs"><div><b>' + m('explore') + '</b><code>' + ref(L[6], li) + '</code></div><div><b>' + m('challenge') +
        '</b><code>' + ref(L[7], li) + '</code></div></div>';
    }
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('.tile');
      if (b) {
        select(+b.dataset.i, true);
      }
    });
    wrap.addEventListener('keydown', function (e) {
      var d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 6, ArrowUp: -6 }[e.key];
      if (d && e.target.closest('.tile')) {
        e.preventDefault();
        select((sel + d + 36) % 36, true);
      }
    });
    return { render: render };
  })();

  /* ---------------- 安装方式标签页 ---------------- */
  var tabs = $$('[role="tab"]');
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      $('#' + x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) {
      t.focus();
    }
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      selectTab(t);
    });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
      if (d) {
        e.preventDefault();
        selectTab(tabs[(i + d + tabs.length) % tabs.length], true);
      }
    });
  });

  /* ---------------- 滚动渐入 ---------------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(function (el) {
    io.observe(el);
  });

  onLang = function () {
    mapApi.render();
    demo.relabel();
  };
  applyTheme(themePref);
  applyLang(pickLang());
})();
