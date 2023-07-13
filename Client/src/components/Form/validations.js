export const validateName = (name) => {
    if(!name) return "The pokemon must have a name.";
    if(name.length > 30) {
        return "The pokemon's name is too long."
    } else if(!/^[a-zA-Z\s]+$/.test(name)) return "The pokemon's name must contain only letters and spaces.";
    return "";
}

export const validateImage = async (url) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject("The image URL is required.");
      } else {
        const img = new Image();
        img.onload = () => resolve(""); 
        img.onerror = () => reject("Image URL must be valid."); 
        img.src = url;
      }
    });
  };

  export const validateStats = (value, stat) => {
    if (!value) return `The ${stat} must have stats.`;
    if (isNaN(value)) return `The ${stat} must be a number.`;
    
    if (stat === "hp") {
      const hpValue = Number(value);
      return (hpValue < 1 || hpValue > 200) ? `Invalid ${stat} value. It should be between 1 and 200.` : "";
    }
    
    if (stat === "attack") {
      const attackValue = Number(value);
      return (attackValue < 1 || attackValue > 170) ? `Invalid ${stat} value. It should be between 1 and 170.` : "";
    }
    
    if (stat === "defense") {
      const defenseValue = Number(value);
      return (defenseValue < 1 || defenseValue > 120) ? `Invalid ${stat} value. It should be between 1 and 120.` : "";
    }
    
    if (stat === "speed") {
      const speedValue = Number(value);
      return (speedValue < 1 || speedValue > 145) ? `Invalid ${stat} value. It should be between 1 and 145.` : "";
    }
    
    if (stat === "height") {
      const heightValue = Number(value);
      return (heightValue < 1 || heightValue > 400) ? `Invalid ${stat} value. It should be between 1 and 400.` : "";
    }
    
    if (stat === "weight") {
      const weightValue = Number(value);
      return (weightValue < 1 || weightValue > 3000) ? `Invalid ${stat} value. It should be between 1 and 3000.` : "";
    }
    
    return ""; 
  }