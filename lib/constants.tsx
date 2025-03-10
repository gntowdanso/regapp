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
    url: "/asset",
    icon: <Tag />,
    label: "Assets",
  },
  {
    url: "/beneficiallies",
    icon: <ShoppingBag />,
    label: "Contacts",
  },
   
];
