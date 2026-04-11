import Link from "next/link";
import { FaTruck, FaGift, FaPhoneAlt, FaEnvelope, FaUser, FaUserPlus } from "react-icons/fa";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#f5f5f5] text-gray-600 text-xl border-b">
      <div className="flex justify-between items-center px-6 py-2">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaTruck className="text-green-600 text-sm" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-2">
            <FaGift className="text-green-600 text-sm" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500 text-xs" />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500 text-xs" />
            <span>support@freshcart.com</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="flex items-center gap-1 hover:text-black transition"
            >
              <FaUser className="text-xs" />
              <span>Sign In</span>
            </Link>

            <Link
              href="/signup"
              className="flex items-center gap-1 hover:text-black transition"
            >
              <FaUserPlus className="text-xs" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}