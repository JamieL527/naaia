"use client"
import React, { useState } from 'react'
import Link from 'next/link';

function Dropdown(props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = item?.children? item.children : [];
  const hoverLink = 'inline-flex items-center px-5 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none xl:px-10';
  const activeHoverLink = 'inline-flex items-center px-5 py-2 text-lg font-normal text-gray-800 no-underline rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none xl:px-10';

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? 'flex' : 'hidden';
  
  // calculate the number of dropdown menu items, make a dynamic height of dropdown menu instead of fixed height for possible future more items coming
  const numSubmenus = menuItems.length;
  const submenuHeight = menuItems[0]?.offsetHeight || 0;
  // Height equals the number of submenus times each submenu's height
  const menuHeight = numSubmenus * submenuHeight;
  

  // If mouse hover on button then open dropdown, changes the arrow to up-arrow, when dropdown closed changes arrow back to original state
  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button 
        className={isOpen ? activeHoverLink : hoverLink} 
        onMouseEnter={() => setIsOpen(true)}
      >
        {item.title} <span className="ml-1" style={{ color: 'black' }}>{isOpen ? '\u25B2' : '\u25BC'}</span>
      </button>
      <div
        className={`absolute top-18 w-[177px] h-[${menuHeight}px] inline-block text-left flex-col py-4 bg-indigo-100 rounded-md gap-1.25 ${transClass}`}
        onMouseEnter={() => setIsOpen(true)}
      >
        {menuItems.map((menuItem) => (
          <Link
            key={menuItem.route}
            className="hover:bg-white hover:text-zinc-500 px-10 py-1 text-left"
            href={menuItem?.route || ''}
            onClick={toggle}
          >
            {menuItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}


export default Dropdown;