//!=====================================================================================
//!
//! The Tesseris Free License
//!
//! Copyright(c) 2014 Tesseris Pro LLC
//!
//! Permission is hereby granted, free of charge, to any person obtaining a copy of this 
//! software and associated documentation files(the "Software"), to deal in the Software 
//! without restriction, including without limitation the rights to use, copy, modify,
//! merge, publish, distribute, sublicense, and / or sell copies of the Software, and to 
//! permit persons to whom the Software is furnished to do so, subject to the following
//! conditions:
//!
//! 1. The above copyright notice and this permission notice shall be included in all 
//!    copies or substantial portions of the Software.
//!
//! 2. Any software that fully or partially contains or uses materials covered by 
//!    this license shall notify users about this notice and above copyright.The 
//!    notification can be made in "About box" and / or site main web - page footer.The 
//!    notification shall contain name of Tesseris Pro company and name of the Software 
//!    covered by current license.
//!
//! THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
//! INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
//! PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
//! HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
//! OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
//! SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//!
//!=====================================================================================
;
var __extends = this.__extends || function(d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
        function __() {
            this.constructor = d
        }
        __.prototype = b.prototype;
        d.prototype = new __
    };
var TesserisPro;
(function(TesserisPro) {
    (function(TGrid) {
        var AngularHtmlProvider = (function(_super) {
                __extends(AngularHtmlProvider, _super);
                function AngularHtmlProvider() {
                    _super.apply(this, arguments)
                }
                AngularHtmlProvider.prototype.getElementsSize = function(container, items) {
                    var size = 0;
                    var children = container.children;
                    for (var i = 0; i < children.length; i++) {
                        var child = children.item(i);
                        if (!containsClass(child, "ng-hide")) {
                            var viewModel = angular.element(child).scope() != undefined ? angular.element(child).scope()["viewModel"] : null;
                            if (isNotNoU(viewModel) && (items == null || items.indexOf(viewModel) >= 0)) {
                                size += child.offsetHeight
                            }
                        }
                    }
                    return size
                };
                AngularHtmlProvider.prototype.getFirstVisibleItem = function(container, items, scrollTop) {
                    var size = 0;
                    var children = container.children;
                    for (var i = 0, j = 0; i < children.length; i++) {
                        var child = children.item(i);
                        if (!containsClass(child, "ng-hide")) {
                            var viewModel = angular.element(child).scope() != undefined ? angular.element(child).scope().viewModel : null;
                            if (isNotNoU(viewModel) && items.indexOf(viewModel) >= 0) {
                                size += child.offsetHeight;
                                if (size > scrollTop) {
                                    return viewModel
                                }
                            }
                        }
                    }
                    return null
                };
                AngularHtmlProvider.prototype.getVisibleItemsCount = function(container, view, scrollTop, skipGroupHeaders) {
                    var size = 0;
                    var visibleItemsCount = 0;
                    var children = container.children;
                    var visibleItemsSize = 0;
                    for (var i = 0; i < children.length; i++) {
                        var child = children.item(i);
                        if (!containsClass(child, "ng-hide")) {
                            size += child.offsetHeight;
                            if (size > scrollTop) {
                                if (!skipGroupHeaders || !containsClass(child, "tgrid-table-group-header")) {
                                    visibleItemsCount++
                                }
                                visibleItemsSize += child.offsetHeight
                            }
                        }
                        if (visibleItemsSize >= view.clientHeight) {
                            break
                        }
                    }
                    return visibleItemsCount
                };
                AngularHtmlProvider.prototype.getTableElement = function(option) {
                    var table = document.createElement("table");
                    table.className = "tgrid-table";
                    return table
                };
                AngularHtmlProvider.prototype.getFooterViewModel = function(grid) {
                    var angularFooterViewModel = new TGrid.AngularFooterViewModel(grid);
                    angularFooterViewModel.angularModuleName = 'tgrid-footer-module' + AngularHtmlProvider.moduleFooterCounter++;
                    angular.module(angularFooterViewModel.angularModuleName, []).controller('tgrid-footer-controller', ['$scope', function($scope) {
                            angularFooterViewModel.setScope($scope)
                        }]);
                    return angularFooterViewModel
                };
                AngularHtmlProvider.prototype.getFilterPopupViewModel = function(container) {
                    var angularFilterPopupViewModel = new TGrid.AngularFilterPopupViewModel(container, this.onCloseFilterPopup);
                    angularFilterPopupViewModel.angularModuleName = 'tgrid-filter-popup-module';
                    var angularFilterModule = angular.module(angularFilterPopupViewModel.angularModuleName, []).controller('tgrid-filter-popup-controller', ['$scope', function($scope) {
                                angularFilterPopupViewModel.setScope($scope)
                            }]);
                    return angularFilterPopupViewModel
                };
                AngularHtmlProvider.prototype.updateTableHeadElement = function(option, header, groupByContainer, filterPopupContainer, columnsResized) {
                    if (option.columns.length <= 0) {
                        var grid = TesserisPro.TGrid.Grid.getGridObject(header);
                        grid.setColumnsFromItemsProvider()
                    }
                    this.updateGroupByPanel(option, groupByContainer);
                    var head = document.createElement("tr");
                    this.appendIndent(head, option.columns.length, true);
                    this.showNeededIndents(head, option.groupBySortDescriptors.length, TGrid.Grid.getGridObject(header));
                    if (option.columns.length > 0) {
                        for (var i = 0; i < option.columns.length; i++) {
                            if (option.columns[i].device.indexOf("desktop") != -1) {
                                var headerCell = document.createElement("th");
                                headerCell.className = "tgrid-header-cell";
                                headerCell.draggable = false;
                                var headerMainContainer = document.createElement("div");
                                headerMainContainer.className = "tgrid-header-cell-container";
                                var headerContent = document.createElement("div");
                                var headerButtons = document.createElement("div");
                                headerContent.className = "tgrid-header-cell-content";
                                headerButtons.className = "tgrid-header-cell-buttons";
                                headerMainContainer.appendChild(headerContent);
                                headerMainContainer.appendChild(headerButtons);
                                headerCell.appendChild(headerMainContainer);
                                if (!option.columns[i].notSized) {
                                    headerCell.style.width = option.columns[i].width.toString() + "px"
                                }
                                else {
                                    option.columns[i].resizable = false
                                }
                                if (option.columns[i].header != null) {
                                    option.columns[i].header.applyTemplate(headerContent)
                                }
                                else {
                                    var headerText = option.columns[i].member != null ? option.columns[i].member : "";
                                    this.buildDefaultHeader(headerContent, headerText)
                                }
                                if (option.enableSorting && option.columns[i].enableSorting) {
                                    (function(i) {
                                        headerCell.onclick = function(e) {
                                            return TGrid.Grid.getGridObject(e.target).sortBy(option.columns[i].sortMemberPath)
                                        }
                                    })(i);
                                    if (option.sortDescriptor.path == option.columns[i].sortMemberPath && option.columns[i].sortMemberPath != null) {
                                        this.addArrows(headerButtons, option, i)
                                    }
                                }
                                if (option.enableFiltering && option.columns[i].enableFiltering) {
                                    this.addFilterButton(option, header, filterPopupContainer, headerButtons, i)
                                }
                                if (option.columns[i].resizable) {
                                    var columnResize = document.createElement("div");
                                    columnResize.className = "tgrid-header-column-resize";
                                    columnResize.onclick = function(e) {
                                        return e.stopImmediatePropagation()
                                    };
                                    var self = this;
                                    (function(i, headerCell, columnResize) {
                                        var documentMouseMove = null;
                                        var position = 0;
                                        columnResize.onmousedown = function(e) {
                                            e.stopImmediatePropagation();
                                            position = e.screenX;
                                            documentMouseMove = document.onmousemove;
                                            document.onmousemove = function(m) {
                                                if (position != 0) {
                                                    if (option.columns[i].width.indexOf("%") == -1) {
                                                        var width = parseInt(option.columns[i].width)
                                                    }
                                                    else {
                                                        var gridWidth = self.getGridWidth(header);
                                                        var percentInt = parseInt(option.columns[i].width.substring(0, option.columns[i].width.indexOf("%")));
                                                        var width = gridWidth * percentInt / 100
                                                    }
                                                    option.columns[i].width = (width + m.screenX - position).toString();
                                                    position = m.screenX;
                                                    columnsResized(option.columns[i])
                                                }
                                            }
                                        };
                                        document.onmouseup = function(e) {
                                            document.onmousemove = documentMouseMove;
                                            position = 0
                                        }
                                    })(i, headerCell, columnResize);
                                    headerButtons.appendChild(columnResize)
                                }
                                if (option.hasAnyNotSizedColumn) {
                                    header.parentElement.style.tableLayout = "fixed"
                                }
                                head.appendChild(headerCell)
                            }
                        }
                    }
                    var scrollWidth = this.getScrollWidth();
                    var placeholderColumn = document.createElement("th");
                    if (option.hasAnyNotSizedColumn) {
                        addClass(placeholderColumn, "tgrid-placeholder-width");
                        placeholderColumn.style.width = (scrollWidth - 3).toString() + 'px'
                    }
                    else {
                        addClass(placeholderColumn, "tgrid-placeholder");
                        placeholderColumn.style.minWidth = (scrollWidth).toString() + 'px'
                    }
                    head.appendChild(placeholderColumn);
                    header.innerHTML = "";
                    header.appendChild(head)
                };
                AngularHtmlProvider.prototype.updateTableBodyElement = function(option, container, items, selected) {
                    container.innerHTML = "";
                    if (option.hasAnyNotSizedColumn) {
                        var tgridTableBodyContainer = container.parentElement.parentElement;
                        var tgridTable = container.parentElement;
                        tgridTable.style.tableLayout = "fixed";
                        tgridTableBodyContainer.style.overflowY = "scroll"
                    }
                    var scope = angular.element(container).scope();
                    for (var i = 0; i < items.length; i++) {
                        var childScope = this.buildRowScope(option, scope, items[i]);
                        angular.extend(childScope, {
                            item: items[i].item, viewModel: items[i]
                        });
                        if (items[i].isGroupHeader) {
                            var rowTemplate = this.buildGroupHeaderRow(option, items[i].item);
                            var row = rowTemplate(childScope)[0];
                            if (option.enableCollapsing) {
                                addClass(row, "collapsing");
                                if (!items[i].item.collapse) {
                                    row.onclick = function(e) {
                                        var item = angular.element(e.target).scope()["item"];
                                        TesserisPro.TGrid.Grid.getGridObject(e.target).setCollapsedFilters(item.filterDescriptor)
                                    }
                                }
                                else {
                                    row.onclick = function(e) {
                                        var item = angular.element(e.target).scope()["item"];
                                        TesserisPro.TGrid.Grid.getGridObject(e.target).removeCollapsedFilters(item.filterDescriptor)
                                    }
                                }
                            }
                            container.appendChild(row)
                        }
                        else {
                            var rowTemplate = this.buildRowTemplate(option, items[i]);
                            var row = rowTemplate(childScope)[0];
                            row["dataContext"] = items[i].item;
                            addClass(row, "tgrid-table-body-row");
                            if (option.isSelected(items[i].item)) {
                                addClass(row, "selected")
                            }
                            if (isNull(option.rowClick)) {
                                (function(item) {
                                    row.onclick = function(e) {
                                        if (option.selectionMode != 0) {
                                            var itemViewModel = angular.element(e.target).scope()["viewModel"];
                                            selected(itemViewModel, e.ctrlKey)
                                        }
                                    }
                                })(items[i].item)
                            }
                            container.appendChild(row)
                        }
                    }
                    var phase = scope.$$phase;
                    if (phase != '$apply' && phase != '$digest') {
                        scope.$apply()
                    }
                    addClass(container, "desktop");
                    return container
                };
                AngularHtmlProvider.prototype.buildRowScope = function(options, parentScope, viewModel) {
                    var childScope = parentScope.$new(true);
                    angular.extend(childScope, {
                        item: viewModel.item, viewModel: viewModel, options: options
                    });
                    return childScope
                };
                AngularHtmlProvider.prototype.buildRowTemplate = function(option, item) {
                    var row = document.createElement('tr');
                    this.appendIndent(row, option.groupBySortDescriptors.length, false);
                    for (var i = 0; i < option.columns.length; i++) {
                        if (option.columns[i].device.indexOf("desktop") != -1) {
                            var cell = document.createElement("td");
                            cell.className = "tgrid-table-data-cell";
                            var cellContent = document.createElement("div");
                            cellContent.className = "tgrid-cell-content";
                            cell.appendChild(cellContent);
                            if (option.columns[i].cell != null) {
                                option.columns[i].cell.applyTemplate(cellContent)
                            }
                            else {
                                if (option.columns[i].member != null) {
                                    this.createDefaultCell(cellContent, option.columns[i].member)
                                }
                            }
                            row.appendChild(cell)
                        }
                    }
                    if (!option.hasAnyNotSizedColumn) {
                        var placeholderColumn = document.createElement("td");
                        addClass(placeholderColumn, "tgrid-placeholder");
                        addClass(placeholderColumn, "tgrid-table-data-cell");
                        placeholderColumn.setAttribute("ng-hide", "item.isGroupHeader");
                        row.appendChild(placeholderColumn)
                    }
                    if (isNotNull(option.rowClick)) {
                        row.setAttribute("ng-click", "viewModel.model.".concat(option.rowClick).concat("(item ,$event)"))
                    }
                    return option.compile(row.outerHTML)
                };
                AngularHtmlProvider.prototype.buildGroupHeaderRow = function(option, groupHeaderDescriptor) {
                    var groupRow = document.createElement("tr");
                    this.appendIndent(groupRow, groupHeaderDescriptor.level, false);
                    var headerTd = document.createElement("td");
                    var colspan = option.columns.length + 1 + option.groupBySortDescriptors.length - groupHeaderDescriptor.level;
                    headerTd.setAttribute("colspan", colspan.toString());
                    addClass(headerTd, "tgrid-table-group-header");
                    addClass(groupRow, "tgrid-table-group-header");
                    if (option.groupHeaderTemplate != null) {
                        option.groupHeaderTemplate.applyTemplate(headerTd)
                    }
                    else {
                        headerTd = this.createDefaultGroupHeader(headerTd)
                    }
                    groupRow.appendChild(headerTd);
                    return option.compile(groupRow.outerHTML)
                };
                AngularHtmlProvider.prototype.buildDetailsRow = function(option, template) {
                    var detailTr = document.createElement("tr");
                    var detailTd = document.createElement("td");
                    this.appendIndent(detailTr, option.groupBySortDescriptors.length, false);
                    addClass(detailTr, "tgrid-details");
                    var detailsColspan = option.hasAnyNotSizedColumn ? option.columns.length : option.columns.length + 1;
                    detailTd.setAttribute("colspan", detailsColspan.toString());
                    template.applyTemplate(detailTd);
                    detailTr.appendChild(detailTd);
                    return detailTr
                };
                AngularHtmlProvider.prototype.updateTableDetailRow = function(options, container, item) {
                    var detailRow = container.getElementsByClassName("tgrid-details");
                    if (detailRow.length > 0) {
                        var itemWithDetails = angular.element(detailRow[0]).scope()["item"];
                        if (options.showDetailFor.item != itemWithDetails || options.showDetailFor.item == item.item) {
                            detailRow[0].parentNode.removeChild(detailRow[0])
                        }
                    }
                    var targetRow;
                    for (var i = 0; i < container.children.length; i++) {
                        if (angular.element(container.children.item(i)).scope()["item"] == item.item) {
                            targetRow = container.children.item(i);
                            break
                        }
                    }
                    if (targetRow != null) {
                        if (options.isSelected(item.item)) {
                            addClass(targetRow, "selected")
                        }
                        else {
                            removeClass(targetRow, "selected")
                        }
                        if (options.showDetailFor.item == item.item) {
                            var detailsTemplate = this.getActualDetailsTemplate(options);
                            if (detailsTemplate != null) {
                                var details = this.buildDetailsRow(options, detailsTemplate);
                                var childScope = this.buildRowScope(options, angular.element(container).scope(), item);
                                insertAfter(targetRow, options.compile(details.outerHTML)(childScope)[0])
                            }
                        }
                    }
                };
                AngularHtmlProvider.prototype.updateTableFooterElement = function(option, footer, totalItemsCount, footerModel) {
                    if (option.tableFooterTemplate == null && option.enablePaging) {
                        this.buildDefaultTableFooterElement(option, footer, totalItemsCount)
                    }
                    else if (option.tableFooterTemplate != null) {
                        if (!footer.hasChildNodes()) {
                            var footerContainer = document.createElement("div");
                            footerContainer.className = "tgrid-footer-container";
                            footerContainer.setAttribute("ng-controller", "tgrid-footer-controller");
                            option.tableFooterTemplate.applyTemplate(footerContainer);
                            angular.bootstrap(footerContainer, [footerModel.angularModuleName]);
                            footer.appendChild(footerContainer)
                        }
                        else {
                            footerModel.apply()
                        }
                    }
                    else {
                        footer.innerHTML = ""
                    }
                };
                AngularHtmlProvider.prototype.updateFilteringPopUp = function(option, filterPopup, filterPopupModel) {
                    if (option.filterPopup == null) {
                        var filterPopupContainer = document.createElement("div");
                        filterPopupContainer.className = "tgrid-filter-popup-container";
                        filterPopupContainer.setAttribute("ng-controller", "tgrid-filter-popup-controller");
                        this.buildDefaultFilteringPopUp(option, filterPopupContainer);
                        angular.bootstrap(filterPopupContainer, [filterPopupModel.angularModuleName]);
                        filterPopup.appendChild(filterPopupContainer)
                    }
                    else {
                        var filterPopupContainer = document.createElement("div");
                        filterPopupContainer.className = "tgrid-filter-popup-container";
                        filterPopupContainer.setAttribute("ng-controller", "tgrid-filter-popup-controller");
                        option.filterPopup.applyTemplate(filterPopupContainer);
                        filterPopup.innerHTML = "";
                        angular.bootstrap(filterPopupContainer, [filterPopupModel.angularModuleName]);
                        filterPopup.appendChild(filterPopupContainer)
                    }
                };
                AngularHtmlProvider.prototype.addArrows = function(sortArrowContainer, option, columnNumber) {
                    if (option.sortDescriptor.asc) {
                        var up = document.createElement("div");
                        addClass(up, "tgrid-arrow-up");
                        sortArrowContainer.appendChild(up)
                    }
                    if (!option.sortDescriptor.asc) {
                        var down = document.createElement("div");
                        addClass(down, "tgrid-arrow-down");
                        sortArrowContainer.appendChild(down)
                    }
                    return sortArrowContainer
                };
                AngularHtmlProvider.prototype.updateMobileItemsList = function(option, container, items, selected) {
                    var scope = angular.element(container).scope();
                    for (var i = 0; i < items.length; i++) {
                        this.appendMobileElement(option, container, items[i], 0, selected, scope)
                    }
                    var bodyClass = container.getAttribute("class");
                    if (bodyClass == null || bodyClass == undefined || bodyClass == '') {
                        bodyClass = "mobile"
                    }
                    else {
                        if (bodyClass.indexOf("mobile") == -1) {
                            bodyClass += " mobile"
                        }
                    }
                    container.setAttribute("class", bodyClass);
                    var phase = scope.$$phase;
                    if (phase != '$apply' && phase != '$digest') {
                        scope.$apply()
                    }
                };
                AngularHtmlProvider.prototype.appendMobileElement = function(option, container, item, groupLevel, selected, scope) {
                    var childScope = this.buildRowScope(option, scope, item);
                    angular.extend(childScope, {
                        item: item.item, viewModel: item
                    });
                    var itemWithDetails;
                    var rowWithDetail;
                    if (item.isGroupHeader) {
                        var mobileGroupHeader = this.buildGroupMobileHeaderRow(option, item.item);
                        var rowTemplate = option.compile(mobileGroupHeader.outerHTML);
                        var rowElement = rowTemplate(childScope)[0];
                        if (option.enableCollapsing) {
                            if (!item.item.collapse) {
                                rowElement.onclick = function(e) {
                                    var item = angular.element(e.target).scope()["item"];
                                    TesserisPro.TGrid.Grid.getGridObject(e.target).setCollapsedFilters(item.filterDescriptor)
                                }
                            }
                            else {
                                rowElement.onclick = function(e) {
                                    var item = angular.element(e.target).scope()["item"];
                                    TesserisPro.TGrid.Grid.getGridObject(e.target).removeCollapsedFilters(item.filterDescriptor)
                                }
                            }
                        }
                        container.appendChild(rowElement)
                    }
                    else {
                        var row = this.buildMobileRowElement(option, item, container, selected, scope);
                        container.appendChild(row)
                    }
                };
                AngularHtmlProvider.prototype.updateMobileDetailRow = function(options, container, item) {
                    var scope = angular.element(container).scope();
                    var childScope = this.buildRowScope(options, scope, item);
                    angular.extend(childScope, {
                        item: item.item, viewModel: item
                    });
                    var detailRow = container.getElementsByClassName("tgrid-mobile-details");
                    if (detailRow.length > 0) {
                        var itemWithDetails = angular.element(detailRow[0]).scope()["item"];
                        if (options.showDetailFor.item != itemWithDetails || options.showDetailFor.item == item.item) {
                            detailRow[0].parentNode.removeChild(detailRow[0])
                        }
                    }
                    var targetRow;
                    for (var i = 0; i < container.children.length; i++) {
                        if (angular.element(container.children.item(i)).scope()["item"] == item.item) {
                            targetRow = container.children.item(i);
                            break
                        }
                    }
                    if (targetRow != null) {
                        if (options.isSelected(item.item)) {
                            addClass(targetRow, "selected")
                        }
                        else {
                            removeClass(targetRow, "selected")
                        }
                        if (options.showDetailFor.item == item.item) {
                            var detailsTemplate = this.getActualDetailsTemplate(options);
                            if (detailsTemplate != null) {
                                var details = this.buildMobileDetailsRow(options, detailsTemplate, childScope);
                                insertAfter(targetRow, details);
                                var scope = angular.element(container).scope();
                                var phase = scope.$$phase;
                                if (phase != '$apply' && phase != '$digest') {
                                    scope.$apply()
                                }
                            }
                        }
                    }
                };
                AngularHtmlProvider.prototype.appendIndentMobileGroupHeader = function(target, level) {
                    for (var i = 0; i < level; i++) {
                        var indentDiv = document.createElement("div");
                        indentDiv.className = "tgrid-mobile-group-indent-div";
                        indentDiv.setAttribute("ng-hide", "!item.isGroupHeader || ".concat(i.toString()).concat(" >= item.level"));
                        target.appendChild(indentDiv)
                    }
                };
                AngularHtmlProvider.prototype.buildMobileRowElement = function(option, item, container, selected, scope) {
                    var childScope = this.buildRowScope(option, scope, item);
                    angular.extend(childScope, {
                        item: item.item, viewModel: item
                    });
                    var rowElement = document.createElement("div");
                    addClass(rowElement, "tgrid-mobile-row");
                    if (isNotNull(option.rowClick)) {
                        rowElement.setAttribute("ng-click", "$parent.".concat(option.rowClick).concat("(item, $event);"))
                    }
                    if (option.isSelected(item.item)) {
                        addClass(rowElement, "selected")
                    }
                    for (var i = 0; i < option.groupBySortDescriptors.length; i++) {
                        rowElement.innerHTML += "<div class='tgrid-mobile-group-indent-div'></div>"
                    }
                    var rowContent = document.createElement("div");
                    addClass(rowContent, 'tgrid-mobile-div');
                    if (option.mobileTemplateHtml != null) {
                        option.mobileTemplateHtml.applyTemplate(rowContent)
                    }
                    else {
                        this.createDefaultMobileTemplate(rowContent, option)
                    }
                    rowElement.appendChild(rowContent);
                    var rowTemplate = option.compile(rowElement.outerHTML);
                    var row = rowTemplate(childScope)[0];
                    if (isNull(option.rowClick)) {
                        (function(item) {
                            row.onclick = function(e) {
                                if (option.selectionMode != 0) {
                                    var s = container;
                                    selected(item, e.ctrlKey)
                                }
                            }
                        })(item)
                    }
                    return row
                };
                AngularHtmlProvider.prototype.buildMobileDetailsRow = function(option, template, childScope) {
                    var detailDiv = document.createElement("div");
                    addClass(detailDiv, "tgrid-mobile-details");
                    template.applyTemplate(detailDiv);
                    return option.compile(detailDiv.outerHTML)(childScope)[0]
                };
                AngularHtmlProvider.prototype.createDefaultGroupHeader = function(tableRowElement) {
                    var groupHeaderContainer = document.createElement("div");
                    var groupHeaderName = document.createElement("span");
                    groupHeaderName.innerHTML = "{{item.value}}";
                    groupHeaderContainer.appendChild(groupHeaderName);
                    tableRowElement.appendChild(groupHeaderContainer);
                    return tableRowElement
                };
                AngularHtmlProvider.prototype.createDefaultCell = function(cell, defaultCellBindingName) {
                    var spanForCell = document.createElement("span");
                    var textBinding = "{{item.".concat(defaultCellBindingName).concat("}}");
                    spanForCell.innerHTML = textBinding;
                    cell.appendChild(spanForCell)
                };
                AngularHtmlProvider.prototype.createDefaultMobileTemplate = function(rowTemplate, option) {
                    for (var i = 0; i < option.columns.length; i++) {
                        if (option.columns[i].device.indexOf("mobile") != -1) {
                            var mobileColumnContainer = document.createElement("div");
                            var mobileColumnName = document.createElement("span");
                            if (option.columns[i].member != null) {
                                mobileColumnName.innerHTML = option.columns[i].member
                            }
                            else if (option.columns[i].sortMemberPath != null) {
                                mobileColumnName.innerHTML = option.columns[i].sortMemberPath
                            }
                            else if (option.columns[i].groupMemberPath != null) {
                                mobileColumnName.innerHTML = option.columns[i].groupMemberPath
                            }
                            else {
                                mobileColumnName.innerHTML = ""
                            }
                            var columnData = document.createElement("span");
                            if (option.columns[i].member != null) {
                                var columnBinding = document.createElement('span');
                                columnData.innerHTML = ": {{item." + option.columns[i].member + "}}";
                                columnData.appendChild(columnBinding)
                            }
                            else {
                                columnData.innerHTML = ": "
                            }
                            mobileColumnContainer.appendChild(mobileColumnName);
                            mobileColumnContainer.appendChild(columnData);
                            rowTemplate.appendChild(mobileColumnContainer)
                        }
                    }
                };
                AngularHtmlProvider.prototype.buildDefaultFilteringPopUp = function(option, filterPopupContainer) {
                    var filterHeader = document.createElement("div");
                    filterHeader.className = "filterHeader";
                    filterPopupContainer.appendChild(filterHeader);
                    var filterName = document.createElement("span");
                    filterName.appendChild(document.createTextNode("{{path }}"));
                    filterHeader.appendChild(filterName);
                    var closeConteiner = document.createElement("div");
                    closeConteiner.className = "closeConteiner";
                    closeConteiner.onclick = function(e) {
                        var grid = TGrid.Grid.getGridObject(e.target);
                        grid.filterPopupViewModel.onClose()
                    };
                    filterHeader.appendChild(closeConteiner);
                    var filterCondition = document.createElement("select");
                    filterCondition.setAttribute("ng-model", "condition");
                    filterCondition.setAttribute("ng-options", "condition.value as condition.name for condition in availableConditions");
                    filterCondition.className = "grid-filter-popup-options";
                    filterPopupContainer.appendChild(filterCondition);
                    var filterText = document.createElement("input");
                    filterText.type = "text";
                    filterText.setAttribute("ng-model", "value");
                    filterText.className = "grid-filter-popup-path";
                    filterPopupContainer.appendChild(filterText);
                    var caseSensitiveInput = document.createElement("input");
                    caseSensitiveInput.type = "checkbox";
                    caseSensitiveInput.setAttribute("ng-model", "caseSensitive");
                    caseSensitiveInput.className = "grid-filter-popup-casesens";
                    var caseSensitiveLabel = document.createElement("label");
                    caseSensitiveLabel.className = "grid-filter-popup-casesens-label";
                    caseSensitiveLabel.appendChild(caseSensitiveInput);
                    caseSensitiveLabel.appendChild(document.createTextNode("Case sensitive"));
                    filterPopupContainer.appendChild(caseSensitiveLabel);
                    var buttonsContainer = document.createElement("div");
                    buttonsContainer.className = "tgrid-filter-popup-buttons-container";
                    var applyButton = document.createElement("div");
                    applyButton.className = "tgrid-filter-popup-button";
                    applyButton.style.width = '70px';
                    applyButton.onclick = function(e) {
                        var grid = TGrid.Grid.getGridObject(e.target);
                        grid.filterPopupViewModel.onApply()
                    };
                    applyButton.innerHTML = "Filter";
                    var clearButton = document.createElement("div");
                    clearButton.className = 'tgrid-filter-popup-button';
                    clearButton.style.width = '70px';
                    clearButton.onclick = function(e) {
                        var grid = TGrid.Grid.getGridObject(e.target);
                        grid.filterPopupViewModel.onClear()
                    };
                    clearButton.innerHTML = 'Clear';
                    buttonsContainer.appendChild(applyButton);
                    buttonsContainer.appendChild(clearButton);
                    filterPopupContainer.appendChild(buttonsContainer)
                };
                AngularHtmlProvider.moduleFooterCounter = 0;
                return AngularHtmlProvider
            })(TGrid.BaseHtmlProvider);
        TGrid.AngularHtmlProvider = AngularHtmlProvider
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid
})(TesserisPro || (TesserisPro = {}));
var TGrid;
(function(TGrid) {
    (function(Angular) {
        function Directive($parse, $compile) {
            var directive = {};
            directive.restrict = 'E';
            directive.link = function(scope, element, attrs) {
                var options = new TesserisPro.TGrid.Options(element[0], 1);
                options.parentViewModel = scope;
                options.compile = $compile;
                if (attrs["groupby"] != undefined) {
                    var groupBy = attrs["groupby"].split(' ');
                    if (groupBy.length > 0 && groupBy[0] != "") {
                        for (var i = 0; i < groupBy.length; i++) {
                            options.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(groupBy[i], true))
                        }
                    }
                }
                if (attrs["minItemsCountForVirtualization"] != undefined) {
                    options.minItemsCountForVirtualization = parseInt(attrs["minItemsCountForVirtualization"])
                }
                if (attrs["enablepaging"] == undefined) {
                    options.enablePaging = false
                }
                else {
                    options.enablePaging = attrs["enablepaging"] == "true" ? true : false
                }
                var pageSizeAtt = attrs["pagesize"];
                if (pageSizeAtt != undefined) {
                    options.pageSize = parseInt(pageSizeAtt);
                    if (this.isEnablePaging) {
                        options.pageSize = (isNaN(this.pageSize) || this.pageSize < 1) ? 10 : this.pageSize
                    }
                }
                var pageSlideAttr = attrs["pageslide"];
                if (pageSlideAttr != undefined) {
                    options.pageSlide = parseInt(pageSlideAttr);
                    if (this.isEnablePaging) {
                        options.pageSlide = (isNaN(this.pageSlide) || this.pageSlide < 1) ? 1 : this.pageSlide
                    }
                }
                var selectionModeAtt = attrs["selectionmode"];
                if (selectionModeAtt == "multi") {
                    options.selectionMode = 2
                }
                if (selectionModeAtt == undefined || selectionModeAtt == "single") {
                    options.selectionMode = 1
                }
                if (selectionModeAtt == "none") {
                    options.selectionMode = 0
                }
                if (attrs["enablevirtualscroll"] == undefined) {
                    options.enableVirtualScroll = false
                }
                else {
                    options.enableVirtualScroll = attrs["enablevirtualscroll"] == "true" ? true : false
                }
                if (attrs["enablecollapsing"] == undefined) {
                    options.enableCollapsing = false
                }
                else {
                    options.enableCollapsing = attrs["enablecollapsing"] == "true" ? true : false
                }
                if (attrs["enablesorting"] == undefined) {
                    options.enableSorting = false
                }
                else {
                    options.enableSorting = attrs["enablesorting"] == "true" ? true : false
                }
                if (attrs["enablegrouping"] == undefined) {
                    options.enableGrouping = false
                }
                else {
                    options.enableGrouping = attrs["enablegrouping"] == "true" ? true : false
                }
                if (attrs["showdetailsonselection"] == undefined) {
                    options.openDetailsOnSelection = false
                }
                else {
                    options.openDetailsOnSelection = attrs["showdetailsonselection"] == "true" ? true : false
                }
                if (attrs["enablefiltering"] == undefined) {
                    options.enableFiltering = false
                }
                else {
                    options.enableFiltering = attrs["enablefiltering"] == "true" ? true : false
                }
                if (attrs["rowclick"] == undefined || attrs["rowclick"] == null) {
                    options.rowClick = null
                }
                else {
                    options.rowClick = attrs["rowclick"]
                }
                if (attrs["capturescroll"] == undefined) {
                    options.captureScroll = true
                }
                else {
                    options.captureScroll = attrs["capturescroll"] == "false" ? false : true
                }
                var ready = attrs["ready"];
                if (ready != undefined && typeof scope[ready] == 'function') {
                    options.ready = scope[ready]
                }
                var hideHeader = attrs["hideheader"];
                if (hideHeader == undefined) {
                    options.hideHeader = false
                }
                else {
                    options.hideHeader = hideHeader == "true" ? true : false
                }
                var grid = new TesserisPro.TGrid.Grid(element[0], options, scope[attrs["provider"]]);
                if (attrs["options"] != undefined) {
                    options.apply = function() {
                        grid.afterOptionsChange()
                    };
                    scope[attrs["options"]] = options
                }
                var bindingReady = attrs["bindingready"];
                if (ready != undefined && typeof scope[bindingReady] == 'function') {
                    scope[bindingReady](options)
                }
            };
            return directive
        }
        Angular.Directive = Directive;
        function registerTGrid(appModule){}
        Angular.registerTGrid = registerTGrid
    })(TGrid.Angular || (TGrid.Angular = {}));
    var Angular = TGrid.Angular
})(TGrid || (TGrid = {}));
var TesserisPro;
(function(TesserisPro) {
    (function(TGrid) {
        var AngularFooterViewModel = (function() {
                function AngularFooterViewModel(grid) {
                    this.totalCount = 0;
                    this.selectedItem = null;
                    this.currentPage = 1;
                    this.totalPages = 1;
                    this.grid = grid
                }
                AngularFooterViewModel.prototype.setScope = function(scope) {
                    var _this = this;
                    this.$scope = scope;
                    this.$scope.totalCount = this.totalCount;
                    this.$scope.selectedItem = this.selectedItem;
                    this.$scope.currentPage = this.currentPage;
                    this.$scope.totalPages = this.totalPages;
                    this.$scope.grid = this.grid;
                    this.$scope.changePage = function(pageNumber) {
                        return _this.changePage(pageNumber)
                    };
                    this.$scope.goToPreviousPagesBlock = function() {
                        return _this.goToPreviousPagesBlock()
                    };
                    this.$scope.goToNextPagesBlock = function() {
                        return _this.goToNextPagesBlock()
                    };
                    this.$scope.goToFirstPage = function() {
                        return _this.goToFirstPage()
                    };
                    this.$scope.goToLastPage = function() {
                        return _this.goToLastPage()
                    }
                };
                AngularFooterViewModel.prototype.setTotalCount = function(totalCount) {
                    var _this = this;
                    this.totalCount = Math.floor(totalCount);
                    if (this.$scope != null) {
                        this.$scope.totalCount = Math.floor(totalCount);
                        var self = this;
                        setTimeout(function() {
                            return _this.$scope.$apply()
                        }, 1)
                    }
                };
                AngularFooterViewModel.prototype.setSelectedItem = function(selectedItem) {
                    var _this = this;
                    this.selectedItem = selectedItem;
                    if (this.$scope != null) {
                        this.$scope.selectedItem = selectedItem;
                        setTimeout(function() {
                            return _this.$scope.$apply()
                        }, 1)
                    }
                };
                AngularFooterViewModel.prototype.setCurrentPage = function(currentPage) {
                    var _this = this;
                    this.currentPage = Math.floor(currentPage);
                    if (this.$scope != null) {
                        this.$scope.currentPage = Math.floor(currentPage);
                        var self = this;
                        setTimeout(function() {
                            return _this.$scope.$apply()
                        }, 1)
                    }
                };
                AngularFooterViewModel.prototype.setTotalPages = function(totalPages) {
                    var _this = this;
                    this.totalPages = Math.floor(totalPages);
                    if (this.$scope != null) {
                        this.$scope.totalPages = Math.floor(totalPages);
                        var self = this;
                        setTimeout(function() {
                            return _this.$scope.$apply()
                        }, 1)
                    }
                };
                AngularFooterViewModel.prototype.changePage = function(viewPageNumber) {
                    var pageNumber = parseInt(viewPageNumber);
                    if (isNaN(pageNumber)) {
                        return
                    }
                    if (this.$scope.totalPages != undefined && this.$scope.totalPages != null && this.$scope.totalPages < viewPageNumber) {
                        this.grid.selectPage(this.$scope.totalPages - 1);
                        return
                    }
                    if (pageNumber < 1) {
                        this.grid.selectPage(0)
                    }
                    else {
                        this.grid.selectPage(pageNumber - 1)
                    }
                };
                AngularFooterViewModel.prototype.apply = function() {
                    var _this = this;
                    setTimeout(function() {
                        return _this.$scope.$apply()
                    }, 1)
                };
                AngularFooterViewModel.prototype.goToPreviousPagesBlock = function() {
                    var previousBlockPage = this.$scope.currentPage - this.grid.options.pageSlide - 1;
                    if (previousBlockPage > 0 && previousBlockPage != null && previousBlockPage != undefined) {
                        this.grid.selectPage(previousBlockPage)
                    }
                    else {
                        this.grid.selectPage(0)
                    }
                };
                AngularFooterViewModel.prototype.goToNextPagesBlock = function() {
                    var nextBlockPage = this.$scope.currentPage + this.grid.options.pageSlide - 1;
                    if (nextBlockPage < this.$scope.totalPages && nextBlockPage != null && nextBlockPage != undefined) {
                        this.grid.selectPage(nextBlockPage)
                    }
                    else {
                        this.grid.selectPage(this.$scope.totalPages - 1)
                    }
                };
                AngularFooterViewModel.prototype.goToFirstPage = function() {
                    this.grid.selectPage(0)
                };
                AngularFooterViewModel.prototype.goToLastPage = function() {
                    this.grid.selectPage(this.$scope.totalPages - 1)
                };
                return AngularFooterViewModel
            })();
        TGrid.AngularFooterViewModel = AngularFooterViewModel
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid
})(TesserisPro || (TesserisPro = {}));
var TesserisPro;
(function(TesserisPro) {
    (function(TGrid) {
        var AngularFilterPopupViewModel = (function() {
                function AngularFilterPopupViewModel(container, onCloseFilterPopup) {
                    this.container = container;
                    this.onCloseFilterPopup = onCloseFilterPopup;
                    this.path = "";
                    this.value = "";
                    this.caseSensitive = false;
                    this.condition = 0;
                    this.availableConditions = [];
                    for (var i in TGrid.FilterCondition) {
                        if (!isNaN(i)) {
                            continue
                        }
                        this.availableConditions.push({
                            name: i, value: TGrid.FilterCondition[i]
                        })
                    }
                }
                AngularFilterPopupViewModel.prototype.setScope = function(scope) {
                    var _this = this;
                    this.$scope = scope;
                    this.$scope.path = this.path;
                    this.$scope.value = this.value;
                    this.$scope.condition = this.condition;
                    this.$scope.caseSensitive = this.caseSensitive;
                    this.$scope.availableConditions = this.availableConditions;
                    this.$scope.onApply = function() {
                        return _this.onApply()
                    };
                    this.$scope.onClear = function() {
                        return _this.onClear()
                    };
                    this.$scope.onClose = function() {
                        return _this.onClose()
                    }
                };
                AngularFilterPopupViewModel.prototype.onCloseFilterPopup = function(container){};
                AngularFilterPopupViewModel.prototype.onApply = function() {
                    var grid = TGrid.Grid.getGridObject(this.container);
                    if (this.$scope.value.toString().trim() != "") {
                        grid.options.filterDescriptor.removeChildByPath(this.$scope.path);
                        grid.options.filterDescriptor.addChild(new TGrid.FilterDescriptor(this.$scope.path, this.$scope.value, this.$scope.caseSensitive, this.$scope.condition));
                        grid.applyFilters();
                        hideElement(this.container);
                        this.onCloseFilterPopup(this.container)
                    }
                    else {
                        this.onClear()
                    }
                };
                AngularFilterPopupViewModel.prototype.onClear = function() {
                    var grid = TGrid.Grid.getGridObject(this.container);
                    grid.options.filterDescriptor.removeChildByPath(this.$scope.path);
                    grid.applyFilters();
                    hideElement(this.container);
                    this.onCloseFilterPopup(this.container)
                };
                AngularFilterPopupViewModel.prototype.onClose = function() {
                    hideElement(this.container);
                    this.onCloseFilterPopup(this.container)
                };
                AngularFilterPopupViewModel.prototype.onOpen = function(options, column) {
                    this.columnInfo = column;
                    this.$scope.path = column.filterMemberPath;
                    for (var i = 0; i < options.filterDescriptor.children.length; i++) {
                        if (options.filterDescriptor.children[i].path == column.filterMemberPath) {
                            this.$scope.value = options.filterDescriptor.children[i].value;
                            this.$scope.caseSensitive = options.filterDescriptor.children[i].caseSensitive;
                            this.$scope.condition = options.filterDescriptor.children[i].condition;
                            this.$scope.$apply();
                            return
                        }
                    }
                    this.$scope.value = "";
                    this.$scope.caseSensitive = false;
                    this.$scope.condition = 0;
                    this.$scope.$apply()
                };
                AngularFilterPopupViewModel.prototype.getColumnInfo = function() {
                    return this.columnInfo
                };
                return AngularFilterPopupViewModel
            })();
        TGrid.AngularFilterPopupViewModel = AngularFilterPopupViewModel
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid
})(TesserisPro || (TesserisPro = {}));
var __extends = this.__extends || function(d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
        function __() {
            this.constructor = d
        }
        __.prototype = b.prototype;
        d.prototype = new __
    };
var TesserisPro;
(function(TesserisPro) {
    (function(TGrid) {
        var AngularItemViewModel = (function(_super) {
                __extends(AngularItemViewModel, _super);
                function AngularItemViewModel(model, item, grid, isGroupHeader) {
                    _super.call(this, model, item, grid, isGroupHeader)
                }
                return AngularItemViewModel
            })(TGrid.ItemViewModel);
        TGrid.AngularItemViewModel = AngularItemViewModel
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid
})(TesserisPro || (TesserisPro = {}));
var TesserisPro;
(function(TesserisPro) {
    (function(TGrid) {
        var AngularItemsViewModel = (function() {
                function AngularItemsViewModel(items, options, selected) {
                    this.itemsModels = items;
                    this.options = options;
                    this.selected = selected
                }
                AngularItemsViewModel.prototype.setScope = function(scope) {
                    var _this = this;
                    this.$scope = scope;
                    this.$scope.options = this.options;
                    this.$scope.items = new Array;
                    for (var i = 0; i < this.itemsModels.length; i++) {
                        this.$scope.items[i] = new TGrid.AngularItemViewModel(this.itemsModels[i].model, this.itemsModels[i].item, this.itemsModels[i].grid, this.itemsModels[i].isGroupHeader);
                        this.$scope.items[i].originalModel = this.itemsModels[i];
                        this.$scope.items[i].colspan = this.options.columns.length + 1 + this.options.groupBySortDescriptors.length - this.itemsModels[i].item.level;
                        this.$scope.items[i].detailsColspan = this.options.hasAnyNotSizedColumn ? this.options.columns.length : this.options.columns.length + 1;
                        this.$scope.items[i].isSelected = this.options.isSelected(this.itemsModels[i].item);
                        this.$scope.items[i].showDetail = false;
                        this.$scope.items[i].showDetailsFor = new TGrid.ShowDetail;
                        if (this.$scope.options.showDetailFor.item == this.$scope.items[i].item) {
                            this.$scope.items[i].showDetail = true
                        }
                        this.$scope.items[i].toggleGroupCollapsing = function(e, item) {
                            if (_this.options.enableCollapsing) {
                                if (item.item.collapse) {
                                    item.grid.removeCollapsedFilters(item.item.filterDescriptor);
                                    item.item.collapse = false
                                }
                                else {
                                    item.grid.setCollapsedFilters(item.item.filterDescriptor);
                                    item.item.collapse = true
                                }
                            }
                        };
                        this.$scope.items[i].toggleDetailForCell = function(columnIndex, item) {
                            item.toggleDetailsForCell(columnIndex)
                        };
                        this.$scope.items[i].openDetailForCell = function(columnIndex, item) {
                            item.openDetailsForCell(columnIndex)
                        };
                        this.$scope.items[i].closeDetailForCell = function(columnIndex, item) {
                            item.closeDetailsForCell(columnIndex)
                        };
                        this.$scope.items[i].select = function(e, item, items) {
                            _this.selected(item, e.ctrlKey)
                        }
                    }
                };
                AngularItemsViewModel.prototype.setItemSelection = function(item, isSelected) {
                    var _this = this;
                    for (var i = 0; i < this.itemsModels.length; i++) {
                        if (this.$scope.items[i].showDetail) {
                            if (this.options.showDetailFor.item != this.$scope.items[i].item || this.options.showDetailFor.item == item.item) {
                                this.$scope.items[i].showDetail = false
                            }
                        }
                        if (this.itemsModels[i] == item) {
                            this.$scope.items[i].isSelected = isSelected;
                            if (this.options.showDetailFor.item == item.item) {
                                this.$scope.items[i].showDetail = true;
                                this.$scope.options.showDetailFor = this.options.showDetailFor
                            }
                            setTimeout(function() {
                                _this.$scope.$apply()
                            }, 10)
                        }
                    }
                };
                return AngularItemsViewModel
            })();
        TGrid.AngularItemsViewModel = AngularItemsViewModel
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid
})(TesserisPro || (TesserisPro = {}));
(function() {
    'use strict';
    angular.module('TGrid', []).directive('tGrid', TGrid.Angular.Directive).directive('ngShowInFocus', function() {
        return {
                replace: true, restrict: 'A', link: function(scope, element, attr) {
                        scope.$watch(attr.ngShowInFocus, function(value) {
                            if (value) {
                                element.css('display', 'block');
                                element.focus()
                            }
                            else {
                                element.css('display', 'none')
                            }
                        })
                    }
            }
    })
})()