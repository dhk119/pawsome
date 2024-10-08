import { Route, Routes } from "react-router-dom";
import PetService from "./PetService";
import AllMap from "./AllMap";
import Mbti from "./Mbti";
import HealthTest from "./HealthTest";
import HealthTestRecord from "./HealthTestRecord";

const ServiceMain = () => {
  return (
    <Routes>
      <Route path="petservice" element={<PetService />} />
      <Route path="allMap" element={<AllMap />} />
      <Route path="mbti" element={<Mbti />} />
      <Route path="healthTest" element={<HealthTest />} />
      <Route path="healthTestRecord" element={<HealthTestRecord />} />
    </Routes>
  );
};

export default ServiceMain;
