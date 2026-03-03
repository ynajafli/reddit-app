import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/posts/:postId" element={ <PostPage /> } />
  </Route>
));

function App() {

  return (
    <RouterProvider router={ router } />
  )
}

export default App
