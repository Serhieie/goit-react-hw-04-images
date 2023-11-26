import { toast } from 'react-toastify';

//For unknowlable errors
export const toastCallError = () => {
  return toast.error('Oh! Its Error here! try Again', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
};

//For wrong Input
export const toastCallEmpty = () => {
  return toast.error('No Images with this input, try to find something else', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
};

//Message if no mor eimages in totalHits
export const toastCallOutOfRange = () => {
  return toast.error('Sorry but its was last images with this search', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
};

// warn if trying ti submit empty field
export const warnTostCall = () => {
  return toast.warn('Fill all fields', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};

export const succesToastCall = () => {
  return toast.success('Operation Succes!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
