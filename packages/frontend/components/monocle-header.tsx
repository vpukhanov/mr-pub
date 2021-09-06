import Link from 'next/link'
import MonocleFace from './monocle-face'

import s from './monocle-header.module.css'

type MonocleHeaderProps = {
  link?: boolean
}

function MonocleHeader() {
  return (
    <header className={s.container}>
      <div className={s.logo}>
        <MonocleFace />
      </div>
      <h1>Mr. Pub</h1>
    </header>
  )
}

function MonocleHeaderWithLink({ link }: MonocleHeaderProps) {
  return link ? (
    <Link href='/'>
      <a className={s.noStyleLink}>
        <MonocleHeader />
      </a>
    </Link>
  ) : (
    <MonocleHeader />
  )
}

export default MonocleHeaderWithLink
