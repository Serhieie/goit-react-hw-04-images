import { useEffect } from 'react';

//Chat GPT hook THIS PART OF CODE IM NOT USING THIS IS FOR TEST
const useScrollBlock = isBlocked => {
  useEffect(() => {
    const scrollHandler = event => {
      if (isBlocked) {
        event.preventDefault();
      }
    };

    const body = document.body;
    if (isBlocked) {
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      document.addEventListener('wheel', scrollHandler, { passive: false });
      document.addEventListener('touchmove', scrollHandler, { passive: false });
    } else {
      body.style.overflow = 'auto';
      body.style.position = 'static';
      body.style.width = 'auto';
      document.removeEventListener('wheel', scrollHandler);
      document.removeEventListener('touchmove', scrollHandler);
    }

    return () => {
      body.style.overflow = 'auto';
      body.style.position = 'static';
      body.style.width = 'auto';
      document.removeEventListener('wheel', scrollHandler);
      document.removeEventListener('touchmove', scrollHandler);
    };
  }, [isBlocked]);
};

export { useScrollBlock };
