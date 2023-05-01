import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {getAllCategories} from '../category-list/core/_requests'
import {getAllCourses} from '../course-list/core/_requests'
const CommonDataContext = createContext<any>({
  allCourses: [],
  allCategories: [],
})

const CommonDataProvider: FC = ({children}) => {
  const [allCourses, setCourses] = useState<Array<any>>()
  const [allCategories, setCategories] = useState<Array<any>>()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await getAllCourses()
      .then((data) => {
        setCourses(data)
      })
      .catch((err) => {
        console.log(err)
      })
    await getAllCategories()
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonDataContext.Provider
      value={{
        allCourses,
        allCategories,
      }}
    >
      {children}
    </CommonDataContext.Provider>
  )
}

const useCommonData = () => useContext(CommonDataContext)

export {CommonDataProvider, useCommonData}
