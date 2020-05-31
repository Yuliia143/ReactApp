import defaultUserImage from "../../assets/images/user.png";

export const checkUserImage = (img: string) => {
    if (img === undefined || img.length === 0) {
        return defaultUserImage;
    }
    return img;
};