(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(17)},,,,,,function(e,t,n){e.exports=n.p+"/art-kudashev.github.io/kanban/build/static/media/plus.6cb6e5fc.svg"},function(e,t,n){e.exports=n.p+"/art-kudashev.github.io/kanban/build/static/media/cross.5fe0db66.svg"},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),l=n(2),i=n(4),o=n(3),r=n(5),c=n(0),s=n.n(c),d=n(7),m=n.n(d),u=function(e){var t=s.a.createElement("div",{className:"column-title"},s.a.createElement("div",{className:"column-title__text title",onClick:e.openChangeForm,"data-value":e.title},e.title),s.a.createElement("button",{className:"button-delete",title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043f\u0438\u0441\u043e\u043a",onClick:function(){return e.deleteColumn(e.columnId)}},s.a.createElement("img",{src:e.imgSrc,alt:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"})));return e.title?t:null},g=function(e){return s.a.createElement("div",{className:"column-task-list__item",id:e.taskId,"data-value":e.text},s.a.createElement("div",{className:"column-task-list__item-text task",id:e.taskId,onClick:e.openChangeForm},e.text),s.a.createElement("button",{className:"button-delete",title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443",onClick:function(){return e.deleteTask(e.columnId,e.taskId)}},s.a.createElement("img",{src:e.imgSrc,alt:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"})))},p=function(e){function t(){return Object(a.a)(this,t),Object(i.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(r.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.tasks,n=e.openChangeForm,a=e.deleteTask,l=e.columnId,i=e.imgSrc,o=e.id,r=[];return t&&(r=t.map(function(e,t){return s.a.createElement(g,{text:e.text,key:t,taskId:t,columnId:l,openChangeForm:n,deleteTask:a,imgSrc:i})})),s.a.createElement("div",{className:"column-task-list",id:o},r)}}]),t}(c.Component),f=function(e){return s.a.createElement("div",{className:e.class,onClick:e.openForm},s.a.createElement("img",{src:e.imgSrc,alt:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}),s.a.createElement("span",null,e.text))},h=function(e){return s.a.createElement("div",{className:e.class},"textarea"===e.tag?s.a.createElement("textarea",{className:"textfield task",placeholder:e.textfieldPlaceholder,ref:e.textfieldRef}):s.a.createElement("input",{className:"textfield title",placeholder:e.columnTextfieldPlaceholder,ref:e.textfieldRef}),s.a.createElement("div",{className:"column-add-form__buttons"},s.a.createElement("button",{className:"column-add-form__buttons-add",onClick:e.addValue},e.text),s.a.createElement("button",{className:"button-close",title:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043f\u043e\u043b\u0435 \u0432\u0432\u043e\u0434\u0430",onClick:e.openForm},s.a.createElement("img",{src:e.imgSrc,alt:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}))))},v=n(14),k=n(15),b=function(e){function t(){var e,n;Object(a.a)(this,t);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(n=Object(i.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).textfieldRef=s.a.createRef(),n.state={addFormOpen:!1},n.openAddForm=function(){var e=n.textfieldRef.current;e.value="",e.focus(),n.setState(function(e){return{addFormOpen:!e.addFormOpen}})},n.openChangeForm=function(e){if("true"!==e.target.dataset.clicked){n.props.stopDrag();var t=e.target;t.dataset.clicked=!0,t.dataset.value=t.innerText.trim();var a=null;t.classList.contains("title")?a=n.replaceElement(t,"input","textfield title"):t.classList.contains("task")&&(a=n.replaceElement(t,"textarea","textfield task")),a.focus(),n.changeValueFunc=function(){return n.changeValue(a,t)},window.addEventListener("click",n.changeValueFunc)}},n.addValue=function(){var e=n.textfieldRef.current,t=n.props.id,a=e.value.trim();a&&(n.openAddForm(),e.classList.contains("task")&&n.props.addColumnTask(a,t),e.classList.contains("title")&&n.props.addNewColumn(a,t),e.value="")},n.changeValue=function(e,t){if(document.activeElement!==e){var a=n.props.id,l=e.id,i=e.value.trim();""===i?e.value=t.dataset.value:(e.classList.contains("title")&&n.props.updateColumnTitle(i,a),e.classList.contains("task")&&n.props.updateColumnTask(i,a,l)),e.dataset.clicked=!1,e.dataset.value=i,n.replaceElement(e,"div",t.className),n.props.startDrag(),window.removeEventListener("click",n.changeValueFunc)}},n.replaceElement=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,l=document.createElement(t);return l.dataset.clicked=e.dataset.clicked,l.dataset.value=e.dataset.value,a&&(l.className=a),!1===l.classList.contains("title")&&(l.id=e.id),l.addEventListener("click",n.openChangeForm),"INPUT"===e.tagName||"TEXTAREA"===e.tagName?l.innerText=e.value:l.value=e.innerText,e.replaceWith(l),l},n}return Object(r.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.addFormOpen,t=this.props,n=t.tasks,a=t.title,l=t.deleteColumnTask,i=t.deleteColumn,o=t.id,r=a?"textarea":"input",c=a?"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435 \u043e\u0434\u043d\u0443 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435 \u043e\u0434\u043d\u0443 \u043a\u043e\u043b\u043e\u043d\u043a\u0443",d=a?"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043b\u043e\u043d\u043a\u0443",m=a?"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438":"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043b\u043e\u043d\u043a\u0438",g=e?"column-add-btn hidden":"column-add-btn",b=e?"column-add-form":"column-add-form hidden";return s.a.createElement("div",{className:"column"},s.a.createElement(u,{openChangeForm:this.openChangeForm,deleteColumn:i,imgSrc:k,title:a,columnId:o}),a?s.a.createElement(p,{key:Math.random(),id:o,tasks:n,columnId:o,openChangeForm:this.openChangeForm,deleteTask:l,imgSrc:k}):null,s.a.createElement(f,{class:g,text:c,openForm:this.openAddForm,imgSrc:v}),s.a.createElement(h,{tag:r,class:b,textfieldPlaceholder:m,text:d,textfieldRef:this.textfieldRef,addValue:this.addValue,openForm:this.openAddForm,imgSrc:k}))}}]),t}(c.Component),E=document.createElement("div");E.id="column-task-list__item-shadow";var I=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(i.a)(this,Object(o.a)(t).call(this,e))).start=function(){n.isMobile?(window.addEventListener("touchstart",n.dragStart),window.addEventListener("touchmove",n.drag),window.addEventListener("touchend",n.dragEnd)):(window.addEventListener("mousedown",n.dragStart),window.addEventListener("mousemove",n.drag),window.addEventListener("mouseup",n.dragEnd))},n.stop=function(){n.isMobile?(window.removeEventListener("touchstart",n.dragStart),window.removeEventListener("touchmove",n.drag),window.removeEventListener("touchend",n.dragEnd)):(window.removeEventListener("mousedown",n.dragStart),window.removeEventListener("mousemove",n.drag),window.removeEventListener("mouseup",n.dragEnd))},n.dragStart=function(e){var t=n.props.mainWrap;if(n.isMobile){if(0!==e.which||e.touches.length>1||!n.findElement(e,n.dragItemClass))return}else if(1!==e.which||!n.findElement(e,n.dragItemClass))return;n.isMobile&&(t.style.overflowX="hidden",t.style.overflowY="hidden");var a=n.dragItem;a.item=n.findElement(e,n.dragItemClass),a.item.style.width=a.item.getBoundingClientRect().width+"px",a.item.style.height=a.item.getBoundingClientRect().height+"px",a.item.clientX=n.isMobile?e.targetTouches[0].clientX:e.clientX,a.item.clientY=n.isMobile?e.targetTouches[0].clientY:e.clientY,n.isMobile?n.shift={x:a.item.getBoundingClientRect().left-e.targetTouches[0].clientX,y:a.item.getBoundingClientRect().top-e.targetTouches[0].clientY}:n.shift={x:a.item.getBoundingClientRect().left-e.clientX,y:a.item.getBoundingClientRect().top-e.clientY}},n.drag=function(e){if(n.dragItem.item){n.checkForScroll(e,"window","horizontal"),n.checkForScroll(e,"column","vertical");var t=n.dragItem.item,a=n.shift,l=n.dragAreaClass,i=n.dragItemClass,o=n.findElement(e,l),r=n.findElement(e,i),c=n.isMobile?e.targetTouches[0].clientX:e.clientX,s=n.isMobile?e.targetTouches[0].clientY:e.clientY;if(t.style.position="fixed",t.style.top=s+a.y+"px",t.style.left=c+a.x+"px",t.style.transform="rotate(5deg)",t.style.pointerEvents="none",t.style.zIndex=2,n.dragItem.area){var d=!0,m=!1,u=void 0;try{for(var g,p=n.dragItem.area.children[Symbol.iterator]();!(d=(g=p.next()).done);d=!0){var f=g.value;f.id===E.id&&!1===n.collideItems(t,f)&&f.remove()}}catch(w){m=!0,u=w}finally{try{d||null==p.return||p.return()}finally{if(m)throw u}}}if(o){var h=o;h.children.length<=1&&(h.appendChild(E),E.style.height=t.style.height,n.dragItem.shadow=h.children.namedItem(E.id),n.dragItem.area=h)}if(r){var v=r,k=v.parentElement,b=v.previousElementSibling,I=v.nextElementSibling;if("top"===n.getCollideDirection(v)&&n.collideItems(t,v)){if(b&&b.id===E.id)return;I&&I.id===E.id&&I.remove(),k.insertBefore(E,v)}if("bottom"===n.getCollideDirection(v)&&n.collideItems(t,v)){if(I&&I.id===E.id)return;b&&b.id===E.id&&b.remove(),n.insertAfter(E,v)}E.style.height=t.style.height,n.dragItem.shadow=k.children.namedItem(E.id),n.dragItem.area=k,n.dragItem.collisionItem=v}}},n.dragEnd=function(e){if(n.dragItem.item){var t=n.dragItem.item,a=n.props.mainWrap;if(n.isMobile&&a.removeAttribute("style"),E&&E.parentElement){var l=t.parentElement.id,i=t.id,o=E.parentElement.id,r=[];if(t.setAttribute("style","none"),E.replaceWith(t),0===t.parentElement.children.length)r.push({text:t.dataset.value});else{var c=!0,s=!1,d=void 0;try{for(var m,u=t.parentElement.children[Symbol.iterator]();!(c=(m=u.next()).done);c=!0){var g=m.value;g!==E&&r.push({text:g.dataset.value})}}catch(p){s=!0,d=p}finally{try{c||null==u.return||u.return()}finally{if(s)throw d}}}n.props.deleteColumnTask(l,i),n.props.updateColumnTasks(r,o)}else t.setAttribute("style","none");n.dragItem={}}},n.checkForScroll=function(e,t,a){"window"===t&&clearTimeout(n.windowScrollId),"column"===t&&clearTimeout(n.columnScrollId);var l=n.isMobile?10:20;n.adjustWindowScroll(e,t,a)&&("window"===t&&(n.windowScrollId=setTimeout(function(){return n.checkForScroll(e,t,a)},l)),"column"===t&&(n.columnScrollId=setTimeout(function(){return n.checkForScroll(e,t,a)},l)))},n.adjustWindowScroll=function(e,t,a){if(n.dragItem.item){var l=n.dragItem.item,i=n.props.mainWrap,o=l.getBoundingClientRect();if("window"===t&&"horizontal"===a){var r=n.isMobile?5:30,c={left:document.documentElement.clientWidth-document.documentElement.clientWidth,right:document.documentElement.clientWidth};return n.isMobile?(o.right-50>c.right&&(i.scrollLeft+=r),o.left+50<c.left&&(i.scrollLeft-=r),!0):(o.right+20>c.right&&(document.documentElement.scrollLeft+=r),o.left-20<c.left&&(document.documentElement.scrollLeft-=r),!0)}if("column"===t&&"vertical"===a){var s=n.isMobile?6:5,d=n.findElement(e,"column-title"),m=n.findElement(e,"column-add-btn");if(d){var u=d.getBoundingClientRect(),g=n.isMobile?e.targetTouches[0].clientY:e.clientY;return g>u.top&&g<u.bottom&&(d.parentElement.scrollTop-=s),!0}if(m){var p=m.getBoundingClientRect(),f=n.isMobile?e.targetTouches[0].clientY:e.clientY;return f>p.top&&f<p.bottom&&(m.parentElement.scrollTop+=s),!0}}return!1}},n.findElement=function(e,t){for(var a={x:n.isMobile?e.targetTouches[0].clientX:e.clientX,y:n.isMobile?e.targetTouches[0].clientY:e.clientY},l=document.elementFromPoint(a.x,a.y);l&&l!==document;l=l.parentElement)if(l.classList.contains(t)||l.id===t)return l},n.getCollideDirection=function(e){var t=e.getBoundingClientRect(),a=window.event,l=(n.isMobile?a.targetTouches[0].clientX:a.clientX,n.isMobile?a.targetTouches[0].clientY:a.clientY);return l>t.top&&l<t.top+t.height/2?"top":l<t.bottom&&l>t.top+t.height/2?"bottom":void 0},n.collideItems=function(e,t){var n=e.getBoundingClientRect(),a=t.getBoundingClientRect();return!(n.top+n.height<a.top||n.top>a.top+a.height||n.left+n.width/2<a.left||n.left+n.width/2>a.right)},n.insertAfter=function(e,t){return t.parentElement.insertBefore(e,t.nextElementSibling)},n.dragItem={},n.shift={},n.dragItemClass="column-task-list__item",n.dragAreaClass="column-task-list",n.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent),n}return Object(r.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.start()}},{key:"render",value:function(){var e=this,t=this.props.columns;return s.a.createElement(c.Fragment,null,t?t.map(function(t,n){return s.a.createElement(b,Object.assign({key:n,id:n,title:t.title,tasks:t.tasks,startDrag:e.start,stopDrag:e.stop},e.props))}):s.a.createElement(b,Object.assign({key:0,id:0},this.props)))}}]),t}(c.Component),w=function(e){return s.a.createElement("div",{id:"main-wrap__background-image-block",ref:e.backgroundImageBlockRef})},S=function(e){return s.a.createElement("div",{id:"main-wrap-upload__background"},s.a.createElement("div",{className:"label-delete"},s.a.createElement("label",{title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0444\u043e\u043d",className:"main-wrap-upload__background-label",onClick:e.deleteBackgroundImage},"+")),s.a.createElement("div",{className:"label-add"},s.a.createElement("label",{title:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0444\u043e\u043d",htmlFor:"main-wrap-upload__background-input",className:"main-wrap-upload__background-label"},"+")),s.a.createElement("input",{type:"file",id:"main-wrap-upload__background-input",onChange:e.addBackgroundImage}))},C=(n(16),document.getElementById("main-wrap")),y=function(e){function t(){var e,n;Object(a.a)(this,t);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(n=Object(i.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(r)))).backgroundImageBlockRef=s.a.createRef(),n.state={columns:JSON.parse(localStorage.getItem("columns")),backgroundImageURL:localStorage.getItem("backgroundImageURL")},n.addNewColumn=function(e,t){var a=Object.assign([],JSON.parse(localStorage.getItem("columns"))),l={title:e,tasks:[]};a.splice(t,1,l),a.push({}),localStorage.setItem("columns",JSON.stringify(a)),n.setState({columns:a})},n.addColumnTask=function(e,t){var a=Object.assign([],JSON.parse(localStorage.getItem("columns")));a[t].tasks.push({text:e}),localStorage.setItem("columns",JSON.stringify(a)),n.setState({columns:a})},n.updateColumnTitle=function(e,t){var a=Object.assign([],JSON.parse(localStorage.getItem("columns")));a[t]&&a[t].title&&(a[t].title=e,localStorage.setItem("columns",JSON.stringify(a)),n.setState({columns:a}))},n.updateColumnTasks=function(e,t){var a=Object.assign([],JSON.parse(localStorage.getItem("columns")));a[t]&&(a[t].tasks=e,localStorage.setItem("columns",JSON.stringify(a)),n.setState({columns:a}))},n.updateColumnTask=function(e,t,a){var l=Object.assign([],JSON.parse(localStorage.getItem("columns")));l[t]&&l.length>1&&l[t].tasks[a]&&(l[t].tasks[a].text=e,localStorage.setItem("columns",JSON.stringify(l)),n.setState({columns:l}))},n.deleteColumnTask=function(e,t){var a=Object.assign([],JSON.parse(localStorage.getItem("columns")));a[e].tasks.splice(t,1),localStorage.setItem("columns",JSON.stringify(a)),n.setState({columns:a})},n.deleteColumn=function(e){var t=Object.assign([],JSON.parse(localStorage.getItem("columns")));t.splice(e,1),localStorage.setItem("columns",JSON.stringify(t)),n.setState({columns:t})},n.addBackgroundImage=function(e){var t=e.target.files[0],a=new FileReader,l=n.backgroundImageBlockRef.current;t.type.startsWith("image/")&&(a.onload=function(){l.style.background="url(".concat(a.result,")"),l.style.backgroundSize="100% 100%",localStorage.setItem("backgroundImageURL",JSON.stringify(a.result)),n.setState({backgroundImageURL:a.result})},a.readAsDataURL(t))},n.deleteBackgroundImage=function(){n.backgroundImageBlockRef.current.style.background="none",localStorage.setItem("backgroundImageURL",""),n.setState({backgroundImageURL:""})},n}return Object(r.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.backgroundImageBlockRef.current,t=localStorage.getItem("backgroundImageURL");t&&(e.style.background="url(".concat(t,")"),e.style.backgroundSize="100% 100%")}},{key:"render",value:function(){var e=this.state.columns;return s.a.createElement(c.Fragment,null,s.a.createElement(I,{columns:e,mainWrap:C,addNewColumn:this.addNewColumn,addColumnTask:this.addColumnTask,updateColumnTasks:this.updateColumnTasks,updateColumnTitle:this.updateColumnTitle,updateColumnTask:this.updateColumnTask,deleteColumnTask:this.deleteColumnTask,deleteColumn:this.deleteColumn}),s.a.createElement(w,{backgroundImageBlockRef:this.backgroundImageBlockRef}),s.a.createElement(S,{addBackgroundImage:this.addBackgroundImage,deleteBackgroundImage:this.deleteBackgroundImage,backgroundImageBlockRef:this.backgroundImageBlockRef}))}}]),t}(c.Component);m.a.render(s.a.createElement(y,null),C)}],[[8,1,2]]]);
//# sourceMappingURL=main.43e3a9e9.chunk.js.map