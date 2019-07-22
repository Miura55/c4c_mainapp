var lang = msg.req.query.lang;

switch (flow.get("lang")){
case "en":
    msg.payload.system_str={
        "role":"volunteer",
        "sign-in":"sign in",
        "sign-up":"sign up",
        "registration":"registration",
        "authentication":"authentication",
        "go-to-after-login":"go to after login",
        "content-of-authentication":"I write about auth in here.",
        "able-to-work":"Can you able to work now?",
        "notification":"notification",
        "assined-to-task":"You are assign to new task.",
        "cancel-task":"The task you are assgined is canceled.",
        "your-task":"your tasks.",
        "show-completed-tasks":"Show completed tasks.",
        "profile":"profile",
        "completed-tasks":"completed tasks.",
        "input-search-word":"input search word",
        "serach":"search",
        "edit":"edit",
        "back":"back"
    };
    break;
case "ja":
    msg.payload.system_str={
        "role":"ボランティア",
        "sign-in":"ログイン",
        "sign-up":"新規登録",
        "registration":"新規登録",
        "authentication":"認証",
        "go-to-after-login":"ログイン後の画面へ",
        "content-of-authentication":"あとで実装して説明書く。",
        "able-to-work":"今、案件の受付は可能ですか？",
        "notification":"新着通知",
        "assined-to-task":"あなたに課題が割り当てられました。",
        "cancel-task":"割り当てられていた課題がキャンセルされました。",
        "your-task":"担当中案件",
        "show-completed-tasks":"従事済み一覧を見る",
        "profile":"登録情報",
        "completed-tasks":"従事済み一覧",
        "input-search-word":"検索語句を入力",
        "serach":"絞込む",
        "edit":"編集",
        "back":"戻る"
    };
    break;
default:
    msg.payload.system_str={
        "role":"volunteer",
        "sign-in":"sign in",
        "sign-up":"sign up",
        "registration":"registration",
        "authentication":"authentication",
        "go-to-after-login":"go to after login",
        "content-of-authentication":"I write about auth in here.",
        "able-to-work":"Can you able to work now?",
        "notification":"notification",
        "assined-to-task":"You are assign to new task.",
        "cancel-task":"The task you are assgined is canceled.",
        "your-task":"your tasks.",
        "show-completed-tasks":"Show completed tasks.",
        "profile":"profile",
        "completed-tasks":"completed tasks.",
        "input-search-word":"input search word",
        "serach":"search",
        "edit":"edit",
        "back":"back"
    };
    break;
}
return msg;
