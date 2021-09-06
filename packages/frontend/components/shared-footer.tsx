import { ReactElement } from 'react'
import s from './shared-footer.module.css'

function SharedFooter({ children }: { children?: ReactElement }) {
  return (
    <footer className={s.container}>
      {children}
      <div className='tagline'>made with 🦄</div>
      <div className='tagline'>
        <a href='https://github.com/vpukhanov/mr-pub'>view on github</a>
      </div>
    </footer>
  )
}

export default SharedFooter
