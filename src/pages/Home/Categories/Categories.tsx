import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import { getCategories } from "../../../store/actions/getCategories";
import Category from "../../../models/category";

const classes = require("./Categories.module.css");

const mapStateToProps = (state: RootState) => ({
  categoriesList: state.categories.categories,
  categoriesLoading: state.categories.loading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCategories: () => dispatch(getCategories()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Categories = ({ categoriesList, categoriesLoading }: PropsFromRedux) => {
  const renderCategoryList = (categories: Category[] = []) => {
    if (!categoriesLoading && categoriesList) {
      return categories.map((item: any) => {
        return (
          <div
            className={classes.text}
            key={item.id}
            role="button"
            tabIndex={0}
            onKeyPress={() => false}
          >
            <Link to={`/category/${item.id}`}>{item.title}</Link>
          </div>
        );
      });
    }
    return null;
  };

  const categories = renderCategoryList(categoriesList);

  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>Top categories</p>
      <div className={classes.flexCategories}>
        <div className={classes.row}>{categories}</div>
      </div>
    </div>
  );
};

export default connector(Categories);
