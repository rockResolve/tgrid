####captureScroll
    
Enables or disables the scroll capturing i.e. Should scrolling within the grid prevent scrolling the containing window.

**Value:** *true* or *false*

**Default value:** *true*

**Example:**

#####For Knockout
<!--Start the highlighter-->
<pre class="brush: html">
	<div id="test-knockout" data-bind="tgrid: { provider: itemsProvider, captureScroll: false}">
	</div>
</pre>

#####For Angular

<pre class="brush: html">
	<t-grid id="test-angular" provider="itemsProvider" captureScroll="false">
	</t-grid>
</pre>

#####

<script type="text/javascript">
    SyntaxHighlighter.highlight();
</script>