import AOS from 'aos'

import 'aos/dist/aos.css'

export default () => {
  AOS.init({
    duration: 500,
    once: true,
    anchorPlacement: 'top-center'
  })
}
