const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView }) {
    console.log(tag);

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView.on("@submit", (event) =>
        this.search(event.detail.value)
    ).on("@reset", () => this.reset());
  }

  search(event) {
    console.log(tag, event, event.detail.value);
  }

  reset() {
    console.log(tag, 'reset');
  }
}
