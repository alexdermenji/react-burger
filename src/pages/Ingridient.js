import IngridientDetails from "../components/IngridientDetails/IngridientDetails";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selectIngridients from "../services/selectors/ingridients/selectIngridients";
import { setCurrentIngridient } from "../services/actions/ingridients/setCurrentIngridient";

const Ingridient = () => {
  const dispatch = useDispatch();
  const { ingridientId } = useParams();
  const ingridients = useSelector(selectIngridients);
  const [ingridient] = ingridients.filter((item) => item._id === ingridientId);
  dispatch(setCurrentIngridient(ingridient));

  return (
    <section>
      <IngridientDetails />
    </section>
  );
};

export default Ingridient;
