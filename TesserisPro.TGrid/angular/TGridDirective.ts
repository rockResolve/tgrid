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


/// <reference path="../scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Options.ts"/>

module TGrid.Angular {
    export function Directive($parse, $compile): any {
        var directive: any = {};
        directive.restrict = 'E';

        directive.link = function (scope, element, attrs) {
            var options = new TesserisPro.TGrid.Options(element[0], 1 /* Angular */);
            options.parentViewModel = scope;
            (<any>options).compile = $compile;

            if (attrs["groupby"] != undefined) {
                var groupBy = attrs["groupby"].split(' ');
                if (groupBy.length > 0 && groupBy[0] != "") {
                    for (var i = 0; i < groupBy.length; i++) {
                        options.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(groupBy[i], true));
                    }
                }
            }

            if (attrs["minItemsCountForVirtualization"] > 0) {
               options.minItemsCountForVirtualization = parseInt(attrs["minItemsCountForVirtualization"]);
            } 

            options.enablePaging = parmToBoolean(attrs["enablepaging"], false);

            var pageSizeAtt = attrs["pagesize"];
            if (pageSizeAtt != undefined) {
                options.pageSize = parseInt(pageSizeAtt);
                options.pageSize = (isNaN(options.pageSize) || options.pageSize < 1) ? 10 : options.pageSize;
            }

            var pageSlideAttr = attrs["pageslide"];
            if (pageSlideAttr != undefined) {
                options.pageSlide = parseInt(pageSlideAttr);
                options.pageSlide = (isNaN(options.pageSlide) || options.pageSlide < 1) ? 1 : options.pageSlide;
            }

            var selectionModeAtt = attrs["selectionmode"];
            if (selectionModeAtt == "multi") {
                options.selectionMode = 2 /* Multi */;
            } else if (selectionModeAtt == "none") {
                options.selectionMode = 0 /* None */;
            } else {    //default or selectionModeAtt == "single"
                options.selectionMode = 1 /* Single */;
            }

            options.enableVirtualScroll = parmToBoolean(attrs["enablevirtualscroll"], false);
            options.enableCollapsing = parmToBoolean(attrs["enablecollapsing"], false);
            options.enableSorting = parmToBoolean(attrs["enablesorting"], false);
            options.enableGrouping = parmToBoolean(attrs["enablegrouping"], false);
            options.openDetailsOnSelection = parmToBoolean(attrs["showdetailsonselection"], false);
            options.enableFiltering = parmToBoolean(attrs["enablefiltering"], false);

            options.rowClick = attrs["rowclick"];

            options.captureScroll = parmToBoolean(attrs["capturescroll"], true);    //default to true

            var ready = attrs["ready"];
            if (ready != undefined && typeof scope[ready] == 'function') {
                options.ready = scope[ready];
            }

            options.hideHeader = parmToBoolean(attrs["hideheader"], false);
            

            var grid = new TesserisPro.TGrid.Grid(element[0], options, scope[attrs["provider"]]);
            if (attrs["options"] != undefined) {
                options.apply = function () {
                    grid.afterOptionsChange();
                }
                scope[attrs["options"]] = options;
            }

            var bindingReady = attrs["bindingready"];
            if (ready != undefined && typeof scope[bindingReady] == 'function') {
                scope[bindingReady](options);
            }

            
        };

        var parmToBoolean = function (parm: any, defaultValue: boolean): boolean {
            if (defaultValue) {
                return parm === "false" ? false : true;     //exact match false, otherwise return true
            } else {
                return parm === "true" ? true : false;
            }
        }

        return directive;
    }

    export function registerTGrid(appModule: any) {

    }
}

