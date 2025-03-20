import View from './View.js';
import { qs } from "../helpers.js";

export default class SearchResultView extends View {
    constructor() {
        super(qs("#search-result-view"));

        this.templete = new Template();
    }

    show(data = []) {
        this.element.innerHTML = data.length > 0
            ? this.templete.getList(data)
            : this.templete.getEmptyMessage();
        super.show();
    }
}

class Template {
    getEmptyMessage() {
        return`
            <div class="empty-box">검색결과가 없습니다.</div>
        `
    }
    getList(data = []) {
        return `
            <ul class="result">
                ${data.map(this._getItem).join("")}
            </ul>
        `
    }

    _getItem({imageUrl, name}) {
        return `
            <li>
                <img src="${imageUrl}" alt="${name}"/>
                <p>${name}</p>
            </li>
        `
    }
}