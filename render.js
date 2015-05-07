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
  // create big ass object
  // pass object to recurse function

$.ajax({
  url: 'data.json',
  type: 'GET',
  dataType: 'json'
  // context: document.body
}).done(function(data, status, request) {
  // console.log( 'success!!!1!' );
  // console.log( 'data',  data);
  // console.log( 'status',  status);
  // console.log( 'request',  request);
  data.forEach(function(element, index, array) {
    var parent = $('body');
    render(element, parent);
  });
})
.fail(function(request, status, error) {
  var message = '<p style="text-align:center">Oops, something went wrong: ' + error + '</p>';
  $('body').append(message);
});

// recurse through children nodes
// base case: if no children
  // return
// not doing depth first recursion, so no base case necessary
var render = function(node, $parent){
  console.log('node', node.tag);
  var element = [];
  var attributes = node.attributes;
  // open tag and element 
  element.push('<' + node.tag);

  // debugger;
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
    element.push('>');
  }
  
  // make the element array a string
  var element = element.join(' ');

  // write current value to the DOM
  $parent.append(element);

  


};

// if has content, write it to the DOM     
// if it has children
  // recurse, passing in children array
// if it is a self closing tag
  // add " />"
// If it is not a self closing tag
  // add "</ + tag >"


// append to body

