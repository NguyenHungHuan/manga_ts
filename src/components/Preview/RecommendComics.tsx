import { dataRecommend } from '@/types/data'
import { CardItem } from '..'
interface Props {
  data: dataRecommend[]
}

const RecommendComics = ({ data }: Props) => {
  return (
    <div className='mt-5'>
      <ul className='grid grid-cols-7 gap-x-[2.5px] gap-y-5'>
        {data &&
          data.slice(0, 14).map((item) => (
            <li key={item.id}>
              <CardItem
                chapterName={item.lastest_chapter.name}
                chapterId={item.lastest_chapter.id}
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
  )
}
export default RecommendComics
