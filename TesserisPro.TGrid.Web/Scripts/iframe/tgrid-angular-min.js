var __extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},TGrid,TesserisPro;(function(n){(function(t){var i=function(t){function i(){t.apply(this,arguments)}return __extends(i,t),i.prototype.getElementsSize=function(n,t){var f=0,r=n.children,i,u,e;if(t==null)for(i=0;i<r.length;i++)u=r.item(i),f+=u.offsetHeight;else for(i=0;i<r.length;i++)u=r.item(i),e=t[i],e!=null&&t.indexOf(e)>0&&(f+=u.offsetHeight);return f},i.prototype.getFirstVisibleItem=function(n,t,i){for(var o,u,f=0,e=n.children,r=0;r<e.length;r++)if(o=e.item(r),u=t[r],u!=null&&t.indexOf(u)>=0&&(f+=o.offsetHeight),f>i)return u;return null},i.prototype.getTableElement=function(){var n=document.createElement("table");return n.className="tgrid-table",n},i.prototype.getFooterViewModel=function(t){var r=new n.TGrid.AngularFooterViewModel(t);return r.angularModuleName="tgrid-footer-module"+i.moduleFooterCounter++,angular.module(r.angularModuleName,[]).controller("tgrid-footer-controller",["$scope",function(n){r.setScope(n)}]),r},i.prototype.getFilterPopupViewModel=function(t){var i=new n.TGrid.AngularFilterPopupViewModel(t,this.onCloseFilterPopup),r;return i.angularModuleName="tgrid-filter-popup-module",r=angular.module(i.angularModuleName,[]).controller("tgrid-filter-popup-controller",["$scope",function(n){i.setScope(n)}]),i},i.prototype.updateTableHeadElement=function(t,i,r,u,f){var y,o,e,s,l,h,c,p,a,v;for(t.columns.length<=0&&(y=n.TGrid.Grid.getGridObject(i),y.setColumnsFromItemsProvider()),this.updateGroupByPanel(t,r),o=document.createElement("tr"),this.appendIndent(o,t.columns.length,!0),this.showNeededIndents(o,t.groupBySortDescriptors.length,n.TGrid.Grid.getGridObject(i)),e=0;e<t.columns.length;e++)t.columns[e].device.indexOf("desktop")!=-1&&(s=document.createElement("th"),s.setAttribute("width",t.columns[e].width),l=document.createElement("div"),l.className="tgrid-header-cell-container",h=document.createElement("div"),c=document.createElement("div"),h.className="tgrid-header-cell-content",h.style.overflow="hidden",c.className="tgrid-header-cell-buttons",l.appendChild(h),l.appendChild(c),s.appendChild(l),t.columns[e].header!=null?t.columns[e].header.applyTemplate(h):(p=t.columns[e].member!=null?t.columns[e].member:"",this.buildDefaultHeader(h,p)),t.enableSorting&&(function(i){s.onclick=function(r){return n.TGrid.Grid.getGridObject(r.target).sortBy(t.columns[i].sortMemberPath)}}(e),t.sortDescriptor.path==t.columns[e].sortMemberPath&&t.columns[e].sortMemberPath!=null&&this.addArrows(c,t,e)),this.addFilterButton(t,i,u,c,e),t.columns[e].resizable&&(a=document.createElement("div"),a.className="tgrid-header-column-resize",a.onclick=function(n){return n.stopImmediatePropagation()},function(n,i,r){var e=null,u=0;r.onmousedown=function(i){i.stopImmediatePropagation();u=i.screenX;e=document.onmousemove;document.onmousemove=function(i){u!=0&&(t.columns[n].width=(parseInt(t.columns[n].width)+i.screenX-u).toString(),u=i.screenX,f(t.columns[n]))}};document.onmouseup=function(){document.onmousemove=e;u=0}}(e,s,a),c.appendChild(a)),o.appendChild(s));v=document.createElement("th");addClass(v,"tgrid-placeholder");o.appendChild(v);i.innerHTML="";i.appendChild(o)},i.prototype.updateTableBodyElement=function(n,t,r,u){for(var f,o=angular.module(i.angularModuleName,[]),e=0;e<r.length;e++)this.appendTableElement(n,t,r[e],0,u,i.angularModuleName,o);f=t.getAttribute("class");f==null||f==undefined||f==""?f="desktop":f.indexOf("desktop")==-1&&(f+=" desktop");t.setAttribute("class",f)},i.prototype.addDetailRow=function(){},i.prototype.updateTableDetailRow=function(n,t,i,r){var e=t.getElementsByClassName("tgrid-details"),u,f,o,s;for(e.length>0&&e[0].parentNode.removeChild(e[0]),f=0;f<t.children.length;f++)if(t.children.item(f).dataContext==i){u=t.children.item(f);break}u!=null&&(n.isSelected(i)?addClass(u,"selected"):removeClass(u,"selected"),r&&(o=this.getActualDetailsTemplate(n),o!=null&&(s=this.buildDetailsRow(n,i,o),insertAfter(u,s))))},i.prototype.updateTableFooterElement=function(n,t,i,r){if(n.tableFooterTemplate==null&&n.enablePaging)this.buildDefaultTableFooterElement(n,t,i);else if(n.tableFooterTemplate!=null)if(t.hasChildNodes())r.apply();else{var u=document.createElement("div");u.className="tgrid-footer-container";u.setAttribute("ng-controller","tgrid-footer-controller");n.tableFooterTemplate.applyTemplate(u);angular.bootstrap(u,[r.angularModuleName]);t.appendChild(u)}},i.prototype.updateFilteringPopUp=function(n,t,i){var r;n.filterPopup==null?(r=document.createElement("div"),r.className="tgrid-filter-popup-container",r.setAttribute("ng-controller","tgrid-filter-popup-controller"),this.buildDefaultFilteringPopUp(n,r),angular.bootstrap(r,[i.angularModuleName]),t.appendChild(r)):(r=document.createElement("div"),r.className="tgrid-filter-popup-container",r.setAttribute("ng-controller","tgrid-filter-popup-controller"),n.filterPopup.applyTemplate(r),t.innerHTML="",angular.bootstrap(r,[i.angularModuleName]),t.appendChild(r))},i.prototype.appendTableElement=function(n,t,i,r,u,f,e){var o,s;i.isGroupHeader?(o=this.buildGroupHeaderRow(n,i.item),t.appendChild(o)):(s=this.buildRowElement(n,i,t,u,f,e),t.appendChild(s))},i.prototype.buildRowElement=function(t,r,u,f,e){var o=document.createElement("tr"),c,v,s,l,h,a;for(addClass(o,"tgrid-table-body-row"),t.isSelected(r.item)&&addClass(o,"selected"),c=new n.TGrid.AngularItemViewModel(r.model,r.item,r.grid,r.isGroupHeader),c.angularControllerName="tgrid-row-controller"+i.controllerItemCounter++,v=angular.module(i.angularModuleName,[]),v.controller(c.angularControllerName,["$scope",function(n){c.setScope(n)}]).directive("ngShowInFocus",function(){return{replace:!0,restrict:"A",link:function(n,t,i){n.$watch(i.ngShowInFocus,function(n){n?(t.css("display","block"),t.focus()):t.css("display","none")})}}}),o.setAttribute("ng-controller",c.angularControllerName),this.appendIndent(o,t.groupBySortDescriptors.length,!1),s=0;s<t.columns.length;s++)t.columns[s].device.indexOf("desktop")!=-1&&(l=document.createElement("td"),h=document.createElement("div"),h.className="tgrid-cell-content",h.style.overflow="hidden",l.appendChild(h),t.columns[s].cell!=null?t.columns[s].cell.applyTemplate(h):t.columns[s].member!=null&&this.createDefaultCell(h,t.columns[s].member),o.appendChild(l));return angular.bootstrap(o,[e]),o.dataContext=r.item,a=document.createElement("td"),addClass(a,"tgrid-placeholder"),o.appendChild(a),function(n){o.onclick=function(i){t.selectionMode!=0&&f(n,i.ctrlKey)}}(r),o},i.prototype.buildDetailsRow=function(t,r,u){var o=document.createElement("tr"),f=document.createElement("td"),e;return this.appendIndent(o,t.groupBySortDescriptors.length,!1),addClass(o,"tgrid-details"),f.setAttribute("colspan",(t.columns.length+1).toString()),u.applyTemplate(f),e=new n.TGrid.AngularItemViewModel(null,r,null,null),e.angularControllerName="tgrid-detail-controller"+i.controllerItemCounter++,angular.module(i.angularModuleName,[]).controller(e.angularControllerName,["$scope",function(n){e.setScope(n)}]),f.setAttribute("ng-controller",e.angularControllerName),o.appendChild(f),angular.bootstrap(f,[i.angularModuleName]),o},i.prototype.buildGroupHeaderRow=function(t,r){var e=document.createElement("tr"),u=document.createElement("td"),o,f;return this.appendIndent(e,r.level,!1),o=t.columns.length+1+t.groupBySortDescriptors.length-r.level,u.setAttribute("colspan",o.toString()),addClass(u,"tgrid-table-group-header"),addClass(e,"tgrid-table-group-header"),t.groupHeaderTemplate!=null?t.groupHeaderTemplate.applyTemplate(u):u=this.createDefaultGroupHeader(u),t.enableCollapsing&&(addClass(u,"collapsing"),u.onclick=function(t){r.collapse?(n.TGrid.Grid.getGridObject(t.target).removeCollapsedFilters(r.filterDescriptor),r.collapse=!1):(n.TGrid.Grid.getGridObject(t.target).setCollapsedFilters(r.filterDescriptor),r.collapse=!0)}),f=new n.TGrid.AngularItemViewModel(null,r.value,null,null),f.angularControllerName="tgrid-groupHeader-controller"+i.controllerItemCounter++,angular.module(i.angularGroupModuleName,[]).controller(f.angularControllerName,["$scope",function(n){f.setScope(n)}]),u.setAttribute("ng-controller",f.angularControllerName),e.appendChild(u),angular.bootstrap(u,[i.angularGroupModuleName]),e},i.prototype.addArrows=function(n,t){var i,r;return t.sortDescriptor.asc&&(i=document.createElement("div"),addClass(i,"tgrid-arrow-up"),n.appendChild(i)),t.sortDescriptor.asc||(r=document.createElement("div"),addClass(r,"tgrid-arrow-down"),n.appendChild(r)),n},i.prototype.removeArrows=function(n){for(var i=n.getElementsByClassName("tgrid-arrow-up"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-arrow-down"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},i.prototype.removeFilterButtons=function(n){for(var i=n.getElementsByClassName("tgrid-filter-button"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-filter-button-active"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},i.prototype.updateMobileItemsList=function(n,t,i,r){for(var u,f=0;f<i.length;f++)this.appendMobileElement(n,t,i[f],0,r);u=t.getAttribute("class");u==null||u==undefined||u==""?u="mobile":u.indexOf("mobile")==-1&&(u+=" mobile");t.setAttribute("class",u);n.showDetailFor.column=-1},i.prototype.updateMobileDetailRow=function(n,t,i,r){var e=t.getElementsByClassName("tgrid-mobile-details"),u,f,o,s;for(e.length>0&&e[0].parentNode.removeChild(e[0]),f=0;f<t.children.length;f++)if(t.children.item(f).dataContext==i){u=t.children.item(f);break}u!=null&&(n.isSelected(i)?addClass(u,"selected"):removeClass(u,"selected"),r&&(o=this.getActualDetailsTemplate(n),o!=null&&(s=this.buildMobileDetailsRow(n,i,o),insertAfter(u,s))))},i.prototype.appendMobileElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupMobileHeaderRow(n,i.item),t.appendChild(f)):(e=this.buildMobileRowElement(n,i,t,u),t.appendChild(e))},i.prototype.buildMobileRowElement=function(t,r,u,f){var e=document.createElement("div"),h,o,s;for(addClass(e,"tgrid-mobile-row"),t.isSelected(r.item)&&addClass(e,"selected"),h=0;h<t.groupBySortDescriptors.length;h++)e.innerHTML+="<div class='tgrid-mobile-group-indent-div'><\/div>";return o=document.createElement("div"),addClass(o,"tgrid-mobile-div"),t.mobileTemplateHtml!=null?t.mobileTemplateHtml.applyTemplate(o):o=this.createDefaultMobileTemplate(o,t),e.appendChild(o),s=new n.TGrid.AngularItemViewModel(r.model,r.item,r.grid,r.isGroupHeader),s.angularControllerName="tgrid-mobile-row-controller"+i.controllerItemCounter++,angular.module(i.angularModuleName).controller(s.angularControllerName,["$scope",function(n){s.setScope(n)}]),e.setAttribute("ng-controller",s.angularControllerName),angular.bootstrap(e,[i.angularModuleName]),e.dataContext=r.item,function(n){e.onclick=function(i){if(t.selectionMode!=0){var r=u;f(n,i.ctrlKey)}}}(r),e},i.prototype.createDefaultGroupHeader=function(n){var t=document.createElement("div"),i=document.createElement("span");return i.innerHTML="{{item}}",t.appendChild(i),n.appendChild(t),n},i.prototype.buildMobileDetailsRow=function(t,r,u){var f=document.createElement("div"),e;return addClass(f,"tgrid-mobile-details"),u.applyTemplate(f),e=new n.TGrid.AngularItemViewModel(null,r,null,null),e.angularControllerName="tgrid-detail-controller"+i.controllerItemCounter++,angular.module(i.angularModuleName,[]).controller(e.angularControllerName,["$scope",function(n){e.setScope(n)}]),f.setAttribute("ng-controller",e.angularControllerName),angular.bootstrap(f,[i.angularModuleName]),f},i.prototype.bindMobileGroupHeader=function(t,r,u){var f=new n.TGrid.AngularItemViewModel(null,r,null,null);f.angularControllerName="tgrid-groupHeader-controller"+i.controllerItemCounter++;angular.module(i.angularGroupModuleName,[]).controller(f.angularControllerName,["$scope",function(n){f.setScope(n)}]);u.setAttribute("ng-controller",f.angularControllerName);t.appendChild(u);angular.bootstrap(u,[i.angularGroupModuleName])},i.prototype.createDefaultCell=function(n,t){var i=document.createElement("span"),r="{{item.".concat(t).concat("}}");i.innerHTML=r;n.appendChild(i)},i.prototype.createDefaultMobileTemplate=function(n,t){for(var u,f,r,e,i=0;i<t.columns.length;i++)t.columns[i].device.indexOf("mobile")!=-1&&(u=document.createElement("div"),f=document.createElement("span"),f.innerHTML=t.columns[i].member!=null?t.columns[i].member:t.columns[i].sortMemberPath!=null?t.columns[i].sortMemberPath:t.columns[i].groupMemberPath!=null?t.columns[i].groupMemberPath:"",r=document.createElement("span"),t.columns[i].member!=null?(e=document.createElement("span"),r.innerHTML=": {{item."+t.columns[i].member+"}}",r.appendChild(e)):r.innerHTML=": ",u.appendChild(f),u.appendChild(r),n.appendChild(u));return n},i.prototype.buildDefaultFilteringPopUp=function(t,i){var s=document.createElement("div"),h=document.createElement("span"),f,r,u,e,o;h.innerHTML="{{path}}";s.appendChild(h);i.appendChild(s);f=document.createElement("select");r=document.createElement("option");r.value=0..toString();r.text="None";f.appendChild(r);r=document.createElement("option");r.value=1..toString();r.text="Equals";f.appendChild(r);r=document.createElement("option");r.value=2..toString();r.text="Not equals";f.appendChild(r);i.appendChild(f);f.selectedIndex=1;u=document.createElement("input");u.type="text";u.className="tgrid-filter-input-text";u.setAttribute("value","");u.style.width="150px";i.appendChild(u);i.innerHTML+="<br>";e=document.createElement("div");e.className="tgrid-filter-popup-button";e.style.width="70px";e.onclick=function(t){var i=n.TGrid.Grid.getGridObject(t.target);i.filterPopupViewModel.onApply()};e.innerHTML="OK";i.appendChild(e);o=document.createElement("div");o.className="tgrid-filter-popup-button";o.style.width="70px";o.onclick=function(t){var i=n.TGrid.Grid.getGridObject(t.target);i.filterPopupViewModel.onClose();u.setAttribute("value","")};o.innerHTML="Cancel";i.appendChild(o)},i.moduleFooterCounter=0,i.controllerItemCounter=0,i.angularModuleName="tgrid-row-module",i.angularGroupModuleName="tgrid-group-module",i}(n.TGrid.BaseHtmlProvider);t.AngularHtmlProvider=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={})),function(n){(function(n){function t(){var n={};return n.restrict="E",n.link=function(n,t,i){var r=new TesserisPro.TGrid.Options(t[0],1),u,e,o,s,f,h;if(r.parentViewModel=n,i.groupby!=undefined&&(u=i.groupby.split(" "),u.length>0&&u[0]!=""))for(e=0;e<u.length;e++)r.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(u[e],!0));r.enablePaging=i.enablepaging==undefined?!1:i.enablepaging=="true"?!0:!1;o=i.pagesize;o!=undefined&&(r.pageSize=parseInt(o),this.isEnablePaging&&(r.pageSize=isNaN(this.pageSize)||this.pageSize<1?10:this.pageSize));s=i.pageslide;r.pageSlide=parseInt(s);this.isEnablePaging&&(r.pageSlide=isNaN(this.pageSlide)||this.pageSlide<1?1:this.pageSlide);f=i.selectionmode;f=="multi"&&(r.selectionMode=2);(f==undefined||f=="single")&&(r.selectionMode=1);f=="none"&&(r.selectionMode=0);r.enableVirtualScroll=i.enablevirtualscroll==undefined?!1:i.enablevirtualscroll=="true"?!0:!1;r.enableCollapsing=i.enablecollapsing==undefined?!1:i.enablecollapsing=="true"?!0:!1;r.enableSorting=i.enablesorting==undefined?!1:i.enablesorting=="true"?!0:!1;r.enableGrouping=i.enablegrouping==undefined?!1:i.enablegrouping=="true"?!0:!1;r.openDetailsOnSelection=i.showdetailsonselection==undefined?!1:i.showdetailsonselection=="true"?!0:!1;r.enableFiltering=i.enablefiltering==undefined?!1:i.enablefiltering=="true"?!0:!1;h=new TesserisPro.TGrid.Grid(t[0],r,n[i.provider]);i.options!=undefined&&(r.apply=function(){h.afterOptionsChange()},n[i.options]=r)},n}function i(){}n.Directive=t;n.registerTGrid=i})(n.Angular||(n.Angular={}));var t=n.Angular}(TGrid||(TGrid={})),function(n){(function(n){var t=function(){function n(n){this.totalCount=0;this.selectedItem=null;this.currentPage=1;this.totalPages=1;this.grid=n}return n.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.totalCount=this.totalCount;this.$scope.selectedItem=this.selectedItem;this.$scope.currentPage=this.currentPage;this.$scope.totalPages=this.totalPages;this.$scope.grid=this.grid;this.$scope.changePage=function(n){return t.changePage(n)};this.$scope.goToPreviousPagesBlock=function(){return t.goToPreviousPagesBlock()};this.$scope.goToNextPagesBlock=function(){return t.goToNextPagesBlock()};this.$scope.goToFirstPage=function(){return t.goToFirstPage()};this.$scope.goToLastPage=function(){return t.goToLastPage()}},n.prototype.setTotalCount=function(n){var t=this,i;this.totalCount=Math.floor(n);this.$scope!=null&&(this.$scope.totalCount=Math.floor(n),i=this,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.setSelectedItem=function(n){var t=this;this.selectedItem=n;this.$scope!=null&&(this.$scope.selectedItem=n,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.setCurrentPage=function(n){var t=this,i;this.currentPage=Math.floor(n);this.$scope!=null&&(this.$scope.currentPage=Math.floor(n),i=this,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.setTotalPages=function(n){var t=this,i;this.totalPages=Math.floor(n);this.$scope!=null&&(this.$scope.totalPages=Math.floor(n),i=this,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.changePage=function(n){var t=parseInt(n);if(!isNaN(t)){if(this.$scope.totalPages!=undefined&&this.$scope.totalPages!=null&&this.$scope.totalPages<n){this.grid.selectPage(this.$scope.totalPages-1);return}t<1?this.grid.selectPage(0):this.grid.selectPage(t-1)}},n.prototype.apply=function(){var n=this;setTimeout(function(){return n.$scope.$apply()},1)},n.prototype.goToPreviousPagesBlock=function(){var n=this.$scope.currentPage-this.grid.options.pageSlide-1;n>0&&n!=null&&n!=undefined?this.grid.selectPage(n):this.grid.selectPage(0)},n.prototype.goToNextPagesBlock=function(){var n=this.$scope.currentPage+this.grid.options.pageSlide-1;n<this.$scope.totalPages&&n!=null&&n!=undefined?this.grid.selectPage(n):this.grid.selectPage(this.$scope.totalPages-1)},n.prototype.goToFirstPage=function(){this.grid.selectPage(0)},n.prototype.goToLastPage=function(){this.grid.selectPage(this.$scope.totalPages-1)},n}();n.AngularFooterViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(t){var i=function(){function t(n,t){this.container=n;this.onCloseFilterPopup=t}return t.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.path=this.path;this.$scope.onApply=function(){return t.onApply()};this.$scope.onClear=function(){return t.onClear()};this.$scope.onClose=function(){return t.onClose()}},t.prototype.onCloseFilterPopup=function(){},t.prototype.onApply=function(){this.condition=this.container.getElementsByTagName("select")[0].selectedIndex;var t=n.TGrid.Grid.getGridObject(this.container);t.options.filterDescriptor.removeChildByPath(this.$scope.path);this.condition!=0&&(this.value=this.container.getElementsByTagName("input")[0].value,t.options.filterDescriptor.addChild(new n.TGrid.FilterDescriptor(this.$scope.path,this.value,this.condition)));t.applyFilters();hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onClear=function(){var t=n.TGrid.Grid.getGridObject(this.container);t.options.filterDescriptor.removeChildByPath(this.$scope.path);t.applyFilters();hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onClose=function(){hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onOpen=function(n,t){this.columnInfo=t;this.$scope.path=t.filterMemberPath;for(var i=0;i<n.filterDescriptor.children.length;i++)if(n.filterDescriptor.children[i].path==t.filterMemberPath){this.container.getElementsByTagName("input")[0].value=n.filterDescriptor.children[i].value;this.container.getElementsByTagName("select")[0].selectedIndex=n.filterDescriptor.children[i].condition;this.$scope.$apply();return}this.container.getElementsByTagName("input")[0].value="";this.container.getElementsByTagName("select")[0].selectedIndex=0;this.$scope.$apply()},t.prototype.getColumnInfo=function(){return this.columnInfo},t}();t.AngularFilterPopupViewModel=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}));__extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},function(n){(function(t){var i=function(n){function t(){n.apply(this,arguments)}return __extends(t,n),t.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.model=this.model;this.$scope.item=this.item;this.$scope.grid=this.grid;this.$scope.isGroupHeader=this.isGroupHeader;this.$scope.openDetailsForCell=function(n){return t.openDetailsForCell(n)};this.$scope.closeDetailsForCell=function(n){return t.closeDetailsForCell(n)};this.$scope.toggleDetailsForCell=function(n){return t.toggleDetailsForCell(n)};this.$scope.setItemValue=function(n){return t.setItemValue(n)}},t}(n.TGrid.ItemViewModel);t.AngularItemViewModel=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}))