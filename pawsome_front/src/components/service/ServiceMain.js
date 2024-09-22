import { Route, Routes } from "react-router-dom";
import PetPlant from "./PetService";
import AllMap from "./AllMap";

const ServiceMain = () => {
  return (
    <Routes>
      <Route path="petservice" element={<PetPlant />} />
      <Route path="allMap" element={<AllMap />} />
    </Routes>
  );
};

export default ServiceMain;
