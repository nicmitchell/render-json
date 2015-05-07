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
  // recurse through children

// base case: if no children
  // return
// create opening tag
  // add "<" + tag 
// if has attributes
  // add all attributes
    // for each attribute
      // add attribute key to tag
      // add attribute value in double quotes
      // if attribute key is "class"
        // add each array item to class
// close the tag, add ">"
// write current value to the DOM
// if has content, write it to the DOM     
// if it has children
  // recurse, passing in children array
// if it is a self closing tag
  // add " />"
// If it is not a self closing tag
  // add "</ + tag >"


// append to body

