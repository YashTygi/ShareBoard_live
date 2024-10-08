"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './homepage.css';
import Arrow from '@/assets/icons/Arrow';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CustomCursor from 'custom-cursor-react';
// import 'custom-cursor-react/dist/index.css';
import Image from '@/assets/icons/Image';
import Quote from '@/assets/icons/Quote';
import DeveloperButton from './developerButton/DeveloperButton';


const HomePage = (): JSX.Element => {
  const [url, setUrl] = useState<string>('');
  const [length, setLength] = useState<number>(70);
  const [hover, setHover] = useState<boolean>(false);
  const [currentHover, setCurrentHover] = useState<string>('');
  const [random, setRandom] = useState<number>(0);
  const router = useRouter();

  const validateUrl = (url: string) => {
    const pattern = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~-]+$/;
    return pattern.test(url);
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 1000) % 2
  }

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);

  };

  const onHover = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if(validateUrl(url)){
      setLength(180)
      setHover(true)
    }
  };

  const onLeave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if(validateUrl(url)){
      setLength(70)
      setHover(false)
    }
  };

  const onCurrentHover = (event: React.MouseEvent<HTMLElement, MouseEvent>, current: string) => {
    event.preventDefault();
    let randnum = randomNumber();
    setRandom(randnum);
    setCurrentHover(current);
  };

  const onCurrentHoverLeave = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setCurrentHover('');
  };


  const handleSubmit = async () => {
    if (validateUrl(url)) {
      try {
        const response = await fetch('/api/pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pathName: url }),
        });

        if (response.ok) {
          router.push(`/${url}`);
        } else {
          const data = await response.json();
          showErrorToast(data.message || 'An error occurred while creating the page.');
        }
      } catch (error) {
        console.error('Error creating page:', error);
        showErrorToast('An error occurred while creating the page.');
      }
    } else {
      showErrorToast('URL must not contain spaces and should only include letters, numbers, and special characters.');
    }
  };

  
  const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };
  
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handleSubmit();
  };
  


  return (
    <div className='homepage'>
    {/* <CustomCursor
      targets={['.hero_heading', '.hero_input', '.hero_button', '.error-message', '.hero_developer']}
      customClass='custom-cursor'
      dimensions={54}
      opacity={0.5}
      fill='transparent'
      smoothness={{
        movement: 0.43,
        scale: 0.58,
        opacity: 0.5,
      }}
      targetOpacity={0.9}
      targetScale={3}
      strokeColor='#000'
      strokeWidth={4}
    /> */}
    <div className='hero_section'>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'bold')} className="hero_symbols bold">
        B
      </span>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'italic')} className="hero_symbols italic">
        I
      </span>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'underline')} className="hero_symbols underline">
        U
      </span>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'strikethrough')} className="hero_symbols strikethrough">
        S
      </span>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'image')} className="hero_symbols image">
        <Image width={24} height={24} />
      </span>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'code')} className="hero_symbols code">
        &lt;/&gt;
      </span>
      <span 
       onMouseLeave={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHoverLeave(event)} 
       onMouseOver={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onCurrentHover(event, 'quote')} className="hero_symbols quote">
        <Quote width={20} height={20} fill='black'  />
      </span>

      { random === 1 ? <div className='hero_symbol_image_cat' data-attribute={currentHover}></div> : <div className='hero_symbol_image_lee' data-attribute={currentHover}></div>}

      <h1 data-attribute={currentHover} className={currentHover === 'code' ? 'hero_heading heading_code' : 'hero_heading'}>{currentHover === 'code' ? `{<ShareBoard />}` : `ShareBoard`}</h1>
    <div className="hero_input_wrapper">
      <input 
      suppressHydrationWarning
        className='hero_input' 
        type='text'
        id='url'
        value={url}
        onChange={handleChange}
        onKeyDown={handleOnKeyDown}
        autoFocus
      />
      <label htmlFor="url" className="placeholder-label">shareboard.live/</label>
      {!validateUrl(url) && <p role='alert' className="error-message">**URL cannot be empty and must not contain spaces and should only include letters, numbers, and special characters.</p>}
      <button 
        type='button'
        onClick={handleButtonClick} 
        onMouseOver={!validateUrl(url) ? onHover : undefined}
        onMouseLeave={onLeave}
        data-hover={hover}
        disabled={!validateUrl(url)}
        className='hero_button'
        title='Click to share'>
        <Arrow className='hero_arrow' width={length} height={24} color='white' />
      </button>
    </div>
     <div className='hero_developer'>
      <DeveloperButton />
     </div> 
      <ToastContainer />
    </div>
    </div>
  );
};

export default HomePage;
