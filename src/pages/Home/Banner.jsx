import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../api";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await apiService.getBanner();
        setBanner(res.data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="flex justify-center items-center h-80 bg-gray-900">
        {/* <p className="text-red-400 text-lg">Banner not available</p> */}
         <img src="Hero_Banner_w__Logo_1.png" alt="" width={"100%"} />
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {banner.title}
            <span className="block mt-3 text-blue-400 text-xl md:text-2xl font-semibold">
              {banner.subtitle}
            </span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {banner.description}
          </p>

          <p className="text-gray-400 text-base">
            At{" "}
            <span className="text-white font-semibold">
              {banner.company_name}
            </span>
            , we empower businesses with innovation and technology.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/what-we-do"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md transition"
            >
              Our Services →
            </Link>

            <Link
              to="/contact-us"
              className="border border-gray-500 hover:border-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg text-sm font-medium transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl"></div>
          {/* <img
            src={
              banner.image ||
              "https://placehold.co/800x600/1f2937/ffffff?text=Banner+Image"
            }
            alt={banner.title || "Banner"}
            className="relative w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl border border-gray-700"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x600/1f2937/ffffff?text=Banner+Image";
            }}
          /> */}
          <img src="Hero_Banner_w__Logo_1.png" className="relative w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl border border-gray-700" alt="" width={"100%"} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
