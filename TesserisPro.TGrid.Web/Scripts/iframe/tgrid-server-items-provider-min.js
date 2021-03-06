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
var TesserisPro;(function(n){(function(n){var t=function(){function n(n,t,i){this.urlGetItems=n;this.urlGetTotalNumber=t;this.path=i}return n.prototype.getItems=function(n,t,i,r,u,f){var e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==4&&e.status==200&&(this.items=JSON.parse(e.responseText),f(this.items,n,t))};e.open("POST",this.urlGetItems.toString(),!0);e.setRequestHeader("Content-type","application/json");e.setRequestHeader("Accept","application/json");e.send(JSON.stringify({firstItem:n,itemsNumber:t,sortDescriptors:i,filterDescriptors:r,collapsedFilterDescriptors:u}))},n.prototype.getTotalItemsCount=function(n,t){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(i.readyState==4&&i.status==200){var n=parseInt(i.responseText);t(n)}};i.open("POST",this.urlGetTotalNumber.toString(),!0);i.setRequestHeader("Content-type","application/json");i.setRequestHeader("Accept","application/json");i.send(JSON.stringify(n))},n.prototype.removeItem=function(n){if(this.onRemove)this.onRemove(n)},n.prototype.addItem=function(n){if(this.onAdd)this.onAdd(n)},n.prototype.getFirstItem=function(){return""},n.prototype.addArray=function(n){this.items.concat(n);this.onReset&&this.onReset()},n.prototype.clear=function(){this.items=[];this.onReset&&this.onReset()},n}();n.ServerItemsProvider=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={}))