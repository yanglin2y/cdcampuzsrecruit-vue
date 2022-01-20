import CryptoJS from 'crypto-js'
export default {// 加密
  encrypt (word) {
    var key = CryptoJS.enc.Utf8.parse('asdfghjkloiuytre')// Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
    encrypted = encrypted.ciphertext.toString()
    return encrypted
  },
  // 解密
  decrypt (word, keyStr) {
    var key = CryptoJS.enc.A.parse('asdfghjkloiuytre')// Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }

}
