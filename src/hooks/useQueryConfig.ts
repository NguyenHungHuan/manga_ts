import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { paramOption } from '@/apis/comicApis'

export default function useQueryConfig() {
  const queryParams: paramOption = useQueryParams()
  const queryConfig: paramOption = omitBy(
    {
      type: queryParams.type,
      status: queryParams.status,
      page: queryParams.page || '1',
    },
    isUndefined
  )
  return queryConfig
}
