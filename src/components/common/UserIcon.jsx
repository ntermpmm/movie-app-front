import defaultPic from "../../assets/image/ProfilePic.png";

function UserIcon({ src, size, border }) {
    return (
        <img
            className="rounded-full object-cover line "
            src={src || defaultPic}
            width={size}
            height={size}
            alt="user"
        />
    );
}

export default UserIcon;
