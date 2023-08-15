import PATH from '@/utils/path'

const useTitle = (pathname: string) => {
  switch (pathname) {
    case PATH.boy:
      return 'con trai'
    case PATH.girl:
      return 'con gái'
    case PATH.completed:
      return 'đã hoàn thành'
    case PATH.popular:
      return 'nổi bật'
    case PATH.recent:
      return 'mới cập nhật'
    default:
      return ''
  }
}

export default useTitle
