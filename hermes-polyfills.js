// Alternative Hermes Polyfills for Expo Go
// This file ensures critical APIs are available in Hermes

(function() {
  'use strict';
  
  // Ensure we're in a React Native environment
  if (typeof global !== 'undefined' && typeof window === 'undefined') {
    console.log('🔧 Loading Hermes polyfills...');
    
    // FormData implementation specifically for Hermes
    if (typeof global.FormData === 'undefined') {
      console.log('📝 Creating FormData polyfill...');
      
      class FormDataPolyfill {
        constructor() {
          this._entries = [];
        }

        append(name, value, filename) {
          this._entries.push({
            name: String(name),
            value: value,
            filename: filename
          });
        }

        delete(name) {
          const nameStr = String(name);
          this._entries = this._entries.filter(entry => entry.name !== nameStr);
        }

        get(name) {
          const nameStr = String(name);
          const entry = this._entries.find(entry => entry.name === nameStr);
          return entry ? entry.value : null;
        }

        getAll(name) {
          const nameStr = String(name);
          return this._entries
            .filter(entry => entry.name === nameStr)
            .map(entry => entry.value);
        }

        has(name) {
          const nameStr = String(name);
          return this._entries.some(entry => entry.name === nameStr);
        }

        set(name, value, filename) {
          this.delete(name);
          this.append(name, value, filename);
        }

        entries() {
          const entries = this._entries.map(entry => [entry.name, entry.value]);
          return {
            [Symbol.iterator]: function() {
              let index = 0;
              return {
                next: function() {
                  if (index < entries.length) {
                    return { value: entries[index++], done: false };
                  } else {
                    return { done: true };
                  }
                }
              };
            }
          }[Symbol.iterator]();
        }

        keys() {
          const keys = this._entries.map(entry => entry.name);
          return {
            [Symbol.iterator]: function() {
              let index = 0;
              return {
                next: function() {
                  if (index < keys.length) {
                    return { value: keys[index++], done: false };
                  } else {
                    return { done: true };
                  }
                }
              };
            }
          }[Symbol.iterator]();
        }

        values() {
          const values = this._entries.map(entry => entry.value);
          return {
            [Symbol.iterator]: function() {
              let index = 0;
              return {
                next: function() {
                  if (index < values.length) {
                    return { value: values[index++], done: false };
                  } else {
                    return { done: true };
                  }
                }
              };
            }
          }[Symbol.iterator]();
        }

        forEach(callback, thisArg) {
          this._entries.forEach(entry => {
            callback.call(thisArg, entry.value, entry.name, this);
          });
        }

        [Symbol.iterator]() {
          return this.entries();
        }
      }

      // Install FormData globally
      global.FormData = FormDataPolyfill;
      
      // Also make it available without global prefix
      if (typeof FormData === 'undefined') {
        global.FormData = FormDataPolyfill;
      }
      
      console.log('✅ FormData polyfill installed');
    }

    // Basic Headers polyfill
    if (typeof global.Headers === 'undefined') {
      global.Headers = class Headers {
        constructor(init) {
          this._headers = {};
          if (init) {
            if (typeof init === 'object') {
              Object.keys(init).forEach(key => {
                this.set(key, init[key]);
              });
            }
          }
        }

        set(name, value) {
          this._headers[name.toLowerCase()] = String(value);
        }

        get(name) {
          return this._headers[name.toLowerCase()] || null;
        }

        has(name) {
          return name.toLowerCase() in this._headers;
        }

        delete(name) {
          delete this._headers[name.toLowerCase()];
        }

        forEach(callback) {
          Object.keys(this._headers).forEach(key => {
            callback(this._headers[key], key, this);
          });
        }
      };
      console.log('✅ Headers polyfill installed');
    }

    // Basic Blob polyfill
    if (typeof global.Blob === 'undefined') {
      global.Blob = class Blob {
        constructor(parts = [], options = {}) {
          this.size = 0;
          this.type = options.type || '';
          if (parts) {
            parts.forEach(part => {
              if (typeof part === 'string') {
                this.size += part.length;
              }
            });
          }
        }
      };
      console.log('✅ Blob polyfill installed');
    }

    console.log('🎉 All Hermes polyfills loaded successfully!');
  }
})(); 