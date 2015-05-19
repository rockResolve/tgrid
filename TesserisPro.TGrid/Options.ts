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


/// <reference path="SortDescriptor.ts" />
/// <reference path="FilterDescriptor.ts" />

module TesserisPro.TGrid {

    export enum Framework { Knockout, Angular }
    export enum SelectionMode { None, Single, Multi }//0,1,2
    export enum FilterCondition { Contains, Equals, NotEquals, StartsFrom, EndsWith }
    export enum LogicalOperator { And, Or };

    export class ColumnInfo {
        public header: Template = null;
        public cell: Template = null;
        public cellDetail: Template = null;
        public width: string = "150";
        public device: string = "mobile,desktop";
        public sortMemberPath: string = null;
        public groupMemberPath: string = null;
        public member: string = null;
        public resizable: boolean = true;
        public filterMemberPath: string = null;
        public notSized: boolean = false;
        public enableFiltering: boolean = true;
        public enableSorting: boolean = true;
        public enableGrouping: boolean = true;
    }

    export class ShowDetail {
        public item: any;
        public column: number;
        constructor() {
            this.column = -1;
            this.item = null;
        }
    }

    export class Template {
        private content: string = "";

        constructor(prototype: HTMLElement) {
            this.content = prototype.innerHTML == null ? prototype.innerText : prototype.innerHTML;
        }

        public applyTemplate(element: HTMLElement) {
            element.innerHTML = this.content != null ? this.content : "";
        }

        public getContent(): string {
            return this.content;
        }
    }
           
    export class Options {
        public columns: Array<ColumnInfo> = [];

        public enableVirtualScroll: boolean = false;
        public enablePaging: boolean = false;
        public enableCollapsing: boolean = false;
        public enableSorting: boolean = false;
        public enableGrouping: boolean = false;
        public enableFiltering: boolean = false;
        public hideHeader: boolean = false;

        public mobileTemplateHtml: Template = null;
        public detailsTemplateHtml: Template = null;
        public groupHeaderTemplate: Template = null;
        public filterPopup: Template = null;
        public tableFooterTemplate: Template = null;

        public framework: Framework;
        public target: HTMLElement;
        public pageSize: number = 10;
        public pageSlide: number = 1;
        public sortDescriptor: SortDescriptor;
        public groupBySortDescriptors: Array<SortDescriptor> = [];
        public selectionMode: SelectionMode = SelectionMode.Single;
        public openDetailsOnSelection: boolean = false;
        public minItemsCountForVirtualization: number = 100;
        public rowClick: string = null;
        public captureScroll: boolean = true;
        public columnMinWidth: number = 5;

        public apply: () => void;
        public ready: (options: Options) => void;

        //readonly
        public selection: Array<any> = [];

        //For internal use only
        public batchSize: number = 50;
        public firstLoadSize: number = 100;
        public currentPage: number = 0;

        public filterDescriptor: FilterDescriptor = FilterDescriptor.getEmpty();

        public showDetailFor: ShowDetail;

        public parentViewModel: any;
        public filterPopupForColumn: ColumnInfo;
        public hasAnyNotSizedColumn: boolean = false;
        public tableWidth: number = 0;

        constructor(element: HTMLElement, framework: Framework) {
            this.target = element;
            this.framework = framework;
            this.initialize();
        }

        public isSelected(item: any): boolean {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.selection[i] == item) {
                    return true;
                }
            }
            return false;
        }

        private initialize(): void {
            if (this.target.getElementsByTagName("script").length > 0) {
                var text = this.target.getElementsByTagName("script")[0].innerHTML;

                var optionsElement = document.createElement("div");
                optionsElement.innerHTML = text;

                //var headers = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("header");
                //var cells = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("cell");
                //var cellDetails = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("celldetail");

                var columnElements = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("column");
                for (var idx = 0; idx < columnElements.length; idx++) {
                    var columnElement = columnElements[idx];
                    var column = new ColumnInfo();

                    column.member = columnElement.getAttribute('data-g-member');

                    column.header = this.getTemplateElementIfDefined(columnElement, "header", column.header);
                    column.cell = this.getTemplateElementIfDefined(columnElement, "cell", column.cell);
                    column.cellDetail = this.getTemplateElementIfDefined(columnElement, "celldetail", column.cellDetail);

                    column.width = this.getAttrIfDefined(columnElement, 'data-g-width', column.width);
                    column.device = this.getAttrIfDefined(columnElement, 'data-g-views', column.device);

                    column.resizable = this.getBoolAttrIfDefined(columnElement, 'data-g-resizable', column.resizable);
                    column.notSized = this.getBoolAttrIfDefined(columnElement, 'data-g-not-sized', column.notSized);
                    if (column.notSized) {
                        this.hasAnyNotSizedColumn = true;
                    }
                    column.enableFiltering = this.getBoolAttrIfDefined(columnElement, 'data-g-enable-filtering', column.enableFiltering);
                    column.enableSorting = this.getBoolAttrIfDefined(columnElement, 'data-g-enable-sorting', column.enableSorting);
                    column.enableGrouping = this.getBoolAttrIfDefined(columnElement, 'data-g-enable-grouping', column.enableGrouping);

                    column.sortMemberPath = this.getAttrIfDefined(columnElement, 'data-g-sort-member', column.member);
                    column.groupMemberPath = this.getAttrIfDefined(columnElement, 'data-g-group-member', column.member);
                    column.filterMemberPath = this.getAttrIfDefined(columnElement, 'data-g-filter-member', column.member);

                    this.columns.push(column);
                }

                this.filterPopup = this.getTemplateElementIfDefined(optionsElement, "filterpopup", this.filterPopup);
                this.mobileTemplateHtml = this.getTemplateElementIfDefined(optionsElement, "mobile", this.mobileTemplateHtml);
                this.groupHeaderTemplate = this.getTemplateElementIfDefined(optionsElement, "groupheader", this.groupHeaderTemplate);
                this.detailsTemplateHtml = this.getTemplateElementIfDefined(optionsElement, "details", this.detailsTemplateHtml);
                this.tableFooterTemplate = this.getTemplateElementIfDefined(optionsElement, "footer", this.tableFooterTemplate);
            }
            this.sortDescriptor = new TesserisPro.TGrid.SortDescriptor(null, null);
            this.showDetailFor = new ShowDetail();
            this.filterPopupForColumn = new ColumnInfo();
        }

        private getAttrIfDefined(columnElement: HTMLElement, attributeName: string, defaultValue: any) {
            //if (columnElement.attributes['data-g-member'] != undefined){
            //    column.member = columnElement.attributes['data-g-member'].nodeValue;     raises deprecation warning in chrome
            //}
            if (columnElement.attributes[attributeName] !== undefined) {
                return columnElement.getAttribute(attributeName);
            } else {
                return defaultValue;
            }
        }
        private getBoolAttrIfDefined(columnElement: HTMLElement, attributeName: string, defaultValue: any) {
            if (columnElement.attributes[attributeName] !== undefined) {
                var attrValue = columnElement.getAttribute(attributeName);// === 'false' ? false : true;
                if (attrValue.toLowerCase() === "false") {
                    return false;
                } else if (attrValue.toLowerCase() === "true") {
                    return true;
                } else {
                    throw new Error("html bound '" + attributeName + "' parameter must be 'true' or 'false'");
                }
            } else {
                return defaultValue;
            }
        }
        private getTemplateElementIfDefined(containingElement: HTMLElement, tagName: string, defaultValue: Template) {
            var element = <HTMLElement>containingElement.getElementsByTagName(tagName)[0];
            if (element) {
                return new Template(element);
            } else {
                return defaultValue;
            }
        }

        public applyHandler() {
            this.columns.forEach((column) => {
                if (isNotNoU(column.member)) {
                    if (isNoU(column.groupMemberPath)) {
                        column.groupMemberPath = column.member;
                    }
                    if (isNoU(column.sortMemberPath)) {
                        column.sortMemberPath = column.member;
                    }
                    if (isNoU(column.filterMemberPath)) {
                        column.filterMemberPath = column.member;
                    }
                }
            });
            this.apply();
        }

    }
}