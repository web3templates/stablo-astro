---
title:  "JS Dynamic List"
excerpt: "Since I had difficulty showing a list of items..."
publishDate: "2022-12-30T11:39:36.050Z"
image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=927&h=927"
category: "technology"
author: "ivan-arias"
tags: [design, architecture, interior]



---




### DOM Manipulation

Since I had difficulty showing a list of items in the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" target="_blank">Document Object Model (DOM)</a> in my final phase-1 Project. I decided to blog about DOM manipulation using Javascript.
I will describe a step-by-step guide on creating and inserting a dynamic list in the DOM. I will focus on javascript and HTML code rather than on CSS code.

Before starting coding, we need to think about what our goals are. We should make a “mental map” to organize our ideas and define our objectives. Also, we must consider writing clean code: for instance, creating single-purpose functions instead of an extended ones, which are difficult to debug.

First, we start coding a basic HTML structure with head and body tags. Then add an h1 tag for the main heading, an input (type = “text) tag for the text input box, a button tag for triggering a function, a ul tag for the list's content, and a script tag for writing JavaScript code. Some HTML tags have identifiers (id= identifier), there are necessary to link the HTML with javascript. The HTML structure should look like this:



```javascript
<!DOCTYPE html>
<html>
<head>
  <title>Dynamic List BLOG</title>
</head>
<body>
  <h1>Dynamic List</h1>
  <input type="text" id="countryInput" placeholder="Enter a country">
  <button id="addCountryButton">Add a Country</button>
  <ul id="list"></ul>
  <script></script>
</body>
</html>
```

In the JavaScript code, we must declare and initialize variables. The variable “list” is an empty array that will store the list of countries. The variable addItemButton stores the HTML button with the identifier id='addItemButton'. Then an eventListener is added to the "Add Country" button. When clicked, it triggers the saveItemToList() function, which saves the entered country to the list.

The following line defines the saveItemToList() function. This function is triggered when clicking the "Add a Country" button. It retrieves the value entered in the input field, trims any leading or trailing whitespace, and checks if it is not an empty string. If it's not empty, the country is added to the list array using the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" target="_blank">.push() method</a>, the input field is cleared, and the displayList() function is called to update the displayed list.

```javascript
  
  //Declare  variable list and initialize.
  let list = [];
  const addItemButton = document.getElementById('addItemButton');
  
  // Add event listener to trigger saving of items
   addItemButton.addEventListener('click', saveItemToList);
  

  // Function to save items to the list
  function saveItemToList() {
   const itemInput = document.getElementById("countryInput");
    const item = itemInput.value.trim();
    if (item !== '') {
      list.push(item);
      itemInput.value = '';
      displayList();
    }
  }
```
So, now we have a function to save our data, but what if we want to delete one of the countries on the list? We need another single-purpose function to delete countries!

The deleteItem(index) function takes an index as a parameter and removes the corresponding country from the list array using the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" target="_blank">splice() method</a>. After deleting the item, the displayList() function updates the list in the DOM.

At this point, we have a function to save countries using the .push() method and  another function to delete countries using the .splice() method. Our main goal is to insert the countries list in the DOM, so we need a function to display the saved countries.

The displayList() function renders the list in the DOM. It starts by obtaining a reference to the ul element with the id "list." It then clears the existing content of the ul element. Using a for loop, the function iterates over the list array. For each country in the list, it creates a new li element and sets its text content to the country name. It also creates a delete button for each item using the button element. 

The delete button is assigned the text "Delete" and an event listener that triggers the deleteItem() function with the corresponding index when clicked. Also, it is appended as a child of the li element, and the li element is appended as a child of the ul element. This process is repeated for each item in the list array, resulting in a dynamically generated list of countries with corresponding delete buttons.


```javascript
// Function to delete an item from the list
function deleteItem(index) {
  list.splice(index, 1);
  displayList();
}

// Function to display the list in the DOM
function displayList() {
  const listContainer = document.getElementById('list');
  listContainer.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = list[i];
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteItem(i));
    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);
  }
}
```
The list of countries is fetched from an API using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch" target="_blank">fetch() function</a>. It sends an HTTP GET request to the URL and retrieves the response. The response is converted to JSON format using the response.json() method. 

The resulting data is an array of objects, where each object represents a country. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">map() method</a> to extract each object's country names and assign them to the list array. **Finally, the displayList() function is called to render the initial list of countries in the DOM.**

So, we can add countries manually and get data from any API if we want. This API “countries” is used as a database on the <a href="https://hcoco1.github.io/Phase1_app/" target="_blank">World Population Dashboard</a> App.

```javascript
// Fetch the list of countries from the API
    fetch('https://world-population-dashboard.onrender.com/countries')
      .then(response => response.json())
      .then(data => {
        list = data.map(country => country.country);
        displayList();
      })
      .catch(error => console.error('Error fetching countries:', error));
    // Display the initial list on page load
    displayList();
```
Finally, the displayList() function is called at the end to ensure that the initial list is displayed when the page loads.

### Summary

The last code showed us the power of javascript to manipulate the DOM, creating, selecting, and iterating over elements and objects.  JavaScript has become integral to web development, allowing developers to manipulate the DOM, recognize events, and communicate with the server. These features provide developers with the tools to create **dynamic, interactive, and responsive web pages** that meet the needs of modern web users.





### References:

W3Schools Free Online Web Tutorials. (n.d.). https://www.w3schools.com/default.asp

MDN Web Docs. (n.d.). https://developer.mozilla.org/en-US/

Traversy Media (n.d.-b). https://www.youtube.com/@TraversyMedia/videos

Laurence Svekis (n.d.-c). https://www.youtube.com/@LaurenceSvekisCourses/videos

1BestCsharp blog. (2017, October 28). Javascript - How To Add LI To UL From Input Text Using JS [ with source code ] [Video]. YouTube. https://www.youtube.com/watch?v=JBdyASuhq1c

kootkot. (2022, February 5). ✅ JavaScript Array | How to Display Array Elements? | Real World Coding Example [Video]. YouTube. https://www.youtube.com/watch?v=MkE2_YWnJbo

[Visit my Site](https://hcoco1.com)