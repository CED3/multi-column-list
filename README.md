multi-column-list
=================

A jQuery plugin for turning a normal list into a responsive multiple column list, where each column is a fixed width. The number of columns changes based on the container width and responds with the window resizing.

Basic usage:
$(".multiColumnedList").multiColumnLists({
    columnWidth: 250,
    containerEl: $("body")
});

Options:
- columnWidth = the number of pixels each column should be
- containerEl = the container that should used for resizing
