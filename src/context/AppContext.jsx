import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration  from "humanize-duration";
export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setisEducator] = useState(true)
    const [enrolledCourses, setenrolledCourses] = useState([])

    // fetch AllCourse
    const fetchAllCourses = async ()=> {
        setAllCourses(dummyCourses)
    }

    // function to calculate average rating of course 
    const calculateRating = (course) => {
        if(course.courseRatings.length === 0){
            return 0;
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    // calculate chapter time
    const calculateChapterTime = (chapter)=>{
        let time = 0;
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"] })
    }

    // function to calculate course duration
    const calculateCourseDuration = (course) =>{
        let time = 0;
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 100, {units: ["h", "m"]})
    }

    // function to calculate number of lecture
    const calculateNoOfLecture =(course)=>{
        let totalLectures = 0;
        course.courseContent.forEach(chapter =>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;
    }

    // fetch user enrolled courses
    const fetchUserEnrolledCourses =async ()=>{
        setenrolledCourses(dummyCourses)
    }


    useEffect(()=>{
        fetchAllCourses()
        fetchUserEnrolledCourses()
    },[])
    const value = {
          currency, allCourses,navigate,calculateRating,isEducator,setisEducator,
          calculateChapterTime, calculateCourseDuration, calculateNoOfLecture, enrolledCourses, fetchUserEnrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}