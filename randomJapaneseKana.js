'use strict';
//var
var name = require('node-gimei')

module.exports = {

  hiragana : function(){
    name.nameObj = null
    return name.name().last().hiragana()
  },
  katakana : function(){
    name.nameObj = null
    return name.name().last().hiragana()
  }




}

  //extra function
  function randomIntInc (low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low);
  }
