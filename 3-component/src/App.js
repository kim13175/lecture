import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import store from './Store'

export default class App extends React.Component {
    constructor() {
        super();

        this.state = { 
            searchKeyword: "",
            searchResult: [],
            submitted: false,
        }
    }

    handleChangeInput(searchKeyword) {
        if (searchKeyword.length <= 0) {
            this.handleReset();
        }

        this.setState({ searchKeyword });
    }

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword);

        this.setState({
            searchResult,
            submitted: true,
        });
    }

    handleReset() {
        this.setState({
            searchKeyword: "",
            submitted: false,
            searchResult: [],
        })
    }

    render() {
        const { searchKeyword, searchResult, submitted } = this.state;

        return (
            <>
                <Header title="검색"/>
                <div className="container">
                    <SearchForm
                        value={this.state.searchKeyword}
                        onChange={(value) => this.handleChangeInput(value)} 
                        onSubmit={() => this.search(searchKeyword)} 
                        onReset={() => this.handleReset()}
                    />
                    <div className="content">
                        {submitted && <SearchResult data={searchResult} />}
                    </div>
                </div>
            </>
        )
    }
}