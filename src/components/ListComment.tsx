import comicApis from '@/apis/comicApis'
import { formatCurrency } from '@/utils/formatNumber'
import classNames from 'classnames'
import { useState, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import imgLoading from '@/assets/img/loading.gif'
import avatarError from '@/assets/img/anonymous.png'

const ListComment = ({ id }: { id: string }) => {
  const el = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['comic_comment', id, { page }],
    queryFn: () => comicApis.getComicComments(id as string, { page }),
    staleTime: 3 * 60 * 1000,
    enabled: id !== ''
  })
  const dataComment = data?.data
  const [totalPage, setTotalPage] = useState<number>()
  const [totalComments, setTotalComments] = useState<number>()
  useEffect(() => {
    if (el.current) {
      window.scroll({
        top: el.current.offsetTop + 100,
        behavior: 'smooth'
      })
    }
  }, [page])

  useEffect(() => {
    if (dataComment) {
      setTotalPage(dataComment.total_pages)
      setTotalComments(dataComment.total_comments)
    }
  }, [dataComment, id])

  const nextPage = () => {
    if (totalPage && page < totalPage) {
      setPage((prev) => prev + 1)
    }
  }
  const PrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  return (
    <div className='w-full h-full' ref={el}>
      <div className='border'>
        <div className='flex items-center justify-between p-5'>
          <div className='flex items-center gap-3'>
            <h3 className='text-primary capitalize text-lg'>Bình luận</h3>
            {totalComments && (
              <span className='text-gray-400 capitalize text-sm'>{`(${formatCurrency(
                totalComments
              )} bình luận)`}</span>
            )}
          </div>
          <div className={classNames('flex items-center gap-2', { hidden: isError })}>
            <div className='text-gray-400 text-md'>
              <strong className='text-primary'>{page}</strong>/{totalPage}
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={PrevPage}
                className={classNames('px-[10px] py-2 rounded-md border flex justify-center', {
                  'opacity-80 cursor-default text-gray-400': page === 1,
                  'hover:border-primary hover:text-primary': page !== 1
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
                onClick={nextPage}
                className={classNames('px-[10px] py-2 rounded-md border flex justify-center', {
                  'opacity-80 cursor-default text-gray-400': totalPage === page,
                  'hover:border-primary hover:text-primary': totalPage !== page
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
      <div className='p-5 border border-t-0'>
        {isLoading && (
          <div className='h-[300px] border-b mb-5 border-dashed flex items-center justify-center gap-2'>
            <img src={imgLoading} alt='loading' />
            <span className='text-gray-400'>Loading...</span>
          </div>
        )}
        {isError && (
          <div className='h-[100px] border-b mb-5 border-dashed flex items-center justify-center gap-2'>
            <span className='text-gray-400'>Not found...</span>
          </div>
        )}
        {dataComment &&
          dataComment?.comments.length > 0 &&
          dataComment?.comments.map((item, i) => (
            <div key={i}>
              <div className='pb-5'>
                <div className='flex gap-[10px]'>
                  <div className='flex-shrink-0 h-full'>
                    <img
                      src={item.avatar}
                      alt='avatar'
                      className='w-[50px] h-[50px] object-cover rounded-full'
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null
                        currentTarget.src = avatarError
                      }}
                    />
                  </div>
                  <div className='flex-1 border-b border-dashed pb-6'>
                    <span className='mt-1 block font-semibold'>{item.username}</span>
                    <p className='mt-3 text-black/80'>{item.content}</p>
                    {item.stickers.length > 0 && <img src={item.stickers[0]} alt='sticker' />}
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
                          className='mt-4 p-5 pb-0 flex gap-[10px] bg-[#f8f8f8] rounded-[10px]'
                        >
                          <div className='flex-shrink-0 h-full'>
                            <img
                              src={itemReply.avatar}
                              alt='avatar'
                              className='w-[50px] h-[50px] object-cover rounded-full'
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = avatarError
                              }}
                            />
                          </div>
                          <div className='flex-1 pb-6'>
                            <span className='mt-1 block'>{itemReply.username}</span>
                            <p className='mt-3 text-black/80'>
                              <strong className='text-primary/60 mr-1'>
                                {itemReply.mention_user}
                              </strong>
                              {itemReply.content}
                            </p>
                            {itemReply.stickers.length > 0 && (
                              <img src={itemReply.stickers[0]} alt='sticker' />
                            )}
                            <div className='flex items-center justify-between mt-7'>
                              <span className='text-gray-500 text-sm'>{itemReply.created_at}</span>
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
              </div>
            </div>
          ))}
        <div
          className={classNames('flex items-center justify-end gap-2', {
            hidden: isError
          })}
        >
          <div className='text-gray-400 text-md'>
            <strong className='text-primary'>{page}</strong>/{totalPage}
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={PrevPage}
              className={classNames('px-[10px] py-2 rounded-md border flex justify-center', {
                'opacity-80 cursor-default text-gray-400': page === 1,
                'hover:border-primary hover:text-primary': page !== 1
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
              onClick={nextPage}
              className={classNames('px-[10px] py-2 rounded-md border flex justify-center', {
                'opacity-80 cursor-default text-gray-400': totalPage === page,
                'hover:border-primary hover:text-primary': totalPage !== page
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
