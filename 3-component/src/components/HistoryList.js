import React from "react";
import List from './List';
import Store from '../Store';
import { formatRelativeDate } from "../helpers";

export default class HistoryList extends List {
    componentDidMount() {
        this.fetch();
    }

    fetch() {
        const data = Store.getHistoryList();
        this.setState({ data });
    }

    handleClickRemoveHistory(event, keyword) {
        event.stopPropagation();
        Store.removeHistory(keyword);
        this.fetch();
    }

    renderItem(item) {
        return (
            <>
                <span>{item.keyword}</span>
                <span className="date">{formatRelativeDate(item.date)}</span>
                <button 
                    className="btn-remove"
                    onClick={(event) => this.handleClickRemoveHistory(event, item.keyword)}
                />
            </>
        );
    }
}