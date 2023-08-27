const RatingStar = ({ rating }: { rating: number }) => {
  const range = Number(rating) > 100000 ? 'w-[55%]' : 'w-0'
  const ratingNumber = Number(rating) > 100000 ? '4.5' : '4.0'

  return (
    <div className='flex items-end gap-2'>
      <span className='text-black text-[22px] leading-5 font-semibold'>{ratingNumber}</span>
      <div className='flex items-center'>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span className='relative' key={i}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 22 22'
                strokeWidth={0.5}
                className='w-7 h-7 fill-[#f8f8f5] stroke-[#d0d0cf]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                />
              </svg>
              <span className={`absolute inset-0 overflow-hidden h-full ${i === 4 && range}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 22 22'
                  strokeWidth={0.5}
                  className='w-7 h-7 fill-[#ffc73f]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              </span>
            </span>
          ))}
      </div>
    </div>
  )
}

export default RatingStar
