const Button = ({
  title,
  onClick,
  padding,
  width,
  loading,
  noIcon,
}: ButtonProps) => {
  return (
    <>
      <button
        className={`ease group relative z-30 box-border inline-flex ${
          width ? width : "w-auto"
        } ${padding} cursor-pointer items-center justify-center overflow-hidden rounded bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none md:rounded-lg`}
        onClick={() => onClick()}
      >
        <span className='ease absolute top-0 left-0 -mt-10 -ml-3 h-40 w-40 rounded-full bg-red-500 blur-md transition-all duration-700'></span>
        <span className='ease absolute inset-0 h-full w-full transition duration-700 group-hover:rotate-180'>
          <span className='absolute bottom-0 left-0 -ml-10 h-24 w-24 rounded-full bg-purple-500 blur-md'></span>
          <span className='absolute bottom-0 right-0 -mr-10 h-24 w-24 rounded-full bg-pink-500 blur-md'></span>
        </span>

        <span className='relative z-20 flex items-center font-semibold'>
          {noIcon && (
            <svg
              className='relative z-20 flex flex-shrink-0 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='https://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='12'
                d='M13 10V3L4 14h7v7l9-11h-7z'
              ></path>
            </svg>
          )}
          {title}
        </span>
      </button>
    </>
  );
};

export default Button;
