import React from 'react'
import {Route,Link} from 'react-router-dom'

export default function CategoryList ({categories,selectedCategory,onSelectCategory}){
    return categories.length === 0 ?( <p>No Posts</p>):(
        <div className="categories col-3">
            <ul>
              <li className={!selectedCategory ? 'categories-selected':''}>
                <Link to="/" onClick={_=> {onSelectCategory(null)}}>all</Link>
              </li>
                {categories.map( (cat)=>
                    <li className={cat===selectedCategory ? 'categories-selected':''}
                        key={cat.path}>
                        <Link to={`/${cat.path}`} onClick={_=> {onSelectCategory(cat)}}>{cat.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}






