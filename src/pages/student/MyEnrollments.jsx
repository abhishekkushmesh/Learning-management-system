import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'
const MyEnrollments = () => {
   const {enrolledCourses, calculateCourseDuration, navigate} = useContext(AppContext)
   const [progressArray, setProgressArray] = useState([
    {lactureCompleted: 2, totalLectures: 4},
    {lactureCompleted: 1, totalLectures: 5},
    {lactureCompleted: 3, totalLectures: 6},
    {lactureCompleted: 4, totalLectures: 4},
    {lactureCompleted: 0, totalLectures: 3},
    {lactureCompleted: 5, totalLectures: 7},
    {lactureCompleted: 6, totalLectures: 8},
    {lactureCompleted: 2, totalLectures: 6},
    {lactureCompleted: 4, totalLectures: 10},
    {lactureCompleted: 3, totalLectures: 5},
    {lactureCompleted: 7, totalLectures: 7},
    {lactureCompleted: 1, totalLectures: 4},
    {lactureCompleted: 0, totalLectures: 2},
    {lactureCompleted: 5, totalLectures: 5},
   ])
  return (
    <>
    <div className='px-8 pt-10 md:px-36'>
      <h1 className='text-2xl font-semibold'>My Enrollments Page</h1>
      <table className='w-full mt-10 overflow-hidden border table-fixed md:table-auto'>
        <thead className='text-sm text-left text-gray-900 border-b border-gray-500/20 max-sm:hidden'>
          <tr>
            <th className='px-4 py-4 font-semibold truncate'>Courses</th>
            <th className='px-4 py-4 font-semibold truncate'>Duration</th>
            <th className='px-4 py-4 font-semibold truncate'>Completed</th>
            <th className='px-4 py-4 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {enrolledCourses.map((course, index)=>(
            <tr key={index} className='border-b border-gray-500/20'>
               <td className='flex items-center py-3 pl-2 space-x-3 md:px-4 md:pl-4'>
                <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lactureCompleted * 100) / progressArray[index].totalLectures : 
                  0 } className='bg-gray-300 rounded-full' />
                </div>
               </td>
               <td className='px-4 py-3 max-sm:hidden'>
                {calculateCourseDuration(course)}
               </td>
               <td className='px-4 py-3 max-sm:hidden'>
                {progressArray[index] && `${progressArray[index].lactureCompleted} / ${progressArray[index].totalLectures}`}
                <span>Lectures</span>
               </td>
               <td className='px-4 py-3 max-sm:text-right'>
                <button className='px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'
                onClick={()=> navigate('/player/' + course._id)}>
                  {progressArray[index] && progressArray[index].lactureCompleted / 
                  progressArray[index].totalLectures === 1 ? 'completed' : ' On Going'}
                 </button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  )
}

export default MyEnrollments
