import React from "react";
import Store from '../Store';
import { formatRelativeDate } from "../helpers";
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

    handleClickRemove(event, keyword) {
        event.stopPropagation();
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
                renderItem = {(item) => {
                    return (
                        <>
                            <span>{item.keyword}</span>
                            <span className="date">{formatRelativeDate(item.date)}</span>
                            <button 
                                className="btn-remove" 
                                onClick={(event, keyword) => this.handleClickRemove(event, item.keyword)} 
                            />
                        </>
                    );
                }} 
            />
        )
    }
}

// import React from "react";
// import List from './List';
// import Store from '../Store';
// import { formatRelativeDate } from "../helpers";

// export default class HistoryList extends List {
//     componentDidMount() {
//         this.fetch();
//     }

//     fetch() {
//         const data = Store.getHistoryList();
//         this.setState({ data });
//     }

//     handleClickRemoveHistory(event, keyword) {
//         event.stopPropagation();
//         Store.removeHistory(keyword);
//         this.fetch();
//     }

//     renderItem(item) {
//         return (
//             <>
//                 <span>{item.keyword}</span>
//                 <span className="date">{formatRelativeDate(item.date)}</span>
//                 <button 
//                     className="btn-remove"
//                     onClick={(event) => this.handleClickRemoveHistory(event, item.keyword)}
//                 />
//             </>
//         );
//     }
// }