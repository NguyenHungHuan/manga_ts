import { comics } from '@/types/data'
import PATH from '@/utils/path'
import { Link, createSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { formatCurrency } from '@/utils/formatNumber'
import imgError from '@/assets/img/img-error.png'
interface Props {
  data: comics[]
}

const CompletedPreviewComics = ({ data }: Props) => {
  const [currentImg, setCurrentImg] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (data && data.length > 0) {
      setCurrentImg(data[currentIndex].thumbnail)
    }
  }, [data, currentIndex])

  return (
    <div className='mt-[15px] h-[460px]'>
      {data && (
        <div className='flex items-center h-full'>
          <div className='w-[339px] h-full'>
            <Link to={`${PATH.comics}/${data[currentIndex].id}`} title={data[currentIndex].title}>
              <p
                className='bg-cover bg-no-repeat w-full h-full bg-[center_30%]'
                style={{
                  backgroundImage: `url('${currentImg}'), url('${imgError}')`
                }}
              />
            </Link>
          </div>
          <div className='flex-1 h-full flex flex-col justify-between'>
            <div className='h-[133px] pl-[10px]'>
              <Link
                to={`${PATH.comics}/${data[currentIndex].id}`}
                title={data[currentIndex].title}
                className='hover:text-primary font-semibold text-xl line-clamp-1'
              >
                {data[currentIndex].title}
              </Link>
              <div className='flex items-center gap-5 mt-2'>
                <span className='text-sm text-gray-400'>{data[currentIndex].updated_at}</span>
                <p className='text-sm block truncate'>
                  <span className='mr-1 text-gray-400'>Cập nhật:</span>
                  <Link
                    to={`${PATH.chapters}/${data[currentIndex].id}/${data[currentIndex].last_chapter.id}`}
                    title={data[currentIndex].last_chapter.name}
                    className='text-primary'
                  >
                    {data[currentIndex].last_chapter.name}
                  </Link>
                </p>
                <span className='text-sm block text-gray-400'>
                  Lượt xem:{' '}
                  <strong className='text-black font-normal lowercase'>
                    {formatCurrency(data[currentIndex].total_views)}
                  </strong>
                </span>
              </div>
              <div className='flex gap-[6px] items-center mt-2'>
                {data[currentIndex].genres.map((genre) => {
                  return genre.id !== undefined ? (
                    <Link
                      to={{
                        pathname: PATH.genres,
                        search: createSearchParams({
                          type: genre.id,
                          page: '1'
                        }).toString()
                      }}
                      title={genre.name}
                      key={genre.id}
                    >
                      <span className='py-1 px-2 text-[13px] text-gray-400 border border-dashed border-[#d9d9d9] hover:text-primary hover:border-primary truncate'>
                        {genre.name}
                      </span>
                    </Link>
                  ) : null
                })}
              </div>
              <p className='text-base text-gray-400 line-clamp-2 mt-2 h-12'>
                {data[currentIndex].short_description}
              </p>
            </div>
            <ul className='flex'>
              {data.slice(0, 5).map((item, index) => (
                <li
                  onMouseEnter={() => setCurrentIndex(index)}
                  key={item.id}
                  className={`flex-1 mx-[-2.5px] border-[5px] relative border-primary ${
                    currentIndex === index
                      ? 'border-primary before:content-[""] before:w-0 before:h-0 before:absolute before:border-[12px] before:top-[-10%] before:left-1/2 before:-translate-x-1/2 before:border-l-transparent before:border-r-transparent before:border-t-transparent before:border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <figure className='w-[167px] h-[220px] overflow-hidden'>
                    <Link to={`${PATH.comics}/${item.id}`} title={item.title}>
                      <img
                        src={item.thumbnail}
                        title={item.title}
                        alt={item.title}
                        className='w-full h-full object-cover'
                        loading='lazy'
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null
                          currentTarget.src = imgError
                        }}
                      />
                    </Link>
                  </figure>
                  <div className='mt-2 flex flex-col'>
                    <Link
                      to={`${PATH.comics}/${item.id}`}
                      title={item.title}
                      className='hover:text-primary font-semibold text-base leading-4 line-clamp-1'
                    >
                      {item.title}
                    </Link>
                    <span className='text-sm text-gray-400 mt-2'>{item.updated_at}</span>
                    <p className='inline-block text-sm truncate'>
                      <span className='mr-1'>Cập nhật:</span>
                      <Link
                        to={`${PATH.chapters}/${item.id}/${item.last_chapter.id}`}
                        title={item.last_chapter.name}
                        className='text-primary whitespace-nowrap'
                      >
                        {item.last_chapter.name}
                      </Link>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {!data && skeleton()}
    </div>
  )
}
export default CompletedPreviewComics

const skeleton = () => {
  return (
    <div className='flex items-center h-full animate-pulse'>
      <div className='flex items-center justify-center w-[339px] h-full bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
        <svg
          className='w-16 h-16 text-gray-200 dark:text-gray-600'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
      </div>
      <div className='flex-1 h-full flex flex-col justify-between pl-[10px]'>
        <div className='flex-shrink-0'>
          <div className='h-5 bg-gray-200 rounded-md dark:bg-gray-700 w-[700px]' />
          <div className='flex items-center gap-5 pt-5'>
            <span className='h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-32' />
            <span className='h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-32' />
            <span className='h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-32' />
          </div>
          <div className='flex items-center gap-[6px] py-5'>
            <span className='h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-16' />
            <span className='h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-16' />
            <span className='h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-16' />
            <span className='h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-16' />
            <span className='h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-16' />
          </div>
          <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[700px] mb-2' />
          <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[600px]' />
        </div>
        <ul className='flex gap-3'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <li key={i} className='w-full h-[292px] overflow-hidden'>
                <div className='flex items-center justify-center w-full h-[220px] bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
                  <svg
                    className='w-16 h-16 text-gray-200 dark:text-gray-600'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                  >
                    <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                  </svg>
                </div>
                <div className='mt-2 flex flex-col'>
                  <span className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-4 mt-1' />
                  <span className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2' />
                  <span className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32' />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
