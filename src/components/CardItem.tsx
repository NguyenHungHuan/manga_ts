import PATH from '@/utils/path'
import { Link } from 'react-router-dom'
import imgError from '@/assets/img/img-error.png'
interface Props {
  thumbnail: string
  title: string
  id: string
  updated_at: string
  chapter: string
  description: string
}

const CardItem = ({ id, chapter, thumbnail, title, updated_at, description }: Props) => {
  return (
    <div className='relative'>
      <div className='w-full h-[220px] overflow-hidden group'>
        <img
          src={thumbnail}
          title={title}
          alt={title}
          className='w-full h-full object-cover'
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = imgError
          }}
        />
        <div className='absolute top-[-15px] left-[-30px] opacity-0 group-hover:opacity-100 scale-[0.73] group-hover:scale-100 transition-all duration-300 h-[299px] group-hover:h-[330px] z-[2] shadow-2xl'>
          <div className='w-[226px] min-h-[330px] bg-white'>
            <Link to={`${PATH.comics}/${id}`} title={title}>
              <p
                className='bg-cover bg-no-repeat w-[226px] h-[160px] bg-[center_30%]'
                style={{
                  backgroundImage: `url('${thumbnail}'), url('${imgError}')`
                }}
              ></p>
            </Link>
            <div className='p-[10px]'>
              <Link
                to={`${PATH.comics}/${id}`}
                title={title}
                className='hover:text-primary font-semibold text-base leading-5 block'
              >
                {title}
              </Link>
              <span className='text-sm text-gray-400 block'>{updated_at}</span>
              <p className='text-sm mt-[2px] inline-block'>
                <span className='mr-1'>Cập nhật:</span>
                <Link to={PATH.home} className='text-primary'>
                  {chapter}
                </Link>
              </p>
              <p className='text-sm text-gray-400 line-clamp-2 h-10'>{description}</p>
              <Link
                to={PATH.home}
                className='text-white text-sm bg-primary w-full h-[30px] mt-[10px] uppercase font-semibold flex items-center justify-center rounded text-center'
              >
                Đọc Ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2 flex flex-col'>
        <Link
          to={`${PATH.comics}/${id}`}
          title={title}
          className='hover:text-primary font-semibold text-base leading-4 line-clamp-1'
        >
          {title}
        </Link>
        <span className='text-sm text-gray-400 mt-2'>{updated_at}</span>
        <p className='inline-block text-sm truncate'>
          <span className='mr-1'>Cập nhật:</span>
          <Link to={PATH.home} className='text-primary whitespace-nowrap'>
            {chapter}
          </Link>
        </p>
      </div>
    </div>
  )
}
export default CardItem
