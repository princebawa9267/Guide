import React, { useState, useEffect, use } from 'react'
import { Button, Divider, ListItemIcon, ListItemText } from "@mui/material";
import Navbar from '../../Components/Navbar';
import Typewriter from '../../Components/typewriter';
import boyimg from '../../assets/boy-img.png'
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Form_length from '../../Components/form_length';
import { useAppSelector } from '../../state/store';
import Post from './Post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { collection, getDocs, query, onSnapshot, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../../../src/register.js';
import { HashLoader } from 'react-spinners';
import { FaUser } from "react-icons/fa";
import Footer from '../../Components/Footer';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const RadditSystem = () => {


  const [showcomments, setshowcomments] = useState({});
  const [suggestion, setsuggestion] = useState([]);       // array for suggestions
  const [tags, settags] = useState('');                  // input text
  const [alltags, setalltags] = useState([]);            // all tags from Firestore

  // State to manage user reviews
  const { auth } = useAppSelector(store => store);
  const user_id = auth?.user?.uid;

  // State to manage the modal for posting stories
  const [isopen, setisopen] = useState(false);

  // State to manage posts
  const [posts, setposts] = useState([]);

  // State to manage loading state
  const [loading, setLoading] = useState(true);



  //fetching all tages
  useEffect(() => {
    const fetchtags = async () => {
      const snapshot = await getDocs(collection(db, 'questions'));
      const suggestionset = new Set();

      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data.tags);

        if (data.tags && Array.isArray(data.tags)) {
          data.tags
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.startsWith('#') && tag.length > 1)
            .forEach(tag => suggestionset.add(tag));
        }
      });

      setalltags([...suggestionset]);
    };

    fetchtags();
  }, []);





  const handletaginput = (e) => {
    const value = e.target.value;
    settags(value);

    const trimmedValue = value.trim().toLowerCase();

    if (trimmedValue === '') {
      setsuggestion([]);
      return;
    }

    // Optional: make match case-insensitive and partial
    const filtered = alltags.filter(tag =>
      tag.toLowerCase().includes(trimmedValue)
    );

    // Optional: sort alphabetically or by relevance
    const sortedSuggestions = filtered
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 5);

    setsuggestion(sortedSuggestions);
  };


  //function the choose the clicked tag from the suggestion
  const handleSuggestionClick = (tag) => {
    settags(tag);
    setsuggestion([]);
  };


  //function to handle the search when we click the saerch button
  const handleSearch = async () => {
    try {
      const searchTags = tags
        .split(" ")
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.startsWith("#") && tag.length > 1);

      const snapshot = await getDocs(collection(db, "questions"));

      const matchedPosts = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.tags && Array.isArray(data.tags)) {
          const hasMatch = data.tags.some(tag => searchTags.includes(tag));
          if (hasMatch) {
            matchedPosts.push({ id: doc.id, ...data });
          }
        }
      });
      setposts(matchedPosts);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };


  //normally fetching posts
  useEffect(() => {
    const q = query(
      collection(db, "questions"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setposts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error in real-time fetching:", error);
      setLoading(false);
    });

    return unsubscribe;

  }, [])


  //fetching post by clicking on the ALL button
  const handleall = () => {

    const q = query(
      collection(db, "questions"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setposts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error in real-time fetching:", error);
      setLoading(false);
    });

    return unsubscribe;
  }


  //fetching post by clicking on the new button
  //using firebase SnapShot to fetch the data at realtime
  const handlenew = () => {
    const q = query(
      collection(db, "questions"),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setposts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error in real-time fetching:", error);
      setLoading(false);
    });

    return unsubscribe;
  };


  //fetching posts on clicking the popular button
  const handlepopular = () => {
    const q = query(
      collection(db, "questions"),
      orderBy("upvotes", "desc") // 🔥 sorts by upvotes descending
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setposts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error in real-time fetching:", error);
      setLoading(false);
    });

    return unsubscribe;
  };



  // Function to handle posting stories
  const handlepost = async (values, { setSubmitting, resetForm }) => {
    toast.loading("Posting your story...", { toastId: "post" });

    const lowercasevalues = {
      ...values,
      heading: values.heading.toLowerCase(),
      text: values.text.toLowerCase(),
      tags: values.tags.toLowerCase()
    }

    const payload = {
      user_id: user_id,
      photoURL: auth?.user?.photoURL,
      userName: auth?.user?.displayName,
      headline: lowercasevalues.heading,
      description: lowercasevalues.text,
      tags: lowercasevalues.tags
        .split(' ') // split by space, not comma
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.startsWith('#') && tag.length > 1),
      // image_url: lowercasevalues.images ? URL.createObjectURL(lowercasevalues.images) : null, // Convert file to URL
      upvotes: 0,
      reported: false,
      comments: []
    };

    try {
      const response = await axios.post("http://localhost:3000/questions/", payload);
      toast.update("post", {
        render: "Your story has been posted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
      resetForm();
    } catch (err) {
      console.error("Error posting question:", err);
      toast.update("post", {
        render: "Failed to post your story. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
    } finally {
      setSubmitting(false);
      setisopen(false);
    }


  }


  return (
    <div className='flex flex-col space-y-4  relative bg-gray-100 overflow-hidden'>
      {/* Header */}
      <div className="relative h-[60vh] flex flex-col gap-20">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 400">
          <path d="M 0 350 C 200 400 500 400 800 300 L 800 0 L 0 0 Z" fill="#8a3ab9" />
        </svg>
        <div className="relative z-10 p-2 text-center">
          <Navbar />
        </div>
        <div className="p-4 text-center relative mx-auto">
          <Typewriter line="A traveler's hub — share your stories, ask questions, and connect with a world of explorers." />
        </div>
      </div>

      {/* put every thing in the main */}
      <div className='main flex w-screen'>
        <div className=' flex flex-col w-[70vw] h-[100vh] overflow-y-scroll custom-scrollbar items-center'>      {/* Button Divs */}
          <div className='flex gap-5 m-10 '>
            <Button className='!text-black' onClick={handleall} variant='outlined'>All</Button>
            <Button className='!text-black' onClick={handlepopular} variant='outlined'>✨Popular</Button>
            <Button className='!text-black' onClick={handlenew} variant='outlined'>📋New</Button>
          </div>

          {/* Post Containers */}
          <div className='flex gap-4 flex-col '>
            {/* Post Div */}
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <HashLoader size={120} color="#8a3ab9" loading={loading} />
              </div>
            ) : (
              posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <Post
                    key={index}
                    post_id={post.id}
                    heading={post.headline}
                    description={post.description}
                    created_at={post.created_at}
                    likeCount={post.upvotes}
                    img={post.photoURL}
                    name={post.userName}
                  />
                ))
              ) : (
                <div className="text-center text-red-500 font-semibold text-lg mt-4">
                  No posts available
                </div>
              )
            )}


          </div>
        </div>
        <div className=' w-[30vw] border-t-2 mt-2 border-l-2 gap-5  flex flex-col border-gray-400'>

          {/* searrch bar */}
          <form
            className="w-full relative flex mt-5 flex-col items-center"
          >
            <input
              type="text"
              value={tags}
              onChange={handletaginput}
              placeholder="Search tags... eg: #himachal"
              className="w-[80%] mt-5 shadow-xl p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-[#e3d3fa] focus:ring-white focus:border-white"
              autoComplete="off"
            />

            {suggestion.length > 0 && (
              <ul
                className="absolute top-full left-[10%] w-[80%] bg-white z-20 mt-2 rounded-md shadow-md border border-gray-200"
              >
                {suggestion.map((tag, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(tag)}
                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </form>


          <button type='submit' onClick={handleSearch} className='text-white w-[30%] mx-auto justify-center cursor-pointer shadow-xl bg-[#8a3ab9] px-2 py-2 rounded-3xl transform hover:scale-105 flex items-center gap-2'>Search <CiSearch /></button>

          <div className='w-[80%] h-0.5 bg-gray-400 mx-auto my-5 rounded-full'></div>

          {/* for post */}
          <div className='w-full flex items-center gap-2'>
            {auth?.user?.photoURL ? (<img src={auth.user.photoURL} alt='user-image' className="w-10 h-10 rounded-full ml-9" />) : (<FaUser className='h-10 ml-12' />)}
            <button onClick={() => setisopen(true)} className='w-[70%] hover:bg-gray-200 p-3 border cursor-pointer border-gray-400 rounded-3xl text-start'>Share your story...</button>
            {isopen && (
              <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
                  <button
                    onClick={() => setisopen(false)}
                    className="absolute top-4 right-4 text-2xl cursor-pointer transition hover:scale-110 text-gray-500 hover:text-red-500 px-3 py-1 "
                  >
                    <IoMdClose />
                  </button>

                  <Formik
                    initialValues={{
                      heading: "", text: "", images: [], tags: ""
                    }}

                    validate={values => {
                      const errors = {};
                      if (!values.heading) {
                        errors.heading = "Heading is required";
                      }
                      if (!values.text) {
                        errors.text = "Text is required";
                      }
                      if (!values.tags) {
                        errors.tags = "Tags are required";
                      }

                      return errors;
                    }}

                    onSubmit={handlepost}

                  >
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form className='w-full flex flex-col justify-center items-center p-5 gap-4'>
                        {/* Heading Field */}
                        <div className="w-full">
                          <label className="block text-[#8a3ab9] font-semibold mb-1">Heading :</label>
                          <Field
                            type="text"
                            name="heading"
                            placeholder="Enter your heading"
                            className="w-full border-b-2 border-[#8a3ab9] bg-transparent text-[#29264A] text-lg px-2 py-1 focus:outline-none focus:ring-0"
                          />
                          <ErrorMessage name="heading" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Story Field */}
                        <div className="w-full">
                          <label className="block text-[#8a3ab9] font-semibold mb-1">Your Story :</label>
                          <Field
                            as="textarea"
                            name="text"
                            rows={6}
                            maxLength={900}
                            placeholder="Enter your story or Ask any Question"
                            className="w-full border p-3 text-[#29264A] rounded resize-none focus:outline-none"
                          />
                          <Form_length name="text" limit={900} />
                          <ErrorMessage name="text" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Tags Field */}
                        <div className="w-full">
                          <label className="block text-[#8a3ab9] font-semibold mb-1">Hashtags :</label>
                          <Field
                            type="text"
                            name="tags"
                            placeholder="#himachal #mountains"
                            className="w-full border-b-2 border-[#8a3ab9] bg-transparent text-[#29264A] text-lg px-2 py-1 focus:outline-none"
                          />
                          <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Image Upload */}
                        <div className="w-full flex justify-between items-center mt-4">
                          <label htmlFor="imageUpload" className="bg-[#8a3ab9] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#7326a3] transition">
                            Upload Image
                          </label>
                          <input
                            id="imageUpload"
                            name="images"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              setFieldValue("images", file);
                            }}
                            className="hidden"
                          />
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#8a3ab9] cursor-pointer hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>

                    )}
                  </Formik>
                </div>
              </div>
            )}
          </div>

          <div className='w-full flex items-center justify-center mt-5'>
            <button className='px-4 py-2 text-white bg-[#8a3ab9] rounded-3xl cursor-pointer transition hover:scale-105 hover:font-bold'>Your Dashborad</button>
          </div>


   

        </div>
      </div>
      <Footer />
    </div>

  )
}

export default RadditSystem;
