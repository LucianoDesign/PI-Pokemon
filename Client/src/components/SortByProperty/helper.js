import sword from "../../assets/sword.svg";
import sword2 from "../../assets/sword2.svg";
import shield from "../../assets/shield.svg";
import shield2 from "../../assets/shield2.svg";
import thunder from "../../assets/thunder.svg";
import thunder2 from "../../assets/thunder2.svg";
import heart from "../../assets/heart.svg";
import heart2 from "../../assets/heart2.svg";

export const stats = [
    {
      title: "Attack",
      key: "attack",
      sortOrder: "asc_attack",
      icon: sword,
      iconActive: sword2,
      active: false,
    },
    {
      title: "Defense",
      key: "defense",
      sortOrder: "asc_defense",
      icon: shield,
      iconActive: shield2,
      active: false,
    },
    {
      title: "Speed",
      key: "speed",
      sortOrder: "asc_speed",
      icon: thunder,
      iconActive: thunder2,
      active: false,
    },
    {
      title: "HP",
      key: "hp",
      sortOrder: "asc_hp",
      icon: heart,
      iconActive: heart2,
      active: false,
    },
    
  ]

  