import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const OTPsend = () => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  return toast.promise(
    resolveAfter3Sec,
    {
      pending: "Otp sending...",
      success: "Otp send to your phonenumber ",
    },
    {
      theme: "dark",
      position: "top-center",
      hideProgressBar: true,
      transition: Slide,
      autoClose: 3000,
    }
  );
};

const warn =(message)=>{
    console.log(message);
    toast.warn(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        });
}

export {OTPsend,warn}

