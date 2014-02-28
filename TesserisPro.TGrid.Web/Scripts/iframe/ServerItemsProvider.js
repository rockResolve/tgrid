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
var TesserisPro;
(function (TesserisPro) {
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
    (function (TGrid) {
        var ServerItemsProvider = (function () {
            function ServerItemsProvider(urlGetItems, urlGetTotalNumber, path) {
                this.urlGetItems = urlGetItems;
                this.urlGetTotalNumber = urlGetTotalNumber;
                this.path = path;
            }
            ServerItemsProvider.prototype.getItems = function (firstItem, itemsNumber, sortDescriptors, filterDescriptors, collapsedFilterDescriptors, callback) {
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        this.items = JSON.parse(xmlhttp.responseText);
                        callback(this.items, firstItem, itemsNumber);
                    }
                };
                xmlhttp.open("POST", this.urlGetItems.toString(), true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.setRequestHeader("Accept", "application/json");
                xmlhttp.send(JSON.stringify({ firstItem: firstItem, itemsNumber: itemsNumber, sortDescriptors: sortDescriptors, filterDescriptors: filterDescriptors, collapsedFilterDescriptors: collapsedFilterDescriptors }));
            };

            ServerItemsProvider.prototype.getTotalItemsCount = function (filterDescriptors, callback) {
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var count = parseInt(xmlhttp.responseText);
                        callback(count);
                    }
                };
                xmlhttp.open("POST", this.urlGetTotalNumber.toString(), true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.setRequestHeader("Accept", "application/json");
                xmlhttp.send(JSON.stringify(filterDescriptors));
            };

            //this methods need to be implemented
            ServerItemsProvider.prototype.removeItem = function (item) {
                this.onRemove();
            };

            ServerItemsProvider.prototype.addItem = function (item) {
                this.onAdd();
            };

            ServerItemsProvider.prototype.getFirstItem = function () {
                var item = "";
                return item;
            };
            return ServerItemsProvider;
        })();
        TGrid.ServerItemsProvider = ServerItemsProvider;
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid;
})(TesserisPro || (TesserisPro = {}));
//# sourceMappingURL=ServerItemsProvider.js.map
