/* Multicolumn list plugin, CED3, Naval Postgraduate School, May 2014
 * Converts a UL LI list into multiple columns. The number of columns is 
 * determined by the width of the container element diveded by the width of each column.
 * 
 * Usage: 
 *  $("#multiColumnedList").multiColumnLists({
        columnWidth: 150,
        containerEl: $("body")
    });
 * 
 * @author Philip McCullick
 * */
;(function ($) {
    $.fn.extend( {
        multiColumnLists: function (options) {
            this.defaults = {
                    columnWidth: 150,
                    containerEl: $("body")
            };

            var settings = $.extend( {}, this.defaults, options );

            return this.each(function() {
                var $el = $(this);
                var listEl = $el.find("> ul");
                var listItems = [];
                //cache the list items
                listEl.find("> li").each(function () {
                    listItems.push("<li>" + $(this).html() + "</li>");
                });
                var widthDiff = listEl.outerWidth() - listEl.width();               
                
                var redrawList = function () {
                    var windowWidth = $(window).width();
                    var columnWidth = (options.columnWidth - widthDiff);
                    if (columnWidth > windowWidth) {
                        columnWidth = "auto";
                    } else {
                        columnWidth += "px";
                    }
                    var columns = Math.max(1, Math.floor(options.containerEl.width() / (options.columnWidth )));                    
                    var itemsPerColumn = Math.floor(listItems.length / columns);
                    var extraItems = listItems.length % columns;
                    var output = "";
                    var currentItem = 0;
                    for (var i = 0; i < columns; i++) {
                        output += "<ul class='multiColumnListColumn' style='width:" + columnWidth + "'>";
                        var startIndex = currentItem;
                        var columnLength = itemsPerColumn + (i <extraItems?1:0);                        
                        for (var j = 0; j < columnLength; j++) {
                            output +=  listItems[j + startIndex];
                            
                            currentItem++;
                        }
                        output += "</ul>";
                    }
                    $el.html(output);
                };
                redrawList(); 
                $(window).on("resize", redrawList);
            });
        }
    });
    
})(jQuery);