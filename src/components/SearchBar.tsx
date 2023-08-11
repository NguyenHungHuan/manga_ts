import bgSearch from '@/assets/img/search-bg.jpg'
import iconSearch from '@/assets/img/icon_search.png'
import { Button } from '.'

const SearchBar = () => {
  return (
    <div className='w-full'>
      <div
        className='bg-no-repeat bg-cover h-[100px]'
        style={{
          backgroundImage: `url('${bgSearch}')`
        }}
      >
        <div className='container h-full'>
          <form className='h-full flex items-center justify-center'>
            <div className='flex-shrink-0 bg-white py-4 pl-[18px] pr-[14px]'>
              <div
                className='bg-cover bg-no-repeat w-[18px] h-[18px]'
                style={{
                  backgroundImage: `url(${iconSearch})`
                }}
              />
            </div>
            <input
              type='text'
              placeholder='Search...'
              className='h-[50px] leading-[50px] pr-4 w-[420px] outline-none'
            />
            <Button className='text-white capitalize flex items-center justify-center bg-gradient h-[50px] w-[140px]'>
              Tìm Kiếm
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
