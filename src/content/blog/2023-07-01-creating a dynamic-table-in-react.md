---
title:  "Dynamic Tables in React"
excerpt: "In web development, tables are commonly..."
publishDate: "2022-12-30T11:39:36.050Z"
image: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=927&h=927"
category: "technology"
author: "ivan-arias"
tags: [react, table]



---


In web development, tables are commonly used to display structured data in a tabular format. React provides various tools and libraries to create interactive and dynamic tables. One such library is react-table, which simplifies developing and managing tables in React.

In this tutorial, we will learn how to create a table using the [react-table library](https://react-table-library.com/?path=/story/getting-started-installation--page) in a React application. We'll walk through the steps of fetching data from an API, setting up the table component, and rendering the table with sortable columns.

##### Prerequisites
Before starting, make sure you have the following requirements installed:
* Node.js and npm (Node Package Manager) - to set up and manage the React application.
* Basic knowledge of React - understanding React components and hooks will be helpful.

#### Step 1: Set Up the Project
To get started, create a new React project by running the following command in your terminal:

```js
npx create-react-app react-table-demo
cd react-table-demo
```
#### Step 2: Install Dependencies
In this step, we'll install the required dependencies for our project. Open a terminal and run the following command inside the project directory:

```js
npm install react-table
```
#### Step 3: Fetch Data
In this step, we'll fetch data from an API and store it in the parent component's state. In this code, we define the App component as the parent component. It fetches data from the API using the fetchData function when the component mounts. The fetched data is stored in the data state variable and passed to the Table component as a prop.

```js
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://cities-qd9i.onrender.com/agents");
      const agents = await response.json();
      setData(agents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
```

That is how looks the  JSON data.

```json
{
  "agents": [
   {
    "id": 1,
    "first_name": "Alysia",
    "last_name": "Ivashechkin",
    "email": "aivashechkin0@example.com",
    "phone": "(424) 8787997",
    "image": "https://picsum.photos/400",
    "state": "California",
    "city": "Los Angeles",
    "address": "2 Vermont Junction"
  },
  {
    "id": 2,
    "first_name": "Alicia",
    "last_name": "Sworder",
    "email": "asworder1@mozilla.com",
    "phone": "(804) 8988278",
    "image": "https://picsum.photos/400",
    "state": "Virginia",
    "city": "Richmond",
    "address": "362 Hoffman Court"
  }
 ]
}
```
#### Step 4: Create the Table Component
In this step, we'll create the Table component that will render the table using the react-table library. 

The useMemo hook is used in this code to memoize the columns configuration so that it is only calculated once and avoids unnecessary recalculations and re-renders. 

```js
import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./Table.css";

const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "First Name", accessor: "first_name" },
      { Header: "Last Name", accessor: "last_name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "State", accessor: "state" },
      { Header: "City", accessor: "city" },
      { Header: "Address", accessor: "address" }
    ],
    []
  );
```

#### Step 5: Creating the Table Instance

Using the useTable hook, we create a table instance by passing the columns and data as arguments. The hook returns several properties and methods we can use to render and interact with the table.


```js
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });
```

#### Step 6. Rendering the Table

We render the table. We use the spread operator (...) to apply the getTableProps function to the <table> element, which assigns the necessary attributes and event handlers to the table.

Inside the table, we render the table headers `<thead>` and table body `<tbody>` using the properties provided by the useTable hook. We iterate over the headerGroups array to render the header rows. We iterate over the header array within each row to render individual header cells.

We iterate over the rows array for the table body to render the data rows. Inside each row, we iterate over the cells array to render the individual cells.

```js
  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
```

#### Step 7: Styling the Table
We apply basic styling to the table container by adding a CSS class table-container to the wrapping
 
```css
.table-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid # ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
```

#### Step 8: Run the Application
To run the application, open a terminal, navigate to the project directory, and run the following command:

```js
npm start
```

[Try yourself](https://codesandbox.io/s/creating-a-dynamic-table-in-react-using-react-table-mm2tpd?file=/src/styles.css) Basic Table:



Let's add another functionality: the sortBy hook.

1.-Import the useSortBy hook:

```js
import { useTable, useSortBy } from "react-table";
```

2.- Modify the useTable hook: The useTable hook uses columns, data, and useSortBy as arguments. The useSortBy hook enables the sorting functionality.

```js
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);
```

3.- Sort indicators in table headers: The table headers are rendered with sorting indicators. A span element is added within each th element to display the sorting indicator based on the sorting state of the column. It shows  "🔽" for descending order and "🔼" for ascending order.

4.- Sorting toggle attributes: The th elements have the column.getSortByToggleProps() function added to their attributes. This function enables toggling the sorting order when the column header is clicked.


```js
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
```


The updated code enables sorting functionality in the table by making these changes. Clicking on a column header will trigger sorting based on that column, and the sorting indicator will reflect the current sorting state of the column.

## Summary.

In this tutorial, we built a table using a react-table library and implemented hooks like sortBy. Using React Hooks effectively is essential for optimizing the performance and maintaining a clean and efficient codebase in React applications.


[Try yourself](https://codesandbox.io/s/creating-a-dynamic-table-in-react-sort-func-98rc35?file=/src/styles.css:0-339) 





### References:

[W3Schools Free Online Web Tutorials. (n.d.). https://www.w3schools.com/default.asp](https://www.w3schools.com/default.asp)

[MDN Web Docs. (n.d.). https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)

[React-table tutorial - beginners tutorial (2023) YouTube. Available at: https://www.youtube.com/watch?v=A9oUTEP-Q84&amp;ab_channel=PedroTech.](https://youtu.be/A9oUTEP-Q84?t=2) 

"Give me some ideas to blog about the given code in the last three days" prompt. ChatGPT, July 1th, ChatGPT May 24 Version, OpenAI, chat.openai.com.






























