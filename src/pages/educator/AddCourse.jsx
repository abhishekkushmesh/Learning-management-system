import React, { useRef, useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill CSS
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newChapterId, setNewChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  // Handle adding, removing, or toggling a chapter
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  // Handle adding or removing a lecture
  const handleLecture = (action, chapterId, lectureId) => {
    if (action === 'add') {
      setNewChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((lecture) => lecture.lectureId !== lectureId),
            };
          }
          return chapter;
        })
      );
    }
  };

  // Add a new lecture to a chapter
  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl) {
      alert('Please fill in all lecture details.');
      return;
    }

    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === newChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent[chapter.chapterContent.length - 1].lectureOrder + 1 : 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseDescription = quillRef.current.getSemanticHTML();
    const courseData = {
      courseTitle,
      courseDescription,
      coursePrice,
      discount,
      chapters,
      image,
    };
    console.log(courseData);
    // You would typically send this data to your backend here
    // e.g., using axios.post('/api/courses', courseData);
    alert('Form submitted! Check the console for data.');
  };

  // Initialize Quill editor
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write a detailed course description...',
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-start h-screen p-4 pt-8 pb-0 overflow-scroll md:p-8 md:pb-0">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 text-gray-500">

        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef} className="p-2 border border-gray-300 rounded"></div>
        </div>

        {/* Course Price + Discount + Thumbnail */}
        <div className="flex flex-wrap items-start justify-between gap-6">

          {/* Course Price */}
          <div className="flex flex-col gap-3">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          {/* Discount */}
          <div className='flex flex-col gap-3'>
            <p>Discount %</p>
            <input
              onChange={e => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder='0'
              min={0}
              max={100}
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          {/* Course Thumbnail */}
          <div className="flex flex-col gap-2">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
              <img
                src={assets.file_upload_icon}
                alt="Upload Icon"
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img
                  className="border rounded max-h-14"
                  src={URL.createObjectURL(image)}
                  alt="Thumbnail Preview"
                />
              )}
            </label>
          </div>
        </div>

        {/* Chapters and Lectures */}
        <div className="my-4">
          {chapters.map((chapter) => (
            <div key={chapter.chapterId} className='mb-4 bg-white border rounded-lg shadow-sm'>
              <div className='flex items-center justify-between p-4 border-b cursor-pointer' onClick={() => handleChapter('toggle', chapter.chapterId)}>
                <div className='flex items-center'>
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    alt="Toggle dropdown"
                    className={`mr-2 transition-transform ${chapter.collapsed && "-rotate-90"}`}
                  />
                  <span className='font-semibold'>{chapter.chapterOrder}. {chapter.chapterTitle}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                  <img
                    onClick={(e) => { e.stopPropagation(); handleChapter('remove', chapter.chapterId); }}
                    src={assets.cross_icon}
                    alt="Remove chapter"
                    className='w-4 cursor-pointer'
                  />
                </div>
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture) => (
                    <div key={lecture.lectureId} className="flex items-center justify-between px-4 py-2 my-2 bg-gray-100 border rounded-lg">
                      <div className="flex items-center">
                        <span className="mr-2">{lecture.lectureOrder}.</span>
                        <span>
                          {lecture.lectureTitle} - {lecture.lectureDuration} mins -
                          <a href={lecture.lectureUrl} target='_blank' rel="noopener noreferrer" className='ml-1 text-blue-500'>Link</a>
                          - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                        </span>
                      </div>
                      <img
                        src={assets.cross_icon}
                        alt="Remove lecture"
                        onClick={() => handleLecture('remove', chapter.chapterId, lecture.lectureId)}
                        className='w-4 cursor-pointer'
                      />
                    </div>
                  ))}
                  <div
                    className='inline-flex items-center p-2 mt-2 text-gray-700 bg-gray-200 rounded cursor-pointer hover:bg-gray-300'
                    onClick={() => handleLecture('add', chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className='flex items-center justify-center p-2 text-blue-800 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200'
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </div>
        </div>

        {/* Add Lecture Popup */}
        {showPopup && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='relative w-full max-w-sm p-6 text-gray-700 bg-white rounded-lg'>
              <h2 className='mb-4 text-xl font-semibold'>Add Lecture</h2>
              <div className='mb-3'>
                <p className="font-medium">Lecture Title</p>
                <input
                  type="text"
                  className='block w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500'
                  value={lectureDetails.lectureTitle}
                  onChange={e => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                  required
                />
              </div>

              <div className='mb-3'>
                <p className="font-medium">Duration (minutes)</p>
                <input
                  type="number"
                  className='block w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500'
                  value={lectureDetails.lectureDuration}
                  onChange={e => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                  required
                />
              </div>
              <div className='mb-3'>
                <p className="font-medium">Lecture URL</p>
                <input
                  type="url"
                  className='block w-full px-3 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500'
                  value={lectureDetails.lectureUrl}
                  onChange={e => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                  required
                />
              </div>
              <div className='flex items-center mb-4'>
                <input
                  type="checkbox"
                  className='mt-1 scale-125 rounded'
                  checked={lectureDetails.isPreviewFree}
                  onChange={e => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                />
                <p className="ml-2 font-medium">Is Preview free?</p>
              </div>
              <button
                type='button'
                onClick={addLecture}
                className='w-full px-4 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600'
              >
                Add
              </button>
              <img
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon}
                className='absolute w-5 cursor-pointer top-4 right-4'
                alt="Close popup"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-3 my-4 font-semibold text-white transition-colors duration-200 bg-black rounded-md hover:bg-gray-800'
        >
          ADD
        </button>

      </form>
    </div>
  );
};6619

export default AddCourse;