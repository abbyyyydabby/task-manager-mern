const AvatarGroup = ({ avatars = [] }) => {
  if (!avatars.length) return null;

  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, 3).map((src, index) => (
        <img
          key={index}
          src={src}
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
      ))}
      {avatars.length > 3 && (
        <div className="w-7 h-7 flex items-center justify-center text-xs rounded-full bg-gray-200 border-2 border-white">
          +{avatars.length - 3}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
