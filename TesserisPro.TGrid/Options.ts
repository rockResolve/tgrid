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

                var headers = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("header");
                var cells = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("cell");
                var cellDetails = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("celldetail");

                var columnElements = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("column");
                for (var idx = 0; idx < columnElements.length; idx++) {
                    var columnElement = columnElements[idx];
                    var column = new ColumnInfo();
                    if (columnElement.attributes['data-g-member'] != undefined){
                        column.member = columnElement.attributes['data-g-member'].nodeValue;
                    }
                    var header = <NodeListOf<HTMLElement>>columnElement.getElementsByTagName("header");
                    if (header.length > 0) {
                        column.header = new Template(header[0]);
                    }
                    var cell = <NodeListOf<HTMLElement>>columnElement.getElementsByTagName("cell");
                    if (cell.length > 0) {
                        column.cell = new Template(cell[0]);
                    }
                    var cellDetail = <NodeListOf<HTMLElement>>columnElement.getElementsByTagName("celldetail");
                    if (cellDetail.length == 1){
                        column.cellDetail = new Template(cellDetail[0]);
                    } 

                    if (columnElement.attributes['data-g-views'] != null) {
                        column.device = columnElement.attributes['data-g-views'].nodeValue;
                    }
                    if (columnElement.attributes['data-g-resizable'] != undefined) {
                        column.resizable = columnElement.attributes['data-g-resizable'].nodeValue == 'false' ? false : true;
                    }
                    if (columnElement.attributes['data-g-not-sized'] != undefined) {
                        column.notSized = columnElement.attributes['data-g-not-sized'].nodeValue == 'true' ? true : false;
                        this.hasAnyNotSizedColumn = true;
                    }
                    if (columnElement.attributes['data-g-enable-filtering'] != undefined) {
                        column.enableFiltering = columnElement.attributes['data-g-enable-filtering'].nodeValue == 'false' ? false : true;
                    }
                    if (columnElement.attributes['data-g-enable-sorting'] != undefined) {
                        column.enableSorting = columnElement.attributes['data-g-enable-sorting'].nodeValue == 'false' ? false : true;
                    }
                    if (columnElement.attributes['data-g-enable-grouping'] != undefined) {
                        column.enableGrouping = columnElement.attributes['data-g-enable-grouping'].nodeValue == 'false' ? false : true;
                    }

                    column.sortMemberPath = columnElement.attributes['data-g-sort-member'] != undefined ? columnElement.attributes['data-g-sort-member'].nodeValue : column.member;
                    column.groupMemberPath = columnElement.attributes['data-g-group-member'] !== undefined ? columnElement.attributes['data-g-group-member'].nodeValue : column.member;
                    column.filterMemberPath = columnElement.attributes['data-g-filter-member'] != undefined ? columnElement.attributes['data-g-filter-member'].nodeValue : column.member;

                    this.columns.push(column);
                }

                var filterPopup = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("filterpopup");
                if (filterPopup.length == 1) {
                    this.filterPopup = new Template(filterPopup[0]);
                }
                var mobileTemplate = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("mobile");
                if (mobileTemplate.length == 1) {
                    this.mobileTemplateHtml = new Template(mobileTemplate[0]);
                }
                var groupHeaderTemplate = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("groupheader");
                if (groupHeaderTemplate.length == 1) {
                    this.groupHeaderTemplate = new Template(groupHeaderTemplate[0]);
                }
                var detailsTemplate = <NodeListOf<HTMLElement>>optionsElement.getElementsByTagName("details");
                if (detailsTemplate.length == 1){
                    this.detailsTemplateHtml = new Template(detailsTemplate[0]);
                }
                var footer = optionsElement.getElementsByTagName("footer");
                if (footer.length != 0) {
                    this.tableFooterTemplate = new Template(footer[0]);
                }
            } 
            this.sortDescriptor = new TesserisPro.TGrid.SortDescriptor(null, null);
            this.showDetailFor = new ShowDetail();
           // this.showCustomDetailFor = new ShowDetail();
            this.filterPopupForColumn = new ColumnInfo();
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
                        column.sortMemberPath = column.member;   // TODO should be setting filterMemberPath, fix next commit.
                    }
                }
            });
            this.apply();
        }
      
    }
}