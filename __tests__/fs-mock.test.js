'use strict';

jest.mock('fs');
// const uppercase = require('../events/handlers/upper');
// const eventHub = require('../events/hub');

const fs = require('fs');

describe('Event Handlers', () => {
  describe('Upper', () => {
    it('should uppercase the contents of the file', (done) => {
      fs.readFile('./some/good/file.txt', (err, data) => {
        expect(fs.uppercase(data)).toBe('./SOME/GOOD/FILE.TXT CONTENTS');
      });
      done();
    });
  });

  describe('Read', () => {
    it('should be called and return data if file is good', (done) => {
      fs.readFile('./some/good/file.txt', (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBeDefined();
        done();
      });
    });
  });

  describe('Write', () => {
    it('should be called and return data if file is good', (done) => {
      fs.writeFile('./a/good/file.txt', Buffer.from('testing'), (err) => {
        expect(err).toBeUndefined();
        done();
      });
    });
  });

  // describe('Upper', () => {
  //   it('should be called and return the data in all caps', (done) => {
  //     const test =
  //     const result = uppercase(test);
  //     expect(result).toBe('SHOULD BE UPPERCASED');
  //     done();
  //   });
  // });
});

describe('mock fs', () => {
  describe('writeFile', () => {
    it('throws if file is not a string', () => {
      expect(() => {
        const cb = jest.fn();
        fs.writeFile(undefined, Buffer.from('test'), cb);
        expect(cb).not.toHaveBeenCalled();
      }).toThrow(TypeError);
    });

    it('throws if buffer is not a Buffer', () => {
      expect(() => {
        const cb = jest.fn();
        fs.writeFile('./a/good/file.txt', undefined, cb);
        expect(cb).not.toHaveBeenCalled();
      }).toThrow(TypeError);
    });

    it('throws if cb is not a function', () => {
      expect(() => {
        fs.writeFile(123, Buffer.from('test'));
      }).toThrow(TypeError);
    });

    it('calls callback with error for bad file', (done) => {
      fs.writeFile('./a/bad/file.txt', Buffer.from('test'), (err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    it('calls callback after writing good file', (done) => {
      fs.writeFile('./a/good/file.txt', Buffer.from('test'), (err) => {
        expect(err).toBeUndefined();
        done();
      });
    });
  });

  describe('readFile', () => {
    it('throws if file is not a string', () => {
      expect(() => {
        const cb = jest.fn();
        fs.readFile(undefined, cb);
        expect(cb).not.toHaveBeenCalled();
      }).toThrow(TypeError);
    });

    it('throws if cb is not a function', () => {
      expect(() => {
        fs.readFile(123);
      }).toThrow(TypeError);
    });

    it('calls callback with error for bad file', (done) => {
      fs.readFile('./a/bad/file.txt', (err, data) => {
        expect(err).toBeDefined();
        expect(data).toBeUndefined();
        done();
      });
    });

    it('calls callback with contents for previously written good file', (done) => {
      fs.readFile('./a/good/file.txt', (err, data) => {
        expect(err).toBeUndefined();
        expect(data).toBeDefined();
        expect(data.toString()).toBe('test');
        done();
      });
    });

    it('calls callback with default contents for unwritten good file', (done) => {
      fs.readFile('./another/good/file.txt', (err, data) => {
        expect(err).toBeUndefined();
        expect(data).toBeDefined();
        expect(data.toString()).toBe('./another/good/file.txt Contents');
        done();
      });
    });
  });
});
