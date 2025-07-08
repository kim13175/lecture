import React from "react";
import Store from '../Store';
import List from './List';

export default class HistoryList extends React.Component {
    constructor() {
        super();

        this.state = {
            historyList: []
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        const historyList = Store.getHistoryList();
        this.setState({ historyList });
    }

    handleClickRemove(keyword) {
        Store.removeHistory(keyword);
        this.fetch();
    }

    render() {
        const { historyList } = this.state;
        const { onClick } = this.props;

        return (
            <List 
                data = {historyList}
                onClick = {onClick}
                hasDate
                onRemove={(keyword) => this.handleClickRemove(keyword)}
            />
        )
    }
}