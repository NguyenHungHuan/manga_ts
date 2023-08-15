import comicApis, { typeUrlComics } from '@/apis/comicApis'
import { CardItem, MiniPagination } from '@/components'
import Pagination from '@/components/Pagination'
import useQueryParams from '@/hooks/useQueryParams'
import useScrollTop from '@/hooks/useScrollTop'
import useTitle from '@/hooks/useTitle'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

const ComicsList = () => {
  const { pathname } = useLocation()
  const queryParams = useQueryParams()
  const page = queryParams.page || '1'
  const [totalPage, setTotalPage] = useState<number>()
  const title = useTitle(pathname)
  useScrollTop([pathname, page])

  const { data } = useQuery({
    queryKey: [pathname, { page: page }],
    queryFn: () => comicApis.getComicsByUrl(pathname as typeUrlComics, { page: page }),
    staleTime: 3 * 60 * 1000
  })
  const dataComics = data?.data

  useEffect(() => {
    if (dataComics) {
      setTotalPage(dataComics.total_pages as number)
    }
  }, [pathname, dataComics])

  return (
    <div className='container'>
      {data?.data.status === 404 ? (
        <div>not found</div>
      ) : (
        <>
          <div className='mt-8 flex items-center justify-between'>
            <h2 className='capitalize font-semibold text-black text-2xl'>
              <strong className='text-primary'>{title}</strong> - trang {page}
            </h2>
            {totalPage && <MiniPagination page={Number(page)} totalPage={totalPage} />}
          </div>
          <div className='mt-6 min-h-[600px]'>
            <ul className='grid grid-cols-7 gap-y-5 gap-x-1'>
              {dataComics &&
                dataComics.comics.map((item) => (
                  <li key={item.id}>
                    <CardItem
                      chapter={item.last_chapter.name}
                      description={item.short_description}
                      id={item.id}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      updated_at={item.updated_at}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className='mt-6'>
            {totalPage && <Pagination page={Number(page)} totalPage={totalPage} />}
          </div>
        </>
      )}
    </div>
  )
}

export default ComicsList
