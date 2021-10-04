import styles from "./IngridientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import selectCurrentIngridient from "../../services/selectors/ingridients/selectCurrentIngridient";
import { useParams } from "react-router-dom";
import selectIngridients from "../../services/selectors/ingridients/selectIngridients";
import { setCurrentIngridient } from "../../services/actions/ingridients/setCurrentIngridient";
import { useEffect } from "react";

const IngridientDetails = ({ onEsc }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCurrentIngridient);
  const { ingridientId } = useParams();
  const ingridients = useSelector(selectIngridients);

  useEffect(() => {
    if (!onEsc) {
      return undefined;
    }
    const escPressHandler = (e) => {
      if (e.code === "Escape") {
        onEsc();
      }
    };
    window.addEventListener("keydown", escPressHandler);
    return () => window.removeEventListener("keydown", escPressHandler);
  }, [onEsc]);

  if (!data) {
    const ingridient = ingridients.find((item) => item._id === ingridientId);
    dispatch(setCurrentIngridient(ingridient));
    return null;
  }

  return (
    <>
      <div className="mb-4">
        <img src={data.image_large} alt="" />
      </div>
      <p className="text text_type_main-medium mb-8">{data.name}</p>
      <ul
        className={`${styles.itemsList} text text_type_main-default text_color_inactive`}
      >
        <li className="mr-5">
          <div>Калории,ккал</div>
          <div>{data.calories}</div>
        </li>
        <li className="mr-5">
          <div>Белки, г</div>
          <div>{data.proteins}</div>
        </li>
        <li className="mr-5">
          <div>Жиры, г</div>
          <div>{data.fat}</div>
        </li>
        <li className="mr-5">
          <div>Углеводы, г</div>
          <div>{data.carbohydrates}</div>
        </li>
      </ul>
    </>
  );
};

export default IngridientDetails;
