import styles from "./IngridientDetails.module.css";
import PropTypes from "prop-types";
import menuItemPropTypes from "../../utils/types";

const IngridientDetails = ({ data }) => {
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

IngridientDetails.propTypes = {
  data: PropTypes.shape({ menuItemPropTypes }).isRequired,
};
export default IngridientDetails;
