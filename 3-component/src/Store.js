import { createNextId } from './helpers.js';
import storage from './storage.js';

class Store {
  constructor(storage) {
    
    if (!storage) throw "no storage";

    this.storage = storage;
  }

  search(keyword) {
    this.addHistory(keyword);

    return this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return [...this.storage.keywordData];
  }

  getHistoryList() {
    return [...this.storage.historyData.sort(this._sortHistory)];
  }

  addHistory(keyword = '') {
    keyword = keyword.trim();
    if (!keyword) {
      return;
    }
    
    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (hasHistory) this.removeHistory(keyword);

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
    console.log(this.storage.historyData);
    this.storage.historyData = [...this.storage.historyData.sort(this._sortHistory)];
  }

  /* 최근 검색어 내림차순으로 정렬 -> 날짜의 역순 */
  _sortHistory(history1, history2) {
    return history2.date - history1.date;
  }

  removeHistory(keyword) {
    return this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    )
  }
}

/* singleton 패턴 */
const store = new Store(storage);
export default store