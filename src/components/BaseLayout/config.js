export const USER_AUTH = [
    {
        name: "资本透视",
        children: [{ tag: "Invest", vip: "isTvip", class: "Invest" }],
    },
    {
        name: "全球新药",
        children: [{ tag: "NEXT", vip: "isNvip", class: "NEXT" }],
    },
    {
        name: "基础数据",
        children: [
            { tag: "FREE", vip: "isFree", class: "FREE" },
            { tag: "SVIP", vip: "isSvip", class: "SVIP" },
            { tag: "Gen", vip: "isGvip", class: "Gen" },
            { tag: "CPGs", vip: "isCvip", class: "CPGs" },
        ],
    },
    {
        name: "市场洞察",
        children: [
            { tag: "National", vip: "isIvip", class: "IPM" },
            { tag: "Customized", vip: "isMaxvip", class: "MAX" },
        ],
    },
];
