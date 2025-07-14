import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Typewriter from '../Components/typewriter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import social_media from '/src/assets/social-media.png';
import Emojis from '../Components/Emojis';
import Form_length from '../Components/form_length';
import Usermap_form from '../Components/Usermap_form';
import { useState } from 'react';
import { useAppSelector } from '../state/store';
import { collection, getDocs } from 'firebase/firestore';//importing firebase methods to read data of db
import { db } from '../../src/register.js';//importing database from the regiter page where the firebase is registered
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';

const Contribute = () => {

  const [searchParams] = useSearchParams();

const [markedPosition, setMarkedPosition] = useState(() => {
  const longitude = parseFloat(searchParams.get('longitude')) ;
  const latitude = parseFloat(searchParams.get('latitude'));

  return (longitude && latitude) ? [longitude, latitude] : null;
});
  
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [openhours, setopenhours] = useState('')


  // Getting user id
  const { auth } = useAppSelector(store => store);

  // New handleSubmit function to handle the API call
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Submitting:', values);
    toast.loading("Submitting your review...", { toastId: "submitToast" });


    const lowerCasedValues = {
      ...values,
      Name: values.Name.toLowerCase(),
      Location: values.Location.toLowerCase(),
      City: values.City.toLowerCase(),
      Popular_Dish: values.Popular_Dish.toLowerCase(),
      Your_Experience: values.Your_Experience.toLowerCase()
    };

    // Prepare the payload for the API call
    const payload = {
      name: lowerCasedValues.Name,
      locality: lowerCasedValues.Location,
      user_id: auth.user.uid,
      city:lowerCasedValues.City,
      review_text: lowerCasedValues.Your_Experience,
      price_range: lowerCasedValues.Price_Level,
      food_quality: lowerCasedValues.Food_Quality,
      cleanliness_score: lowerCasedValues.Cleanliness,
      service_score: lowerCasedValues.Service,
      location_of_restaurant: lowerCasedValues.City,
      latitude: values.latitude,
      longitude: values.longitude,
      open_hours: openhours,
      images: values.Images,
      best_dishes: [lowerCasedValues.Popular_Dish],
    };

    try {
      // Make API call to backend
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.update("submitToast", {
          render: "Submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        console.log('API Response:', result);
        resetForm();
      } else {
         toast.update("submitToast", {
        render: result.error || "Failed to submit",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      }

    } catch (error) {
       toast.update("submitToast", {
      render: "Error occurred. Please try again.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <>
      {/* Header with background */}
      <div className='relative h-[60vh] flex flex-col gap-20'>
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
        >
          <path d="M 0 350 C 200 400 500 400 800 300 L 800 0 L 0 0 Z" fill="#8a3ab9" />
        </svg>

        <div className="relative z-10 p-2 text-center">
          <Navbar />
        </div>

        <div className="p-4 text-center relative mx-auto">
          <Typewriter line="Add your story to the map — share hidden gems, trusted stays, and helpful tips for fellow travelers" />
        </div>
      </div>

      <div className='main flex flex-col items-center justify-center gap-15 mt-5'>
        {/* Intro Section */}
        <div className="w-[90vw] max-w-7xl appear-apply h-[60vh] bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-10 flex flex-col md:flex-row justify-center items-center overflow-hidden p-6">
          <div className="w-full md:w-1/2 h-full flex flex-col justify-around px-4 py-4 space-y-3">
            <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
            <p className="text-sm md:text-base text-[#29264A] leading-relaxed font-medium overflow-y-auto">
              <span className="text-xl font-bold text-[#8a3ab9]">Hey explorer!</span> Your journey doesn’t stop at memories — it begins with sharing them! Drop a pin, tell us where you’ve been, and sprinkle in the facts that matter.
              <span className="block mt-1">From cozy corners to iconic spots, your insights help fellow wanderers find their way. Let’s map the world — one real story at a time!</span>
            </p>
            <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
          </div>
          <div className="w-full md:w-1/2 h-full flex justify-center md:justify-end">
            <img className="h-[90%] object-contain transform hover:scale-105 transition duration-500" src={social_media} alt="Traveler" />
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            Name: searchParams.get('name') || '', Location: searchParams.get('location')|| "", City: searchParams.get('city')|| "", latitude: searchParams.get('latitude')|| "", longitude: searchParams.get('longitude')|| "", Popular_Dish: "", Price_Level: "",
            Food_Quality: "", Cleanliness: "", Service: "",
            Open_Hours: openhours, Images: [], Your_Experience: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.Name) errors.Name = 'Name is required';
            if (!values.Location) errors.Location = 'Location is required';
            if (!values.City) errors.City = 'City name is required';
            if (!values.Your_Experience) errors.Your_Experience = 'Your Experience is required';
            if (!values.Price_Level) errors.Price_Level = 'Price Level is required';
            if (!values.Food_Quality) errors.Food_Quality = 'Food Quality is required';
            if (!values.latitude) errors.longitude = 'longitude is required';
            if (!values.longitude) errors.latitude = 'latitude is required';
            if (!values.Cleanliness) errors.Cleanliness = 'Cleanliness is required';
            if (!values.Service) errors.Service = 'Service is required';
            if (!values.Popular_Dish) errors.Popular_Dish = 'Popular Dish is required';
            return errors;
          }}
          onSubmit={handleSubmit} // Changed from original to use handleSubmit
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="w-[90vw] max-w-7xl mb-10 bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito grid grid-cols-3 grid-rows-6 gap-6 text-xl p-8">

              {/* Name */}
              <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Name :</span>
                <Field type="text" name="Name" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter Location name" />
                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                <ErrorMessage name="Name" component="div" className="text-red-500 text-sm" />
              </label>

              {/* Location */}
              <label className='w-full m-3 p-4 row-span-2 rounded-3xl cursor-pointer col-span-2 text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                <div className='w-full flex gap-5'>
                  <div className='w-1/2'>
                    <span className="text-[#8a3ab9] font-semibold tracking-wide">Location :</span>
                    <Field type="text" name="Location" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter Location" />
                    <div className='h-1 mt-2 rounded-full w-full bg-[#8a3ab9]'></div>
                    <ErrorMessage name="Location" component="div" className="text-red-500 text-sm" /></div>
                  <div className='w-1/2'>
                    <span className="text-[#8a3ab9] font-semibold tracking-wide">City :</span>
                    <Field type="text" name="City" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter City name" />
                    <div className='h-1 mt-2 rounded-full w-full bg-[#8a3ab9]'></div>
                    <ErrorMessage name="City" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                {/* maps */}
                <div className='w-full h-[40vh] flex justify-center items-center mt-5'>
                  {markedPosition && (
                    <p className="text-sm text-gray-600 text-center">
                      📍 Selected Location: {markedPosition[0].toFixed(4)}, {markedPosition[1].toFixed(4)}
                    </p>
                  )}
                  <Field type="hidden" name="latitude" value={markedPosition?.[0] ? parseFloat(markedPosition[0].toFixed(4)) : ''} />
                  <Field type="hidden" name="longitude" value={markedPosition?.[1] ? parseFloat(markedPosition[1].toFixed(4)) : ''} />
                  <Usermap_form onLocationSelect={setMarkedPosition} setFieldValue={setFieldValue} />
                </div>
              </label>

              {/* Popular Dish */}
              <label className='flex flex-col justify-center gap-2 w-full m-3 p-4 h-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Popular Dish :</span>
                <Field type="text" name="Popular_Dish" className="w-full border-none focus:ring-[#8a3ab9] text-[#29264A] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter dish name" />
                <div className='h-1 w-full rounded-full bg-[#8a3ab9]'></div>
                <ErrorMessage name="Popular_Dish" component="div" className="text-red-500 text-sm" />
              </label>

              {/* Experience */}
              <label className='w-full m-3 p-4 rounded-3xl cursor-pointer col-span-2 row-span-2 text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Your Experience :</span>
                <Field as="textarea" rows={12} maxLength={300} name="Your_Experience" className="border p-3 text-[#29264A] mt-6 focus:ring-[#8a3ab9] rounded w-full resize-none border-none" placeholder="Enter your Experience" />
                <Form_length name="Your_Experience" limit={300} />
                <ErrorMessage name="Your_Experience" component="div" className="text-red-500 text-sm" />
              </label>

              {/* Price Level with Emoji */}
              <label className='w-full m-3 p-4 rounded-3xl cursor-pointer text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Price Level :</span>
                <div><p className='m-3 text-sm text-[#8a3ab9]'>: Enter the rating in emoji</p></div>
                <Emojis name="Price_Level" onChange={val => setFieldValue('Price_Level', val)} />
                <ErrorMessage name="Price_Level" component="div" className="text-red-500 text-sm" />
              </label>

              {/* Food Quality with Emoji */}
              <label className='w-full m-3 p-4 rounded-3xl cursor-pointer text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Food Quality :</span>
                <div><p className='m-3 text-sm text-[#8a3ab9]'>: Enter the rating in emoji</p></div>
                <Emojis name="Food_Quality" onChange={val => setFieldValue('Food_Quality', val)} />
                <ErrorMessage name="Food_Quality" component="div" className="text-red-500 text-sm" />
              </label>

              {/* Cleanliness with Emoji */}
              <label className='w-full m-3 p-4 cursor-pointer rounded-3xl text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Cleanliness :</span>
                <div><p className='m-3 text-sm text-[#8a3ab9]'>: Enter the rating in emoji</p></div>
                <Emojis name="Cleanliness" onChange={val => setFieldValue('Cleanliness', val)} />
                <ErrorMessage name="Cleanliness" component="div" className="text-red-500 text-sm" />
              </label>

              {/* Images */}
              <label className='w-full m-3 p-4 cursor-pointer rounded-3xl col-span-2 text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Images :</span>
                <Field name="Images">
                  {({ form }) => {
                    const images = form.values.Images || [];

                    const handleImageUpload = async (event) => {
                      const file = event.currentTarget.files[0];

                      if (!file || images.length >= 3) {
                        alert("You can upload a maximum of 3 images.");
                        return;
                      }

                      const data = new FormData();
                      data.append("file", file);
                      data.append("upload_preset", "guide images");

                      const res = await fetch("https://api.cloudinary.com/v1_1/dbvy9i1sq/image/upload", {
                        method: "POST",
                        body: data,
                      });

                      const cloudinaryData = await res.json();
                      const newImages = [...images, cloudinaryData.secure_url];
                      form.setFieldValue("Images", newImages);
                    };

                    return (
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className=" p-2 rounded w-full focus:outline-none"
                        />

                        {/* Display Uploaded Images */}
                        <div className="flex gap-3 flex-wrap">
                          {images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`upload-${idx}`}
                              className="h-24 w-24 object-cover rounded-lg shadow"
                            />
                          ))}
                        </div>


                        {/* Optional Remove Button */}
                        <button
                          type="button"
                          onClick={() => form.setFieldValue("Images", [])}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove all images
                        </button>
                      </div>
                    );
                  }}
                </Field>

              </label>

              {/* Service with Emoji */}
              <label className='w-full m-3 p-4 rounded-3xl text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Service :</span>
                <div><p className='m-3 text-sm text-[#8a3ab9]'>: Enter the rating in emoji</p></div>
                <Emojis name="Service" onChange={val => setFieldValue('Service', val)} />
                <ErrorMessage name="Service" component="div" className="text-red-500 text-sm" />
              </label>


              {/* Poem */}
              <div className='bg-white w-full text-center max-w-3xl min-h-[150px] tracking-tight leading-snug m-3 p-1 text-lg flex flex-col justify-center items-center gap-1 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-[25vh]  rounded-3xl '>

                <span>" Drop a tip, a tale, a place you found,</span>
                <span>Help the next explorer look around.</span>
                <span>Today it's you, tomorrow it's they,</span>
                <span>Sharing keeps the lost from losing their way! "</span>
              </div>


              {/* open hours */}
              <label className='flex flex-col justify-center gap-2 w-full m-3 p-4 h-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                <span className="text-[#8a3ab9] font-semibold tracking-wide">Open Hours :</span>
                <div className="flex items-center gap-4 space-y-4 w-full max-w-sm">
                  <div>
                    <label className="block font-semibold">Opening Time</label>
                    <TimePicker
                      onChange={(val) => {
                        setOpeningTime(val);
                      }}
                      value={openingTime}
                      disableClock={true}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Closing Time</label>
                    <TimePicker
                      onChange={(val) => {
                        setClosingTime(val);
                      }}
                      value={closingTime}
                      disableClock={true}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const combined = `${openingTime} - ${closingTime}`;
                      setopenhours(combined);
                      setFieldValue('Open_Hours', combined);
                      toast.success("open hours are set successfully!");

                    }}
                    className="px-2 py-2 cursor-pointer bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Set
                  </button>
                </div>
              </label>




              {/* Submit */}
              <div className='flex justify-center items-center col-span-3 mt-4 cursor-pointer'>
                <button type="submit" disabled={isSubmitting} className="bg-[#8a3ab9] hover:bg-[#7326a3] text-white px-6 py-3 rounded-full shadow-xl text-lg cursor-pointer transition-all duration-300">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className='mt-6'>
        <Footer />
      </div>
    </>
  );
};

export default Contribute;
