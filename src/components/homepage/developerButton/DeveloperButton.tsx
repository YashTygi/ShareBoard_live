import { FC, useState } from 'react'
import styles from './DeveloperButton.module.css'
import { useAnimate } from 'framer-motion'
import Image from 'next/image'
import github from '../../../assets/github.png'
import x from '../../../assets/x.png'
import linkedin from '../../../assets/linkedin.png'
import Github from '@/assets/icons/Github'
import X from '@/assets/icons/X'
import LinkedIn from '@/assets/icons/LinkedIn'

interface DeveloperButtonProps {}

const DeveloperButton: FC<DeveloperButtonProps> = ({}) => {
  const [scope, animate] = useAnimate()
  const [isAnimated, setIsAnimated] = useState<boolean>(false)
  const [currentHover, setCurrentHover] = useState<string>('')

  const deltaAngle = 30;
  const initialPos = -250

  const handleAnimate = () => {
    setIsAnimated(prev => !prev);
  
    const animationParams = isAnimated
      ? { opacity: 0, y: 0, x: 0, rotate: 0 }
      : { opacity: 1, y: initialPos };
  
    const duration = isAnimated ? 0.5 : 0.75;
  
    const ids: string[] = ['image1', 'image2', 'image3'];
  
    ids.forEach((id, index) => {
      animate(`#${id}`, animationParams, {
        duration,
        ease: 'easeInOut',
        delay: index * 0.2,
      });
  
      if (!isAnimated) {
        if (index === 1) {
          animate(`#${id}`, { x: 100, rotate: deltaAngle }, {
            duration: 1,
            ease: 'easeInOut',
            delay: 0.4,
          });
        } else if (index === 2) {
          animate(`#${id}`, { x: -100, rotate: deltaAngle * -1 }, {
            duration: 1,
            ease: 'easeInOut',
            delay: 0.4,
          });
        }
      }
    });
  };

  const handleMouseOver = (id: string) => {
    setCurrentHover(id)
    if (isAnimated) {
      if (id === 'image1') {
        animate(`#${id}`, { scale: 1.1, y: initialPos - 20 }, { duration: 0.5, ease: "easeInOut" })
      } else{
        animate(`#${id}`, { scale: 1.1, y: initialPos - 10 }, { duration: 0.5, ease: "easeInOut" })
      }
    }
  }

  const handleMouseLeave = (id: string) => {
    setCurrentHover('')
    if (isAnimated) {
      animate(`#${id}`, { scale: 1, y: initialPos }, { duration: 0.5, ease: "easeInOut" })
    }
  }

  const handleRedirect = (url: string) => {
    window.open( url, '_blank')
  }

  return (
    <div className={styles.developer_container} ref={scope}>
      <Image
        onMouseOver={() => handleMouseOver('image1')}
        onMouseLeave={() => handleMouseLeave('image1')}
        onClick={() => {handleRedirect('https://github.com/YashTygi')}}
        id='image1'
        className={styles.image}
        data-angle="0"
        alt="imag1"
        src={github}
        width={100}
        height={100}
      />
      <Image
        onMouseOver={() => handleMouseOver('image2')}
        onMouseLeave={() => handleMouseLeave('image2')}
        onClick={() => {handleRedirect('https://x.com/YshTygi')}}
        id='image2'
        className={styles.image}
        data-angle="335"
        alt="imag1"
        src={x}
        width={100}
        height={100}
      />
      <Image
        onMouseOver={() => handleMouseOver('image3')}
        onMouseLeave={() => handleMouseLeave('image3')}
        onClick={() => {handleRedirect('https://www.linkedin.com/in/-yashtyagi/')}}
        id='image3'
        className={styles.image}
        data-angle="25"
        alt="imag1"
        src={linkedin}
        width={100}
        height={100}
      />
      <button type='button' onClick={handleAnimate} className={styles.developer_button}>
      {isAnimated 
    ? (currentHover === 'image1' 
      ? <span className={styles.developer_button_text}><Github width={16} height={16} />Github</span>
      : currentHover === 'image2' 
        ? <span className={styles.developer_button_text}><X width={16} height={16} />X - Twitter</span>
        : currentHover === 'image3' 
          ? <span className={styles.developer_button_text}><LinkedIn width={16} height={16} />LinkedIn</span>
          : 'Hide Developer Info')
    : "Know the Developer"}
      </button>
    </div>
  )
}

export default DeveloperButton