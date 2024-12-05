import React from 'react';
import { CategoryInfos } from './CategoryFullInfos';
import CategoryCards from './CategoryCards';
import classes from './category.module.css';

function Category() {
  return (
    <section className={classes.category_container}>
      {CategoryInfos.map((infos) => (
        <CategoryCards data = {infos} />
      ))
    }
    </section>
  );
}

export default Category;