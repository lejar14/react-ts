export const validateEmail = (email: string = ""): boolean => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email);
      };

export const validatePassword = (password: string = ""): boolean => {
        return /^[^%]{6,}$/.test(password);
      };