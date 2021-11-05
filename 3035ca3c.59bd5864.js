(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{129:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return l}));var n=r(2),o=r(6),a=(r(0),r(517)),s={},i={unversionedId:"contracts/turbo",id:"contracts/turbo",isDocsHomePage:!1,title:"turbo",description:"Augur Turbo's contracts are structured such that they are mostly independent.",source:"@site/../docs/contracts/turbo.md",permalink:"/docs/contracts/turbo",editUrl:"https://github.com/AugurProject/augur/edit/documentation/augur.sh/../docs/contracts/turbo.md"},c=[],u={rightToc:c};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Augur Turbo's contracts are structured such that they are mostly independent.\nThis makes it easy to upgrade smart contracts without special authority."),Object(a.b)("p",null,"The major components are: MarketFactory, Fetcher, AMMFactory, MasterChef, and\nFeePot. The contracts can be found at\n",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/AugurProject/turbo/tree/dev/packages/smart/contracts"}),"https://github.com/AugurProject/turbo/tree/dev/packages/smart/contracts"),"."),Object(a.b)("p",null,'Every type of market has its own MarketFactory. The market factory accepts USDC\nand returns a "complete set", which is one outcome token for each outcome.\nThe user will trade away the outcome tokens they don\'t want, for those they do,\ngiving them a "position" that pays out a profit if they guess correctly.'),Object(a.b)("p",null,'Every market factory has the same common code for defining markets, minting\noutcome tokens, and claiming winnings. These are defined in the contracts\n"AbstractMarketFactoryV*", with "V3" being the latest.'),Object(a.b)("p",null,"Each market factory additionally defines rules for market creation and market\nresolution. Sports market factories encode some of the game rules, like\ndefining spread or specifying how to handle ties. The crypto market factory\npulls from the price feeds."),Object(a.b)("p",null,"The market factories are mostly built out of other contracts, acting as mixins.\nThe design goal has been to move any common code into mixins. The market\nfactory contracts themselves hold a lot of boilerplate code used to invoke code\ndefined in mixins."),Object(a.b)("p",null,'The market factories also define structs for additional information about\nmarkets. For sports markets this is the "Event" struct, which ties together\nseveral markets that are resolved by the same game scoring information. For\ncrypto this is the "Coin" struct, storing information like price feed address.'),Object(a.b)("p",null,"The sports supported right now are: NBA, NFL, MLB, and MMA/UFC. Other sports\ncan be added fairly easily using mixins, if they're similar to other sports."),Object(a.b)("p",null,"The crypto market factory deployed right now only supports price feeds. The\nnext version, which has been written, supports market cap as well. In actuality\nthe new version supports any Chainlink feeds."),Object(a.b)("p",null,"There are some other market factories that aren't supported for one reason or\nanother. Some are older versions that aren't used anymore, like\nSportsLinkMarketFactory. Others were made in expectation of being used but have\nbeen indeterminately delayed or cancelled, like GroupedMarketFactory."),Object(a.b)("p",null,"A market factory can contain virtually infinite markets. Iterating over all of\nthem to get the current state of markets isn't always possible because many\nnodes limit query runtime or response size. To work around this, we have the\nFetcher contracts."),Object(a.b)("p",null,'Fetcher contracts return paginated lists of "interesting" markets. These are\nmarkets that are either unresolved (open) or have unclaimed winning outcome\nshares. There are two Fetcher contracts that matter right now: SportsFetcher\nand CryptoFetcher.'),Object(a.b)("p",null,"This concludes the overview of the market factories. They're all you need to\nrun Augur Turbo. However, in reality you want an easy way to trade, which can\nbe promoted through liquidity provision rewards."),Object(a.b)("p",null,"Trading is enabled via BalancerV1 AMMs interacted with via the AMMFactory.\nThere need only be one AMMFactory for all market factories. It handles creating\nAMMs, buying and selling outcome shares, and interacts with the MasterChef\ncontract to enable rewards."),Object(a.b)("p",null,"The ability to set weights is necessary for adding liquidity to Augur Turbo\nAMMs because of the way outcome tokens are created. Thus, we need to use\nBalancer AMMs. The ability to use several outcomes is also helpful since\nmost markets have three outcomes due to the inclusion of the invalid outcome."),Object(a.b)("p",null,"Why are weights needed? A naive AMM sets the price of tokens by their relative\nbalances in the AMM. This works reasonably well for normal tokens because\ncheaper tokens are actually easier to acquire in larger quantities. This is not\ntrue of outcome tokens because they are minted in equal quantities."),Object(a.b)("p",null,"If you have a 50:50 market then a complete set of outcome tokens can be added\nto the AMM's liquidity pool without any tokens being kept by the LP. But if the\nprice isn't exactly 50:50 then some tokens will be kept by the user lest they\nmove the price towards 50:50."),Object(a.b)("p",null,"Normal outcome prices don't differ enough to matter much up until the outcome\nis known, which causes the price to rapidly approach 100:0. But the invalid\noutcome (usually labeled \"No Contest\") is uncommon so it's set to 2%, the\nsmallest default ratio using BalancerV1. To provide the same amount of\nliquidity for a 98:2 AMM is many times more than needed for a 50:50 market.\nThat inefficiency is extremely undesirable since it locks up so much capital\nas well as giving the LP a larger position than they may desire."),Object(a.b)("p",null,"The initial weights the AMMs use are set at market creation using the lines\nfrom the sportsbook. They do not update as the sportsbook lines change."),Object(a.b)("p",null,"Note that crypto markets do not have an invalid outcome and always start at a\nprice ratio of 50:50, but still use BalancerV1 AMMs. There's no deep reason:\nit's easy to use the existing infrastructure needed for the sports markets."),Object(a.b)("p",null,"TODO rewards"),Object(a.b)("p",null,"This concludes the overview of trading and rewards. Finally, there's the FeePot\ncontract."),Object(a.b)("p",null,"We don't use it right now. It's designed to pay REPv2 holders for providing a\nsecure backstop in case of bad market resolution. That functionality hasn't\nbeen implemented yet so the fee that would go to the FeePot is set to zero."),Object(a.b)("p",null,"So long as AugurV2 (on Ethereum mainnet) never forks, there will only ever need\nto be one FeePot contract. If it works then a new FeePot must be deployed."))}l.isMDXComponent=!0},517:function(e,t,r){"use strict";r.d(t,"a",(function(){return h})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),l=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},h=function(e){var t=l(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),h=l(r),p=n,m=h["".concat(s,".").concat(p)]||h[p]||d[p]||a;return r?o.a.createElement(m,i(i({ref:t},u),{},{components:r})):o.a.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,s=new Array(a);s[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,s[1]=i;for(var u=2;u<a;u++)s[u]=r[u];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,r)}p.displayName="MDXCreateElement"}}]);