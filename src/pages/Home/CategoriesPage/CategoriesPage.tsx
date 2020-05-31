import React from "react";
import { useParams } from "react-router-dom";

import SortedLections from "./SortedLections"
import { LectionWrapper } from "../style";

  const CategoriesPage = () => {
  const {id} = useParams();
  return (
      <div>
      <LectionWrapper>
        <SortedLections categoryId={id}/>
      </LectionWrapper>
      </div>
  )
}

export default CategoriesPage;