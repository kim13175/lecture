import React from "react";

export const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
};

const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어",
};

const Tabs = ({ selectedTab, onChange }) => {
    return (
        <>
            <ul className="tabs">
                {Object.values(TabType).map((TabType) => (
                    <li
                        key={TabType}
                        className={selectedTab === TabType ? "active" : ""}
                        onClick={() => onChange(TabType)}
                    >
                        {TabLabel[TabType]}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Tabs;