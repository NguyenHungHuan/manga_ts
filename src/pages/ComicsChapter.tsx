import comicApis from '@/apis/comicApis'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const ComicsChapter = () => {
  const { id, idChapter } = useParams()
  const { data } = useQuery({
    queryKey: ['comic_chapter', id, idChapter],
    queryFn: () => comicApis.getComicChapter(id as string, idChapter as string),
    staleTime: 3 * 60 * 1000,
    enabled: id !== '' && idChapter !== ''
  })
  const dataChapter = data?.data

  return (
    <div className="">
      {dataChapter && (
        <div className="">
          {JSON.stringify(dataChapter)}
        </div>
      )}
    </div>
  )
}

export default ComicsChapter
