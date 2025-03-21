
// Menu.jsx - Modern rewrite of e.java
import React from 'react';
import { cn } from "@/lib/utils";

const Menu = ({ 
  items, 
  onSelect, 
  className = "", 
  itemClassName = "",
  activeItem = null,
  orientation = "vertical"
}) => {
  return (
    <ul className={cn(
      "menu",
      orientation === "horizontal" ? "flex" : "flex flex-col",
      className
    )}>
      {items.map(item => (
        <li 
          key={item.id || item.label} 
          className={cn(
            "cursor-pointer p-2 rounded-md transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            activeItem === (item.id || item.label) && "bg-accent text-accent-foreground",
            itemClassName
          )}
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center gap-2">
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
