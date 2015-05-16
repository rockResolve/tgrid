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
        var options = TGridBindingHandler.getOptions(element, value, allBindingsAccessor, viewModel, bindingContext);
        // Create grid after all other bindings are ready
      
        setTimeout(function () {
            var value = valueAccessor();
            var grid = new TesserisPro.TGrid.Grid(element, options, value.provider);

            if (value.options != undefined) {
                options.apply = function () { grid.afterOptionsChange(); };
                value.options(options);
            }
            if (value.bindingReady != undefined && typeof value.bindingReady == 'function') {
                value.bindingReady(options);
            }

        }, 1);
       
    }

    public update(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
        
        var grid = TesserisPro.TGrid.Grid.getGridObject(element);

        if (grid != null) {
            var options = TGridBindingHandler.getOptions(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext); 
            grid.options = options;
            grid.updateBody();
        }
    }

    public static getOptions(element: HTMLElement, value: any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): TesserisPro.TGrid.Options {
        var options = new TesserisPro.TGrid.Options(element, TesserisPro.TGrid.Framework.Knockout);

        options.parentViewModel = viewModel;       

        var groupBySortDescriptor = ko.unwrap(value.groupBy);
        if (groupBySortDescriptor != undefined) {
            for (var i = 0; i < groupBySortDescriptor.length; i++) {
                options.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(groupBySortDescriptor[i], true));
            }
        }

        var minItemsCountForVirtualization = ko.unwrap(value.minItemsCountForVirtualization);
        if (minItemsCountForVirtualization > 0) {
            options.minItemsCountForVirtualization = minItemsCountForVirtualization
        }

        options.enablePaging = TGridBindingHandler.parmToBoolean(ko.unwrap(value.enablePaging), false);

        options.pageSize = ko.unwrap(value.pageSize);
        options.pageSize = (isNaN(options.pageSize) || options.pageSize < 1 ) ? 10 : options.pageSize;

        options.enableVirtualScroll = TGridBindingHandler.parmToBoolean(ko.unwrap(value.enableVirtualScroll), false);
        options.enableCollapsing = TGridBindingHandler.parmToBoolean(ko.unwrap(value.enableCollapsing), false);
        options.openDetailsOnSelection = TGridBindingHandler.parmToBoolean(ko.unwrap(value.showDetailsOnSelection), false);

        var selectionMode = ko.unwrap(value.selectionMode);
        if (selectionMode == "multi") {
            options.selectionMode = TesserisPro.TGrid.SelectionMode.Multi;
        } else if (selectionMode == "none") {
            options.selectionMode = TesserisPro.TGrid.SelectionMode.None;
        } else {    //default or selectionMode === "single"
            options.selectionMode = TesserisPro.TGrid.SelectionMode.Single;
        }

        options.enableSorting = TGridBindingHandler.parmToBoolean(ko.unwrap(value.enableSorting), false);
        options.enableGrouping = TGridBindingHandler.parmToBoolean(ko.unwrap(value.enableGrouping), false);
        options.enableFiltering = TGridBindingHandler.parmToBoolean(ko.unwrap(value.enableFiltering), false);

        options.pageSlide = ko.unwrap(value.pageSlide);
        options.pageSlide = (isNaN(options.pageSlide) || options.pageSlide < 1) ? 1 : options.pageSlide;

        options.rowClick = ko.unwrap(value.rowClick);

        options.captureScroll = TGridBindingHandler.parmToBoolean(ko.unwrap(value.captureScroll), true);      //default to true

        if (value.ready != undefined && typeof value.ready == 'function') {
            options.ready = value.ready;
        }

        options.hideHeader = TGridBindingHandler.parmToBoolean(ko.unwrap(value.hideHeader), false);

        return options;
    }    

    private static parmToBoolean(parm: any, defaultValue: boolean): boolean {
        if (typeof parm !== "boolean") {
            if (defaultValue) {
                return parm === "false" ? false : true;     //exact match false, otherwise return true
            } else {
                return parm === "true" ? true : false;
            }
        } else {
            return parm;
        }
    }

}

ko.bindingHandlers.tgrid = new TGridBindingHandler();