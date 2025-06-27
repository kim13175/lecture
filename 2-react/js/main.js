/* 컴포넌트화 */
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
        };
    }

    handleChangeInput(event) {
        const searchKeyword = event.target.value;

        if (searchKeyword <= 0) {
            this.handleReset();
        }
        
        this.setState({ searchKeyword });
    }
    
    handleSubmit(event) {
        event.preventDefault(); // onSubmit 이벤트 포함된 리프레시 이벤트를 방지
        console.log(`전송된 검색어 : ${this.state.searchKeyword}`);
    }

    handleReset() {
        /* 상태 변수를 여러번 사용해도 비동기적 동작으로 인해 나중에 한꺼번에 처리되기에 문자열이 남아 있게 됨 */
        // this.setState({ searchKeyword: "" });
        // console.log(`삭제된 검색어 : ${this.state.searchKeyword}`);

        /* 비동기 적으로 처리 되기에 초기화 된 후 삭제된 검색어가 출력 됨 */
        this.setState(() => {
            return { searchKeyword: "" }
        }, 
        () => {
            console.log(`삭제된 검색어 : ${this.state.searchKeyword}`);    
        });
    }

    render() {
        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    <form 
                        onSubmit={(event) => this.handleSubmit(event)}
                        onReset={() => this.handleReset()}
                    >
                        <input 
                            type="text" 
                            placeholder="검색어를 입력해주세요." 
                            autoFocus 
                            value={this.state.searchKeyword}
                            onChange={(event) => this.handleChangeInput(event)}
                        />
                        {this.state.searchKeyword.length > 0 && (
                            <button type="reset" className="btn-reset" onClick={() => this.handleReset()}></button>
                        )}
                    </form>
                </div>
            </>
        );
    }
} 

ReactDOM.render(<App />, document.querySelector('#app'));