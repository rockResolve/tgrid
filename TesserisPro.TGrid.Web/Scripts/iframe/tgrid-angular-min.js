var __extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},TGrid,TesserisPro;(function(n){(function(t){var i=function(i){function r(){i.apply(this,arguments)}return __extends(r,i),r.prototype.getElemntsSize=function(n,t){var f=0,r=n.children,i,u,e;if(t==null)for(i=0;i<r.length;i++)u=r.item(i),f+=u.clientHeight;else for(i=0;i<r.length;i++)u=r.item(i),e=t[i],e!=null&&t.indexOf(e)>0&&(f+=u.clientHeight);return f},r.prototype.getFirstVisibleItem=function(n,t,i){for(var o,u,f=0,e=n.children,r=0;r<e.length;r++){if(f>i)return u;o=e.item(r);u=t[r];u!=null&&t.indexOf(u)>=0&&(f+=o.clientHeight)}return null},r.prototype.getTableElement=function(){var n=document.createElement("table");return n.className="tgrid-table",n},r.prototype.getFooterViewModel=function(){var n=new t.AngularFooterViewModel;return n.angularModuleName="tgrid-footer-module"+r.moduleFooterCounter++,angular.module(n.angularModuleName,[]).controller("tgrid-footer-controller",["$scope",function(t){n.setScope(t)}]),n},r.prototype.getFilterPopupViewModel=function(n){var i=new t.AngularFilterPopupViewModel(n),r;return i.angularModuleName="tgrid-filter-popup-module",r=angular.module(i.angularModuleName,[]).controller("tgrid-filter-popup-controller",["$scope",function(n){i.setScope(n)}]),i},r.prototype.updateTableHeadElement=function(n,i,r,u,f){var o,s,h,e,c,v,l,a,b,y,p;if(this.updateGroupByPanel(n,r),i.innerHTML!=null&&i.innerHTML!=""){if(this.showNeededIndents(i,n.groupBySortDescriptors.length,t.Grid.getGridObject(i)),n.enableSorting){this.removeArrows(i);var w=i.getElementsByTagName("th"),k=n.columns.length,d=n.columns.length,g=w.length;for(o=k,s=0;o<g,s<d;o,s++)n.columns[s].device.indexOf("desktop")!=-1&&(n.sortDescriptor.path==n.columns[s].sortMemberPath&&n.columns[s].sortMemberPath!=null&&this.addArrows(w[o].getElementsByClassName("tgrid-header-cell-buttons")[0],n,o),o++)}}else{for(h=document.createElement("tr"),this.appendIndent(h,n.columns.length,!0),this.showNeededIndents(h,n.groupBySortDescriptors.length,t.Grid.getGridObject(i)),e=0;e<n.columns.length;e++)n.columns[e].device.indexOf("desktop")!=-1&&(c=document.createElement("th"),c.setAttribute("width",n.columns[e].width),v=document.createElement("div"),v.className="tgrid-header-cell-container",l=document.createElement("div"),a=document.createElement("div"),l.className="tgrid-header-cell-content",l.style.overflow="hidden",a.className="tgrid-header-cell-buttons",v.appendChild(l),v.appendChild(a),c.appendChild(v),n.columns[e].header!=null?n.columns[e].header.applyTemplate(l):(b=n.columns[e].member!=null?n.columns[e].member:"",this.buildDefaultHeader(l,b)),n.enableSorting&&(function(i){c.onclick=function(r){return t.Grid.getGridObject(r.target).sortBy(n.columns[i].sortMemberPath)}}(e),n.sortDescriptor.path==n.columns[e].sortMemberPath&&n.columns[e].sortMemberPath!=null&&this.addArrows(a,n,e)),this.addFilterButton(n,i,u,a,e),n.columns[e].resizable&&(y=document.createElement("div"),y.className="tgrid-header-column-resize",y.onclick=function(n){return n.stopImmediatePropagation()},function(t,i,r){var e=null,u=0;r.onmousedown=function(i){i.stopImmediatePropagation();console.log("test");u=i.screenX;e=document.onmousemove;document.onmousemove=function(i){u!=0&&(n.columns[t].width=(parseInt(n.columns[t].width)+i.screenX-u).toString(),u=i.screenX,f(n.columns[t]))}};document.onmouseup=function(){document.onmousemove=e;u=0}}(e,c,y),a.appendChild(y)),h.appendChild(c));p=document.createElement("th");p.classList.add("tgrid-placeholder");h.appendChild(p);i.appendChild(h)}},r.prototype.updateTableBodyElement=function(n,t,i,u){var o,e,f;for(n.showDetailFor.isDetailColumn||(n.showDetailFor.column=-1),o=angular.module(r.angularModuleName,[]),e=0;e<i.length;e++)this.appendTableElement(n,t,i[e],0,u,r.angularModuleName,o);f=t.getAttribute("class");f==null||f==undefined||f==""?f="desktop":f.indexOf("desktop")==-1&&(f+=" desktop");t.setAttribute("class",f)},r.prototype.addDetailRow=function(){},r.prototype.updateTableDetailRow=function(n,t,i){var f=t.getElementsByClassName("tgrid-details"),r,u,e,o;for(f.length>0&&f[0].parentNode.removeChild(f[0]),u=0;u<t.children.length;u++)if(t.children.item(u).dataContext==i){r=t.children.item(u);break}r!=null&&(n.isSelected(i)?r.classList.add("selected"):r.classList.remove("selected"),e=this.getActualDetailsTemplate(n),e!=null&&(o=this.buildDetailsRow(n,i,e),insertAfter(r,o)))},r.prototype.updateTableFooterElement=function(n,t,i,r){if(n.tableFooterTemplate==null&&n.enablePaging)this.buildDefaultTableFooterElement(n,t,i);else if(n.tableFooterTemplate!=null){var u=document.createElement("div");u.className="tgrid-footer-container";u.setAttribute("ng-controller","tgrid-footer-controller");n.tableFooterTemplate.applyTemplate(u);t.innerHTML="";n.enablePaging&&this.buildDefaultTableFooterElement(n,t,i);angular.bootstrap(u,[r.angularModuleName]);t.appendChild(u)}},r.prototype.updateFilteringPopUp=function(n,t,i){if(n.filterPopup==null)this.buildDefaultFiltringPopUp(n,t);else{var r=document.createElement("div");r.className="tgrid-filter-popup-container";r.setAttribute("ng-controller","tgrid-filter-popup-controller");n.filterPopup.applyTemplate(r);t.innerHTML="";angular.bootstrap(r,[i.angularModuleName]);t.appendChild(r)}},r.prototype.appendTableElement=function(n,t,i,r,u,f,e){var o,s;i.isGroupHeader?(o=this.buildGroupHeaderRow(n,i.item),t.appendChild(o)):(s=this.buildRowElement(n,i,t,u,f,e),t.appendChild(s))},r.prototype.buildRowElement=function(n,i,u,f,e){var o=document.createElement("tr"),c,v,s,l,h,a;for(o.classList.add("table-body-row"),n.isSelected(i.item)&&o.classList.add("selected"),c=new t.AngularItemViewModel(i.model,i.item,i.grid,i.isGroupHeader),c.angularControllerName="tgrid-row-controller"+r.controllerItemCounter++,v=angular.module(r.angularModuleName,[]),v.controller(c.angularControllerName,["$scope",function(n){c.setScope(n)}]).directive("ngShowInFocus",function(){return{replace:!0,restrict:"A",link:function(n,t,i){n.$watch(i.ngShowInFocus,function(n){n?(t.css("display","block"),t.focus()):t.css("display","none")})}}}),o.setAttribute("ng-controller",c.angularControllerName),this.appendIndent(o,n.groupBySortDescriptors.length,!1),s=0;s<n.columns.length;s++)n.columns[s].device.indexOf("desktop")!=-1&&(l=document.createElement("td"),h=document.createElement("div"),h.className="tgrid-cell-content",h.style.overflow="hidden",l.appendChild(h),n.columns[s].cell!=null?n.columns[s].cell.applyTemplate(h):n.columns[s].member!=null&&this.createDefaultCell(h,n.columns[s].member),o.appendChild(l));return angular.bootstrap(o,[e]),o.dataContext=i.item,a=document.createElement("td"),a.classList.add("tgrid-placeholder"),o.appendChild(a),function(i){o.onclick=function(r){n.selectionMode!=t.SelectionMode.None&&f(i,r.ctrlKey)}}(i),o},r.prototype.buildDetailsRow=function(n,i,u){var o=document.createElement("tr"),f=document.createElement("td"),e;return this.appendIndent(o,n.groupBySortDescriptors.length,!1),o.classList.add("tgrid-details"),f.setAttribute("colspan",(n.columns.length+1).toString()),u.applyTemplate(f),e=new t.AngularItemViewModel(null,i,null,null),e.angularControllerName="tgrid-detail-controller"+r.controllerItemCounter++,angular.module(r.angularModuleName,[]).controller(e.angularControllerName,["$scope",function(n){e.setScope(n)}]),f.setAttribute("ng-controller",e.angularControllerName),o.appendChild(f),angular.bootstrap(f,[r.angularModuleName]),o},r.prototype.buildGroupHeaderRow=function(i,u){var o=document.createElement("tr"),f=document.createElement("td"),s,e;return this.appendIndent(o,u.level,!1),s=i.columns.length+1+i.groupBySortDescriptors.length-u.level,f.setAttribute("colspan",s.toString()),f.classList.add("tgrid-table-group-header"),o.classList.add("tgrid-table-group-header"),i.groupHeaderTemplate!=null?i.groupHeaderTemplate.applyTemplate(f):f=this.createDefaultGroupHeader(f),i.enableCollapsing&&(f.onclick=u.collapse?function(t){n.TGrid.Grid.getGridObject(t.target).removeCollapsedFilters(u.filterDescriptor)}:function(t){n.TGrid.Grid.getGridObject(t.target).setCollapsedFilters(u.filterDescriptor)}),e=new t.AngularItemViewModel(null,u.value,null,null),e.angularControllerName="tgrid-groupHeader-controller"+r.controllerItemCounter++,angular.module(r.angularGroupModuleName,[]).controller(e.angularControllerName,["$scope",function(n){e.setScope(n)}]),f.setAttribute("ng-controller",e.angularControllerName),o.appendChild(f),angular.bootstrap(f,[r.angularGroupModuleName]),o},r.prototype.addArrows=function(n,t){var i,r;return t.sortDescriptor.asc&&(i=document.createElement("div"),i.classList.add("tgrid-arrow-up"),n.appendChild(i)),t.sortDescriptor.asc||(r=document.createElement("div"),r.classList.add("tgrid-arrow-down"),n.appendChild(r)),n},r.prototype.removeArrows=function(n){for(var i=n.getElementsByClassName("tgrid-arrow-up"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-arrow-down"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},r.prototype.updateMobileItemsList=function(n,t,i,r){var f,u;for(n.showDetailFor.isDetailColumn||(n.showDetailFor.column=-1),f=0;f<i.length;f++)this.appendMobileElement(n,t,i[f],0,r);u=t.getAttribute("class");u==null||u==undefined||u==""?u="mobile":u.indexOf("mobile")==-1&&(u+=" mobile");t.setAttribute("class",u);n.showDetailFor.isDetailColumn=!1},r.prototype.updateMobileDetailRow=function(n,t,i){var f=t.getElementsByClassName("tgrid-mobile-details"),r,u,e,o;for(f.length>0&&f[0].parentNode.removeChild(f[0]),u=0;u<t.children.length;u++)if(t.children.item(u).dataContext==i){r=t.children.item(u);break}r!=null&&(n.isSelected(i)?r.classList.add("selected"):r.classList.remove("selected"),e=this.getActualDetailsTemplate(n),e!=null&&(o=this.buildMobileDetailsRow(n,i,e),insertAfter(r,o)))},r.prototype.appendMobileElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupMobileHeaderRow(n,i.item),t.appendChild(f)):(e=this.buildMobileRowElement(n,i,t,u),t.appendChild(e))},r.prototype.buildMobileRowElement=function(n,i,u,f){var e=document.createElement("div"),h,o,s,c;for(e.classList.add("tgrid-mobile-row"),n.isSelected(i.item)&&e.classList.add("selected"),h=0;h<n.groupBySortDescriptors.length;h++)e.innerHTML+="<div class='tgrid-mobile-indent-div'><\/div>";return o=document.createElement("div"),o.classList.add("tgrid-mobile-div"),n.mobileTemplateHtml!=null?n.mobileTemplateHtml.applyTemplate(o):o=this.createDefaultMobileTemplate(o,n),e.appendChild(o),s=new t.AngularItemViewModel(i.model,i.item,i.grid,i.isGroupHeader),s.angularControllerName="tgrid-mobile-row-controller"+r.controllerItemCounter++,angular.module(r.angularModuleName).controller(s.angularControllerName,["$scope",function(n){s.setScope(n)}]),e.setAttribute("ng-controller",s.angularControllerName),angular.bootstrap(e,[r.angularModuleName]),e.dataContext=i.item,c=document.createElement("td"),c.classList.add("tgrid-placeholder"),e.appendChild(c),function(i){e.onclick=function(r){if(n.selectionMode!=t.SelectionMode.None){var e=u;f(i,r.ctrlKey)}}}(i),e},r.prototype.createDefaultGroupHeader=function(n){var i=document.createElement("div"),t=document.createElement("span");return t.innerHTML="{{item}}",t.setAttribute("style","color: green;"),i.appendChild(t),n.appendChild(i),n},r.prototype.buildMobileDetailsRow=function(n,i,u){var f=document.createElement("div"),e;return f.classList.add("tgrid-mobile-details"),u.applyTemplate(f),e=new t.AngularItemViewModel(null,i,null,null),e.angularControllerName="tgrid-detail-controller"+r.controllerItemCounter++,angular.module(r.angularModuleName,[]).controller(e.angularControllerName,["$scope",function(n){e.setScope(n)}]),f.setAttribute("ng-controller",e.angularControllerName),angular.bootstrap(f,[r.angularModuleName]),f},r.prototype.bindMobileGroupHeader=function(n,i,u){var f=new t.AngularItemViewModel(null,i,null,null);f.angularControllerName="tgrid-groupHeader-controller"+r.controllerItemCounter++;angular.module(r.angularGroupModuleName,[]).controller(f.angularControllerName,["$scope",function(n){f.setScope(n)}]);u.setAttribute("ng-controller",f.angularControllerName);n.appendChild(u);angular.bootstrap(u,[r.angularGroupModuleName])},r.prototype.createDefaultCell=function(n,t){var i=document.createElement("span"),r="{{item.".concat(t).concat("}}");i.innerHTML=r;n.appendChild(i)},r.prototype.createDefaultMobileTemplate=function(n,t){for(var u,f,r,e,i=0;i<t.columns.length;i++)t.columns[i].device.indexOf("mobile")!=-1&&(u=document.createElement("div"),f=document.createElement("span"),f.innerHTML=t.columns[i].member!=null?t.columns[i].member:t.columns[i].sortMemberPath!=null?t.columns[i].sortMemberPath:t.columns[i].groupMemberPath!=null?t.columns[i].groupMemberPath:"",r=document.createElement("span"),t.columns[i].member!=null?(e=document.createElement("span"),r.innerHTML=" : {{item."+t.columns[i].member+"}}",r.appendChild(e)):r.innerHTML=": ",u.appendChild(f),u.appendChild(r),n.appendChild(u));return n},r.moduleFooterCounter=0,r.controllerItemCounter=0,r.angularModuleName="tgrid-row-module",r.angularGroupModuleName="tgrid-group-module",r}(t.BaseHtmlProvider);t.AngularHtmlProvider=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={})),function(n){(function(n){function t(){var n={};return n.restrict="E",n.link=function(n,t,i){var r=new TesserisPro.TGrid.Options(t[0],1),u,e,o,s,f,h;if(r.parentViewModel=n,i.groupby!=undefined&&(u=i.groupby.split(" "),u.length>0&&u[0]!=""))for(e=0;e<u.length;e++)r.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(u[e],!0));r.enablePaging=i.enablepaging==undefined?!1:i.enablepaging=="true"?!0:!1;o=i.pagesize;o!=undefined&&(r.pageSize=parseInt(o),this.isEnablePaging&&(r.pageSize=isNaN(this.pageSize)||this.pageSize<1?10:this.pageSize));s=i.pageslide;r.pageSlide=parseInt(s);this.isEnablePaging&&(r.pageSlide=isNaN(this.pageSlide)||this.pageSlide<1?1:this.pageSlide);f=i.selectionmode;f=="multi"&&(r.selectionMode=2);(f==undefined||f=="single")&&(r.selectionMode=1);f=="none"&&(r.selectionMode=0);r.enableVirtualScroll=i.enablevirtualscroll==undefined?!1:i.enablevirtualscroll=="true"?!0:!1;r.enableCollapsing=i.enablecollapsing==undefined?!1:i.enablecollapsing=="true"?!0:!1;r.enableSorting=i.enablesorting==undefined?!1:i.enablesorting=="true"?!0:!1;r.enableGrouping=i.enablegrouping==undefined?!1:i.enablegrouping=="true"?!0:!1;r.openDetailsOnSelection=i.showdetailsonselection==undefined?!1:i.showdetailsonselection=="true"?!0:!1;r.enableFiltering=i.enablefiltering==undefined?!1:i.enablefiltering=="true"?!0:!1;h=new TesserisPro.TGrid.Grid(t[0],r,n[i.provider])},n}function i(){}n.Directive=t;n.registerTGrid=i})(n.Angular||(n.Angular={}));var t=n.Angular}(TGrid||(TGrid={})),function(n){(function(n){var t=function(){function n(){this.totalCount=0;this.selectedItem=null;this.currentPage=1;this.totalPages=1}return n.prototype.setScope=function(n){this.$scope=n;this.$scope.totalCount=this.totalCount;this.$scope.selectedItem=this.selectedItem;this.$scope.currentPage=this.currentPage;this.$scope.totalPages=this.totalPages},n.prototype.setTotalCount=function(n){this.totalCount=n;this.$scope!=null&&(this.$scope.totalCount=n,this.$scope.$apply())},n.prototype.setSelectedItem=function(n){this.selectedItem=n;this.$scope!=null&&(this.$scope.selectedItem=n,this.$scope.$apply())},n.prototype.setCurrentPage=function(n){this.currentPage=n;this.$scope!=null&&(this.$scope.currentPage=n,this.$scope.$apply())},n.prototype.setTotalPages=function(n){this.totalPages=n;this.$scope!=null&&(this.$scope.totalPages=n,this.$scope.$apply())},n}();n.AngularFooterViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(n){var t=function(){function t(n){this.container=n}return t.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.onApply=function(){return t.onApply()};this.$scope.onClear=function(){return t.onClear()};this.$scope.onClose=function(){return t.onClose()}},t.prototype.onApply=function(){if(this.condition=this.container.getElementsByTagName("select")[0].selectedIndex,this.condition!=n.FilterCondition.None){this.value=this.container.getElementsByTagName("input")[0].value;var t=new n.FilterDescriptor(this.path,this.value,this.condition),i=n.Grid.getGridObject(this.container);i.setFilters(t,this.path)}else n.Grid.getGridObject(this.container).removeFilters(this.path);hideElement(this.container)},t.prototype.onClear=function(){n.Grid.getGridObject(this.container).removeFilters(this.path);hideElement(this.container)},t.prototype.onClose=function(){hideElement(this.container)},t.prototype.onOpen=function(t,i){n.Grid.getGridObject(this.container).setDefaultFilterPopUpValues();this.path=i.filterMemberPath;this.columnInfo=i;for(var r=0;r<t.filterDescriptors.length;r++)t.filterDescriptors[r].path==i.filterMemberPath&&(this.container.getElementsByTagName("input")[0].value=t.filterDescriptors[r].value,this.container.getElementsByTagName("select")[0].selectedIndex=t.filterDescriptors[r].condition)},t.prototype.getColumnInfo=function(){return this.columnInfo},t}();n.AngularFilterPopupViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}));__extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},function(n){(function(n){var t=function(n){function t(){n.apply(this,arguments)}return __extends(t,n),t.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.model=this.model;this.$scope.item=this.item;this.$scope.grid=this.grid;this.$scope.isGroupHeader=this.isGroupHeader;this.$scope.showDetailForCell=function(n){return t.showDetailForCell(n)};this.$scope.setItemValue=function(n){return t.setItemValue(n)}},t}(n.ItemViewModel);n.AngularItemViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}))