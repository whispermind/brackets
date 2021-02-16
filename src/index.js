module.exports = function check(str, bracketsConfig) {
  if(str.length % 2 != 0) return false
  let substr = str.split('');

  for(let config of bracketsConfig){
    substr = trimmer(substr, config);
    if(substr.length == 0){ return true }
    if(substr.indexOf(config[0]) == '-1' && substr.lastIndexOf(config[1]) == '-1') continue
    if(!amountCheck(str, config) || config[0] == config[1] && !sameSymbolsCheck(substr, config) || config[0] != config[1] && !differentSymbolsCheck(substr, config) ) return false
  }
  return true

  function differentSymbolsCheck(str, config){
    let = opener = str.lastIndexOf(config[0]), closer = str.indexOf(config[1], opener);
    while(true){
      if(opener == -1 && closer == -1) break
      if(closer < opener || (closer - opener) % 2 == 0) return false;
      str.splice(opener, 1);
      str.splice(closer - 1, 1);
      opener = str.lastIndexOf(config[0]);
      closer = str.indexOf(config[1], opener);
    }
    return true
  }

  function sameSymbolsCheck(str,config){
    let opener = str.lastIndexOf(config[0]), closer = str.indexOf(config[1], opener);
    while(true){
      if(opener == -1) break
      if(closer < opener || opener == closer || (closer - opener) % 2 == 0) return false
      str.splice(opener, 1);
      str.splice(closer - 1, 1);
      opener = str.lastIndexOf(config[0]);
      closer = str.indexOf(config[1], opener);
    }
    return true
  }

  function amountCheck(str, config){
    let openers = 0, closers = 0;
      for(let i = 0; i < str.length; i++){
        if(str[i] == config[0]) openers++
        if(str[i] == config[1]) closers++
        if(closers > openers) return false
      }
    if(closers != openers || config[0] == config[1] && openers % 2 != 0) return false
    return true
  }

  function trimmer(str, config){
    for(let i = 0; i < str.length; i++){
      if(str[i] == config[0] && str[i+1] == config[1]){
        str.splice(i, 2);
        if(i >= 2){i -= 2}
        else i--
      }
    }
    return str;
  }
}
