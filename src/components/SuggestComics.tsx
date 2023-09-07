import PATH from '@/utils/path'
import { Link } from 'react-router-dom'
import imgError from '../../public/img-error.webp'
interface Props {
  title: string
  src: string
  index: number
  genres: [string]
  chapter: string
  idChapter?: number
  idComic: string
  isStyleSearch?: boolean
}

const SuggestComics = ({
  index,
  src,
  title,
  genres,
  chapter,
  idChapter,
  idComic,
  isStyleSearch = false
}: Props) => {
  return (
    <div className='hover:bg-[#f6f6f6] dark:hover:bg-[rgba(255,255,255,0.1)]'>
      <div className='px-3'>
        <div
          className={`flex gap-2 py-3 ${index !== 0 && ' border-t border-dashed border-[#D9D9D9] dark:border-gray-500'}`}
        >
          <Link title={title} to={`${PATH.comics}/${idComic}`} className='flex-shrink-0'>
            <img
              src={src}
              alt={title}
              className='w-[70px] h-[90px] object-cover'
              loading='lazy'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = imgError
              }}
            />
          </Link>
          <div className={`text-sm flex flex-col ${!isStyleSearch && ' justify-between'}`}>
            <Link
              title={title}
              to={`${PATH.comics}/${idComic}`}
              className='font-semibold hover:text-primary text-black dark:text-white dark:hover:text-primary line-clamp-1'
            >
              {title}
            </Link>
            <Link
              to={`${PATH.chapters}/${idComic}/${idChapter}`}
              title={chapter}
              className='line-clamp-1 capitalize text-primary'
            >
              {chapter}
            </Link>
            <p className={`line-clamp-2 text-black dark:text-white ${!isStyleSearch && ' text-xs'}`}>
              {Array.isArray(genres) && genres.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestComics
