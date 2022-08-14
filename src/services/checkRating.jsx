export const checkRating = (inputRating) => {
    let rating = "";
    if (inputRating) {
        if (inputRating === "G") {
            rating = "General (G)";
            return rating;
        } else if (inputRating === "PG") {
            rating = "Parental Guidance (PG)";
            return rating;
        } else if (inputRating === "M") {
            rating = "Mature (M)";
            return rating;
        } else if (inputRating === "MA") {
            rating = "Mature Accompanied (MA 15+)";
            return rating;
        } else if (inputRating === "R") {
            rating = "Restricted (R 18+)";
            return rating;
        } else {
            return "";
        }
    }
};
