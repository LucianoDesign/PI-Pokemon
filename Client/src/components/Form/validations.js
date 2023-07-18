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
  
    const statLimits = {
      hp: { min: 1, max: 260 },
      attack: { min: 1, max: 200 },
      defense: { min: 1, max: 260 },
      speed: { min: 1, max: 190 },
      height: { min: 1, max: 1000 },
      weight: { min: 1, max: 10000 },
    };
  
    const statValue = Number(value);
    const { min, max } = statLimits[stat];
  
    return statValue < min || statValue > max ? `Invalid ${stat} value. It should be between ${min} and ${max}.` : "";
  };