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
  // parse json data, build array of DOM nodes strings
$(function(){
  var elements = [];

  $.ajax({
    url: 'data.json',
    type: 'GET',
    dataType: 'json'
  }).done(function(nodes, status, request) {

    // pass each child node to render function
    nodes.forEach(function(child, index, array) {
      render(child, elements);
    });
    $('body').append(elements.join(''));
  })
  .fail(function(request, status, error) {

    // Uh oh!
    var message = '<p style="text-align:center">Oops, something went wrong: ' + error + '</p>';
    $('body').append(message);
  });

  // recurse through children nodes
  var render = function(node, parent){
    var element = [];
    var attributes = node.attributes;
    // open tag and element 
    element.push('<' + node.tag);

    // if has attributes
    if (attributes){
      // pad the tag name
      element.push(' ');

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
    if (node.tag === 'img'){
      element.push('/>');
    } else {
      element.push('>');
    }

    // if has content, write it to the DOM  
    if(node.content){
      element.push(node.content);
    }

    parent.push(element.join(''));

    // lather, rinse, recurse
    if(node.children){
      node.children.forEach(function(child, index, array) {
        render(child, parent);
      });
    }

    if (node.tag !== 'img'){
      parent.push('</' + node.tag + '>');
    }
  };
});