import { Route, Routes } from "react-router-dom";
import PetPlant from "./PetService";
import AllMap from "./AllMap";
import Mbti from "./Mbti";
import HealthTest from "./HealthTest";

const ServiceMain = () => {
  return (
    <Routes>
      <Route path="petservice" element={<PetPlant />} />
      <Route path="allMap" element={<AllMap />} />
      <Route path="mbti" element={<Mbti />} />
      <Route path="healthTest" element={<HealthTest />} />
    </Routes>
  );
};

export default ServiceMain;
