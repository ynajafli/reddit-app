import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NotFound from "./pages/NotFound";


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={ <HomePage /> } />
    <Route path="/posts/:postId" element={ <PostPage /> } />
    <Route path="*" element={ <NotFound /> }/>
  </Route>
));

function App() {

  return (
    <RouterProvider router={ router } />
  )
}

export default App
