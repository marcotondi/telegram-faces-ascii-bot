"use strict";

const Telegraf = require("telegraf");

const config = require("./config");
const dataService = require("./dataService");

const bot = new Telegraf(config.botToken);

const helpMsg = `Riepilogo comandi:
/start - Avvia il bot
/face - invia una facca ASCII casuale
/face x - invia x facce ASCII casuali
/stop - Fermare bot
/about - Mostra informazioni sul bot
/help - Mostra questa pagina di aiuto`;

const inputErrMsg = `ðŸ’¥ BOOM... ðŸ”©â˜ ðŸ”§ðŸ”¨âš¡ï¸
Ops, qualcosa è andato storto.
Usa il comando \"/face x\", con x un numero intero.`;

const aboutMsg =
  "Questo bot è stato creato da Marco solo per divertimento. \n Il codice sorgente sarà presto disponibile.";

//get username for group command handling
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
  console.log("Initialized", botInfo.username);
});

bot.command("broadcast", (ctx) => {
  if (ctx.from.id == config.adminChatId) {
    var words = ctx.message.text.split(" ");
    words.shift(); //remove first word (which ist "/broadcast")
    if (words.length == 0)
      //don't send empty message
      return;
    var broadcastMessage = words.join(" ");
    var userList = dataService.getUserList();
    console.log("Sending broadcast message to", userList.length, "users:  ", broadcastMessage);
    userList.forEach((userId) => {
      console.log(">", { id: userId }, broadcastMessage);
      ctx.telegram.sendMessage(userId, broadcastMessage);
    });
  }
});

bot.command("start", (ctx) => {
  dataService.registerUser(ctx);
  var m = "Ciao :) \ndigita /help per scoprire come usarmi ;)";
  ctx.reply(m);
});

bot.command("stop", (ctx) => {
  var m = "Giuro, ci sto provando! (¬_¬)";
  ctx.reply(m);
});

bot.command("help", (ctx) => {
  ctx.reply(helpMsg);
});

bot.command("about", (ctx) => {
  ctx.reply(aboutMsg);
});

bot.hears(/\/face (\d+)/, ({ match, reply }) => {
  const n = match[1];

  for (var i = 0; i < n; i++) {
    reply(faces[getRandom(0, faces.length - 1)].toString());
  }

  return;
});

bot.hears(/\/face/, (ctx) => {
  var msg = faces[getRandom(0, faces.length - 1)];

  ctx.reply(msg);
});

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

var faces = [
  "¯_(ツ)_/¯",
  "( .-. )",
  "( .o.)",
  "( `·´ )",
  "( ° ͜ ʖ °)",
  "( ͡° ͜ʖ ͡°)",
  "( ⚆ _ ⚆ )",
  "( ︶︿︶)",
  "( ﾟヮﾟ)",
  "(\\/)(°,,,°)(\\/)",
  "(¬_¬)",
  "(¬º-°)¬",
  "(¬‿¬)",
  "(°ロ°)☝",
  "(´・ω・)っ",
  "(ó ì_í)",
  "(ʘᗩʘ')",
  "(ʘ‿ʘ)",
  "(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄",
  "(͡° ͜ʖ ͡°)",
  "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
  "(ಠ_ಠ)",
  "(ಠ‿ಠ)",
  "(ಠ⌣ಠ)",
  "(ಥ_ಥ)",
  "(ಥ﹏ಥ)",
  "(ง ͠° ͟ل͜ ͡°)ง",
  "(ง ͡ʘ ͜ʖ ͡ʘ)ง",
  "(ง •̀_•́)ง",
  "(ง'̀-'́)ง",
  "(ง°ل͜°)ง",
  "(ง⌐□ل͜□)ง",
  "(ღ˘⌣˘ღ)",
  "(ᵔᴥᵔ)",
  "(•ω•)",
  "(•◡•)/",
  "(⊙ω⊙)",
  "(⌐■_■)",
  "(─‿‿─)",
  "(╯°□°）╯",
  "(◕‿◕)",
  "(☞ﾟ∀ﾟ)☞",
  "(❍ᴥ❍ʋ)",
  "(っ◕‿◕)っ",
  "(づ｡◕‿‿◕｡)づ",
  "(ノಠ益ಠ)ノ",
  "(ノ・∀・)ノ",
  "(；一_一)",
  "(｀◔ ω ◔´)",
  "(｡◕‿‿◕｡)",
  "(ﾉ◕ヮ◕)ﾉ",
  "*<{:¬{D}}}",
  "=^.^=",
  "t(-.-t)",
  "| (• ◡•)|",
  "~(˘▾˘~)",
  "¬_¬",
  "¯(°_o)/¯",
  "°Д°",
  "ɳ༼ຈل͜ຈ༽ɲ",
  "ʅʕ•ᴥ•ʔʃ",
  "ʕ´•ᴥ•`ʔ",
  "ʕ•ᴥ•ʔ",
  "ʕ◉.◉ʔ",
  "ʕㅇ호ㅇʔ",
  "ʕ；•`ᴥ•´ʔ",
  "ʘ‿ʘ",
  "͡° ͜ʖ ͡°",
  "ζ༼Ɵ͆ل͜Ɵ͆༽ᶘ",
  "Ѱζ༼ᴼل͜ᴼ༽ᶘѰ",
  "ب_ب",
  "٩◔̯◔۶",
  "ಠ_ಠ",
  "ಠoಠ",
  "ಠ~ಠ",
  "ಠ‿ಠ",
  "ಠ⌣ಠ",
  "ಠ╭╮ಠ",
  "ರ_ರ",
  "ง ͠° ل͜ °)ง",
  "๏̯͡๏﴿",
  "༼ ºººººل͟ººººº ༽",
  "༼ ºل͟º ༽",
  "༼ ºل͟º༼",
  "༼ ºل͟º༽",
  "༼ ͡■ل͜ ͡■༽",
  "༼ つ ◕_◕ ༽つ",
  "༼ʘ̚ل͜ʘ̚༽",
  "ლ(´ڡ`ლ)",
  "ლ(́◉◞౪◟◉‵ლ)",
  "ლ(ಠ益ಠლ)",
  "ᄽὁȍ ̪őὀᄿ",
  "ᔑ•ﺪ͟͠•ᔐ",
  "ᕕ( ᐛ )ᕗ",
  "ᕙ(⇀‸↼‶)ᕗ",
  "ᕙ༼ຈل͜ຈ༽ᕗ",
  "ᶘ ᵒᴥᵒᶅ",
  "‎‎(ﾉಥ益ಥ）ﾉ",
  "≧☉_☉≦",
  "⊙▃⊙",
  "⊙﹏⊙",
  "┌( ಠ_ಠ)┘",
  "╚(ಠ_ಠ)=┐",
  "◉_◉",
  "◔ ⌣ ◔",
  "◔̯◔",
  "◕‿↼",
  "◕‿◕",
  "☉_☉",
  "☜(⌒▽⌒)☞",
  "☼.☼",
  "♥‿♥",
  "⚆ _ ⚆",
  "✌(-‿-)✌",
  "〆(・∀・＠)",
  "ノ( º _ ºノ)",
  "ノ( ゜-゜ノ)",
  "ヽ( ͝° ͜ʖ͡°)ﾉ",
  "ヽ(`Д´)ﾉ",
  "ヽ༼° ͟ل͜ ͡°༽ﾉ",
  "ヽ༼ʘ̚ل͜ʘ̚༽ﾉ",
  "ヽ༼ຈل͜ຈ༽ง",
  "ヽ༼ຈل͜ຈ༽ﾉ",
  "ヽ༼Ὸل͜ຈ༽ﾉ",
  "ヾ(⌐■_■)ノ",
  "﴾͡๏̯͡๏﴿",
  "｡◕‿◕｡",
  "ʕノ◔ϖ◔ʔノ",
  "(╯°□°）╯︵ ┻━┻",
  "ಠ_ರೃ",
  "(ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू)",
  "(۶ૈ ۜ ᵒ̌▱๋ᵒ̌ )۶ૈ=͟͟͞͞ ⌨",
  "₍˄·͈༝·͈˄₎◞ ̑̑ෆ⃛",
  "(*ﾟ⚙͠ ∀ ⚙͠)ﾉ❣",
  "٩꒰･ัε･ั ꒱۶",
  "ヘ（。□°）ヘ",
  "૮( ᵒ̌ૢཪᵒ̌ૢ )ა",
  "“ψ(｀∇´)ψ",
  "ಠﭛಠ",
  "(๑>ᴗ<๑)",
  "٩(•̤̀ᵕ•̤́๑)ᵒᵏᵎᵎᵎᵎ",
  "(oT-T)尸",
  "(✌ﾟ∀ﾟ)☞",
  "ಥ‿ಥ",
  "ॱ॰⋆(˶ॢ‾᷄﹃‾᷅˵ॢ)",
  "┬┴┬┴┤  (ಠ├┬┴┬┴",
  "( ˘ ³˘)♥",
  "Σ (੭ु ຶਊ ຶ)੭ु⁾⁾",
  "(⑅ ॣ•͈ᴗ•͈ ॣ)",
  "ヾ(´￢｀)ﾉ",
  "(•̀o•́)ง",
  "(๑•॒̀ ູ॒•́๑)",
  "⚈้̤͡ ˌ̫̮ ⚈้̤͡",
  "=͟͟͞͞ =͟͟͞͞ ﾍ( ´Д`)ﾉ",
  "(((╹д╹;)))",
  "•̀.̫•́✧",
  "(ᵒ̤̑ ₀̑ ᵒ̤̑)",
  "_(ʘ_ʘ)_/",
  "乙(ツ)乙",
  "乙(のっの)乙",
  "ヾ(¯∇￣๑)",
  "_(ʘ_ʘ)_/",
  "༼;´༎ຶ ۝ ༎ຶ༽",
];

// --------------------- AWS Lambda handler function ---------------------------------------------------------------- //
// https://github.com/telegraf/telegraf/issues/129
exports.handler = (event, context, callback) => {
  bot.handleUpdate(JSON.parse(event.body)); // make Telegraf process that data
  return callback(null, { statusCode: 200, body: JSON.stringify({ message: "OK" }) });
};
