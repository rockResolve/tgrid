//=====================================================================================
//
// The Tesseris Free License
//
// Copyright(c) 2014 Tesseris Pro LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this 
// software and associated documentation files(the "Software"), to deal in the Software 
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and / or sell copies of the Software, and to 
// permit persons to whom the Software is furnished to do so, subject to the following
// conditions:
  
// 1. The above copyright notice and this permission notice shall be included in all 
//    copies or substantial portions of the Software.
//
// 2. Any software that fully or partially contains or uses materials covered by 
//    this license shall notify users about this notice and above copyright.The 
//    notification can be made in "About box" and / or site main web - page footer.The 
//    notification shall contain name of Tesseris Pro company and name of the Software 
//    covered by current license.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
// PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//=====================================================================================


/// <reference path="../TGrid.ts" />
/// <reference path="../BaseHtmlProvider.ts" />
/// <reference path="../ItemViewModel.ts" />
/// <reference path="../utils.ts" />
/// <reference path="../IFooterViewModel.ts" />
/// <reference path="KnockoutFilterPopupViewModel.ts" />
/// <reference path="KnockoutFooterViewModel.ts" />


module TesserisPro.TGrid {

    export class KnockoutHtmlProvider extends BaseHtmlProvider {

        // Table Methods

        public getTableElement(option: Options): HTMLElement {
            var table = document.createElement("table");
            table.className = "tgrid-table";
            return table;
        }

        public getElementsSize (container: HTMLElement, items: Array<ItemViewModel>): number {
            var size = 0;
            var children = container.children;
            for (var i = 0; i < children.length; i++) {
                var child = <HTMLElement>children.item(i);
                var viewModel = <ItemViewModel>(ko.contextFor(child).$root);

                if (viewModel != null && (items == null || items.indexOf(viewModel) >= 0)) {
                    size += child.offsetHeight;
                }
            }

            return size;
        }

        public getFirstVisibleItem(container: HTMLElement, items: Array<ItemViewModel>, scrollTop: number): ItemViewModel {
            var size = 0;
            var children = container.children;
            for (var i = 0; i < children.length; i++) {
                var child = <HTMLElement>children.item(i);
                var viewModel = <ItemViewModel>(ko.contextFor(child).$root);
                if (viewModel != null && items.indexOf(viewModel) >= 0) {
                    size += child.offsetHeight;
                }
                if (size > scrollTop) {
                    return viewModel;
                }
            }

            return null;
        }

        public getFooterViewModel(grid: any) {
            var knockoutFooterViewModel = new KnockoutFooterViewModel(0, 0, 0, 0, grid);
            return knockoutFooterViewModel;
        }

        public getFilterPopupViewModel(container: HTMLElement) {
            var filterPopupViewModel = new KnockoutFilterPopupViewModel(container, this.onCloseFilterPopup);
            return filterPopupViewModel;
        }

        public updateTableHeadElement(option: Options, header: HTMLElement, groupByContainer: HTMLElement, filterPopupContainer: HTMLElement, columnsResized: (c: ColumnInfo) => void) {
            if (option.columns.length <= 0) {
                var grid = TesserisPro.TGrid.Grid.getGridObject(header);
                grid.setColumnsFromItemsProvider();
            }
            this.updateGroupByPanel(option, groupByContainer);

            // Create table header
            var head = document.createElement("tr");
            this.appendIndent(head, option.columns.length, true);
            this.showNeededIndents(head, option.groupBySortDescriptors.length, Grid.getGridObject(header));

            option.columns.forEach((column, idx) => {
                if (column.device.indexOf("desktop") != -1) {
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

                    if (!column.notSized) {
                        headerCell.style.width = column.width.toString() + "px";
                    } else {
                        column.resizable = false;
                    }

                    if (column.header != null) {
                        column.header.applyTemplate(headerContent);
                    } else {
                        var headerText = column.member != null ? column.member : "";
                        this.buildDefaultHeader(headerContent, headerText);
                    }

                    if (option.enableSorting && column.enableSorting) {
                        // Arrows
                        if (option.sortDescriptor.path == column.sortMemberPath && column.sortMemberPath != null) {
                            this.addArrows(headerButtons, option, idx);
                        }

                        // Method changing sorting
                        (function (columnCopy) {
                            headerCell.onclick = (e) => Grid.getGridObject(<HTMLElement>e.target).sortBy(columnCopy.sortMemberPath);
                        })(column);
                    }
                    if (option.enableFiltering && column.enableFiltering) {
                        // Filter
                        this.addFilterButton(option, header, filterPopupContainer, headerButtons, idx);
                    }

                    if (column.resizable) {
                        var columnResize = document.createElement("div");
                        columnResize.className = "tgrid-header-column-resize";

                        columnResize.onclick = e => e.stopImmediatePropagation();
                        var that = this;                                            //dont use "self". it is declared by TypeScript on Window
                        (function (columnCopy, headerCell, columnResize) {
                            var documentMouseMove = null;
                            var position = 0;
                            columnResize.onmousedown = e => {
                                e.stopImmediatePropagation();
                                position = e.screenX;
                                documentMouseMove = document.onmousemove;
                                document.onmousemove = m => {
                                    if (position != 0) {
                                        if (columnCopy.width.indexOf("%") == -1) {
                                            var width = parseInt(columnCopy.width);
                                        } else {
                                            var gridWidth = that.getGridWidth(header);
                                            var percentInt = parseInt(columnCopy.width.substring(0, columnCopy.width.indexOf("%")));
                                            var width = gridWidth * percentInt / 100;
                                        }
                                        columnCopy.width = (width + m.screenX - position).toString();
                                        position = m.screenX;
                                        columnsResized(columnCopy);
                                    }
                                };
                            };

                            document.onmouseup = e => {
                                document.onmousemove = documentMouseMove;
                                position = 0;
                            }
                        })(column, headerCell, columnResize);

                        headerButtons.appendChild(columnResize);
                    }
                    if (option.hasAnyNotSizedColumn) {
                        header.parentElement.style.tableLayout = "fixed";
                    }
                    head.appendChild(headerCell);
                }
            });
            
            var scrollWidth = this.getScrollWidth();
            var placeholderColumn = document.createElement("th");            
            if (option.hasAnyNotSizedColumn) {
                addClass(placeholderColumn, "tgrid-placeholder-width");
                placeholderColumn.style.width = (scrollWidth - 3).toString() + 'px';
            } else {
                addClass(placeholderColumn, "tgrid-placeholder");
                placeholderColumn.style.minWidth = scrollWidth.toString() + 'px';
            }
            head.appendChild(placeholderColumn);
            
            header.innerHTML = "";
            header.appendChild(head);
            ko.applyBindings(option.parentViewModel, head);

        }

        public updateTableBodyElement(option: Options, container: HTMLElement, items: Array<ItemViewModel>, selected: (item: ItemViewModel, multi: boolean) => boolean): HTMLElement {
           
            for (var i = 0; i < items.length; i++) {
                this.appendTableElement(option, container, items[i], 0, selected);
            }
            
            //Hide table on mobile devices
            addClass(container, "desktop");
            return container;
        }

        public updateTableDetailRow(options: Options, container: HTMLElement, item: ItemViewModel) {
             
            var detailRow = container.getElementsByClassName("tgrid-details");
            if (detailRow.length > 0) {
                var itemWithDetails = ko.contextFor(detailRow[0]).$data;
                if (options.showDetailFor.item != itemWithDetails.item || options.showDetailFor.item == item.item) {
                    detailRow[0].parentNode.removeChild(detailRow[0]);
                }
            }

            var targetRow: HTMLElement;

            for (var i = 0; i < container.children.length; i++) {
                if (ko.contextFor(<HTMLElement>container.children.item(i)).$data.item == item.item) {
                    targetRow = <HTMLElement>container.children.item(i);
                    break;
                }
            }

            if (targetRow != null) {
                if (options.isSelected(item.item)) {
                    addClass(targetRow,"selected");
                }
                else {
                    removeClass(targetRow,"selected");
                }

                //var detailRow = container.getElementsByClassName("tgrid-details");
                if (options.showDetailFor.item == item.item) {
                    var detailsTemplate = this.getActualDetailsTemplate(options);

                    // Insert row details after selected item
                    if (detailsTemplate != null) {
                        var details = this.buildDetailsRow(options, detailsTemplate);
                        insertAfter(targetRow, details);
                        ko.applyBindings(item, details);
                    }
                }
            }
        }

        public updateTableFooterElement(option: Options, footer: HTMLElement, totalItemsCount: number, footerModel: IFooterViewModel): void {
            //if there isn't footer template in grid
            if (option.tableFooterTemplate == null && option.enablePaging) {
                this.buildDefaultTableFooterElement(option, footer, totalItemsCount);
            } else if (option.tableFooterTemplate != null) {
                if (!footer.hasChildNodes()) {
                    var footerContainer = document.createElement("div");
                    option.tableFooterTemplate.applyTemplate(footerContainer);
                    ko.applyBindings(footerModel, footerContainer);
                    footer.appendChild(footerContainer);
                }
            } else {
                footer.innerHTML = "";
            }
        }

        public updateFilteringPopUp(option: Options, filterPopup: HTMLElement, filterPopupModel: IFilterPopupViewModel) {
            if (option.filterPopup == null) {
                this.buildDefaultFilteringPopUp(option, filterPopup);
            } else {
                var filterContainer = document.createElement("div");
                filterContainer.className = "tgrid-filter-popup-container";
                option.filterPopup.applyTemplate(filterContainer);
                filterPopup.innerHTML = "";
                filterPopup.appendChild(filterContainer);
            }
            ko.applyBindings(filterPopupModel, filterPopup);
        }

        private appendTableElement(option: Options, container: HTMLElement, item: ItemViewModel, groupLevel: number, selected: (item: ItemViewModel, multi: boolean) => boolean): void {
            var itemWithDetails: any;
            var rowWithDetail: HTMLElement;

            if (item.isGroupHeader) {
                var groupHeader = this.buildGroupHeaderRow(option, item.item);
                container.appendChild(groupHeader);
                ko.applyBindings(item, groupHeader);
            } else {
                var row = this.buildRowElement(option, item, container, selected);

                container.appendChild(row);
                ko.applyBindings(item, row);
            }
        }


        private buildRowElement(option: Options, item: ItemViewModel, container: HTMLElement, selected: (item: ItemViewModel, multi: boolean) => boolean): HTMLElement {
            var row = document.createElement("tr");
            if (option.rowClick) {
                row.setAttribute("data-bind", "click:function(event){model.".concat(option.rowClick).concat("(item, event);}"));
            }
            addClass(row,"tgrid-table-body-row");

            if (option.isSelected(item.item)) {
                addClass(row,"selected");
            }

            this.appendIndent(row, option.groupBySortDescriptors.length, false);
            option.columns.forEach( (column) => {
                if (column.device.indexOf("desktop") != -1) {
                    var cell = document.createElement("td");
                    addClass(cell, "tgrid-table-data-cell");
                    var cellContent = document.createElement("div");
                    cellContent.className = "tgrid-cell-content";
                    cell.appendChild(cellContent);

                    if (column.cell !== null) {
                        column.cell.applyTemplate(cellContent);
                    } else {
                        if (column.member !== null) {
                            this.createDefaultCell(cellContent, column.member);
                        }
                    }
                    row.appendChild(cell);
                }
            });

            if (option.hasAnyNotSizedColumn) {
                container.parentElement.style.tableLayout = "fixed";
                container.parentElement.parentElement.style.overflowY = "scroll";
            } else {
                var placeholderColumn = document.createElement("td");
                addClass(placeholderColumn, "tgrid-placeholder");
                addClass(placeholderColumn, "tgrid-table-data-cell");

                row.appendChild(placeholderColumn);
            }

            if (!option.rowClick) {
                (function (item) {
                    row.onclick = function (e) {
                        if (option.selectionMode != SelectionMode.None) {
                            selected(item, e.ctrlKey);
                        }
                    };
                })(item);
            }
            return row;
        }

        private buildDetailsRow(option: Options, template: Template): HTMLElement {
            var detailTr = document.createElement("tr");
            var detailTd = document.createElement("td");

            this.appendIndent(detailTr, option.groupBySortDescriptors.length, false);

            addClass(detailTr, "tgrid-details");
            var detailsColspan = option.hasAnyNotSizedColumn ? option.columns.length : option.columns.length + 1;
            detailTd.setAttribute("colspan", detailsColspan.toString());

            template.applyTemplate(detailTd)

            detailTr.appendChild(detailTd);

            return detailTr;
        }

        private buildGroupHeaderRow(option: Options, groupHeaderDescriptor: GroupHeaderDescriptor): HTMLElement {

            var headerTr = document.createElement("tr");
            var headerTd = document.createElement("td");

            this.appendIndent(headerTr, groupHeaderDescriptor.level, false);

            var colspan = option.columns.length + 1 + option.groupBySortDescriptors.length - groupHeaderDescriptor.level;
            headerTd.setAttribute("colspan", colspan.toString());
            addClass(headerTd,"tgrid-table-group-header");
            addClass(headerTr,"tgrid-table-group-header");
            if (option.enableCollapsing) {
                addClass(headerTr,"collapsing");
                if (!groupHeaderDescriptor.collapse) {
                    headerTd.onclick = (e) => {
                        TesserisPro.TGrid.Grid.getGridObject(<HTMLElement>e.target).setCollapsedFilters(groupHeaderDescriptor.filterDescriptor);
                    }
                } else {
                    headerTd.onclick = (e) => {
                        TesserisPro.TGrid.Grid.getGridObject(<HTMLElement>e.target).removeCollapsedFilters(groupHeaderDescriptor.filterDescriptor);
                    }
                }
            }
            if (option.groupHeaderTemplate != null) {
                option.groupHeaderTemplate.applyTemplate(headerTd);//(!groupHeaderDescriptor.collapse ? "close" : "open") +
            } else {
                this.createDefaultGroupHeader(headerTd);
            }


            headerTr.appendChild(headerTd);

            return headerTr;
        }

        private addArrows(sortArrowContainer: Node, option: Options, columnNumber: number) {
            if (option.sortDescriptor.asc) {
                var up = document.createElement("div");
                addClass(up,"tgrid-arrow-up");
                sortArrowContainer.appendChild(up);
            }
            if (!option.sortDescriptor.asc) {
                var down = document.createElement("div");
                addClass(down,"tgrid-arrow-down");
                sortArrowContainer.appendChild(down);
            }
            return sortArrowContainer;
        }
               
        // Mobile Methods

        public updateMobileItemsList(option: Options, container: HTMLElement, items: Array<ItemViewModel>, selected: (item: ItemViewModel, multi: boolean) => boolean): void {
           
            for (var i = 0; i < items.length; i++) {
                this.appendMobileElement(option, container, items[i], 0, selected);
            }

            //Hide table on mobile devices
            var bodyClass = container.getAttribute("class");
            if (bodyClass == null || bodyClass == undefined || bodyClass == '') {
                bodyClass = "mobile";
            }
            else {
                if (bodyClass.indexOf("mobile") == -1) {
                    bodyClass += " mobile";
                }
            }
            container.setAttribute("class", bodyClass);
        }

        public updateMobileDetailRow(options: Options, container: HTMLElement, item: ItemViewModel): void {
            
            var detailRow = container.getElementsByClassName("tgrid-mobile-details");
            if (detailRow.length > 0) {
                var itemWithDetails = ko.contextFor(detailRow[0]).$data;
                if (options.showDetailFor.item != itemWithDetails.item || options.showDetailFor.item == item.item) {
                    detailRow[0].parentNode.removeChild(detailRow[0]);
                }
            }

            var targetRow: HTMLElement;

            for (var i = 0; i < container.children.length; i++) {
                if (ko.contextFor(<HTMLElement>container.children.item(i)).$data.item == item.item) {
                    targetRow = <HTMLElement>container.children.item(i);
                    break;
                }
            }

            if (targetRow != null) {
                if (options.isSelected(item.item)) {
                    addClass(targetRow,"selected");
                }
                else {
                    removeClass(targetRow,"selected");
                }

                // if (shouldAddDetails) {
                if (options.showDetailFor.item == item.item) {
                    var detailsTemplate = this.getActualDetailsTemplate(options);

                    // Insert row details after selected item
                    if (detailsTemplate != null) {
                        var details = this.buildMobileDetailsRow(options, detailsTemplate);
                        insertAfter(targetRow, details);
                        ko.applyBindings(item, details);
                    }
                }
                //}
            }
        }

        private appendMobileElement(option: Options, container: HTMLElement, item: ItemViewModel, groupLevel: number, selected: (item: ItemViewModel, multi: boolean) => boolean): void {
            if (item.isGroupHeader) {
                var mobileGroupHeader = this.buildGroupMobileHeaderRow(option, item.item);
                container.appendChild(mobileGroupHeader);
                ko.applyBindings(item, mobileGroupHeader);
            } else {
                var row = this.buildMobileRowElement(option, item, container, selected);

                container.appendChild(row);
                ko.applyBindings(item, row);
            }
        }

        private buildMobileRowElement(option: Options, item: ItemViewModel, container: HTMLElement, selected: (item: ItemViewModel, multi: boolean) => boolean): HTMLElement {
            var row = document.createElement("div");
            addClass(row, "tgrid-mobile-row");
            if (option.rowClick) {
                row.setAttribute("data-bind", "click:function(event){model.".concat(option.rowClick).concat("(item, event);}"));
            }

            if (option.isSelected(item.item)) {
                addClass(row, "selected");
            }

            for (var i = 0; i < option.groupBySortDescriptors.length; i++) {
                row.innerHTML += "<div class='tgrid-mobile-group-indent-div'></div>"
            }

            var rowTemplate = document.createElement("div");
            addClass(rowTemplate, 'tgrid-mobile-div');
            if (option.mobileTemplateHtml != null) {
                option.mobileTemplateHtml.applyTemplate(rowTemplate);
            } else {
                rowTemplate = this.createDefaultMobileTemplate(rowTemplate, option);
            }
            row.appendChild(rowTemplate);
            if (!option.rowClick) {
                (function (item) {
                    row.onclick = function (e) {
                        if (option.selectionMode != SelectionMode.None) {
                            selected(item, e.ctrlKey);
                        }
                    };
                })(item);
            }

            return row;
        }

        private buildMobileDetailsRow(option: Options, template: Template): HTMLElement {
            var detailDiv = document.createElement("div");
            addClass(detailDiv, "tgrid-mobile-details");
            template.applyTemplate(detailDiv);
            return detailDiv;
        }

        private createDefaultCell(cell: HTMLElement, defaultCellBindingName: string): void {
            var spanForCell = document.createElement("span");
            var textBinding = "text: item.".concat(defaultCellBindingName)
            spanForCell.setAttribute("data-bind", textBinding);
            cell.appendChild(spanForCell);
        }

        public createDefaultGroupHeader(tableRowElement: any) {
            var groupHeaderContainer = document.createElement("div");
            var groupHeaderName = document.createElement("span");
            groupHeaderName.setAttribute("data-bind", "text: item.value");
            groupHeaderContainer.appendChild(groupHeaderName);
            tableRowElement.appendChild(groupHeaderContainer);
        }
        private createDefaultMobileTemplate(rowTemplate: any, option: Options) {
            option.columns.forEach( (column) => {
                if (column.device.indexOf("mobile") != -1) {
                    var mobileColumnContainer = document.createElement("div");
                    var mobileColumnName = document.createElement("span");

                    if (column.member != null) {
                        mobileColumnName.innerHTML = column.member;
                    } else if (column.sortMemberPath != null) {
                        mobileColumnName.innerHTML = column.sortMemberPath;
                    } else if (column.groupMemberPath != null) {
                        mobileColumnName.innerHTML = column.groupMemberPath;
                    } else {
                        mobileColumnName.innerHTML = "";
                    }

                    var columnData = document.createElement("span");
                    if (column.member != null) {
                        var columnBinding = document.createElement('span');
                        columnBinding.setAttribute("data-bind", 'text:item.'.concat(column.member));
                        columnData.innerHTML = ": ";
                        columnData.appendChild(columnBinding);
                    } else {
                        columnData.innerHTML = ": ";
                    }
                    mobileColumnContainer.appendChild(mobileColumnName);
                    mobileColumnContainer.appendChild(columnData);
                    rowTemplate.appendChild(mobileColumnContainer);
                }
            });
            return rowTemplate;
        }

        public bindData(option: Options, elementForBinding: HTMLElement) {
            var viewModel = ko.contextFor(option.target);
            ko.applyBindings(viewModel, elementForBinding);
        }

        private buildDefaultFilteringPopUp(option: Options, filterPopupContainer: HTMLElement)
        {
            // Creating controls
            var filterHeader = document.createElement("div");
            filterHeader.className = "filterHeader";
            filterPopupContainer.appendChild(filterHeader);

            var filterName = document.createElement("span");
            filterName.setAttribute("data-bind", "text: path");
            filterHeader.appendChild(filterName);

            var closeConteiner = document.createElement("div");
            closeConteiner.className = "closeConteiner";
            closeConteiner.onclick = (e) => {
                var grid = Grid.getGridObject(<HTMLElement>e.target);
                grid.filterPopupViewModel.onClose();
            };
            filterHeader.appendChild(closeConteiner);

            var filterCondition = document.createElement("select");
            filterCondition.setAttribute("data-bind", "options: availableConditions, value: condition, optionsText: 'name', optionsValue: 'value'");
            filterCondition.className = "grid-filter-popup-options";
            filterPopupContainer.appendChild(filterCondition);   

            var filterText = document.createElement("input");
            filterText.type = "text";
            filterText.setAttribute("data-bind", "value: value");
            filterText.className = "grid-filter-popup-path";
            filterPopupContainer.appendChild(filterText);

            var caseSensitiveInput = document.createElement("input");
            caseSensitiveInput.type = "checkbox";
            caseSensitiveInput.setAttribute("data-bind", "checked: caseSensitive");
            caseSensitiveInput.className = "grid-filter-popup-casesens";

            var caseSensitiveLabel = document.createElement("label");
            caseSensitiveLabel.className = "grid-filter-popup-casesens-label";
            caseSensitiveLabel.appendChild(caseSensitiveInput);
            caseSensitiveLabel.appendChild(document.createTextNode("Case sensitive"));
            filterPopupContainer.appendChild(caseSensitiveLabel);

            var buttonsContainer = document.createElement("div");
            buttonsContainer.className = "tgrid-filter-popup-buttons-container";
            
            var filterButton = document.createElement("div");
            filterButton.className = "tgrid-filter-popup-button";
            filterButton.style.width = '70px';
            filterButton.onclick = (e) => {
                var grid = Grid.getGridObject(<HTMLElement>e.target);
                grid.filterPopupViewModel.onApply();

            };
            (<HTMLElement>filterButton).innerHTML = "Filter";

            var clearButton = document.createElement("div");
            clearButton.className = 'tgrid-filter-popup-button';
            clearButton.style.width = '70px';
            clearButton.onclick = (e) =>
            {
                var grid = Grid.getGridObject(<HTMLElement>e.target);
                grid.filterPopupViewModel.onClear();
            };
            (<HTMLElement>clearButton).innerHTML = 'Clear';            
            
            buttonsContainer.appendChild(filterButton);
            buttonsContainer.appendChild(clearButton);


            filterPopupContainer.appendChild(buttonsContainer);
        }
    }
}