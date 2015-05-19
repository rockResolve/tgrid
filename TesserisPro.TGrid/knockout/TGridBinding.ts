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


/// <reference path="../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../Scripts/typings/extenders.d.ts" />
/// <reference path="../TGrid.ts" />
/// <reference path="../SortDescriptor.ts" />


class TGridBindingHandler implements KnockoutBindingHandler  {
 
    public init(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
        var value = valueAccessor();

        // set options to TGrid default values 
        //   plus <script> element property settings (e.g. column member, cell template)
        //   plus bound properties (e.g. enableFiltering: true)
        var options = TGridBindingHandler.getOptions(element, value, viewModel);

        // Create grid after all other bindings are ready
        setTimeout(function () {
            var value = valueAccessor();
            var grid = new TesserisPro.TGrid.Grid(element, options, value.provider);

            if (value.options !== undefined) {
                options.apply = function () { grid.afterOptionsChange(); };
                value.options(options);
            }

            if (value.bindingReady) {
                if (typeof value.bindingReady !== "function") {
                    throw new Error("html bound 'bindingReady' parameter is not a function");
                }
                value.bindingReady(options);
            }

        }, 1);
       
    }

    // Not much practical use, only triggered on initial bind (when grid is null) and by update to parent valueAccessor (not update to its child properties)
    public update(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
        
        var grid = TesserisPro.TGrid.Grid.getGridObject(element);

        if (grid !== null) {
            var options = TGridBindingHandler.getOptions(element, valueAccessor, viewModel); 
            grid.options = options;
            grid.updateBody();
        }
    }

    private static getOptions(element: HTMLElement, value: any, viewModel: any): TesserisPro.TGrid.Options {
        // set default values, then add element <script> property settings
        var options = new TesserisPro.TGrid.Options(element, TesserisPro.TGrid.Framework.Knockout);

        options.parentViewModel = viewModel;       


        options.hideHeader = TGridBindingHandler.parmToBooleanOption(value, "hideHeader", options.hideHeader);
        options.captureScroll = TGridBindingHandler.parmToBooleanOption(value, "captureScroll", options.captureScroll);


        options.minItemsCountForVirtualization = TGridBindingHandler.parmToNumberOption(value, "minItemsCountForVirtualization", options.minItemsCountForVirtualization,
            (parm) => { return parm < 1 ? " not greater than zero" : ""; });                                 

        options.enablePaging = TGridBindingHandler.parmToBooleanOption(value, "enablePaging", options.enablePaging);

        options.pageSize = TGridBindingHandler.parmToNumberOption(value, "pageSize", options.pageSize,                                 
            (parm) => { return parm < 1 ? " not a number greater than zero": ""; } ); 

        options.pageSlide = TGridBindingHandler.parmToNumberOption(value, "pageSlide", options.pageSlide,                             
            (parm) => { return parm < 1 ? "is not a number greater than zero" : ""; }); 

        options.enableVirtualScroll = TGridBindingHandler.parmToBooleanOption(value, "enableVirtualScroll", options.enableVirtualScroll);


        //Row click action options
        options.rowClick = TGridBindingHandler.parmToOption(value, "rowClick", options.rowClick);
        options.openDetailsOnSelection = TGridBindingHandler.parmToBooleanOption(value, "showDetailsOnSelection", options.openDetailsOnSelection);

        var selectionMode = ko.unwrap(value.selectionMode);
        if (selectionMode === "multi") {
            options.selectionMode = TesserisPro.TGrid.SelectionMode.Multi;
        } else if (selectionMode === "single") {
            options.selectionMode = TesserisPro.TGrid.SelectionMode.Single;
        } else if (selectionMode === "none") {
            options.selectionMode = TesserisPro.TGrid.SelectionMode.None;
        } else if (selectionMode) {
            throw new Error("html bound 'selectionMode' parameter was '" + selectionMode + "', but should have been 'multi', 'single' or 'none'");        //NOTE error if not valid
        }


        options.enableFiltering = TGridBindingHandler.parmToBooleanOption(value, "enableFiltering", options.enableFiltering);

        options.enableSorting = TGridBindingHandler.parmToBooleanOption(value, "enableSorting", options.enableSorting);

        options.enableGrouping = TGridBindingHandler.parmToBooleanOption(value, "enableGrouping", options.enableGrouping);
        options.enableCollapsing = TGridBindingHandler.parmToBooleanOption(value, "enableCollapsing", options.enableCollapsing);
        var groupBySortDescriptor = ko.unwrap(value.groupBy);
        if (groupBySortDescriptor !== undefined) {
            for (var i = 0; i < groupBySortDescriptor.length; i++) {
                options.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(groupBySortDescriptor[i], true));
            }
        }


        options.ready = TGridBindingHandler.parmToOption(value, "ready", options.ready,
            (parm) => { return (typeof parm !== "function") ? "is not a function" : "" });


        return options;
    }    

    private static parmToOption(value: any, parmName: string, defaultValue: any,
                validationErrorFn?: (parm: any) => string): any {
        var parmValue = ko.unwrap(value[parmName]);
        if (parmValue === undefined) {
            return defaultValue;
        }
        if (validationErrorFn) {
            var validationError = validationErrorFn(parmValue)
            if (validationError) {
                throw new Error("html bound '" + parmName + "' parameter " + validationError);
            }
        }

        return parmValue;
    }

    private static parmToNumberOption = (value: any, parmName: string, defaultValue: any,
                validationErrorFn?: (parm: any) => string) => {
        //accepts both string or number values (e.g. pageSize="3" or pageSize=3)
        var parmValue = ko.unwrap(value[parmName]);
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

    private static parmToBooleanOption(value: any, parmName: string, defaultValue: boolean): boolean {
        //Parm should be boolean or strings "true", "false" (case insensitive)
        //Any default is set in options constructor
        var parmValue = ko.unwrap(value[parmName]);
        if (parmValue === undefined) {
            return;
        }
        
        if (typeof parmValue === "string") {
            if (parmValue.toLowerCase() === "false") {
                parmValue = false;
            } else if (parmValue.toLowerCase() === "true") {
                parmValue = true;
            } else {
                throw new Error("html bound '" + parmName + "' parameter must be 'true' or 'false'");
            }
        } else if (typeof parmValue !== "boolean") {
            throw new Error("html bound '" + parmName + "' parameter could not be converted to a boolean");
        }

        return parmValue;
    }
}

ko.bindingHandlers.tgrid = new TGridBindingHandler();