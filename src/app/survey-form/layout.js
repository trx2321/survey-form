import { Geist, Geist_Mono } from 'next/font/google';
import './survey.css';
import logo from '../assets/logo.png';
import logoText from '../assets/logo-text.png';

export default function Layout({ children }) {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      {/* tạo một header cao 50px với logo ở giữa */}
      <div
        className='flex items-center justify-center h-16 text-white'
        style={{
          backgroundColor: '#FBFBFB',
        }}
      >
        <img src={logo.src} alt='logo' className='h-12 mr-2' />
        <img src={logoText.src} alt='logo' className='h-8' />
      </div>
      {children}
      {/* tạo một footer */}
      <footer
        className='flex flex-col items-center justify-center py-2 text-#ccc'
        style={{
          backgroundColor: '#FBFBFB',
        }}
      >
        <div className='flex space-x-4 text-sm'>
          <a href='#' className='text-gray-500 hover:text-gray-900'>
            Điều khoản chung
          </a>
          <a href='#' className='text-gray-500 hover:text-gray-900'>
            Chính sách bảo mật
          </a>
        </div>
        <div className='text-gray-500 text-xs justify-center'>
          <p className='text-center pt-2'>
            Được cấp phép và giám sát bởi Cơ quan dịch vụ tài chính, Ngân hàng Indonesia và là bên tham gia bảo lãnh LPS
          </p>
          <p className='text-center pt-2'>Bản quyền © 2025 bank bjb</p>
        </div>
      </footer>
    </div>
  );
}
