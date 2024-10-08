import React from 'react'

const Arrow = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 69 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM68.0607 13.0607C68.6464 12.4749 68.6464 11.5251 68.0607 10.9393L58.5147 1.3934C57.9289 0.807612 56.9792 0.807612 56.3934 1.3934C55.8076 1.97918 55.8076 2.92893 56.3934 3.51472L64.8787 12L56.3934 20.4853C55.8076 21.0711 55.8076 22.0208 56.3934 22.6066C56.9792 23.1924 57.9289 23.1924 58.5147 22.6066L68.0607 13.0607ZM2 13.5H67V10.5H2V13.5Z" fill="#fff"/>
</svg>
  )
}

export default Arrow