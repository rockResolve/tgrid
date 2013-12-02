var __extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},TGrid,TesserisPro;(function(n){(function(t){var i=function(i){function r(){i.apply(this,arguments)}return __extends(r,i),r.prototype.getElemntsSize=function(n,t){for(var e,r,u=0,f=n.children,i=0;i<f.length;i++)e=f.item(i),r=t[i],r!=null&&t.indexOf(r)>0&&(u+=e.clientHeight);return u},r.prototype.getFirstVisibleItem=function(n,t,i){for(var o,u,f=0,e=n.children,r=0;r<e.length;r++)if(o=e.item(r),u=t[r],u!=null&&t.indexOf(u)>0&&(f+=o.clientHeight),f>i)return u;return null},r.prototype.getTableElement=function(){var n=document.createElement("table");return n.className="tgrid-table",n},r.prototype.getFooterViewModel=function(){var n=new t.AngularFooterViewModel;return n.angularModuleName="tgrid-footer-module"+r.moduleFooterCounter++,angular.module(n.angularModuleName,[]).controller("tgrid-footer-controller",function(t){n.setScope(t)}),n},r.prototype.getFilterPopupViewModel=function(n){var i=new t.AngularFilterPopupViewModel(n);return i.angularModuleName="tgrid-filter-popup-module",angular.module(i.angularModuleName,[]).controller("tgrid-filter-popup-controller",function(n){i.setScope(n)}),i},r.prototype.updateTableHeadElement=function(n,i,r,u,f,e){var p,y,s,o,h,l,a,c,b,v,w;if(i.innerHTML!=null&&i.innerHTML!=""){if(this.showNeededIntends(i,n.groupBySortDescriptor.length,t.Grid.getGridObject(i)),f)for(this.removeArrows(i),p=i.getElementsByTagName("th"),o=n.columns.length,y=0;o<p.length,y<n.columns.length;o++,y++)n.sortDescriptor.path==n.columns[y].sortMemberPath&&this.addArrows(p[o].getElementsByClassName("tgrid-header-cell-buttons")[0],n,o);this.updateGroupByElements(n,i,r)}else{for(this.addGroupBy(n,i,r),s=document.createElement("tr"),this.appendIndent(s,n.columns.length,!0),this.showNeededIntends(s,n.groupBySortDescriptor.length,t.Grid.getGridObject(i)),o=0;o<n.columns.length;o++)h=document.createElement("th"),h.setAttribute("width",n.columns[o].width),l=document.createElement("div"),l.className="tgrid-header-cell-container",a=document.createElement("div"),c=document.createElement("div"),a.className="tgrid-header-cell-content",c.className="tgrid-header-cell-buttons",l.appendChild(a),l.appendChild(c),h.appendChild(l),n.columns[o].header!=null?n.columns[o].header.applyTemplate(a):(b=n.columns[o].member!=null?n.columns[o].member:"",this.createDefaultHeader(a,b)),function(i){h.onclick=function(r){return t.Grid.getGridObject(r.target).sortBy(n.columns[i].sortMemberPath)}}(o),f&&n.sortDescriptor.path==n.columns[o].sortMemberPath&&this.addArrows(c,n,o),this.addFilterButton(n,i,u,c,o),n.columns[o].resizable&&(v=document.createElement("div"),v.className="tgrid-header-column-resize",v.onclick=function(n){return n.stopImmediatePropagation()},function(t,i,r){var f=null,u=0;r.onmousedown=function(i){i.stopImmediatePropagation();console.log("test");u=i.screenX;f=document.onmousemove;document.onmousemove=function(i){u!=0&&(n.columns[t].width=(parseInt(n.columns[t].width)+i.screenX-u).toString(),u=i.screenX,e(n.columns[t]))}};document.onmouseup=function(){document.onmousemove=f;u=0}}(o,h,v),c.appendChild(v)),s.appendChild(h);w=document.createElement("th");w.classList.add("tgrid-placeholder");s.appendChild(w);i.appendChild(s)}},r.prototype.updateTableBodyElement=function(n,t,i,u){var o,e,f;for(n.showDetailFor.isDetailColumn||(n.showDetailFor.column=-1),o=angular.module(r.angularModuleName,[]),e=0;e<i.length;e++)this.appendTableElement(n,t,i[e],0,u,r.angularModuleName,o);f=t.getAttribute("class");f==null||f==undefined||f==""?f="desktop":f.indexOf("desktop")==-1&&(f+=" desktop");t.setAttribute("class",f)},r.prototype.addDetailRow=function(){},r.prototype.updateTableDetailRow=function(n,i,r){var f=i.getElementsByClassName("details"),u,e,o;if(f.length>0&&f[0].parentNode.removeChild(f[0]),n.selectionMode==t.SelectionMode.Multi){if(!n.ctrlKey)for(u=0;u<i.children.length;u++)i.children.item(u).classList.remove("selected");n.isSelected(r)?n.selectedRow.classList.add("selected"):n.selectedRow.classList.remove("selected")}if(n.selectionMode==t.SelectionMode.Single){for(u=0;u<i.children.length;u++)i.children.item(u).classList.remove("selected");n.isSelected(r)?n.selectedRow.classList.add("selected"):n.selectedRow.classList.remove("selected")}e=i.getElementsByClassName("selected");this.hasDetails(e,n)&&(o=this.buildDetailsRow(n,r),o.classList.add("details"),insertAfter(e[0],o))},r.prototype.updateTableFooterElement=function(n,t,i,r){if(n.tableFooterTemplate==null&&n.isEnablePaging)this.updateTableFooterElementDefault(n,t,i);else if(n.tableFooterTemplate!=null){var u=document.createElement("div");u.className="tgrid-footer-container";u.setAttribute("ng-controller","tgrid-footer-controller");n.tableFooterTemplate.applyTemplate(u);t.innerHTML="";n.isEnablePaging&&this.updateTableFooterElementDefault(n,t,i);t.appendChild(u);angular.bootstrap(u,[r.angularModuleName])}},r.prototype.addFilteringPopUp=function(n,t,i){if(n.filterPopup==null)this.defaultFiltringPopUp(n,t);else{var r=document.createElement("div");r.className="tgrid-filter-popup-container";r.setAttribute("ng-controller","tgrid-filter-popup-controller");n.filterPopup.applyTemplate(r);t.innerHTML="";t.appendChild(r);angular.bootstrap(r,[i.angularModuleName])}},r.prototype.appendTableElement=function(n,t,i,r,u,f,e){var o,s;i.isGroupHeader?(o=this.buildGroupHeaderRow(n,i.item),t.appendChild(o)):(s=this.buildRowElement(n,i,t,u,f,e),t.appendChild(s))},r.prototype.buildRowElement=function(n,i,u,f,e,o){var s=document.createElement("tr"),c,h,l,a;for(s.classList.add("table-body-row"),n.isSelected(i.item)&&s.classList.add("selected"),c=new t.AngularItemViewModel(i.model,i.item,i.grid,i.isGroupHeader),c.angularControllerName="tgrid-row-controller"+r.controllerItemCounter++,o.controller(c.angularControllerName,function(n){c.setScope(n)}),s.setAttribute("ng-controller",c.angularControllerName),this.appendIndent(s,n.groupBySortDescriptor.length,!1),h=0;h<n.columns.length;h++)l=document.createElement("td"),n.columns[h].cell!=null?n.columns[h].cell.applyTemplate(l):n.columns[h].member!=null&&(l=this.createDefaultCell(l,n.columns[h].member)),s.appendChild(l);return angular.bootstrap(s,[e]),a=document.createElement("td"),a.classList.add("tgrid-placeholder"),s.appendChild(a),function(i){s.onclick=function(r){n.selectionMode!=t.SelectionMode.None&&(n.ctrlKey=r.ctrlKey,n.selectedRow=this,f(i,r.ctrlKey))}}(i),s},r.prototype.buildDetailsRow=function(n,i){var e=document.createElement("tr"),u=document.createElement("td"),f;return this.appendIndent(e,n.groupBySortDescriptor.length,!1),e.classList.add("details"),u.setAttribute("colspan",(n.columns.length+1).toString()),n.showDetailFor.column==-1?n.detailsTemplateHtml.applyTemplate(u):n.columns[n.showDetailFor.column].cellDetail.applyTemplate(u),f=new t.AngularItemViewModel(null,i,null,null),f.angularControllerName="tgrid-detail-controller"+r.controllerItemCounter++,angular.module(r.angularModuleName,[]).controller(f.angularControllerName,function(n){f.setScope(n)}),u.setAttribute("ng-controller",f.angularControllerName),e.appendChild(u),angular.bootstrap(u,[r.angularModuleName]),e},r.prototype.buildGroupHeaderRow=function(i,u){var o=document.createElement("tr"),f=document.createElement("td"),s,e;return this.appendIndent(o,u.level,!1),s=i.columns.length+1+i.groupBySortDescriptor.length-u.level,f.setAttribute("colspan",s.toString()),f.classList.add("tgrid-table-group-header"),o.classList.add("tgrid-table-group-header"),i.groupHeaderTemplate!=null?i.groupHeaderTemplate.applyTemplate(f):f=this.createDefaultGroupHeader(f),i.isEnableCollapsing&&(f.onclick=u.collapse?function(t){n.TGrid.Grid.getGridObject(t.target).removeCollapsedFilters(u.filterDescriptor)}:function(t){n.TGrid.Grid.getGridObject(t.target).setCollapsedFilters(u.filterDescriptor)}),e=new t.AngularItemViewModel(null,u.value,null,null),e.angularControllerName="tgrid-groupHeader-controller"+r.controllerItemCounter++,angular.module(r.angularGroupModuleName,[]).controller(e.angularControllerName,function(n){e.setScope(n)}),f.setAttribute("ng-controller",e.angularControllerName),o.appendChild(f),angular.bootstrap(f,[r.angularGroupModuleName]),o},r.prototype.addArrows=function(n,t){var i,r;return t.sortDescriptor.asc&&(i=document.createElement("div"),i.classList.add("tgrid-arrow-up"),n.appendChild(i)),t.sortDescriptor.asc||(r=document.createElement("div"),r.classList.add("tgrid-arrow-down"),n.appendChild(r)),n},r.prototype.removeArrows=function(n){var t=n.getElementsByClassName("tgrid-arrow-up");t.length==1&&t[0].parentNode.removeChild(t[0]);t=n.getElementsByClassName("tgrid-arrow-down");t.length==1&&t[0].parentNode.removeChild(t[0])},r.prototype.appendIndent=function(n,t,i){for(var r,f=i?"th":"td",u=0;u<t;u++)r=document.createElement(f),r.className="tgrid-table-indent-cell",n.appendChild(r)},r.prototype.updateMobileItemsList=function(n,t,i,r){var f,u;for(n.showDetailFor.isDetailColumn||(n.showDetailFor.column=-1),f=0;f<i.length;f++)this.appendMobileElement(n,t,i[f],0,r);u=t.getAttribute("class");u==null||u==undefined||u==""?u="mobile":u.indexOf("mobile")==-1&&(u+=" mobile");t.setAttribute("class",u);n.showDetailFor.isDetailColumn=!1},r.prototype.updateMobileDetailRow=function(n,i,r){var f=i.getElementsByClassName("details"),u,e,o;if(f.length>0&&f[0].parentNode.removeChild(f[0]),n.selectionMode==t.SelectionMode.Multi){if(!n.ctrlKey)for(u=0;u<i.children.length;u++)i.children.item(u).classList.remove("selected");n.isSelected(r.item)?n.selectedRow.classList.add("selected"):i.children.item(u).classList.remove("selected")}if(n.selectionMode==t.SelectionMode.Single){for(u=0;u<i.children.length;u++)i.children.item(u).classList.remove("selected");n.isSelected(r)?n.selectedRow.classList.add("selected"):i.children.item(u).classList.remove("selected")}e=i.getElementsByClassName("selected");this.hasDetails(e,n)&&(o=this.buildMobileDetailsRow(n,r),o.classList.add("details"),insertAfter(e[0],o))},r.prototype.appendMobileElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupMobileHeaderRow(n,i.item),t.appendChild(f)):(e=this.buildMobileRowElement(n,i,t,u),t.appendChild(e))},r.prototype.buildMobileRowElement=function(n,i,u,f){var e=document.createElement("div"),h,o,s,c;for(e.classList.add("tgrid-mobile-row"),n.isSelected(i.item)&&e.classList.add("selected"),h=0;h<n.groupBySortDescriptor.length;h++)e.innerHTML+="<div class='tgrid-mobile-indent-div'><\/div>";return o=document.createElement("div"),o.classList.add("tgrid-mobile-div"),n.mobileTemplateHtml!=null?n.mobileTemplateHtml.applyTemplate(o):o=this.createDefaultMobileTemplate(o,n),e.appendChild(o),s=new t.AngularItemViewModel(i.model,i.item,i.grid,i.isGroupHeader),s.angularControllerName="tgrid-mobile-row-controller"+r.controllerItemCounter++,angular.module(r.angularModuleName).controller(s.angularControllerName,function(n){s.setScope(n)}),e.setAttribute("ng-controller",s.angularControllerName),angular.bootstrap(e,[r.angularModuleName]),c=document.createElement("td"),c.classList.add("tgrid-placeholder"),e.appendChild(c),function(i){e.onclick=function(r){if(n.selectionMode!=t.SelectionMode.None){n.ctrlKey=r.ctrlKey;n.selectedRow=this;var e=u;f(i,r.ctrlKey)}}}(i),e},r.prototype.createDefaultGroupHeader=function(n){var i=document.createElement("div"),t=document.createElement("span");return t.innerHTML="{{item}}",t.setAttribute("style","color: green;"),i.appendChild(t),n.appendChild(i),n},r.prototype.buildMobileDetailsRow=function(n,i){var u=document.createElement("div"),f;return u.classList.add("tgrid-mobile-details"),n.showDetailFor.column==-1?n.detailsTemplateHtml.applyTemplate(u):n.columns[n.showDetailFor.column].cellDetail.applyTemplate(u),f=new t.AngularItemViewModel(null,i,null,null),f.angularControllerName="tgrid-detail-controller"+r.controllerItemCounter++,angular.module(r.angularModuleName,[]).controller(f.angularControllerName,function(n){f.setScope(n)}),u.setAttribute("ng-controller",f.angularControllerName),angular.bootstrap(u,[r.angularModuleName]),u},r.prototype.bindMobileGroupHeader=function(n,i,u){var f=new t.AngularItemViewModel(null,i,null,null);f.angularControllerName="tgrid-groupHeader-controller"+r.controllerItemCounter++;angular.module(r.angularGroupModuleName,[]).controller(f.angularControllerName,function(n){f.setScope(n)});u.setAttribute("ng-controller",f.angularControllerName);n.appendChild(u);angular.bootstrap(u,[r.angularGroupModuleName])},r.prototype.createDefaultCell=function(n,t){var i=document.createElement("span"),r="{{item.".concat(t).concat("}}");return i.innerHTML=r,n.appendChild(i),n},r.moduleFooterCounter=0,r.controllerItemCounter=0,r.angularModuleName="tgrid-row-module",r.angularGroupModuleName="tgrid-group-module",r}(t.BaseHtmlProvider);t.AngularHtmlProvider=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={})),function(n){(function(n){var t=function(){function n(){return this.directive={},this.directive.restrict="E",this.directive.link=function(n,t,i){var r=new TesserisPro.TGrid.Options(t[0],TesserisPro.TGrid.Framework.Angular),u,f,e,o,s;if(i.groupby!=undefined&&(u=i.groupby.split(" "),u.length>0&&u[0]!=""))for(f=0;f<u.length;f++)r.groupBySortDescriptor.push(new TesserisPro.TGrid.SortDescriptor(u[f],!0));r.isEnablePaging=i.enablepaging==undefined?!1:i.enablepaging=="true"?!0:!1;e=i.pagesize;r.pageSize=parseInt(e);this.isEnablePaging&&(r.pageSize=isNaN(this.pageSize)||this.pageSize<1?10:this.pageSize);o=i.selectmode;r.selectionMode=o;isNaN(this.selectionMode)&&(r.selectionMode=1);r.isEnableVirtualScroll=i.enablevirtualscroll==undefined?!1:i.enablevirtualscroll=="true"?!0:!1;r.isEnableCollapsing=i.enablecollapsing==undefined?!1:i.enablecollapsing=="true"?!0:!1;r.isEnableGrouping=i.enablegrouping==undefined?!1:i.enablegrouping=="true"?!0:!1;r.isEnableFiltering=i.enablefiltering==undefined?!1:i.enablefiltering=="true"?!0:!1;s=new TesserisPro.TGrid.Grid(t[0],r,n[i.provider])},this.directive}return n}();n.Directive=t})(n.Angular||(n.Angular={}));var t=n.Angular}(TGrid||(TGrid={})),function(n){(function(n){var t=function(){function n(){this.totalCount=0;this.selectedItem=null;this.currentPage=1;this.totalPages=1}return n.prototype.setScope=function(n){this.$scope=n;this.$scope.totalCount=this.totalCount;this.$scope.selectedItem=this.selectedItem;this.$scope.currentPage=this.currentPage;this.$scope.totalPages=this.totalPages},n.prototype.setTotalCount=function(n){this.totalCount=n;this.$scope!=null&&(this.$scope.totalCount=n,this.$scope.$apply())},n.prototype.setSelectedItem=function(n){this.selectedItem=n;this.$scope!=null&&(this.$scope.selectedItem=n,this.$scope.$apply())},n.prototype.setCurrentPage=function(n){this.currentPage=n;this.$scope!=null&&(this.$scope.currentPage=n,this.$scope.$apply())},n.prototype.setTotalPages=function(n){this.totalPages=n;this.$scope!=null&&(this.$scope.totalPages=n,this.$scope.$apply())},n}();n.AngularFooterViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(n){var t=function(){function t(n){this.container=n}return t.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.onApply=function(){return t.onApply()};this.$scope.onClear=function(){return t.onClear()};this.$scope.onClose=function(){return t.onClose()}},t.prototype.onApply=function(){var t=this.container.getElementsByTagName("select")[0].selectedIndex,i=this.container.getElementsByTagName("input")[0].value,r=n.Grid.getGridObject(this.container).options.filterPath,u=new n.FilterDescriptor(r,i,t);n.Grid.getGridObject(this.container).setFilters(u)},t.prototype.onClear=function(){n.Grid.getGridObject(this.container).removeFilters()},t.prototype.onClose=function(){n.Grid.getGridObject(this.container).hideElement(this.container)},t}();n.AngularFilterPopupViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}))