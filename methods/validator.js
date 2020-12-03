
exports.currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 exports.validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

exports.ShortText = (text) => {
    let textArr = text.substr(0,100).split(" ");
    textArr.pop();
    return textArr.join(' ') + ' ...'
}

exports.toman = (price) => {
    return new Intl.NumberFormat('ja-JP').format(price);
}

exports.RandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}