import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  
} from "lucide-react";

export const navLinks = [
  {
    url: "/userdashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
 
 
  {
    url: "/will",
    icon: <Shapes />,
    label: "Wills",
  },
  {
    url: "/assets",
    icon: <Tag />,
    label: "Assets",
  },
  {
    url: "/contact",
    icon: <ShoppingBag />,
    label: "Contacts",
  },
   
];
