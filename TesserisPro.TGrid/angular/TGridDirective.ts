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
            // set default values, then add element <script> property settings
            var options = new TesserisPro.TGrid.Options(element[0], 1 /* Angular */);

            options.parentViewModel = scope;
            (<any>options).compile = $compile;


            //Angular normalises attribute names. See https://docs.angularjs.org/guide/directive
            // Since TGrid documentation & examples show Html binding using no punctuation, they are normalised to all lower case
            // e.g. both hideheader=8 and hideHeader=8 are normalized to attr.hideheader = 8
            // NOTE: Should change to better practice of binding with hypen separatored attributes which would be normalized to camelCase in code
            // e.g. use Html hide-header=8, so code can read attr.hideHeader
            // This would require changing options here and all angular demos & documentation.

            options.hideHeader = parmToBooleanOption(attrs, "hideheader", options.hideHeader);
            options.captureScroll = parmToBooleanOption(attrs, "capturescroll", options.captureScroll);


            options.minItemsCountForVirtualization = parmToNumberOption(attrs, "minitemscountforvirtualization", options.minItemsCountForVirtualization,
                (parm) => { return parm < 1 ? "is not greater than zero" : ""; });

            options.enablePaging = parmToBooleanOption(attrs, "enablepaging", options.enablePaging);

            options.pageSize = parmToNumberOption(attrs, "pagesize", options.pageSize,
                (parm) => { return parm < 1 ? "is not greater than zero" : ""; }); 

            options.pageSlide = parmToNumberOption(attrs, "pageslide", options.pageSlide,
                (parm) => { return parm < 1 ? "is not greater than zero" : ""; }); 

            options.enableVirtualScroll = parmToBooleanOption(attrs, "enablevirtualscroll", options.enableVirtualScroll);


            //Row click action options
            options.rowClick = parmToOption(attrs, "rowclick", options.rowClick);
            options.openDetailsOnSelection = parmToBooleanOption(attrs, "showdetailsonselection", options.openDetailsOnSelection);

            var selectionModeAtt = attrs.selectionmode;
            if (selectionModeAtt === "multi") {
                options.selectionMode = TesserisPro.TGrid.SelectionMode.Multi;
            } else if (selectionModeAtt === "single") {
                options.selectionMode = TesserisPro.TGrid.SelectionMode.Single;
            } else if (selectionModeAtt === "none") {
                options.selectionMode = TesserisPro.TGrid.SelectionMode.None;
            } else if (selectionModeAtt) {
                throw new Error("html bound 'selectionmode' parameter was not 'multi', 'single' or 'none'");
            }


            options.enableFiltering = parmToBooleanOption(attrs, "enablefiltering", options.enableFiltering);

            options.enableSorting = parmToBooleanOption(attrs, "enablesorting", options.enableSorting);

            options.enableGrouping = parmToBooleanOption(attrs, "enablegrouping", options.enableGrouping);
            options.enableCollapsing = parmToBooleanOption(attrs, "enablecollapsing", options.enableCollapsing);

            if (attrs.groupby) {
                var groupBy = attrs.groupby.split(' ');
                if (groupBy.length > 0 && groupBy[0] !== "") {
                    for (var i = 0; i < groupBy.length; i++) {
                        options.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(groupBy[i], true));
                    }
                }
            }


            options.ready = parmToOption(attrs, "ready", options.ready,
                (parm) => { return scope[parm]; },
                (parm) => { return (typeof parm !== "function") ? "is not a function" : ""; });

            //directive reading completed


            
            // build grid
            var grid = new TesserisPro.TGrid.Grid(element[0], options, scope[attrs.provider]);

            //pass back options
            if (attrs.options !== undefined) {
                options.apply = function () {
                    grid.afterOptionsChange();
                }
                scope[attrs.options] = options;
            }

            var bindingReady = attrs.bindingready;
            if (bindingReady) {
                if (typeof scope[bindingReady] !== "function") {
                    throw new Error("html bound 'bindingready' parameter is not a function");
                }
                scope[bindingReady](options);
            }
            
        };


        var parmToOption = (attrs: any[], parmName: string, defaultValue: any,
                    processParmValue?: (parm: any) => string,
                    validationErrorFn?: (parm: any) => string) => {
            var parmValue = attrs[parmName];
            if (parmValue === undefined) {
                return defaultValue;
            }
            if (processParmValue) {
                parmValue = processParmValue(parmValue);
            }

            if (validationErrorFn) {
                var validationError = validationErrorFn(parmValue)
                if (validationError) {
                    throw new Error("html directive '" + parmName + "' parameter " + validationError);
                }
            }
            return parmValue;
        }

        var parmToNumberOption = (attrs: any[], parmName: string, defaultValue: any,
                    validationErrorFn?: (parm: any) => string) => {
            //accepts both string or number values (e.g. pageSize="3" or pageSize=3)
            var parmValue = attrs[parmName];
            if (parmValue === undefined) {
                return defaultValue;
            }

            parmValue = parseInt(parmValue);

            if (isNaN(parmValue)) {
                throw new Error("html directive '" + parmName + "' parameter is not a number");
            } else if (validationErrorFn) {
                var validationError = validationErrorFn(parmValue)
                if (validationError) {
                    throw new Error("html directive '" + parmName + "' parameter " + validationError);
                }
            }
            return <number>parmValue;
        }
        var parmToBooleanOption = (attrs: any[], parmName: string, defaultValue: boolean) => {
            var parmValue = attrs[parmName];
            if (parmValue === undefined) {
                return defaultValue;
            }

            if (typeof parmValue === "string") {
                if (parmValue.toLowerCase() === "false") {
                    parmValue = false;
                } else if (parmValue.toLowerCase() === "true") {
                    parmValue = true;
                }
            } else if (typeof parmValue !== "boolean") {
                throw new Error("html directive '" + parmName + "' parameter could not be converted to a boolean");
            }
            return <boolean>parmValue;
        }

        return directive;
    }

    export function registerTGrid(appModule: any) {

    }
}

