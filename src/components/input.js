import React from 'react'

import * as styles from './input.module.css'

const Input = ({ onChange, searchQuery }) => (
  <form method='get' action='/'>
    <div className={styles.searchBox}>
      <input
        className={styles.input}
        type="search"
        value={searchQuery}
        name='s'
        aria-label="Search"
        placeholder="Search by Title or Tag"
        onChange={(e) => onChange(e)}
      />
      <button className={styles.button}>Search</button>
    </div>
  </form>
)

export default Input
