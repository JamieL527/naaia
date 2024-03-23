"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Breadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks
}) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter(path => path)

  if (paths === "/") { 
    return null; } else {
  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses
          const itemLink = capitalizeLinks
            ? link.replace(/-/g, " ")
            : link
          return (
            <React.Fragment key={index}> 
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}
}

export default Breadcrumb;