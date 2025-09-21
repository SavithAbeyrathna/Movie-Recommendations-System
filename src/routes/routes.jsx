import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import GenrePage from "../pages/GenrePage/GenrePage";
import ActorPage from "../pages/ActorPage/ActorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genres/:genre" element={<GenrePage />} />
      <Route path="/actors/:actorId" element={<ActorPage/>} />
    </Routes>
  );
};

export default AppRoutes;
