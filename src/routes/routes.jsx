import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import BlogPage from "../pages/Blog/BlogPage";
import GenrePage from "../pages/GenrePage/GenrePage";
import ActorPage from "../pages/ActorPage/ActorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/genres/:genre" element={<GenrePage />} />
      <Route path="/actors/:actorId" element={<ActorPage/>} />
    </Routes>
  );
};

export default AppRoutes;
