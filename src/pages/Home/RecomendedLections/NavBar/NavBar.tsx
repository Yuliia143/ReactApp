import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../store";
import { getCategories } from "../../../../store/actions/getCategories";
import Category from "../../../../models/category";
import Lections from "../Lections/Lections";
import { LectionWrapperNav } from "../../style";

const classes = require('./NavBar.module.css');

const mapStateToProps = (state: RootState) => ({
  categoriesList: state.categories.categories,
  categoriesLoading: state.categories.loading
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCategories: () => dispatch(getCategories())
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const NavBar = ({ categoriesList, categoriesLoading }: PropsFromRedux) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const renderCategoryList = (categories: Category[] = []) => {
    if (!categoriesLoading && categoriesList) {
      return categories.map((item: any) => {
        return (
          <div className={classes.item} key={item.id} onClick={() => setSelectedCategory(item.id) } role="button" tabIndex={0} onKeyPress={()=>false}>
            <button type="button"><p>{item.title}</p></button>
          </div>
        )
      })
    }return null;
  }

  const categories = renderCategoryList(categoriesList);
  return (
    <div>
      <nav className={classes.nav}>
        {categories}
      </nav>
      <LectionWrapperNav>
        <Lections categoryId={selectedCategory} />
      </LectionWrapperNav>
    </div>
  )
}

export default connector(NavBar);