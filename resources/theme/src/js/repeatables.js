//
// Repeatables.js
// ==========================
// This JS will handle adding and removing repeatable items in the 
// laravel-administrator pages, for example adding multiple slides to the 
// carousel page section.
//
// You will need to setup your blade template with a loop to generate a 
// '.repeatables-item' for items already saved.
//
// When clicking the '.repeatables-add' button it just takes a copy of the 
// template and injects it after the last '.repeatables-item'. Before injecting 
// a copy of the template all of its laravel page section ID's will be 
// incrimented.
//
// Required markup structure:
// --------------------------
// <div class="repeatables-container">
//      <div class="repeatables-list">
//          <div class="repeatables-item">
//              <button class"repeatables-remove"></button>
//              <h3>My repeatable item</h3>
//              <input id="sections[51][data][client]" class="form-control" name="sections[51][data][client]" type="text" value="Some value">
//          </div>
//      </div>
//
//      <button class="repeatables-add">Add another repeatable</button>
//
//      <script class="repeatables-template" type="text\plain">
//          <div class="repeatables-item">
//              <button class"repeatables-remove"></button>
//              <h3>My repeatable item</h3>
//              <input id="sections[0][data][client]" class="form-control" name="sections[0][data][client]" type="text">
//          </div>
//      </script>
//
// </div>
//

var repeatablesRegex = /(sections\[.*?\]\[data\]\[)(.*?)(\]\[.*?\])/g;

// Event bindings
// --------------------
$(document).ready(function() {
    // Add a repeatables item
    $(document).on('click', '.repeatables-add', function(e) {
        e.preventDefault();

        repeatablesAdd(this);
    });

    // Remove a repeatables item
    $(document).on('click', '.repeatables-remove', function(e) {
        e.preventDefault();

        repeatablesRemove($(this).closest('.repeatables-item'));
    });

    // Update the list when an item is added or removed
    $(document).on('repeatables:added repeatables:removed', '.repeatables-container', function(event, container, item) {
        repeatablesUpdate(container);
    });
});


// Functions
// ---------
// repeatablesAdd: 
// Takes a copy of the template and injects it at the end of the list
function repeatablesAdd(target) {
    var $repeatablesContainer   = $(target).closest('.repeatables-container'),
        $repeatablesList        = $repeatablesContainer.children('.repeatables-list'),
        repeatablesItemTemplate = $repeatablesContainer.children('.repeatables-template').html();

    // If we found a template to use, clone and inject it at end of the list
    if(repeatablesItemTemplate) {
        var $newItem = $.parseHTML(repeatablesItemTemplate);

        $newItem = $repeatablesList.append($newItem);

        // Trigger the 'repeatables:added' event on the container and pass in 
        // the container and newly created item as data
        $repeatablesContainer.trigger('repeatables:added', $repeatablesContainer, $newItem);
    }

    // If we didnt find a template, log an error
    else {
        console.error('Could not find a ".repeatables-template" to copy. Check your markup structure matches what repeatables.js is looking for.');
    }
}


// repeatablesRemove:
// Deletes the DOM element for the parent '.repeatables-item'.
function repeatablesRemove(targetItem) {
    // Find the container for the repeatable item
    var $repeatablesContainer = $(targetItem).closest('.repeatables-container');

    // Remove the item
    $(targetItem).remove();

    // Trigger the 'repeatables:removed' event on the container
    $repeatablesContainer.trigger("repeatables:removed", $repeatablesContainer);
}


// repeatablesUpdate: 
// Loop over all of the repeatable items in the container and update their 
// ID's to be in order, this is used when items are reordered or removed.
//
// Form field name should look like this: 
// <input name="sections[52][data][0][description]"
//
// Regex chunk 1: sections[52][data][
// Regex chunk 2: 0
// Regex chunk 3: ][description]
//
// Before: <input name="sections[52][data][0][description]"
// After:  <input name="sections[52][data][1][description]"
function repeatablesUpdate(targetContainer) {
    var $repeatablesContainer = $(targetContainer),
        $repeatablesList      = $repeatablesContainer.children('.repeatables-list');

    $repeatablesList.children('.repeatables-item').each(function(index, item) {
        // Increment all of the repeatables ID's in each items markup
        $(item).html($(item).html().replace(repeatablesRegex, function(match, chunk1, chunk2, chunk3) {
            return chunk1 + index + chunk3;
        }));
    });

    // Trigger the 'repeatables:updated' event on the container
    $repeatablesContainer.trigger('repeatables:updated');
}
