import { TabType } from './views/tabView.js';

const tag = "[store]";

export default class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) =>
        product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }
}
