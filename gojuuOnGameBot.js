//import apikey
const env_config = require('./.env.config.js');
//init telegram bot api
const TelegramBot = require('node-telegram-bot-api');
const token = env_config.tgbot_token();
const bot = new TelegramBot(token, { polling: true });
//check romaji
var hepburn = require("hepburn");
//random kana
var randomKana = require('./randomJapaneseKana')

var total = {};
var score = {};
var lastword = {};
var kanaMode = {};
bot.onText(/.+/, message => {
  console.log(message); // for debug
  const chatId = message.chat.id;
  console.log('you say:' + message.text);
  const msg = message.text;
  if(msg.startsWith("/")){
    //bot.sendMessage(chatId,"you say: "+ message.text + " | response: " + "it is command.");
    //switch for command.
    switch(msg) {
    case "/start":
        total[chatId] = 0;
        score[chatId] = 0;
        lastword[chatId] = "";
        kanaMode[chatId] = 0; // kanaMode { 1 : hinagana , 2 : katakana , other : both}
        bot.sendMessage(chatId, "Game Start!\nEnter something to start the game!");
        break;
    case "/end":
        bot.sendMessage(chatId, "Game Over!");
        break;
    default:
        bot.sendMessage(chatId, "系統：未定義指令。")
    }
  }else if(total[chatId] != null && score[chatId] != null){
      var returnMsg = "";
      console.log("\nlastword：" + lastword[chatId])
      //if there have lastword, make a condition
      if (lastword[chatId]){

                  const romaji = hepburn.fromKana(lastword[chatId])
                  if(romaji.replace(" ", "").toUpperCase() == msg.replace(" ", "").toUpperCase()){
                    returnMsg += "You are corrent!\n"
                    score[chatId] += 1;
                  }else{
                    returnMsg += "You are wrong!\nThe Answer: " + romaji + "\n"
                  }
                  total[chatId] += 1;
                  returnMsg += "Scores: " + score[chatId] + "/" + total[chatId] + '\n'
                  returnMsg += "==================\n"
      }else{

      }
      //gen new lastword and store it
      var kanaModeInt = kanaMode[chatId];
      if(kanaMode[chatId] != 1 || kanaMode[chatId] != 2){
        kanaModeInt = randomIntInc(1,2);
      }

      if(kanaModeInt == 1){
        lastword[chatId] = randomKana.hiragana()
        //console.log(gimei.name().last().hiragana())
        returnMsg += 'What is romaji of\"'  + lastword[chatId] +  '\"?'
      }else if(kanaModeInt == 2){
        lastword[chatId] = randomKana.hiragana()
        returnMsg += 'What is romaji of\"'  + lastword[chatId] +  '\"?'
      }
      bot.sendMessage(chatId, returnMsg);
  }else{
    bot.sendMessage(chatId, "Please enter '/start' to start first!")
  }
  //bot.sendMessage(chatId, 'you: '+ message.text + '| tcl: 咩事+_+');

});

//extra function
function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
