/* HTML 파일이 있는 위치 기준으로 계산 */
import store from './js/Store.js';

const TabType = {
    KEYWORD: 'KEYWORD',
    HISTORY: 'HISTORY',
};

const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어",
};

/* 컴포넌트화 */
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            selectedTab: TabType.KEYWORD,
            keywordList: [], 
        };
    }

    componentDidMount() {
        const keywordList = store.getKeywordList();
        this.setState({ keywordList });
    }

    handleChangeInput(event) {
        const searchKeyword = event.target.value;

        if (searchKeyword <= 0 && this.state.submitted) {
            return this.handleReset();
        }
        
        this.setState({ searchKeyword });
    }
    
    handleSubmit(event) {
        event.preventDefault(); // onSubmit 이벤트 포함된 리프레시 이벤트를 방지
        console.log(`전송된 검색어 : ${this.state.searchKeyword}`);
        this.search(this.state.searchKeyword);
    }

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword);
        this.setState({
            searchKeyword, 
            searchResult,
            submitted: true,
         });
    }

    handleReset() {
        /* 상태 변수를 여러번 사용해도 비동기적 동작으로 인해 나중에 한꺼번에 처리되기에 문자열이 남아 있게 됨 */
        // this.setState({ searchKeyword: "" });
        // console.log(`삭제된 검색어 : ${this.state.searchKeyword}`);

        /* 비동기 적으로 처리 되기에 초기화 된 후 삭제된 검색어가 출력 됨 */
        this.setState(() => {
            return { 
                searchKeyword: "",
                submitted: false, 
            }
        }, 
        () => {
            console.log(`삭제된 검색어 : ${this.state.searchKeyword}`);    
        });
    }

    render() {

        const searchForm = (
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
        );

        const searchResult = (
            this.state.searchResult.length > 0 ? (
                <ul className='result'>
                    {this.state.searchResult.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <img src={item.imageUrl} alt={item.name} />
                                <p>{item.name}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className='empty-box'>검색 결과가 없습니다.</div>
            )
        );

        const keywordList = (
            <ul className='list'>
                {this.state.keywordList.map(({ id, keyword }, index) => {
                    return (
                        <li key={id} onClick={() => this.search(keyword)}>
                            <span className='number'>{index + 1}</span>
                            <span>{keyword}</span>
                        </li>
                    );
                })}
            </ul>
        )

        /* map 함수는 무조건 반환 값이 있어야 함 (return 문 필수) */
        /* 최상위 레벨의 태그는 하나 밖에 없어야 하기에 만약 둘 이상의 태그가 최상위 레벨에 있다면 프래그먼트를 사용해야 함 */
        const tabs = (
            <>
                <ul className='tabs'>
                    {Object.values(TabType).map((tabType) => {
                        return (
                            <li 
                            className={this.state.selectedTab === tabType ? 'active' : ''} 
                            onClick={() => this.setState({ selectedTab: tabType })} 
                            key={tabType}
                            >
                                {TabLabel[tabType]}
                            </li>
                        ); 
                    })}
                </ul>
                {this.state.selectedTab === TabType.KEYWORD && keywordList}
                {this.state.selectedTab === TabType.HISTORY && <div>최근 검색어</div>}
            </>
        );

        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    {searchForm}
                    <div className="content">
                        {this.state.submitted ? searchResult : tabs}
                    </div>
                </div>
            </>
        );
    }
} 

ReactDOM.render(<App />, document.querySelector('#app'));