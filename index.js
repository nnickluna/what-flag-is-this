const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function constructTwemojiURL(icon, options) {
  return ''.concat(
    options.base, 
    options.size, 
    '/',
    icon,         
    options.ext   
  );
}

// A = 127462 in dec
// Z = 127487 in dec

// A = U+1F1E6 in hex
// Z = U+1F1FF in hex

function updateTxt(value) {
  const codePoints = Array.from(value).map(char => char.codePointAt(0));
  const hexValues = codePoints.map(point => point.toString(16).toUpperCase().padStart(4, '0'));
  const decValues = [parseInt(hexValues[0], 16), parseInt(hexValues[1], 16)]
  for (let x = 0; x < decValues.length; x++) {
    num = decValues[x]
    if (value == "") {
      document.querySelector('#ans').style.visibility = "hidden"
      document.querySelector('#flagHere').style.visibility = "hidden"
      return null
    }
    else if (num < 127462 || num > 127487) {
      document.querySelector('#ans').style.visibility = "hidden"
      document.querySelector('#flagHere').style.visibility = "hidden"
      return null
    }
    else {
      document.querySelector('#ans').style.visibility = "visible"
      document.querySelector('#flagHere').style.visibility = "visible"
      console.log(num-127461)
    }
  }
  // console.log(decValues);
  let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
  document.querySelector('#ans').innerText = regionNames.of(decValues.map(x => letters[x-127462]).join(''));

  twemoji.parse(value, {
    callback: (icon, options) => {
      document.querySelector('#flagHere').src = constructTwemojiURL(icon, options)        
    }
  })
}