---
title:  "Building a Navigation Bar using React Router"
excerpt: "So, this is it!, the final project..."
publishDate: "2023-10-07T11:39:36.050Z"
image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=927&h=927"
category: "technology"
author: "ivan-arias"
tags: [react, nav, useContext ]

---

## What is a navigation bar?

A navigation bar (or navigation system) is a section of a graphical user interface intended to aid visitors in accessing information. Navigation bars are implemented in operating systems, file browsers,[1] web browsers, apps, web sites and other similar user interfaces.(wikipedia)

The navigation bar is a crucial component of any website. It guides users through the site, offering quick access to product categories, user accounts, sign-in & sign-up functionality, and more. In this post, I'll delve into the intricacies of building a responsive navigation bar, drawing insights from the NavBar.jsx component of the "e-commerce-2" project.

## What is a React Router?

React Router is a popular library for routing in React applications. It allows you to define multiple routes and render different components based on the current URL, enabling the creation of single-page applications (SPAs) with navigation.(www.simplilearn.com)

## What is The React useContext Hook?

A typical React application passes data top-down (parent to child) via props. Still, such usage can be cumbersome for certain types of props (e.g., locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without explicitly passing a prop through every level of the tree. (react docs)

## Process to build a powerful Navigation Bar

(You must have React Router 6 installed in your system.)

### Overview

* Setting up a flask backend (server-side) and a  React frontend (client-side)
  * install dependencies
  * create database, migrations version, etc.
  * <a href="https://hcoco1-blog.onrender.com/aggregate-functions-In-SQLAlchemy/" target="_blank">Read more...</a>

* for instance, something like this:
  
```bash
.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    └── seed.py
    
```

* Edit yours .py and .jsx files.

* Setting up React Router 6, check this out <a href="https://reactrouter.com/en/main/start/tutorial" target="_blank">(complete tutorial about React Router)</a>

* Setting up Context hook, <a href="https://legacy.reactjs.org/docs/context.html" target="_blank">check React docs </a>

So, your index.js, App.js, and app.py should look similar to this:

index.js:

```javascript
const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);

```

App.js:

```javascript
function App() {

    return (

        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/login" element={<UserLogin onLogin={setUser} />} />
                <Route path="*" element={<NoMatch />} />
                //more routes...
            </Routes>
        </div>
    );
}

export default App;

```

app.py:

```python
def index(id=0):
    return render_template("index.html")

# SIGNUP ROUTE

@app.route('/register', methods=['POST'])
@cross_origin()
def register_user():
    user_details = request.json
    print(user_details)

    user = User.query.filter_by(email=user_details['email']).first()

    if user:
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(username=user_details['username'], email=user_details['email'])
    new_user.set_password(user_details['password'])  

    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()
    return jsonify(user_dict), 201


# LOGIN ROUTE

@app.route('/login', methods=['POST'])
@cross_origin()
def login_user():
   
    user_details = request.json

    user = User.query.filter_by(email=user_details['email']).first()
    
    if not user:
        return jsonify({"message": "User does not exist!"}), 400

    if not user.check_password(user_details['password']):  
        return jsonify({"message": "Incorrect password!"}), 400

    session['user_id'] = user.id

    return jsonify(user.to_dict()), 200

# LOGOUT ROUTE

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200
```

The provided code defines routes for user registration, login, and logout in a Flask application. The routes interact with a database to manage user data and use sessions to maintain user authentication status.

### Creating the Navigation Bar Component

The NavBar.jsx component serves as the backbone of our navigation system. It's structured to provide a clear hierarchy of the website's main sections, ensuring users can quickly find what they want.

Before creating your component, consider what behavior you expect from the navbar component. For instance:

* Hide some links until the user is logged in.
* Once the user logs in, change "Sign In" to "Hi username."
* Protect some routes that registered users must access only
* and more...

We should use react-router and useContext to achieve these goals. The given component navbar.jsx is a little sample of a Full Stack App (<a href="https://phase5-app-tyia.onrender.com/" target="_blank">hcoco1-e-commerce</a>). For the sake of this post, I will use useContex, but you can easily manage the navbar state using a local state hook (useState)
<a href="https://legacy.reactjs.org/docs/context.html#when-to-use-context" target="_blank">When to use Context?</a>

<a href="https://www.w3schools.com/react/react_usecontext.asp" target="_blank">React useContext Hook</a>

<a href="https://www.freecodecamp.org/news/react-context-for-beginners/" target="_blank">When should you use React context?</a>

```javascript
function NavigationBar({onLogout}) {


    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
        credentials: 'include',
      }).then(() => onLogout());
    }
  
  
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container" >
          <ul className="navbar-nav" >
  
                <li className="nav-item" >
                  <Link to="/" className="nav-link">
                    <FaHome /> Home
                  </Link>
                </li>
  
                <li className="nav-item" >
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt /> Sign In
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <FaSignOutAlt /> Sign Up
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to="/user" className="nav-link">
                    <FaSignOutAlt /> Profile
                  </Link>
                </li>
  
                <li className="nav-item">
                <button onClick={handleLogout}>Sign Out</button>
                </li>
  
          </ul>
        </div>
      </nav>
    );
  }
  
  export default NavigationBar;
```

### Protected Routes

Private Routes in React Router (also called Protected Routes) require users to be authorized to visit a route. So if a user is not authorized for a specific page, they cannot access it. The most common example is authentication in a React application, where a user can only access the protected pages when authorized (which means authenticated in this case). Authorization goes beyond authentication, though. For example, a user can also have roles and permissions that give a user access to specific areas of the application. (https://www.robinwieruch.de/react-router-private-routes/)

<a href="https://www.freecodecamp.org/news/protected-routes-using-react-router/" target="_blank">Protected Routes in React using React Router</a>

In React Router, there isn't a built-in "ProtectedRoute" component. Still, you can easily create one using the standard <Route> component and some conditional logic:

```javascript
function ProtectedRoute({ children, fallback }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(fallback);
        }
    }, [user, navigate, fallback]);

    if (!user) {
        return null; 
    }

    return children;
}


export default ProtectedRoute;
```

The given code defines a ProtectedRoute component, a wrapper that protects certain React application parts based on user authentication.

You would use the ProtectedRoute component to wrap any content or components you want to protect:

```javascript
<ProtectedRoute fallback="/login">
    <Dashboard />
</ProtectedRoute>
```

In this example, the Dashboard component will be displayed if the user is authenticated. If not, they'll be redirected to the /login route.

Check App.js after setting up the ProtectedRoute component:

```javascript

function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function LogoutFunction() {
    setUser(null);
    navigate("/");
  }

  return (

    <div className="App">
      <NavBar onLogout={LogoutFunction} />
      <Routes>
      
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<UserRegister />} />
        
        <Route path="/login" element={<UserLogin onLogin={setUser} />} />
        
        <Route path="/user" element={<ProtectedRoute fallback="/login">
          <UserDetails />
         </ProtectedRoute>} />
        
        <Route path="/orders" element={<ProtectedRoute fallback="/login">
          <UserOrders />
        </ProtectedRoute>} />
        
        <Route path="/orders/:orderId" element={<ProtectedRoute fallback="/login">
          <OrderDetail />
        </ProtectedRoute>} />
        
        <Route path="/products" element={<ProductList />} />
        
        <Route path="/products/:product_id" element={<ProtectedRoute fallback="/login">
          <ProductDetail />
        </ProtectedRoute>} />
        
        <Route path="/cart" element={<ShoppingCart />} />
        
        <Route path="/checkout" element={<Checkout />} />
        
        <Route path="*" element={<NoMatch />} />
        
      </Routes>
    </div>

  );
}

export default App;

```

All components wrapped inside the ProtectedRoute will be available only after the user login. The components UserDetails, UserOrders, OrderDetail, and ProductDetail require authentication to access them.

Once the routes are protected, we can use it with a conditional rendering in the navbar to achieve a fancy result.(<a href="https://www.w3schools.com/react/react_conditional_rendering.asp" target="_blank">React Conditional Rendering</a>)

```javascript

function NavigationBar({ onLogout }) {
  const { user, logout } = useContext(UserContext);

  function handleLogout() {
    api.logout()
      .then(() => {
        logout();
        onLogout();
      })
      .catch(err => {
        console.error("Error during logout:", err);
      });
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container" >
        <ul className="navbar-nav" >
          <li className="nav-item" >

            <NavLink
              to="."
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "white",
                };
              }}

            >
              <FaHome /> Home
            </NavLink>
          </li>

          <li className="nav-item" >
            <NavLink
              to="/products"
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "white",
                };
              }}

            >
              <FaIcons /> Products
            </NavLink>
          </li>

          {user && (
            <>
              <li className="nav-item" >
                <NavLink
                  to="/orders"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaListOl /> Orders
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaShoppingCart /> Cart
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/user"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignOutAlt /> Hi, {user.username}
                </NavLink>
              </li>

              <li className="nav-item">
                <Button $primary onClick={handleLogout}>Sign Out</Button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="nav-item" >
                <NavLink
                  to="/login"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignInAlt /> Sign In
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/register"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignOutAlt /> Sign Up
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;

```

<a href="https://reactrouter.com/en/6.16.0/components/nav-link#navlink" target="_blank">The NavLink component</a>

The NavLink component is a special version of the <Link> component that will add styling attributes to the rendered element when it matches the current URL.

### Conclusion

The navigation bar dynamically adjusts its content based on the user's authentication status. Authenticated users see links to their orders, cart, and profile and a styled "Sign Out" button. On the other hand, Unauthenticated users are presented with options to "Sign In" or "Sign Up."

![Alt text for image](https://github.com/hcoco1/e-commerce-2/blob/main/e-commerce.gif?raw=true)

### References

* Home v6.16.0. (n.d.). React Router. https://reactrouter.com/en/6.16.0

* Simplilearn. (2023). Why should you use a router in React.js? Simplilearn.com. https://www.simplilearn.com/tutorials/reactjs-tutorial/routing-in-reactjs

* Carnes, B. (2019). Protected Routes in React using React Router. freeCodeCamp.org. https://www.freecodecamp.org/news/protected-routes-using-react-router/

* Arias, I. (2023, August 27). Aggregate functions. Ivan Arias Blog. https://hcoco1.blog/aggregate-functions-In-SQLAlchemy/

* Context – react. (n.d.). React. https://legacy.reactjs.org/docs/context.html

* Tutorial v6.16.0. (n.d.). React Router. https://reactrouter.com/en/main/start/tutorial

* React useContext hook. (n.d.). https://www.w3schools.com/react/react_usecontext.asp