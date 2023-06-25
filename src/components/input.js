import React from 'react'

import * as styles from './input.module.css'

const Input = ({ onChange }) => (
  <div className={styles.searchBox}>
    <input
      className={styles.input}
      type="search"
      aria-label="Search"
      placeholder="Filter blogs by title or tag"
      onChange={(e) => onChange(e)}
    />
  </div>
)

export default Input
