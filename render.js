// JSON
  // Put closing tag in logic
  // tag: string to describe the html node element
  // content: string text content between open and closing tags
  // children: array of child elements as objects
  // attributes: object to enumerate attributes as key
    // class: array of strings for class names
    // src: string for image path

// RENDER
  // load json data via AJAX
  // parse json data
$(function(){
  $.ajax({
    url: 'data.json',
    type: 'GET',
    dataType: 'json'
  }).done(function(nodes, status, request) {

    // pass each child node to render function
    nodes.forEach(function(child, index, array) {
      var $parent = $('body');
      render(child, $parent);
    });
  })
  .fail(function(request, status, error) {

    // Uh oh!
    var message = '<p style="text-align:center">Oops, something went wrong: ' + error + '</p>';
    $('body').append(message);
  });

  // recurse through children nodes
  // not doing depth first recursion, so no base case necessary
  var render = function(node, $parent){
    var element = [];
    var attributes = node.attributes;
    // open tag and element 
    element.push('<' + node.tag);

    // if has attributes
    if (attributes){

      // add all attributes
      for (var key in attributes){

        // if the attribute contains an array, add all elements (like classes)
        if (Array.isArray(attributes[key])){

        // add attribute key to element
        // add attribute value in double quotes
          element.push(key + '="' + attributes[key].join(' ') + '"');

        // add the single attribute to element
        } else {
          element.push(key + '="' + attributes[key] + '"');
        }
      }
    }

    // close the tag
    // this could also go in json data
    if (node.tag === 'img'){
      element.push('/>');
    } else {
      element.push('></' + node.tag);
    }

    // make a jQuery object out of the element
    var $element = $(element.join(' '));

    // write current value to the DOM
    $parent.append($element);

    // if has content, write it to the DOM  
    if(node.content){
      $element.text(node.content);
    }

    // if it has children, recurse for children
    if(node.children){
      node.children.forEach(function(child, index, array) {

        // pass in the target child and it's parent element
        render(child, $element);
      });
    }

  };
});