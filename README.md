Based on the following tutorials:

https://react.dev/learn

https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial

To launch the local development server:

npm run start

React is a JavaScript library for building interactive user interfaces.
React is a library which only takes care of rendering the view and making sure that the view is in sync with the state.
“state” is the data that we want to display when the component is rendered.
The render method is responsible for describing what the user interface should look like.
The output of the render method is a react element.
A react element is a JavaScript object that maps to a DOM Element. A react element represents the DOM element in memory.
React keeps a lightweight representation of the DOM in memory which we refer to as the virtual DOM. The virtual DOM is cheap to create.
When we change the state of a component, we get a new react element.
When the state changes, react will react to the state change and update the DOM.

Read:
https://medium.com/appledeveloperacademy-ufpe/buttons-in-ui-design-types-and-best-practices-baefce6d5909
https://www.dhiwise.com/post/mastering-the-power-of-react-export-const

Document how to configure the proxy to avoid a CORS error when making a fetch to the backend server:
https://vite.dev/config/server-options.html#server-proxy

Fetch library for abstraction:
https://www.npmjs.com/package/ky

I chose to build the front-end with ReactJS because of Vite’s proxy options which were not available with a mere HTML and JavaScript file.

tasks.length vs tasks.length > 0.

Explain how to implement conditional CSS styles or styled components.

React strict code executes useEffect() an additional time to catch bugs. Don’t worry if it is executed more than once.

const [tasks, setTasks] = useState<Task[]>([]);

setTasks(resFromGet.tasks);

May output “tasks” as an empty array because state updates
in React are asynchronous or occur at different times.

console.log(‘tasks:’, tasks);

Discuss how to output data with tick marks and JSON.stringify(data, null, 2).

export type newTask = Omit<Task, 'id'>;

Optional chaining

If using react-hook-form, do not use useState or onChange.

Why must each input field be registered when working with React Hook Form when using the same handleSubmit() method?

Boolean is a built-in object while boolean (written in lowercase) is a Typescript data type.

Explain why semicolons should still be written in React tsx.

https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
Explain why this needed to be done for ‘validator’.

https://soldevelo.com/blog/mastering-input-validation-in-react/

Library
A tool that provides a specific functionality.
React is a library only for building user interfaces.
Like a tool.

Framework
A set of tools and guidelines for building apps.
Like a toolset.

Create a ReactJS Application
Execute the following:
npm create vite@latest


Don't use npx create-react-app my-app because create-react-app is no longer supported.


An increasingly popular way of generating React apps is by using Vite because it is faster and gives us bundle sizes:
npm create vite@latest


Install all third party libraries:
npm i


Launching The Local Development Server
Anytime we want to use React, we must launch our development server by executing the following commands on the terminal:
cd <name_of_application>
npm run dev


npm run dev is executed during development.
npm run is what a Docker container runs during production mode.


Components
React apps are made out of components.


A component is
A piece of UI that has its own logic and appearance.
A JavaScript function that returns markup.


function MyButton() {
  return (
    <button>I'm a button</button>
  );
}


MyButton can be nested into another component.


export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}


Notice that <MyButton /> starts with a capital letter. That’s how you know it’s a React component. React component names must always start with a capital letter.


This markup syntax is called JSX.


The export default keywords specify the main component in the file.


JSX is stricter than HTML. You have to close tags like <br />. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or empty tags (<>...</>) wrapper:
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}


In React, you specify a CSS class with className. It works the same way as the HTML class attribute:
<img className="avatar" />


Then you write the CSS rules for it in a separate CSS file:
/* In your CSS */
.avatar {
  border-radius: 50%;
}


const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};


For the JSX <img> element, you can use the style attribute when your styles depend on JavaScript variables:
<img
  className="avatar"
  src={user.imageUrl}
  alt={'Photo of ' + user.name}
  style={{
    width: user.imageSize,
    height: user.imageSize
  }}
/>


Conditional Rendering
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>


Ternary Operator
The ternary operator is a shorthand way of writing an if...else statement in one line.


Syntax:
condition ? valueIfTrue : valueIfFalse


condition → a boolean expression (true or false)


valueIfTrue → what the expression evaluates to if the condition is true


valueIfFalse → what the expression evaluates to if the condition is false


let groundIsDry = isRaining ? false : true;


isRaining → the condition we are checking.


? false → if isRaining is true, groundIsDry is assigned false.


: true → if isRaining is false, groundIsDry is assigned true.


Type any
Parameters should not be of type “any” because that defeats the purpose of using TypeScript.


In certain tutorials, ReactJS arrow functions have an “event” parameter included as such:
const handleInputChange = (event) => {
    setInputValue(event.target.value);
};


This doesn’t cause errors inside “jsx” files, but with files that have a “tsx” extension, an “event” parameter like this would generate the following error:
Parameter 'event' implicitly has an 'any' type.


Selecting DOM Elements
Generally, don’t use the classical document.querySelector to select DOM elements in React because this would go against the declarative way of React.


The DOM element would be selected each time the component is re-rendered which isn’t ideal.


useRef allows functional components to create a mutable reference that persists across renders. It’s commonly used to hold a reference to a DOM element or to persist values that need to persist between renders without causing re-renders.


Conditional Rendering
In the following code, if “isLoggedIn” evaluates to true, the AdminPanel component will be rendered:
<div>
  {isLoggedIn && <AdminPanel />}
</div>

This is used when an else statement is not necessary.

If you render the same component multiple times, each will get its own state.


Using Hooks
Functions beginning with the word “use” are called Hooks.

Hooks can only be called at the top of components or other Hooks.

If you want to use useState in a condition or a loop, extract a new component and put it there.

Updating the Screen
To make your component remember some information and display it, add state to your component. This can be done by adding a state variable to your component.
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
“count” is the current state.
“setCount” is the function that updates the current state.


Sharing Data Between Components
To make both MyButton components display the same count and update together, you need to move the state from the individual buttons “upwards” to the closest component containing all of them.


Counters that update separately:
import { useState } from 'react';


export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}


function MyButton() {
  // State variables are declared in MyButton.
  const [count, setCount] = useState(0);


  // handleClick() function declared in MyButton.
  function handleClick() {
    setCount(count + 1);
  }


  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}


Counters that update together:
import { useState } from 'react';


export default function MyApp() {
  // State moved from MyButton to MyApp.
  const [count, setCount] = useState(0);


  // handleClick() moved from MyButton to MyApp,
  // so that it can be accessed inside here.
  function handleClick() {
    setCount(count + 1);
  }


  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}


function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}


React DOM
A package in React that provides DOM-specific methods that can be used at the top level of a web app to enable an efficient way of managing DOM elements of the web page.


Install ReactDOM:
npm i react-dom


Once installation is complete, you should see “react-dom” in the dependencies in the package.json file.


Earlier, React Developers directly manipulated the DOM elements which resulted in frequent DOM manipulation, and each time an update was made the browser had to recalculate and repaint the whole view according to the particular CSS of the page, which made the total process to consume a lot of time.


To solve this issue, React brought into the scene the virtual DOM. The Virtual DOM can be referred to as a copy of the actual DOM representation that is used to hold the updates made by the user and finally reflect it over to the original Browser DOM at once consuming much less time.


Component Tree
App -> Message
React takes the component tree and builds a JavaScript data structure called a virtual DOM.
Each node in the tree represents a component.
div -> h1
The DOM is updated by a companion library called “React DOM”.
Inside the main.tsx file, ReactDOM renders the component tree inside an element that has an id of “root”.


Container of A React Application
The container of the application is the <div> element inside index.html with an id assigned “root”.
Below this a script element references the main.tsx file.


React Ecosystem
React does not want coders to use “class” when designing HTML inside JavaScript files. It wants coders to use “className” instead.
React only renders out what it needs to.
If you have a list of todos and want to delete one of the tasks, React will not know how to re-render that todo list. By giving a unique “key” to every item, React will know what to remove and keep.


Project Structure
node_modules - folder is where all the third party libraries like React and other tools are installed.
public - folder where the public assets of the website exist. Images, media files, and so on.
src - folder containing the source code of an application.
index.html - basic HTML template containing a <div> element with an ID or “root”. This is the container of an application. Below is a <script> element referencing the entry point of an application “/src/main.tsx”.
package.json - file where information about a project can be found. The name of the project, its version, scripts, list of dependencies, and devDependencies can be seen here.
tsconfig.json - TypeScript configuration file containing settings for telling the TypeScript compiler how to compile the code to JavaScript.
vite.config.js - configuration file for Vite.


Creating A New Component
Create a folder titled “components” inside the “src” directory.
Create a new file with the “tsx’ extension inside the “src -> components” directory.
E.g. ListGroup.tsx
Inside the App.tsx file, add the following line:
import ListGroup from “./components/ListGroup”;
Remember that in React a component cannot return more than one HTML element. Use empty angle brackets (<></>) to tell React to use a Fragment to wrap multiple elements.


Entry Point of a React Application
<script type=”module” src=”/src/main.tsx”></script> inside the index.html file.


Components In React Developer Tools
Setup guide: https://www.codecademy.com/article/react-developer-tools
The “Components” tab allows you to see the hierarchy of components in a React app.


Bootstrap
A CSS library to give our application a modern look and feel.
Installation: npm i bootstrap@5.2.3
Import Bootstrap by adding the following line to the main.tsx file:
import 'bootstrap/dist/css/bootstrap.css';


Type Annotation
The following is an example of type annotation in TypeScript.
const handleClick = (event: MouseEvent) => console.log(event.);
The advantage of using type annotation is that the methods for a particular type automatically appear.


State
Each component is going to have its own state.
function App() {
    return <div><ListGroup /><ListGroup /></div>;
}
<ListGroup /> is a component. Each of these two instances have their own state. They are independent of each other.
useState is a hook. A hook is a function that allows us to tap into built-in features in React.
UI in React updates based on state.
React is platform agnostic. It can be used to build apps for web, mobile, and desktop devices.


Props vs State
Props are the inputs or arguments passed to a component. They are similar to functional arguments and should be treated as immutable.
State is the internal data managed by a component that can change overtime. They are similar to local variables inside a function and are mutable.
Whenever props or state change, React will re-render a component and update the DOM accordingly.


Button Component
The click event should not be implemented in the button component because then it will not be reusable.
Implement the click event in the interface.


Importing and Exporting Components
Two components can be defined in the same file, but that file cannot have two default exports.
Gallery.js has the Profile and Gallery components defined inside it. Since the Gallery component is exported as a default export, the Profile component must be exported as a named export.


React JS Ecosystem
Flexibility: React is a library and not a framework, which means that it can be used with other libraries and frameworks. It is also versatile and can be used to build a wide variety of user interfaces.