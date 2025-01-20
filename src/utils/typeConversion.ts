'use strict';

export class FridaTypeUtils {

  /**
   * Quick and convenient printing of objects in frida
   * * Preconditions: r0gson.dex
   * @param obj
   */
  static java_obj(obj: object) {
    Java.openClassFile('/data/local/tmp/r0gson.dex').load();
    const gson = Java.use('com.r0ysue.gson.Gson').$new();
    return gson.toJson(obj);
  }

  static byte(val: any) {
    const JString = Java.use('java.lang.String');
    return JString.$new(val);
  }

  static toString(obj: any) {
    return obj.toString();
  }

  static stringify(obj: object) {
    return JSON.stringify(obj);
  }

  static assign(obj: any) {
    for (const a in Object.assign(obj)) {
      console.log(a);
    }
  }
}

/**
 * utf8ByteToUnicodeStr
 * @see https://github.com/saucer-man/frida_example
 * @param {[]} utf8Bytes
 * @returns {string}
 */
// export // byte[]转string
// 完美解决中文乱码的问题
// 网上的常规思路是将数组变为16进制字符串，然后再每两位转化成字符，这样会带来中文乱码的问题
export function utf8ByteToUnicodeStr(utf8Bytes: []) {
  let unicodeStr = '';
  for (let pos = 0; pos < utf8Bytes.length;) {
    const flag = utf8Bytes[pos];
    let unicode = 0;
    if ((flag >>> 7) === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    } else if ((flag & 0xFC) === 0xFC) {
      unicode = (utf8Bytes[pos] & 0x3) << 30;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 5] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 6;

    } else if ((flag & 0xF8) === 0xF8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 4] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 5;

    } else if ((flag & 0xF0) === 0xF0) {
      unicode = (utf8Bytes[pos] & 0xF) << 18;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 3] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 4;

    } else if ((flag & 0xE0) === 0xE0) {
      unicode = (utf8Bytes[pos] & 0x1F) << 12;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 2] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 3;

    } else if ((flag & 0xC0) === 0xC0) { //110
      unicode = (utf8Bytes[pos] & 0x3F) << 6;
      unicode |= (utf8Bytes[pos + 1] & 0x3F);
      unicodeStr += String.fromCharCode(unicode);
      pos += 2;

    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos]);
      pos += 1;
    }
  }
  return unicodeStr;
}

export function buff2hex(buffer: any) { // buffer is an ArrayBuffer
  // create a byte array (Uint8Array) that we can use to read the array buffer
  const byteArray = new Uint8Array(buffer);

  // for each element, we want to get its two-digit hexadecimal representation
  const hexParts = [];
  for (let i = 0; i < byteArray.length; i++) {
    // convert value to hexadecimal
    const hex = byteArray[i].toString(16);

    // pad with zeros to length 2
    const paddedHex = ('00' + hex).slice(-2);

    // push to array
    hexParts.push(paddedHex);
  }

  // join all the hex values of the elements into a single string
  return hexParts.join('');
}