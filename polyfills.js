// Hermes Polyfills for React Native and Expo Go
import 'react-native-url-polyfill/auto';

// Check if we're in React Native environment
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

// Only apply polyfills in React Native environment
if (isReactNative && typeof global !== 'undefined') {
  // FormData polyfill for Hermes in React Native
  if (typeof global.FormData === 'undefined') {
    global.FormData = class FormData {
      constructor() {
        this._data = new Map();
      }

      append(key, value, filename) {
        const entry = { value, filename };
        if (this._data.has(key)) {
          if (!Array.isArray(this._data.get(key))) {
            this._data.set(key, [this._data.get(key)]);
          }
          this._data.get(key).push(entry);
        } else {
          this._data.set(key, entry);
        }
      }

      delete(key) {
        this._data.delete(key);
      }

      get(key) {
        const entry = this._data.get(key);
        if (Array.isArray(entry)) {
          return entry[0].value;
        }
        return entry ? entry.value : null;
      }

      getAll(key) {
        const entry = this._data.get(key);
        if (Array.isArray(entry)) {
          return entry.map(e => e.value);
        }
        return entry ? [entry.value] : [];
      }

      has(key) {
        return this._data.has(key);
      }

      set(key, value, filename) {
        this._data.set(key, { value, filename });
      }

      entries() {
        const entries = [];
        for (const [key, entry] of this._data) {
          if (Array.isArray(entry)) {
            for (const e of entry) {
              entries.push([key, e.value]);
            }
          } else {
            entries.push([key, entry.value]);
          }
        }
        return entries[Symbol.iterator]();
      }

      keys() {
        return this._data.keys();
      }

      values() {
        const values = [];
        for (const entry of this._data.values()) {
          if (Array.isArray(entry)) {
            for (const e of entry) {
              values.push(e.value);
            }
          } else {
            values.push(entry.value);
          }
        }
        return values[Symbol.iterator]();
      }

      [Symbol.iterator]() {
        return this.entries();
      }

      forEach(callback) {
        for (const [key, value] of this.entries()) {
          callback(value, key, this);
        }
      }
    };
  }

  // Headers polyfill
  if (typeof global.Headers === 'undefined') {
    global.Headers = class Headers {
      constructor(init) {
        this._headers = new Map();
        if (init) {
          if (init instanceof Headers) {
            init.forEach((value, key) => this.set(key, value));
          } else if (Array.isArray(init)) {
            init.forEach(([key, value]) => this.set(key, value));
          } else if (typeof init === 'object') {
            Object.keys(init).forEach(key => this.set(key, init[key]));
          }
        }
      }

      append(name, value) {
        const lowerName = name.toLowerCase();
        const existing = this._headers.get(lowerName);
        this._headers.set(lowerName, existing ? `${existing}, ${value}` : String(value));
      }

      delete(name) {
        this._headers.delete(name.toLowerCase());
      }

      get(name) {
        return this._headers.get(name.toLowerCase()) || null;
      }

      has(name) {
        return this._headers.has(name.toLowerCase());
      }

      set(name, value) {
        this._headers.set(name.toLowerCase(), String(value));
      }

      forEach(callback) {
        this._headers.forEach((value, key) => callback(value, key, this));
      }

      keys() {
        return this._headers.keys();
      }

      values() {
        return this._headers.values();
      }

      entries() {
        return this._headers.entries();
      }

      [Symbol.iterator]() {
        return this.entries();
      }
    };
  }

  // Request polyfill (basic)
  if (typeof global.Request === 'undefined') {
    global.Request = class Request {
      constructor(input, init = {}) {
        this.url = typeof input === 'string' ? input : input.url;
        this.method = (init.method || 'GET').toUpperCase();
        this.headers = new Headers(init.headers);
        this.body = init.body || null;
        this.mode = init.mode || 'cors';
        this.credentials = init.credentials || 'same-origin';
        this.cache = init.cache || 'default';
        this.redirect = init.redirect || 'follow';
        this.referrer = init.referrer || '';
        this.referrerPolicy = init.referrerPolicy || '';
        this.integrity = init.integrity || '';
        this.keepalive = init.keepalive || false;
        this.signal = init.signal || null;
      }
    };
  }

  // Response polyfill (basic)
  if (typeof global.Response === 'undefined') {
    global.Response = class Response {
      constructor(body, init = {}) {
        this.body = body;
        this.status = init.status || 200;
        this.statusText = init.statusText || 'OK';
        this.headers = new Headers(init.headers);
        this.ok = this.status >= 200 && this.status < 300;
        this.redirected = init.redirected || false;
        this.type = init.type || 'default';
        this.url = init.url || '';
      }

      json() {
        try {
          return Promise.resolve(JSON.parse(this.body));
        } catch (error) {
          return Promise.reject(error);
        }
      }

      text() {
        return Promise.resolve(String(this.body));
      }

      blob() {
        return Promise.resolve(new Blob([this.body]));
      }

      arrayBuffer() {
        return Promise.resolve(new ArrayBuffer(0));
      }

      formData() {
        return Promise.resolve(new FormData());
      }
    };
  }

  // Blob polyfill (basic)
  if (typeof global.Blob === 'undefined') {
    global.Blob = class Blob {
      constructor(parts = [], options = {}) {
        this.parts = parts;
        this.type = options.type || '';
        this.size = parts.reduce((size, part) => {
          if (typeof part === 'string') {
            return size + part.length;
          }
          return size + (part.length || 0);
        }, 0);
      }

      slice(start = 0, end = this.size, contentType = '') {
        return new Blob(this.parts.slice(start, end), { type: contentType });
      }
    };
  }

  // File polyfill
  if (typeof global.File === 'undefined') {
    global.File = class File extends Blob {
      constructor(bits, name, options = {}) {
        super(bits, options);
        this.name = name;
        this.lastModified = options.lastModified || Date.now();
      }
    };
  }

  // AbortController polyfill
  if (typeof global.AbortController === 'undefined') {
    global.AbortController = class AbortController {
      constructor() {
        this.signal = {
          aborted: false,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
          onabort: null,
        };
      }

      abort() {
        this.signal.aborted = true;
        if (this.signal.onabort) {
          this.signal.onabort();
        }
      }
    };
  }

  console.log('✅ Hermes polyfills loaded successfully for React Native');
  console.log('📱 Environment: React Native with Hermes');
} else {
  console.log('🌐 Running in web environment, using native APIs');
} 