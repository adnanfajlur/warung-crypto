webpackJsonp([35783957827783],{69:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=a(1),o=n(u),d=a(51),c=n(d),f=a(2),s=n(f),m=a(48),p=a(105),h=n(p),g=a(70),E=n(g),b=a(71),v=n(b),y=a(72),C=n(y),w=a(28),x=a(20),A=n(x),_=a(38),F=n(_),N=function(e){var t;return t={root:{backgroundImage:"linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",height:"100%",minHeight:"100vh",boxSizing:"unset"},appBar:{margin:"0 auto",paddingTop:25,display:"flex",maxWidth:1e3},body:{margin:"0 auto",paddingTop:25,maxWidth:1e3,display:"block"},white:{color:"#FFF"},divRight:{marginLeft:"auto",display:"flex",alignItems:"center"},title:{color:"#FFF",fontWeight:400,textTransform:"unset",borderRadius:3},iconHover:{color:"#FFF",width:25,height:25,cursor:"pointer","&:hover":{fill:"rgba(255, 255, 255, 0.5)"}}},t[e.breakpoints.down("md")]={appBar:{maxWidth:800},body:{maxWidth:800}},t[e.breakpoints.down("sm")]={appBar:{padding:"20px 20px 0px"},body:{padding:"20px 20px 0px"}},t["@media screen and (max-width: 400px)"]={divRight:{flexDirection:"column-reverse"}},t},H=function(e){function t(){return l(this,t),r(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(){var e=this.props.classes;return o.default.createElement(u.Fragment,null,o.default.createElement(c.default,{defaultTitle:"adnanfajlur"},o.default.createElement("html",{lang:"en"})),o.default.createElement("div",{className:e.root},o.default.createElement("div",{className:e.appBar},o.default.createElement(A.default,{className:e.title,onClick:function(){return(0,m.navigateTo)("/")},style:{display:"flex",alignItems:"center",cursor:"pointer"}},"adnanfajlur"),o.default.createElement("div",{className:e.divRight},o.default.createElement(F.default,{className:e.title,style:{marginRight:30},onClick:function(){return(0,m.navigateTo)("/contact-me")}},"Contact Me"),o.default.createElement("div",{style:{display:"flex"}},o.default.createElement(v.default,{className:e.iconHover,onClick:function(){return window.open("https://github.com/adnanfajlur")}}),o.default.createElement(C.default,{className:e.iconHover,onClick:function(){return(0,m.navigateTo)("/mygram")}}),o.default.createElement(E.default,{className:e.iconHover,onClick:function(){return window.open("https://www.facebook.com/fajar.rohman.73157")}})))),o.default.createElement("div",{className:e.body},this.props.children)))},t}(o.default.Component);H.propTypes={classes:s.default.object.isRequired,children:s.default.node.isRequired},t.default=(0,h.default)((0,w.withStyles)(N)(H)),e.exports=t.default},331:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var u=a(1),o=n(u),d=a(51),c=n(d),f=a(2),s=n(f),m=a(48),p=a(69),h=n(p),g=a(20),E=n(g),b=a(28),v=a(38),y=(n(v),function(e){return{divContent:{marginTop:50,marginBottom:30,"@media (max-width: 670px)":{marginTop:20}},white:{color:"#FFF"},card:{width:145,position:"relative",height:200,marginRight:10,borderRadius:5,cursor:"pointer"},iconCard:{width:35,height:35,padding:15,borderRadius:100,margin:"20px auto 15px",background:"rgba(0,0,0, 0.25)"},iconHover:{color:"#FFF","&:hover":{fill:"rgba(255, 255, 255, 0.5)"}},typoContent:{bottom:0,margin:"20px 8px",color:"#FFF",position:"absolute"},board:{minWidth:300,background:"#FFF",marginLeft:"auto",marginTop:50,borderRadius:5,padding:"17px 15px"},ul:{listStyle:"circle",paddingLeft:"20px"},block:{display:"flex"},"@media screen and (max-width: 710px)":{block:{display:"block"},board:{margin:"30px 0px 20px",minWidth:100}}}}),C=[{bg:"#52C9F5",content:"Sample web with original data from instagram",title:"Mygram",icon:"icons/MyGram.svg"}],w=function(e){function t(){return l(this,t),r(this,e.apply(this,arguments))}return i(t,e),t.prototype.render=function(){var e=this.props.classes;return o.default.createElement(u.Fragment,null,o.default.createElement(c.default,{defaultTitle:"adnanfajlur"},o.default.createElement("title",null,"adnanfajlur"),o.default.createElement("html",{lang:"en"})),o.default.createElement(h.default,null,o.default.createElement("div",{className:e.block},o.default.createElement("div",null,o.default.createElement("div",{className:e.divContent},o.default.createElement(E.default,{variant:"display1",className:e.white},"Hi there, I'm"),o.default.createElement(E.default,{variant:"headline",className:e.white},"Adnan Fajlur Rohman"),o.default.createElement("div",{style:{marginTop:40}},o.default.createElement(E.default,{className:e.white},"A man born in 1999"),o.default.createElement(E.default,{className:e.white},"in a small village in the city of Rembang, Indonesia"),o.default.createElement(E.default,{className:e.white},"my passion is in programmers, especially front-end"))),o.default.createElement("div",{style:{display:"flex"}},C.map(function(t,a){return o.default.createElement("div",{key:a,className:e.card,style:{backgroundColor:t.bg},onClick:function(){return(0,m.navigateTo)("/mygram")}},o.default.createElement("div",{className:e.iconCard},o.default.createElement("img",{src:t.icon,alt:""})),o.default.createElement(E.default,{className:e.white,align:"center"},t.title),o.default.createElement(E.default,{variant:"caption",className:e.typoContent,align:"center"},t.content))}))),o.default.createElement("div",{className:e.board},o.default.createElement(E.default,{variant:"title"},"Things I like:"),o.default.createElement("ul",{className:e.ul},o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Java Coffe")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Solve the problem with my hands")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Learning something new"))),o.default.createElement(E.default,{variant:"title"},"Technology that I like:"),o.default.createElement("ul",{className:e.ul},o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"VSCode")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Git")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"ES6")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"React")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Redux-Saga")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Gatsbyjs")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Nextjs")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Firebase")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Material UI")),o.default.createElement("li",null,o.default.createElement(E.default,{variant:"subheading"},"Styled Component")))))))},t}(o.default.Component);w.propTypes={classes:s.default.object.isRequired},t.default=(0,b.withStyles)(y)(w),e.exports=t.default},70:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var l=a(1),r=n(l),i=a(14),u=n(i),o=function(e){return r.default.createElement(u.default,e,r.default.createElement("path",{d:"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z"}))};t.default=o,e.exports=t.default},71:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var l=a(1),r=n(l),i=a(14),u=n(i),o=function(e){return r.default.createElement(u.default,e,r.default.createElement("path",{d:"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H14.56C14.24,20.93 14.23,20.32 14.23,20.11L14.24,17.64C14.24,16.8 13.95,16.25 13.63,15.97C15.64,15.75 17.74,15 17.74,11.53C17.74,10.55 17.39,9.74 16.82,9.11C16.91,8.89 17.22,7.97 16.73,6.73C16.73,6.73 15.97,6.5 14.25,7.66C13.53,7.46 12.77,7.36 12,7.35C11.24,7.36 10.46,7.46 9.75,7.66C8.03,6.5 7.27,6.73 7.27,6.73C6.78,7.97 7.09,8.89 7.18,9.11C6.61,9.74 6.26,10.55 6.26,11.53C6.26,15 8.36,15.75 10.36,16C10.1,16.2 9.87,16.6 9.79,17.18C9.27,17.41 7.97,17.81 7.17,16.43C7.17,16.43 6.69,15.57 5.79,15.5C5.79,15.5 4.91,15.5 5.73,16.05C5.73,16.05 6.32,16.33 6.73,17.37C6.73,17.37 7.25,19.12 9.76,18.58L9.77,20.11C9.77,20.32 9.75,20.93 9.43,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z"}))};t.default=o,e.exports=t.default},72:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var l=a(1),r=n(l),i=a(14),u=n(i),o=function(e){return r.default.createElement(u.default,e,r.default.createElement("path",{d:"M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"}))};t.default=o,e.exports=t.default}});
//# sourceMappingURL=component---src-pages-index-js-1cff3d3977958635eadd.js.map