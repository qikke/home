import React from 'react';
import styles from './footer.module.scss';
/**
 * @name home页面的页脚
 */
export default function TextNode () {
  const date = new Date()
  const dateValue = " Date = " + date.getFullYear()+'/'+(+date.getMonth()+1)+'/'+date.getDate()
    return (
      <footer className={styles.footer}>
        <ul>
          <li><b>const</b>{dateValue}</li>
          <li><b>const</b> UseTime = 4s</li>
          <li><b>const</b> Add=北京市</li>
          <li>WWW.QIKKE.CN</li>
          {/* <li><a target="_blank" href="http://www.miitbeian.gov.cn/">粤ICP备17162184号-2</a></li> */}
        </ul>
      </footer>
    )
}
