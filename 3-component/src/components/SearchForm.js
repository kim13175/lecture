import React from "react";

/* 상태 변수가 필요 없을 경우 함수 컴포넌트로 작성하는 것이 간단 */
const SearchForm = ({value, onChange, onSubmit, onReset}) => {

    const handleChangeInput = (event) => {
        onChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value);
    }

    const handleReset = () => {
        onReset();
    }

    return (
        <form 
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <input 
                    type="text"
                    placeholder="검색어를 입력하세요."
                    autoFocus
                    value={value}
                    onChange={handleChangeInput}
                />
                {value.length > 0 && (
                    <button type="reset" className="btn-reset"/>
                )}
        </form>
    )
}

export default SearchForm;