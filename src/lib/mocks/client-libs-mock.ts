// Mock implementation of client-side libraries for SSR build to reduce bundle size.
// These libraries are only run on the client side, so mocking them on the server is safe.

class ClientLibMock {
  // jspdf methods
  addImage() { return this; }
  output() { return new Blob(); }

  // jszip methods
  folder() { return this; }
  file() { return this; }
  generateAsync() { return Promise.resolve(new Blob()); }

  // opentype.js methods
  static parse() {
    return {
      getPath() {
        return {
          toPathData() { return ""; },
          getBoundingBox() {
            return { x1: 0, y1: 0, x2: 0, y2: 0 };
          }
        };
      }
    };
  }
  parse() {
    return ClientLibMock.parse();
  }
}

export const jsPDF = ClientLibMock;
export default ClientLibMock;
