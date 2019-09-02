
let db;
const request = indexedDB.open('Favorites');

request.onupgradeneeded = function () {
  // The database did not previously exist, so create object stores and indexes.
  db = request.result;
  const store = db.createObjectStore('favorites', { keyPath: 'name' });
  store.createIndex('name', 'name', { unique: true });
};

request.onsuccess = function () {
  db = request.result;
};

const add = function (favorite) {
  const tx = db.transaction('favorites', 'readwrite');
  const store = tx.objectStore('favorites');

  store.put(favorite);
};
const remove = function (name) {
  const tx = db.transaction('favorites', 'readwrite');
  const store = tx.objectStore('favorites');

  store.delete(name.toLowerCase());
};

const isFav = function (name) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    const index = store.index('name');

    const request = index.get(name.toLowerCase());

    request.onsuccess = function () {
      const matching = request.result;
      if (matching !== undefined) {
        // A match was found.
        resolve(true);
      } else {
        // No match was found.
        resolve(false);
      }
    };
    request.onerror = function (err) {
      reject(err);
    };
  });
};

const allFavorites = function () {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    const index = store.index('name');

    const allNames = [];
    const request = index.openCursor();
    request.onsuccess = function () {
      const cursor = request.result;
      if (cursor) {
        // Called for each matching record.
        allNames.push({ name: cursor.value.name.toLowerCase(), gender: cursor.value.gender });
        cursor.continue();
      } else {
        // No more matching records.
        resolve(allNames);
      }
    };
    request.onerror = function (err) {
      reject(err);
    };
  });
};

export {
  allFavorites, remove, add, isFav,
};
