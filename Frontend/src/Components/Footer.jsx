import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#8a3ab9] text-white w-full py-6 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Text */}
        <div className="flex items-center space-x-3">
          <svg
            fill="#f5f5f5"
            className="h-8"
            viewBox="0 0 477.273 477.273"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M450.658,266.295c-14.725-11.251-34.852-20.991-59.874-28.994v-13.08c0-83.895-68.253-152.147-152.147-152.147 S86.489,140.327,86.489,224.222v13.08c-25.023,8.003-45.15,17.744-59.875,28.994C9.203,279.599,0,294.957,0,310.71 c0,26.677,25.834,51.057,72.743,68.647c44.438,16.664,103.353,25.841,165.894,25.841s121.456-9.177,165.894-25.841 c46.909-17.591,72.743-41.97,72.743-68.647C477.273,294.957,468.07,279.599,450.658,266.295z M238.637,88.074 c75.072,0,136.147,61.076,136.147,136.147v18.98v10.022c-12.075,6.358-55.131,25.473-136.147,25.473 c-81.048,0-124.106-19.13-136.147-25.471v-29.119C102.489,149.15,163.564,88.074,238.637,88.074z M398.912,364.376 c-42.686,16.007-99.605,24.823-160.275,24.823s-117.59-8.815-160.275-24.823C38.729,349.515,16,329.955,16,310.71 c0-20.715,26.136-41.517,70.489-56.56v56.56c0,2.675,1.337,5.173,3.563,6.656c1.848,1.232,46.434,30.173,148.585,30.173 c33.396,0,64.133-3.108,91.356-9.237c4.311-0.971,7.019-5.251,6.048-9.562c-0.97-4.31-5.249-7.019-9.562-6.047 c-26.072,5.87-55.627,8.847-87.843,8.847c-81.033,0-124.097-19.126-136.147-25.47v-34.894 c19.645,8.888,63.224,23.635,136.147,23.635s116.503-14.747,136.147-23.635v34.911c-2.449,1.301-6.167,3.128-11.195,5.201 c-4.085,1.683-6.032,6.359-4.349,10.444c1.684,4.086,6.358,6.033,10.444,4.349c11.368-4.685,16.939-8.316,17.538-8.714 c2.225-1.484,3.562-3.981,3.562-6.656v-56.56c44.353,15.044,70.489,35.845,70.489,56.56 C461.273,329.955,438.544,349.515,398.912,364.376z" />
          </svg>
          <span className="text-xl font-semibold text-white">Guide</span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300 transition">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition">
            <svg fill="none" stroke="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
