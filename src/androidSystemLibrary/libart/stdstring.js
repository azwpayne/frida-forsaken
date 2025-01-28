class StdString {

  constructor() {
    this.handle = Memory.alloc(3 * Process.pointerSize);
  }

  dispose() {
    const [data, isTiny] = this._getData();
    if (!isTiny) {
      Java['api'].$delete(data);
    }
  }

  disposeToString() {
    const result = this.toString();
    this.dispose();
    return result;
  }

  toString() {
    const [data] = this._getData();
    return data.readUtf8String();
  }

  _getData() {
    const str = this.handle;
    const isTiny = (str.readU8() & 1) === 0;
    const data = isTiny ? str.add(1) : str.add(2 * Process.pointerSize).readPointer();
    return [data, isTiny];
  }
}

/**
 *
 * @param method_id
 * @param withSignature
 * @returns {string}
 * @see https://android.googlesource.com/platform/art/+/master/runtime/art_method.cc#850
 *
 */
export function prettyMethod(method_id, withSignature) {
  const result = new StdString();
  Java['api']['art::ArtMethod::PrettyMethod'](result, method_id, withSignature ? 1 : 0);
  return result.disposeToString();
}