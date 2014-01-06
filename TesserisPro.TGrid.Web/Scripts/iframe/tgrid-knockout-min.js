var __extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},TGridBindingHandler,TesserisPro;(function(n){(function(t){var i=function(i){function r(){i.apply(this,arguments)}return __extends(r,i),r.prototype.getTableElement=function(){var n=document.createElement("table");return n.className="tgrid-table",n},r.prototype.getElemntsSize=function(n,t){for(var r,u,f=0,e=n.children,i=0;i<e.length;i++)r=e.item(i),u=ko.contextFor(r).$root,u!=null&&(t==null||t.indexOf(u)>0)&&(f+=r.clientHeight);return f},r.prototype.getFirstVisibleItem=function(n,t,i){for(var f,r,e=0,o=n.children,u=0;u<o.length;u++)if(f=o.item(u),r=ko.contextFor(f).$root,r!=null&&t.indexOf(r)>=0&&(e+=f.clientHeight),e>i)return r;return null},r.prototype.getFooterViewModel=function(){return new t.KnockoutFooterViewModel(0,0,0,0)},r.prototype.getFilterPopupViewModel=function(n){return new t.KnockoutFilterPopupViewModel(n)},r.prototype.updateTableHeadElement=function(n,i,r,u,f){var h,c,s,e,o,v,l,a,b,y,p;if(this.updateGroupByPanel(n,r),i.innerHTML!=null&&i.innerHTML!=""){if(this.showNeededIndents(i,n.groupBySortDescriptors.length,t.Grid.getGridObject(i)),n.enableSorting){this.removeArrows(i);var w=i.getElementsByTagName("th"),k=n.columns.length,d=n.columns.length,g=w.length;for(h=k,c=0;h<g,c<d;h,c++)n.columns[c].device.indexOf("desktop")!=-1&&(n.sortDescriptor.path==n.columns[c].sortMemberPath&&n.columns[c].sortMemberPath!=null&&this.addArrows(w[h].getElementsByClassName("tgrid-header-cell-buttons")[0],n,h),h++)}}else{for(s=document.createElement("tr"),this.appendIndent(s,n.columns.length,!0),this.showNeededIndents(s,n.groupBySortDescriptors.length,t.Grid.getGridObject(i)),e=0;e<n.columns.length;e++)n.columns[e].device.indexOf("desktop")!=-1&&(o=document.createElement("th"),o.className="tgrid-header-cell",o.draggable=!1,v=document.createElement("div"),v.className="tgrid-header-cell-container",l=document.createElement("div"),l.style.overflow="hidden",a=document.createElement("div"),l.className="tgrid-header-cell-content",a.className="tgrid-header-cell-buttons",v.appendChild(l),v.appendChild(a),o.appendChild(v),o.style.width=n.columns[e].width.toString()+"px",n.columns[e].header!=null?n.columns[e].header.applyTemplate(l):(b=n.columns[e].member!=null?n.columns[e].member:"",this.buildDefaultHeader(l,b)),n.enableSorting&&(function(i){o.onclick=function(r){return t.Grid.getGridObject(r.target).sortBy(n.columns[i].sortMemberPath)}}(e),n.sortDescriptor.path==n.columns[e].sortMemberPath&&n.columns[e].sortMemberPath!=null&&this.addArrows(a,n,e)),this.addFilterButton(n,i,u,a,e),n.columns[e].resizable&&(y=document.createElement("div"),y.className="tgrid-header-column-resize",y.onclick=function(n){return n.stopImmediatePropagation()},function(t,i,r){var e=null,u=0;r.onmousedown=function(i){i.stopImmediatePropagation();console.log("test");u=i.screenX;e=document.onmousemove;document.onmousemove=function(i){u!=0&&(n.columns[t].width=(parseInt(n.columns[t].width)+i.screenX-u).toString(),u=i.screenX,f(n.columns[t]))}};document.onmouseup=function(){document.onmousemove=e;u=0}}(e,o,y),a.appendChild(y)),s.appendChild(o));p=document.createElement("th");p.classList.add("tgrid-placeholder");s.appendChild(p);i.appendChild(s);ko.applyBindings(n.parentViewModel,s)}},r.prototype.updateTableBodyElement=function(n,t,i,r){n.showDetailFor.isDetailColumn||(n.showDetailFor.column=-1);for(var u=0;u<i.length;u++)this.appendTableElement(n,t,i[u],0,r);t.classList.add("desktop")},r.prototype.updateTableDetailRow=function(n,t,i){var f=t.getElementsByClassName("tgrid-details"),r,u,e,o;for(f.length>0&&f[0].parentNode.removeChild(f[0]),u=0;u<t.children.length;u++)if(ko.contextFor(t.children.item(u)).$data.item==i){r=t.children.item(u);break}r!=null&&(n.isSelected(i)?r.classList.add("selected"):r.classList.remove("selected"),e=this.getActualDetailsTemplate(n),e!=null&&(o=this.buildDetailsRow(n,e),insertAfter(r,o),ko.applyBindings(n.showDetailFor,o)))},r.prototype.updateTableFooterElement=function(n,t,i,r){if(n.tableFooterTemplate==null&&n.enablePaging)this.buildDefaultTableFooterElement(n,t,i);else if(n.tableFooterTemplate!=null){var u=document.createElement("div");n.enablePaging&&this.buildDefaultTableFooterElement(n,t,i);n.tableFooterTemplate.applyTemplate(u);ko.applyBindings(r,u);t.appendChild(u)}},r.prototype.updateFilteringPopUp=function(n,t,i){if(n.filterPopup==null)this.buildDefaultFiltringPopUp(n,t);else{var r=document.createElement("div");r.className="tgrid-filter-popup-container";n.filterPopup.applyTemplate(r);t.innerHTML="";t.appendChild(r);ko.applyBindings(i,t)}},r.prototype.appendTableElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupHeaderRow(n,i.item),t.appendChild(f),ko.applyBindings(i,f)):(e=this.buildRowElement(n,i,t,u),t.appendChild(e),ko.applyBindings(i,e))},r.prototype.buildRowElement=function(n,i,r,u){var e=document.createElement("tr"),f,s,o,h;for(e.classList.add("table-body-row"),n.isSelected(i.item)&&e.classList.add("selected"),this.appendIndent(e,n.groupBySortDescriptors.length,!1),f=0;f<n.columns.length;f++)n.columns[f].device.indexOf("desktop")!=-1&&(s=document.createElement("td"),o=document.createElement("div"),o.className="tgrid-cell-content",o.style.overflow="hidden",s.appendChild(o),n.columns[f].cell!=null?n.columns[f].cell.applyTemplate(o):n.columns[f].member!=null&&this.createDefaultCell(o,n.columns[f].member),e.appendChild(s));return h=document.createElement("td"),h.classList.add("tgrid-placeholder"),e.appendChild(h),function(i){e.onclick=function(r){n.selectionMode!=t.SelectionMode.None&&u(i,r.ctrlKey)}}(i),e},r.prototype.buildDetailsRow=function(n,t){var i=document.createElement("tr"),r=document.createElement("td");return this.appendIndent(i,n.groupBySortDescriptors.length,!1),i.classList.add("tgrid-details"),r.setAttribute("colspan",(n.columns.length+1).toString()),t.applyTemplate(r),i.appendChild(r),i},r.prototype.buildGroupHeaderRow=function(t,i){var u=document.createElement("tr"),r=document.createElement("td"),f;return this.appendIndent(u,i.level,!1),f=t.columns.length+1+t.groupBySortDescriptors.length-i.level,r.setAttribute("colspan",f.toString()),r.classList.add("tgrid-table-group-header"),u.classList.add("tgrid-table-group-header"),t.enableCollapsing&&(r.onclick=i.collapse?function(t){n.TGrid.Grid.getGridObject(t.target).removeCollapsedFilters(i.filterDescriptor)}:function(t){n.TGrid.Grid.getGridObject(t.target).setCollapsedFilters(i.filterDescriptor)}),t.groupHeaderTemplate!=null?t.groupHeaderTemplate.applyTemplate(r):this.createDefaultGroupHeader(r),u.appendChild(r),u},r.prototype.addArrows=function(n,t){var i,r;return t.sortDescriptor.asc&&(i=document.createElement("div"),i.classList.add("tgrid-arrow-up"),n.appendChild(i)),t.sortDescriptor.asc||(r=document.createElement("div"),r.classList.add("tgrid-arrow-down"),n.appendChild(r)),n},r.prototype.removeArrows=function(n){for(var i=n.getElementsByClassName("tgrid-arrow-up"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-arrow-down"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},r.prototype.updateMobileItemsList=function(n,t,i,r){var f,u;for(n.showDetailFor.isDetailColumn||(n.showDetailFor.column=-1),f=0;f<i.length;f++)this.appendMobileElement(n,t,i[f],0,r);u=t.getAttribute("class");u==null||u==undefined||u==""?u="mobile":u.indexOf("mobile")==-1&&(u+=" mobile");t.setAttribute("class",u)},r.prototype.updateMobileDetailRow=function(n,t,i){var f=t.getElementsByClassName("tgrid-mobile-details"),r,u,e,o;for(f.length>0&&f[0].parentNode.removeChild(f[0]),u=0;u<t.children.length;u++)if(ko.contextFor(t.children.item(u)).$data.item==i){r=t.children.item(u);break}r!=null&&(n.isSelected(i)?r.classList.add("selected"):r.classList.remove("selected"),e=this.getActualDetailsTemplate(n),e!=null&&(o=this.buildMobileDetailsRow(n,e),insertAfter(r,o),ko.applyBindings(n.showDetailFor,o)))},r.prototype.appendMobileElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupMobileHeaderRow(n,i.item),t.appendChild(f),ko.applyBindings(i,f)):(e=this.buildMobileRowElement(n,i,t,u),t.appendChild(e),ko.applyBindings(i,e))},r.prototype.buildMobileRowElement=function(n,i,r,u){var f=document.createElement("div"),o,e,s;for(f.classList.add("tgrid-mobile-row"),n.isSelected(i.item)&&f.classList.add("selected"),o=0;o<n.groupBySortDescriptors.length;o++)f.innerHTML+="<div class='tgrid-mobile-indent-div'><\/div>";return e=document.createElement("div"),e.classList.add("tgrid-mobile-div"),n.mobileTemplateHtml!=null?n.mobileTemplateHtml.applyTemplate(e):e=this.createDefaultMobileTemplate(e,n),f.appendChild(e),s=document.createElement("td"),s.classList.add("tgrid-placeholder"),f.appendChild(s),function(i){f.onclick=function(f){if(n.selectionMode!=t.SelectionMode.None){var e=r;u(i,f.ctrlKey)}}}(i),f},r.prototype.buildMobileDetailsRow=function(n,t){var i=document.createElement("div");return i.classList.add("tgrid-mobile-details"),t.applyTemplate(i),i},r.prototype.createDefaultCell=function(n,t){var i=document.createElement("span"),r="text: item.".concat(t);i.setAttribute("data-bind",r);n.appendChild(i)},r.prototype.createDefaultGroupHeader=function(n){var i=document.createElement("div"),t=document.createElement("span");t.setAttribute("data-bind","text: item.value");t.setAttribute("style","color: green;");i.appendChild(t);n.appendChild(i)},r.prototype.createDefaultMobileTemplate=function(n,t){for(var u,f,r,e,i=0;i<t.columns.length;i++)t.columns[i].device.indexOf("mobile")!=-1&&(u=document.createElement("div"),f=document.createElement("span"),f.innerHTML=t.columns[i].member!=null?t.columns[i].member:t.columns[i].sortMemberPath!=null?t.columns[i].sortMemberPath:t.columns[i].groupMemberPath!=null?t.columns[i].groupMemberPath:"",r=document.createElement("span"),t.columns[i].member!=null?(e=document.createElement("span"),e.setAttribute("data-bind","text: item.".concat(t.columns[i].member)),r.innerHTML=": ",r.appendChild(e)):r.innerHTML=": ",u.appendChild(f),u.appendChild(r),n.appendChild(u));return n},r.prototype.bindData=function(n,t){var i=ko.contextFor(n.target);ko.applyBindings(i,t)},r}(t.BaseHtmlProvider);t.KnockoutHtmlProvider=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={}));TGridBindingHandler=function(){function n(){}return n.prototype.init=function(t,i,r,u,f){var e=n.getOptions(t,i,r,u,f);setTimeout(function(){var n=new TesserisPro.TGrid.Grid(t,e,i().provider)},1)},n.prototype.update=function(t,i,r,u,f){var e=TesserisPro.TGrid.Grid.getGridObject(t),o;e!=null&&(o=n.getOptions(t,i,r,u,f),e.options=o,e.updateBody())},n.getOptions=function(n,t,i,r){var u=new TesserisPro.TGrid.Options(n,TesserisPro.TGrid.Framework.Knockout),f,e,o;if(u.parentViewModel=r,f="",f=isObservable(t().groupBy)?t().groupBy():t().groupBy,f!=undefined)for(e=0;e<f.length;e++)u.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(f[e],!0));return u.enablePaging=isObservable(t().enablePaging)?typeof t().enablePaging()=="boolean"?t().enablePaging():t().enablePaging=="true"?!0:!1:typeof t().enablePaging=="boolean"?t().enablePaging:t().enablePaging=="true"?!0:!1,u.pageSize=isObservable(t().pageSize)?t().pageSize():t().pageSize,u.pageSize=isNaN(u.pageSize)||u.pageSize<1?10:u.pageSize,u.selectionMode=isObservable(t().selectMode)?t().selectMode():t().selectMode,isNaN(u.selectionMode)&&(u.selectionMode=1),u.enableVirtualScroll=isObservable(t().enableVirtualScroll)?typeof t().enableVirtualScroll()=="boolean"?t().enableVirtualScroll():t().enableVirtualScroll=="true"?!0:!1:typeof t().enableVirtualScroll=="boolean"?t().enableVirtualScroll:t().enableVirtualScroll=="true"?!0:!1,u.enableCollapsing=isObservable(t().enableCollapsing)?typeof t().enableCollapsing()=="boolean"?t().enableCollapsing():t().enableCollapsing=="true"?!0:!1:typeof t().enableCollapsing=="boolean"?t().enableCollapsing:t().enableCollapsing=="true"?!0:!1,u.openDetailsOnSelection=isObservable(t().showDetailsOnSelection)?typeof t().showDetailsOnSelection()=="boolean"?t().showDetailsOnSelection():t().showDetailsOnSelection=="true"?!0:!1:typeof t().showDetailsOnSelection=="boolean"?t().showDetailsOnSelection:t().showDetailsOnSelection=="true"?!0:!1,o=isObservable(t().selectionMode)?t().selectionMode():t().selectionMode,o=="multi"&&(u.selectionMode=TesserisPro.TGrid.SelectionMode.Multi),o=="single"&&(u.selectionMode=TesserisPro.TGrid.SelectionMode.Single),o=="none"&&(u.selectionMode=TesserisPro.TGrid.SelectionMode.None),u.enableSorting=isObservable(t().enableSorting)?typeof t().enableSorting()=="boolean"?t().enableSorting():t().enableSorting=="true"?!0:!1:typeof t().enableSorting=="boolean"?t().enableSorting:t().enableSorting=="true"?!0:!1,u.enableGrouping=isObservable(t().enableGrouping)?typeof t().enableGrouping()=="boolean"?t().enableGrouping():t().enableGrouping=="true"?!0:!1:typeof t().enableGrouping=="boolean"?t().enableGrouping:t().enableGrouping=="true"?!0:!1,u.enableFiltering=isObservable(t().enableFiltering)?typeof t().enableFiltering()=="boolean"?t().enableFiltering():t().enableFiltering=="true"?!0:!1:typeof t().enableFiltering=="boolean"?t().enableFiltering:t().enableFiltering=="true"?!0:!1,u.pageSlide=isObservable(t().pageSlide)?t().pageSlide():t().pageSlide,u.pageSlide=isNaN(u.pageSlide)||u.pageSlide<1?1:u.pageSlide,u},n}();ko.bindingHandlers.tgrid=new TGridBindingHandler,function(n){(function(n){var t=function(){function n(n,t,i,r){this.totalCount=ko.observable(n);this.selectedItem=ko.observable(t);this.currentPage=ko.observable(i);this.totalPages=ko.observable(r)}return n.prototype.setTotalCount=function(n){this.totalCount(n)},n.prototype.setSelectedItem=function(n){this.selectedItem(n)},n.prototype.setCurrentPage=function(n){this.currentPage(n)},n.prototype.setTotalPages=function(n){this.totalPages(n)},n}();n.KnockoutFooterViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(n){var t=function(){function t(n){this.container=n}return t.prototype.onApply=function(){if(this.condition=this.container.getElementsByTagName("select")[0].selectedIndex,this.condition!=n.FilterCondition.None){this.value=this.container.getElementsByTagName("input")[0].value;var t=new n.FilterDescriptor(this.path,this.value,this.condition),i=n.Grid.getGridObject(this.container);i.setFilters(t,this.path)}else n.Grid.getGridObject(this.container).removeFilters(this.path);hideElement(this.container)},t.prototype.onClear=function(){n.Grid.getGridObject(this.container).removeFilters(this.path);hideElement(this.container)},t.prototype.onClose=function(){hideElement(this.container)},t.prototype.onOpen=function(t,i){n.Grid.getGridObject(this.container).setDefaultFilterPopUpValues();this.columnInfo=i;this.path=i.filterMemberPath;for(var r=0;r<t.filterDescriptors.length;r++)t.filterDescriptors[r].path==i.filterMemberPath&&(this.container.getElementsByTagName("input")[0].value=t.filterDescriptors[r].value,this.container.getElementsByTagName("select")[0].selectedIndex=t.filterDescriptors[r].condition)},t.prototype.getColumnInfo=function(){return this.columnInfo},t}();n.KnockoutFilterPopupViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}));__extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},function(n){(function(n){var t=function(n){function t(){n.apply(this,arguments)}return __extends(t,n),t.prototype.setObservable=function(n){this.item=ko.observable(n)},t.prototype.setItemValue=function(n){this.item(n);this.item.valueHasMutated();this.item.notifySubscribers(n)},t}(n.ItemViewModel);n.KnockoutItemViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}))