/*
 * A TypeScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 *
 * This file is derived from JavaScript MD5 project ( http://pajhome.org.uk/crypt/md5/ )
 * and is modified for oauth-typescript project.
 *
 * Copyright 2000-2002 Paul Johnston.
 * (Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet)
 * Copyright 2015 NOBUOKA Yu.
 *
 * Licensed under the BSD License.
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *   3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Configurable constiables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
const hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
const b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
const chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
export function hex_sha1(s: string): string {
  return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
export function b64_sha1(s: string): string {
  return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
export function str_sha1(s: string): string {
  return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
export function hex_hmac_sha1(key: string, data: string): string {
  return binb2hex(core_hmac_sha1(key, data));
}
export function b64_hmac_sha1(key: string, data: string): string {
  return binb2b64(core_hmac_sha1(key, data));
}
export function str_hmac_sha1(key: string, data: string): string {
  return binb2str(core_hmac_sha1(key, data));
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x: number[], len: number): number[] {
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - (len % 32));
  x[(((len + 64) >> 9) << 4) + 15] = len;

  const w = Array(80);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  let e = -1009589776;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    const olde = e;

    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = x[i + j];
      } else {
        w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      const t = safe_add(
        safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
        safe_add(safe_add(e, w[j]), sha1_kt(j)),
      );
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return [a, b, c, d, e];
}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t: number, b: number, c: number, d: number): number {
  if (t < 20) {
    return (b & c) | (~b & d);
  }
  if (t < 40) {
    return b ^ c ^ d;
  }
  if (t < 60) {
    return (b & c) | (b & d) | (c & d);
  }
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t: number): number {
  return t < 20
    ? 1518500249
    : t < 40
    ? 1859775393
    : t < 60
    ? -1894007588
    : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key: string, data: string): number[] {
  let bkey = str2binb(key);
  if (bkey.length > 16) {
    bkey = core_sha1(bkey, key.length * chrsz);
  }

  const ipad = Array(16);
  const opad = Array(16);
  for (let i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }

  const hash = core_sha1(
    ipad.concat(str2binb(data)),
    512 + data.length * chrsz,
  );
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x: number, y: number): number {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num: number, cnt: number): number {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str: string): number[] {
  const bin: number[] = [];
  const mask = (1 << chrsz) - 1;
  for (let i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |=
      (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - (i % 32));
  }
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin: number[]): string {
  let str = "";
  const mask = (1 << chrsz) - 1;
  for (let i = 0; i < bin.length * 32; i += chrsz) {
    str += String.fromCharCode(
      (bin[i >> 5] >>> (32 - chrsz - (i % 32))) & mask,
    );
  }
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray: number[]): string {
  const hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  let str = "";
  for (let i = 0; i < binarray.length * 4; i++) {
    str +=
      hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
      hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray: number[]): string {
  const tab =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let str = "";
  for (let i = 0; i < binarray.length * 4; i += 3) {
    const triplet =
      (((binarray[i >> 2] >> (8 * (3 - (i % 4)))) & 0xff) << 16) |
      (((binarray[(i + 1) >> 2] >> (8 * (3 - ((i + 1) % 4)))) & 0xff) << 8) |
      ((binarray[(i + 2) >> 2] >> (8 * (3 - ((i + 2) % 4)))) & 0xff);
    for (let j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) {
        str += b64pad;
      } else {
        str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f);
      }
    }
  }
  return str;
}
