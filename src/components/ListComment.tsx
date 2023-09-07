import comicApis from '@/apis/comicApis'
import { formatCurrency } from '@/utils/formatNumber'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import imgLoading from '../../public/loading.gif'
import avatarError from '../../public/anonymous.webp'

const ListComment = ({ id }: { id: string }) => {
  const el = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setPage(1)
  }, [id])

  const { data, isError, isFetching } = useQuery({
    queryKey: ['comic_comment', id, { page: page }],
    queryFn: () => comicApis.getComicComments(id as string, { page: page }),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true,
    enabled: id !== ''
  })
  const dataComment = data?.data

  const nextPage = () => {
    if (dataComment && page < dataComment.total_pages) {
      setPage((prev) => prev + 1)
    }
    if (el.current) {
      window.scroll({
        behavior: 'smooth',
        top: el.current.offsetTop
      })
    }
  }
  const PrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
    if (el.current) {
      window.scroll({
        behavior: 'smooth',
        top: el.current.offsetTop
      })
    }
  }

  return (
    <div className='w-full h-full' ref={el}>
      <div className='border dark:border-gray-500'>
        <div className='flex items-center justify-between p-5'>
          <h3 className='flex items-center gap-3 text-primary capitalize text-lg'>
            Bình luận
            {dataComment?.total_pages && (
              <span className='text-gray-400 capitalize text-sm hidden md:inline-block'>{`(${formatCurrency(
                dataComment.total_comments
              )} bình luận)`}</span>
            )}
          </h3>
          <div className={classNames('flex items-center gap-2', { hidden: isError })}>
            <span className='text-gray-400 text-md'>
              <strong className='text-primary'>{page}</strong>/{dataComment?.total_pages}
            </span>
            <div className='flex items-center gap-2'>
              <button
              title='Trước'
                onClick={PrevPage}
                className={classNames('px-[10px] py-2 rounded-md border dark:border-gray-500 flex justify-center active:scale-95', {
                  'opacity-80 cursor-default text-gray-400': page === 1,
                  'hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary': page !== 1
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </button>
              <button
              title='Sau'
                onClick={nextPage}
                className={classNames('px-[10px] py-2 rounded-md border dark:border-gray-500 flex justify-center active:scale-95', {
                  'opacity-80 cursor-default text-gray-400': dataComment?.total_pages === page,
                  'hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary': dataComment?.total_pages !== page
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='p-5 border border-t-0 dark:border-gray-500'>
        {isFetching && (
          <div className='h-[300px] border-b dark:border-gray-500 mb-5 border-dashed flex items-center justify-center gap-2'>
            <img src={imgLoading} alt='loading' loading='lazy' />
            <span className='text-gray-400'>Loading...</span>
          </div>
        )}
        {isError && (
          <div className='h-[100px] dark:border-gray-500 border-b mb-5 border-dashed flex items-center justify-center gap-2'>
            <span className='text-gray-400'>Không tìm thấy bình luận</span>
          </div>
        )}
        {!isFetching && dataComment && dataComment.comments.length > 0 && (
          <ul>
            {dataComment.comments.map((item, i) => (
              <li key={i}>
                <div className='flex gap-[10px] pb-5'>
                  <img
                    src={item.avatar}
                    alt='avatar'
                    className='flex-shrink-0 w-[38px] h-[38px] md:w-[50px] md:h-[50px] object-cover rounded-full'
                    loading='lazy'
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null
                      currentTarget.src = avatarError
                    }}
                  />
                  <div className='flex-1 border-b border-dashed dark:border-gray-500 pb-6 overflow-hidden'>
                    <span className='mt-1 font-semibold text-black dark:text-white'>{item.username}</span>
                    {item.chapter && (
                      <span className='ml-3 text-sm text-primary'>{item.chapter}</span>
                    )}
                    <p className='mt-3 text-black/80 dark:text-gray-300 break-all'>{item.content}</p>
                    {item.stickers.length > 0 && (
                      <img src={item.stickers[0]} alt='sticker' loading='lazy' />
                    )}
                    <div className='flex items-center justify-between mt-7'>
                      <span className='text-gray-500 text-sm'>{item.created_at}</span>
                      <div className='flex items-center gap-4 text-gray-500 text-md'>
                        <div className='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            aria-hidden='true'
                            className='w-[22px] h-[22px]'
                            viewBox='0 0 24 24'
                          >
                            <g fill='none'>
                              <path
                                fill='currentColor'
                                d='m15 10l-.493-.082A.5.5 0 0 0 15 10.5V10ZM4 10v-.5a.5.5 0 0 0-.5.5H4Zm16.522 2.392l.49.098l-.49-.098ZM6 20.5h11.36v-1H6v1Zm12.56-11H15v1h3.56v-1Zm-3.067.582l.806-4.835l-.986-.165l-.806 4.836l.986.164ZM14.82 3.5h-.213v1h.213v-1Zm-3.126 1.559L9.178 8.832l.832.555l2.515-3.774l-.832-.554ZM7.93 9.5H4v1h3.93v-1ZM3.5 10v8h1v-8h-1Zm16.312 8.49l1.2-6l-.98-.196l-1.2 6l.98.196ZM9.178 8.832A1.5 1.5 0 0 1 7.93 9.5v1a2.5 2.5 0 0 0 2.08-1.113l-.832-.555Zm7.121-3.585A1.5 1.5 0 0 0 14.82 3.5v1a.5.5 0 0 1 .494.582l.986.165ZM18.56 10.5a1.5 1.5 0 0 1 1.471 1.794l.98.196a2.5 2.5 0 0 0-2.45-2.99v1Zm-1.2 10a2.5 2.5 0 0 0 2.452-2.01l-.98-.196A1.5 1.5 0 0 1 17.36 19.5v1Zm-2.754-17a3.5 3.5 0 0 0-2.913 1.559l.832.554a2.5 2.5 0 0 1 2.08-1.113v-1ZM6 19.5A1.5 1.5 0 0 1 4.5 18h-1A2.5 2.5 0 0 0 6 20.5v-1Z'
                              />
                              <path stroke='currentColor' d='M8 10v10' />
                            </g>
                          </svg>
                          {item.vote_count}
                        </div>
                        <div className='flex items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='w-5 h-5 mr-[2px]'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                            />
                          </svg>
                          {item.replies.length}
                        </div>
                      </div>
                    </div>
                    {item.replies.length > 0 &&
                      item.replies.map((itemReply, i) => (
                        <div
                          key={i}
                          className='mt-4 p-3 lg:p-5 flex gap-[10px] bg-[#f8f8f8] dark:bg-gray-800 rounded-[10px]'
                        >
                          <img
                            src={itemReply.avatar}
                            alt='avatar'
                            className='flex-shrink-0 w-[38px] h-[38px] md:w-[50px] md:h-[50px] object-cover rounded-full'
                            loading='lazy'
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null
                              currentTarget.src = avatarError
                            }}
                          />
                          <div className='flex-1 overflow-auto'>
                            <span className='mt-1 block text-black dark:text-white'>{itemReply.username}</span>
                            <p className='mt-3 text-black/80 dark:text-gray-300 break-all'>
                              <strong className='text-primary/60 dark:text-primary/80 mr-1'>
                                {itemReply.mention_user}
                              </strong>
                              {itemReply.content}
                            </p>
                            {itemReply.stickers.length > 0 && (
                              <img src={itemReply.stickers[0]} alt='sticker' loading='lazy' />
                            )}
                            <div className='flex items-center justify-between mt-7'>
                              <span className='text-gray-500 text-sm'>{itemReply.created_at}</span>
                              <div className='hidden sm:flex items-center gap-4 text-gray-500 text-md'>
                                <div className='flex items-center'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    aria-hidden='true'
                                    className='w-[22px] h-[22px]'
                                    viewBox='0 0 24 24'
                                  >
                                    <g fill='none'>
                                      <path
                                        fill='currentColor'
                                        d='m15 10l-.493-.082A.5.5 0 0 0 15 10.5V10ZM4 10v-.5a.5.5 0 0 0-.5.5H4Zm16.522 2.392l.49.098l-.49-.098ZM6 20.5h11.36v-1H6v1Zm12.56-11H15v1h3.56v-1Zm-3.067.582l.806-4.835l-.986-.165l-.806 4.836l.986.164ZM14.82 3.5h-.213v1h.213v-1Zm-3.126 1.559L9.178 8.832l.832.555l2.515-3.774l-.832-.554ZM7.93 9.5H4v1h3.93v-1ZM3.5 10v8h1v-8h-1Zm16.312 8.49l1.2-6l-.98-.196l-1.2 6l.98.196ZM9.178 8.832A1.5 1.5 0 0 1 7.93 9.5v1a2.5 2.5 0 0 0 2.08-1.113l-.832-.555Zm7.121-3.585A1.5 1.5 0 0 0 14.82 3.5v1a.5.5 0 0 1 .494.582l.986.165ZM18.56 10.5a1.5 1.5 0 0 1 1.471 1.794l.98.196a2.5 2.5 0 0 0-2.45-2.99v1Zm-1.2 10a2.5 2.5 0 0 0 2.452-2.01l-.98-.196A1.5 1.5 0 0 1 17.36 19.5v1Zm-2.754-17a3.5 3.5 0 0 0-2.913 1.559l.832.554a2.5 2.5 0 0 1 2.08-1.113v-1ZM6 19.5A1.5 1.5 0 0 1 4.5 18h-1A2.5 2.5 0 0 0 6 20.5v-1Z'
                                      />
                                      <path stroke='currentColor' d='M8 10v10' />
                                    </g>
                                  </svg>
                                  {itemReply.vote_count}
                                </div>
                                <div className='flex items-center'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    className='w-5 h-5 mr-[2px]'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                                    />
                                  </svg>
                                  0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div
          className={classNames('flex items-center justify-end gap-2', {
            hidden: isError
          })}
        >
          <span className='text-gray-400 text-md'>
            <strong className='text-primary'>{page}</strong>/{dataComment?.total_pages}
          </span>
          <div className='flex items-center gap-2'>
            <button
            title='Trước'
              onClick={PrevPage}
              className={classNames('px-[10px] py-2 rounded-md border dark:border-gray-500 flex justify-center active:scale-95', {
                'opacity-80 cursor-default text-gray-400': page === 1,
                'hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary': page !== 1
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </button>
            <button
            title='Sau'
              onClick={nextPage}
              className={classNames('px-[10px] py-2 rounded-md border dark:border-gray-500 flex justify-center active:scale-95', {
                'opacity-80 cursor-default text-gray-400': dataComment?.total_pages === page,
                'hover:border-primary hover:text-primary dark:text-white dark:hover:border-primary dark:hover:text-primary': dataComment?.total_pages !== page
              })}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ListComment
