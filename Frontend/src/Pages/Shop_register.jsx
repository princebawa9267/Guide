import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Typewriter from '../Components/typewriter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import shop from '/src/assets/shop3.png';
import axios from 'axios';
import { useAppSelector } from '../state/store';
import { collection, getDocs } from 'firebase/firestore';//importing firebase methods to read data of db
import { db } from '../../src/register.js';//importing database from the regiter page where the firebase is registered
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Usermap_form from '../Components/Usermap_form';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { doc, getDoc, query, where, onSnapshot } from "firebase/firestore";




const Shop_register = () => {

    const [markedposition, setmarkedposition] = useState(null);
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [openhours, setopenhours] = useState('');
    const navigate = useNavigate();


    const [initialValues, setInitialValues] = useState({
        name_of_restaurant: "",
        locality: "",
        city: "",
        open_hours: "",
        latitude: "",
        longitude: "",
        link: "",
        GST_number: "",
        email_address: "",
        phone_number: "",
        owner_name: "",
        images: [],
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const restaurantIdFromURL = queryParams.get("restaurant_id");

    // Getting user id
    const { auth } = useAppSelector(store => store);

    console.log("Auth state in shop register:", auth);

    console.log("auth.user.id is:", auth?.user?.uid);

    useEffect(() => {
        // ⛔️ Prevent running if there's no ID (i.e. user is adding a new shop)
        if (!restaurantIdFromURL) {
            console.log("New shop registration, no restaurant ID.");
            return;
        }

        const fetchRestaurantData = async () => {
            try {
                const restaurantRef = doc(db, "restaurants", restaurantIdFromURL);
                const restaurantSnap = await getDoc(restaurantRef);

                if (restaurantSnap.exists()) {
                    const restaurantData = restaurantSnap.data();

                    const ownerRef = doc(db, "owners", auth?.user?.uid);
                    const ownerSnap = await getDoc(ownerRef);
                    const ownerData = ownerSnap.exists() ? ownerSnap.data() : {};

                    setInitialValues({
                        name_of_restaurant: restaurantData.name || "",
                        locality: restaurantData.locality || "",
                        city: restaurantData.city || "",
                        open_hours: restaurantData.open_hours || "",
                        latitude: restaurantData.latitude || "",
                        longitude: restaurantData.longitude || "",
                        link: restaurantData.link || "",
                        GST_number: ownerData.GST_number || "",
                        email_address: ownerData.email_address || "",
                        phone_number: ownerData.phone_number || "",
                        owner_name: ownerData.owner_name || "",
                        images: ownerData.images || [],
                    });

                    // Set map position
                    if (restaurantData.latitude && restaurantData.longitude) {
                        setmarkedposition({
                            lat: Number(restaurantData.latitude),
                            lng: Number(restaurantData.longitude),
                        });
                    }

                    // Handle open hours time split
                    if (typeof restaurantData.open_hours === 'string' && restaurantData.open_hours.includes(" - ")) {
                        const [open, close] = restaurantData.open_hours.split(" - ");
                        setOpeningTime(open?.trim() || "");
                        setClosingTime(close?.trim() || "");
                        setopenhours(restaurantData.open_hours);
                    }
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };

        fetchRestaurantData();
    }, [restaurantIdFromURL]);



    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Submitting shop values...");
        toast.loading("Submitting your shop details, please wait...", { toastId: "submittoast" });

        const lowercaseValues = {
            ...values,
            name_of_restaurant: values.name_of_restaurant.trim().toLowerCase(),
            owner_name: values.owner_name.trim().toLowerCase(),
            locality: values.locality.trim().toLowerCase(),
            city: values.city.trim().toLowerCase(),
        };

        const payload = {
            name_of_restaurant: lowercaseValues.name_of_restaurant,
            owner_name: lowercaseValues.owner_name,
            phone_number: lowercaseValues.phone_number,
            email_address: lowercaseValues.email_address,
            link: lowercaseValues.link,
            locality: lowercaseValues.locality,
            city: lowercaseValues.city,
            GST_number: lowercaseValues.GST_number,
            longitude: lowercaseValues.longitude,
            latitude: lowercaseValues.latitude,
            open_hours: lowercaseValues.open_hours,
            user_id: auth?.user?.uid || "",
            images: lowercaseValues.images || [], // ✅ fallback for safety
            verification_status: false,
        };

        try {
            const response = await axios.post('http://localhost:3000/restaurants/addedbyowner', payload); // ✅ FIXED: double slashes removed
            console.log("Shop register response:", response.data);

            toast.update("submittoast", {
                render: "Shop registered successfully! 🎉",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            resetForm();
            setmarkedposition(null); // ✅ okay if you're using a location picker
            setOpeningTime('');
            navigate("/listyourshop/dashbord");

        } catch (error) {
            console.error("Error submitting shop details:", error);
            toast.update("submittoast", {
                render: "Failed to register shop. Please try again.",
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
            <div className="">

                {/* div contain design */}
                <div className='relative h-[60vh] flex flex-col gap-20'>

                    {/* design  */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        viewBox="0 0 800 400"
                    >
                        <path d="M 0 350 C 200 400 500 400 800 300    L 800 0 L 0 0 Z" fill="#8a3ab9" />
                    </svg>

                    {/* Content inside SVG area */}
                    <div className="relative z-10 p-2 text-center">
                        <Navbar />
                    </div>

                    {/* Animated line/message */}
                    <div className="p-4 text-center relative mx-auto">
                        <Typewriter line="Add your flavor to the journey — register your shop, gather reviews, and build real trust." />
                    </div>

                </div>
            </div>


            {/* saab kuj main vich payo */}
            <div className='main flex flex-col items-center justify-center'>
                {/* Intro Section */}
                <div className="w-[90vw] max-w-7xl  appear-apply h-[60vh] bg-gradient from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito mx-auto mt-10 mb-15 flex flex-col md:flex-row justify-center items-center overflow-hidden p-6">
                    <div className="w-full md:w-1/2 h-full flex justify-center md:justify-center">
                        <img className="h-[90%] object-contain transform hover:scale-105 transition duration-500" src={shop} alt="shop" />
                    </div>
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-around px-4 py-4 space-y-3">
                        <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
                        <p className="text-sm md:text-base text-[#29264A] leading-relaxed font-medium overflow-y-auto">
                            <span className="text-xl font-bold text-[#8a3ab9]">Hey vendor!</span> Want to grow with real feedback? List your shop, share your service, and we’ll help you collect genuine reviews through your personalized QR code.

                        </p>
                        <div className="h-1 w-full bg-[#8a3ab9] rounded-full"></div>
                    </div>
                </div>

                <div className='flex justify-center items-center nunito appear-apply text-white bg-[#8a3ab9] w-[45vw] mt-15  rounded-t-3xl '>Here add your shop</div>


                {/* Form Section */}
                <Formik
                    enableReinitialize
                    initialValues={initialValues}

                    validate={values => {
                        const errors = {};
                        if (!values.name_of_restaurant) {
                            errors.name_of_restaurant = 'Required';
                        }
                        if (!values.locality) {
                            errors.locality = 'Required';
                        }
                        if (!values.city) {
                            errors.city = 'Required';
                        }
                        if (!values.owner_name) {
                            errors.owner_name = 'Required';
                        }
                        if (!values.phone_number) {
                            errors.phone_number = 'Required';
                        } else if (!/^\d{10}$/.test(values.phone_number)) {
                            errors.phone_number = 'Invalid phone number';
                        }
                        if (!values.open_hours) {
                            errors.open_hours = 'Required';
                        }
                        if (!values.latitude || !values.longitude) {
                            errors.latitude = 'Please select a location on the map';
                            errors.longitude = 'Please select a location on the map';
                        }

                        return errors;
                    }}

                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className='w-[90vw] max-w-7xl mb-10 appear-apply  bg-gradient-to-br from-white via-[#f9f5ff] to-[#e5dcf8] rounded-3xl shadow-2xl nunito grid grid-cols-3 grid-auto-rows  gap-6 text-xl p-8'>

                            {/* reasturent_name */}
                            <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">Restaurant Name :</span>
                                <Field type="text" name="name_of_restaurant" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter restaurent name" />
                                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                                <ErrorMessage name="name_of_restaurant" component="div" className="text-red-500 text-sm" />
                            </label>


                            {/* Location */}
                            <label className='w-full m-3 p-4 row-span-2 rounded-3xl cursor-pointer col-span-2 text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                                <div className='w-full flex gap-5'>
                                    <div className='w-1/2'>
                                        <span className="text-[#8a3ab9] font-semibold tracking-wide">Location :</span>
                                        <Field type="text" name="locality" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter Location" />
                                        <div className='h-1 mt-2 rounded-full w-full bg-[#8a3ab9]'></div>
                                        <ErrorMessage name="location" component="div" className="text-red-500 text-sm" /></div>
                                    <div className='w-1/2'>
                                        <span className="text-[#8a3ab9] font-semibold tracking-wide">City :</span>
                                        <Field type="text" name="city" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter City name" />
                                        <div className='h-1 mt-2 rounded-full w-full bg-[#8a3ab9]'></div>
                                        <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                                    </div>
                                </div>

                                {/* maps */}
                                <div className='w-full h-[40vh] flex justify-center items-center mt-5'>
                                    {Array.isArray(markedposition) && markedposition.length === 2 &&
                                        typeof markedposition[0] === 'number' &&
                                        typeof markedposition[1] === 'number' ? (
                                        <p className="text-sm text-gray-600 text-center">
                                            📍 Selected Location: {markedposition[0].toFixed(4)}, {markedposition[1].toFixed(4)}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-400 text-center">
                                            📍 No location selected yet.
                                        </p>
                                    )}
                                    <Field
                                        type="hidden"
                                        name="latitude"
                                        value={
                                            Array.isArray(markedposition) && markedposition[0] !== undefined
                                                ? markedposition[0]
                                                : ''
                                        }
                                    />
                                    <Field
                                        type="hidden"
                                        name="longitude"
                                        value={
                                            Array.isArray(markedposition) && markedposition[1] !== undefined
                                                ? markedposition[1]
                                                : ''
                                        }
                                    />
                                    <Usermap_form
                                        onLocationSelect={setmarkedposition}
                                        setFieldValue={setFieldValue}
                                    />
                                </div>
                            </label>

                            {/* owner_name */}
                            <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">Owner Name :</span>
                                <Field type="text" name="owner_name" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter owner name" />
                                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                                <ErrorMessage name="owner_name" component="div" className="text-red-500 text-sm" />
                            </label>

                            {/* phone NUMBER */}
                            <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">Phone Number :</span>
                                <Field type="tel" name="phone_number" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter your phone number" />
                                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                                <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm" />
                            </label>


                            {/* GST NUMBER */}
                            <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">GST Number :</span>
                                <Field type="text" name="GST_number" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter GST number" />
                                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                            </label>

                            {/* email */}
                            <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">Enter Email :</span>
                                <Field type="email" name="email_address" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter valid eamil id" />
                                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                            </label>

                            {/* link */}
                            <label className="flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">Link :</span>
                                <Field type="url" name="link" className="w-full border-none text-[#29264A] focus:ring-[#8a3ab9] bg-transparent text-lg px-2 placeholder-gray-400 focus:outline-none" placeholder="Enter your any web link" />
                                <div className='h-1 rounded-full w-full bg-[#8a3ab9]'></div>
                            </label>


                            {/* Images */}
                            <label className='w-full m-3 p-4 cursor-pointer rounded-3xl col-span-2 text-xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300'>
                                <span className="text-[#8a3ab9] font-semibold tracking-wide">Images :</span>

                                <Field name="images">
                                    {({ form }) => {
                                        const images = form.values.images || [];

                                        const onDrop = async (acceptedFiles) => {
                                            if (images.length + acceptedFiles.length > 3) {
                                                alert("You can upload a maximum of 3 images.");
                                                return;
                                            }

                                            for (const file of acceptedFiles) {
                                                const data = new FormData();
                                                data.append("file", file);
                                                data.append("upload_preset", "guide images");

                                                const res = await fetch("https://api.cloudinary.com/v1_1/dbvy9i1sq/image/upload", {
                                                    method: "POST",
                                                    body: data,
                                                });

                                                const cloudinaryData = await res.json();
                                                const newImages = [...form.values.images, cloudinaryData.secure_url];
                                                form.setFieldValue("images", newImages);
                                            }
                                        };

                                        const { getRootProps, getInputProps, isDragActive } = useDropzone({
                                            onDrop,
                                            accept: {
                                                'image/*': [],
                                            },
                                            multiple: true,
                                            maxFiles: 3 - images.length,
                                        });

                                        return (
                                            <div className="flex flex-col gap-4">
                                                {/* Dropzone area */}
                                                <div
                                                    {...getRootProps()}
                                                    className={`w-full p-6 border-2 border-dashed rounded-lg cursor-pointer text-center ${isDragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-400'
                                                        }`}
                                                >
                                                    <input {...getInputProps()} />
                                                    {isDragActive ? (
                                                        <p className="text-purple-600">Drop the files here ...</p>
                                                    ) : (
                                                        <p className="text-gray-600">
                                                            Drag and drop images here, or click to select files (max 3)
                                                        </p>
                                                    )}
                                                </div>

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

                                                <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />

                                                <button
                                                    type="button"
                                                    onClick={() => form.setFieldValue("images", [])}
                                                    className="text-sm text-red-500 hover:underline"
                                                >
                                                    Remove all images
                                                </button>
                                            </div>
                                        );
                                    }}
                                </Field>


                            </label>


                            {/* open hours */}
                            <label className='flex flex-col justify-center gap-2 w-full m-3 p-4 h-min-[25vh] cursor-pointer rounded-3xl text-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300'>
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
                                            setFieldValue('open_hours', combined);
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
    )
}

export default Shop_register
