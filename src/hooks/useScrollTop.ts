import { useEffect } from 'react'

export default function useScrollTop(dependencyList: any = []) {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }, dependencyList)
}
