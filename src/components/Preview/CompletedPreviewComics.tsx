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
        <div className='flex items-center h-full transition-all duration-300'>
          <div className='w-[339px] h-full'>
            <Link to={`${PATH.comics}/${data[currentIndex].id}`} title={data[currentIndex].title}>
              <p
                className='bg-cover bg-no-repeat w-full h-full bg-[center_30%]'
                style={{
                  backgroundImage: `url('${currentImg}'), url('${imgError}')`
                }}
              ></p>
            </Link>
          </div>
          <div className='flex-1 h-full flex flex-col justify-between'>
            <div className='h-[133px] pl-[10px]'>
              <div className='transition-all duration-300'>
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
                  <div className='w-[167px] h-[220px] overflow-hidden'>
                    <Link to={`${PATH.comics}/${item.id}`} title={item.title}>
                      <img
                        src={item.thumbnail}
                        title={item.title}
                        alt={item.title}
                        className='w-full h-full object-cover'
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null
                          currentTarget.src = imgError
                        }}
                      />
                    </Link>
                  </div>
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
    </div>
  )
}

export default CompletedPreviewComics
