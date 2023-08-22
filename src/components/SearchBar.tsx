import bgSearch from '@/assets/img/search-bg.jpg'
import iconSearch from '@/assets/img/icon_search.png'
import { Button, SuggestComics } from '.'
import { useState } from 'react'
import { useQuery } from 'react-query'
import comicApis from '@/apis/comicApis'
import PATH from '@/utils/path'
import { createSearchParams, useNavigate } from 'react-router-dom'
import imgLoading from '@/assets/img/loading.gif'

const SearchBar = () => {
  const [valueForm, setValueForm] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const { data: dataSuggest, isLoading } = useQuery({
    queryKey: ['search-suggest', { q: valueForm }],
    queryFn: () => comicApis.getSearchSuggest({ q: valueForm }),
    enabled: valueForm !== '',
    staleTime: 3 * 60 * 1000
  })
  const dataComicSuggest = dataSuggest?.data

  const handleClick = (id: string) => {
    navigate(`${PATH.comics}/${id}`)
    setValueForm('')
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (valueForm !== '') {
      navigate({
        pathname: PATH.search,
        search: createSearchParams({
          q: valueForm.trim(),
          page: '1'
        }).toString()
      })
    }
    setValueForm('')
  }

  return (
    <div className='w-full'>
      <div
        className='bg-no-repeat bg-cover h-[100px]'
        style={{
          backgroundImage: `url('${bgSearch}')`
        }}
      >
        <div className='container h-full'>
          <div className='h-full flex items-center justify-center'>
            <form className='relative flex items-center' onSubmit={(e) => handleSearch(e)}>
              <div className='flex-shrink-0 bg-white py-4 pl-[18px] pr-[14px]'>
                <div
                  className='bg-cover bg-no-repeat w-[18px] h-[18px]'
                  style={{
                    backgroundImage: `url(${iconSearch})`
                  }}
                />
              </div>
              <input
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                onChange={(e) => setValueForm(e.target.value)}
                value={valueForm}
                type='text'
                placeholder='Search...'
                className='h-[50px] leading-[50px] pr-4 w-[420px] outline-none'
              />
              <Button className='text-white capitalize flex items-center justify-center bg-gradient h-[50px] w-[140px]'>
                Tìm Kiếm
              </Button>
              <div
                className='absolute top-[50px] left-0 z-[12] border border-[#EDEDED] bg-white w-[470px] shadow-[0_2px_4px_0_rgba(0,0,0,0.10)] max-h-[280px] overflow-y-auto'
                style={{
                  filter: 'blur(0)'
                }}
              >
                {dataComicSuggest &&
                  isOpen &&
                  dataComicSuggest.map((item, i) => (
                    <div
                      key={item.id}
                      onMouseDown={() => handleClick(item.id)}
                      className='cursor-pointer'
                    >
                      <SuggestComics
                        index={i}
                        isStyleSearch={true}
                        title={item.title}
                        src={item.thumbnail}
                        idComic={item.id}
                        chapter={item.lastest_chapter}
                        genres={item.genres}
                      />
                    </div>
                  ))}
                {isLoading && isOpen && (
                  <div className='flex items-center justify-center h-[100px] gap-2'>
                    <img src={imgLoading} alt='loading icon' />
                    Loading...
                  </div>
                )}
                {Array.isArray(dataComicSuggest) && !dataComicSuggest.length && isOpen && (
                  <div className='flex items-center justify-center h-[100px]'>Not found</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
