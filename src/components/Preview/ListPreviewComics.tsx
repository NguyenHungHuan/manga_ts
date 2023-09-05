import { comics } from '@/types/data'
import { CardItem } from '..'
import { useMediaQuery } from 'react-responsive'
interface Props {
  data: comics[]
}

const ListPreviewComics = ({ data }: Props) => {
  const isBigScreen = useMediaQuery({ minWidth: 1281 })
  const isTablet = useMediaQuery({ maxWidth: 1280, minWidth: 1024 })
  const isTabletMini = useMediaQuery({ maxWidth: 1023, minWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 640 })
  const isMobileMini = useMediaQuery({ maxWidth: 639 })

  return (
    <ul className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 xl:gap-x-[3px] gap-y-5'>
      {data && (
        <>
          {isBigScreen &&
            data.slice(0, 14).map((item) => (
              <li key={item.id}>
                <CardItem data={item} />
              </li>
            ))}
          {(isTablet || isMobile) &&
            data.slice(0, 15).map((item) => (
              <li key={item.id}>
                <CardItem data={item} />
              </li>
            ))}
          {(isTabletMini || isMobileMini) &&
            data.slice(0, 16).map((item) => (
              <li key={item.id}>
                <CardItem data={item} />
              </li>
            ))}
        </>
      )}
      {!data && skeleton()}
    </ul>
  )
}
export default ListPreviewComics

const skeleton = () => {
  return (
    <>
      {Array(16)
        .fill(0)
        .map((_, i) => (
          <div key={i} className='w-full min-h-[292px] overflow-hidden animate-pulse'>
            <div className='flex items-center justify-center w-full h-[240px] xl:h-[220px] bg-gray-300 dark:bg-gray-700 flex-shrink-0'>
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
          </div>
        ))}
    </>
  )
}
